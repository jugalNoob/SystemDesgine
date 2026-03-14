2️⃣ Components of Service Discovery

Service Registry

A central database or system where all service instances register themselves.

Example: Consul, Eureka, etcd, Zookeeper.

Each service registers its name, IP, port, metadata.

Service Provider

The service that registers itself to the registry.

Service Consumer

The service that queries the registry to find other services.