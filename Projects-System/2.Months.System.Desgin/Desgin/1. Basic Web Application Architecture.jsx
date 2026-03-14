1. Basic Web Application Architecture
            Users
              |
              v
        +-----------+
        |   DNS     |
        +-----------+
              |
              v
      +----------------+
      | Load Balancer  |
      | (Nginx)        |
      +----------------+
        /      |      \
       v       v       v
+-----------+ +-----------+ +-----------+
| App Server| | App Server| | App Server|
| Node.js   | | Node.js   | | Node.js   |
+-----------+ +-----------+ +-----------+
        |
        v
   +------------+
   |  Database  |
   | MongoDB    |
   +------------+


Purpose

Handle thousands of users

Load balancer distributes traffic.

Software example

Nginx

MongoDB