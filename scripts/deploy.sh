#!/bin/bash

scp -r -i ~/Downloads/main.pem * ec2-user@13.232.73.216:~/  --exclude 'keychain-service/node_modules' --exclude 'token-service/node_modules' --exclude 'keychain-service/dist' --exclude 'token-service/dist'
ssh -i ~/Downloads/main.pem ec2-user@13.232.73.216 'docker-compose up -d'
