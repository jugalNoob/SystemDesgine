6. Container Server
Meaning

Application runs inside containers instead of full VMs.

Container = lightweight environment.

Example

Docker

Kubernetes

Architecture
Server
│
Docker Engine
│
├── Container (Node API)
├── Container (Redis)
└── Container (Worker)

Example command
docker run node-app

Advantages

✔ Lightweight
✔ Faster deployment
✔ Easy scaling