// src/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import 'process'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private pubsubClient: RedisClientType;
  private commandClient: RedisClientType;

  async onModuleInit() {
    const redisHost = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost';
    this.pubsubClient = createClient({ url: `redis://${redisHost}:6379` });
    await this.pubsubClient.connect();

    this.commandClient = createClient({ url: `redis://${redisHost}:6379` });
    await this.commandClient.connect();

  }

  async onModuleDestroy() {
    await this.pubsubClient.quit();
    await this.commandClient.quit();
  }

  getClient(): RedisClientType {
    return this.pubsubClient;
  }

  async set(key: string, value: string) {
    await this.commandClient.set(key, value);
  }

  async get(key: string): Promise<string> {
    return this.commandClient.get(key);
  }

  async incr(key: string): Promise<number> {
    return this.commandClient.incr(key);
  }

  async expire(key: string, seconds: number) {
    await this.commandClient.expire(key, seconds);
  }

  async publish(channel: string, message: string) {
    await this.pubsubClient.publish(channel, message);
  }

  async subscribe(channel: string, handler: (message: string) => void) {
    await this.pubsubClient.subscribe(channel, handler);
  }

  unsubscribe(channel: string) {
    this.pubsubClient.unsubscribe(channel);
  }
}