Week 3 — Caching (Very Important)
Goal

Reduce database load.

Tools

Redis

Memcached

Caching layers
User
 |
CDN Cache
 |
App Cache (Redis)
 |
Database

Cache Strategies

Cache Aside

Write Through

Write Back

Example

GET /product/123

1 check redis
2 if miss -> database
3 store in redis

Problems

Cache invalidation

Cache stampede

Practice

Design

Product catalog cache

Trending posts system