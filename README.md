The service can be set up locally, it is also deployed on an EC2 machine - `13.232.73.216`
The token service is running on `13.232.73.216:3001`
The keychain service is running on `13.232.73.216:3000`

# Architecture

![Diagram](https://i.imgur.com/pRDwGYq.png)

## Token Service

Token service has an API for login, which returns a JWT token. The JWT token can be used to fetch tokens. 

## Keychain Service
Keychain service manages accounts and access keys. We can create accounts in keychain service and admins can manage access keys. 

Each access key is synced by Redis pub sub between the services. Updates to the access key are also synced.

## Postgres

Postgres acts as the primary data store, storing data about the accounts and access keys

## Redis

Redis is used for rate limits and for pubsub. 

Ratelimits implemented in Redis are safe from race-conditions. Even if multiple containers of the app are running, there won't be any race conditions. This is because  INCR command is used which is atomic. 

Rate limit checks are based on sliding window rate-limiting.

# Setup

You can start the services by running 

```docker-compose up -d```

## Keychain Service

### Create a User
```
curl --location 'http://localhost:3000/account/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Docomo",
    "email": "docomo@gmail.com",
    "role": "user"
}'
```

### Create an Admin
``` curl --location 'http://localhost:3000/account/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pi",
    "email": "pi@gmail.com",
    "role": "admin"
}'
```

### Get all users
``` curl --location 'http://localhost:3000/account/' ```

### Create access key using Admin 
```
curl --location 'http://localhost:3000/access-key/' \
--header 'Content-Type: application/json' \
--data '{
    "requestRateLimit": 7,
    "owner": "9e2011e3-e607-491d-b31b-e72b21cbb5c4",
    "requester": "c47c5f92-5276-43da-9a6a-15824001fdc8"
}'
```

### User enables/disables key

```
curl --location --request PATCH 'http://localhost:3000/access-key/disable/8fa0f8fe-2b4b-4357-bf7e-893ea9de3687/'
curl --location --request PATCH 'http://localhost:3000/access-key/enable/8fa0f8fe-2b4b-4357-bf7e-893ea9de3687/'
```

### Admin can update access key
```curl --location --request PATCH 'http://localhost:3000/access-key/3267737c-6172-4622-9358-851c70b93508/' \
--header 'Content-Type: application/json' \
--data '
{
    "requestRateLimit" : 3,
    "requesterId" : "0c0edc23-5d89-40d3-9c32-4b4924550a02"

}
'
```

### Get all access keys
```
curl --location 'http://localhost:3000/access-key/'
```

### Get access key detail
```
curl --location 'http://localhost:3000/access-key/93de9f26-be79-44a9-9339-e4de7ae91971/'
```

## Token Service

### Login
```
curl --location 'http://localhost:3001/login/' \
--header 'Content-Type: application/json' \
--data '{
    "accountId": "9e2011e3-e607-491d-b31b-e72b21cbb5c4"
}'
```

### Fetch tokens
Tokens are static data, when fetching tokens, the API returns all tokens stored in the databse.

Replace the token after `Bearer` with the token recieved in the login request

```
curl --location 'http://localhost:3001/token/fetch-token/316e2e0d-502a-4ae2-ba1f-bcc84326c613/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI5ZTIwMTFlMy1lNjA3LTQ5MWQtYjMxYi1lNzJiMjFjYmI1YzQiLCJpYXQiOjE3MTYxNDQxODd9.v18uKMdsIlt8-xLdM8fzEnnlXkxHjw6P5m9T538RVoA'
```

Running the requests more than the rate limit will block the requests