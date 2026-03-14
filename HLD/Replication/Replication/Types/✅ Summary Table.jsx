| Type      | Role        | Can Write? | Can Read?      | Notes                            |
| --------- | ----------- | ---------- | -------------- | -------------------------------- |
| Primary   | Main node   | Yes        | Yes            | Handles writes                   |
| Secondary | Replica     | No         | Yes (optional) | Replicates from primary          |
| Arbiter   | Voting node | No         | No             | Maintains odd vote count         |
| Hidden    | Replica     | No         | Optional       | Invisible to app reads           |
| Delayed   | Replica     | No         | Optional       | Replication delayed by N seconds |
MongoDB replication = Replica Set (modern, production-ready).
Master-slave replication is legacy and rarely used today.