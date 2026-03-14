export class RedisCacheAdapter extends CachePort {
  constructor(redisClient) {
    super();
    this.client = redisClient;
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, ttl) {
    await this.client.set(key, value, "EX", ttl);
  }

  async delete(key) {
    await this.client.del(key);
  }
}
