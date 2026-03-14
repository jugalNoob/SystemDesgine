5. Microservices Architecture

Large systems use multiple services.

                 Users
                   |
                   v
            +-------------+
            | API Gateway |
            +-------------+
          /       |        \
         v        v         v
 +-----------+ +-----------+ +-----------+
 | User svc  | | Order svc | |Payment svc|
 +-----------+ +-----------+ +-----------+
        |             |            |
        v             v            v
    MongoDB       MongoDB       MongoDB


Example API gateway

Kong

Benefits

Independent scaling

Better maintainability