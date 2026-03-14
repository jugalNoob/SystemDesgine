src/
│
├── domain/
│   └── entities/Order.js
│
├── application/
│   └── useCases/
│       └── CreateOrder.js
│
├── ports/
│   ├── repositories/OrderRepository.js
│   ├── cache/CachePort.js
│   └── messaging/EventPublisher.js
│
├── adapters/
│   ├── db/MongoOrderRepository.js
│   ├── cache/RedisCacheAdapter.js
│   ├── messaging/KafkaProducerAdapter.js
│   └── http/OrderController.js
│
└── main.js

