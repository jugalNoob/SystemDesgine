2️⃣ Notes on the Options

| Option                     | Purpose                                                     |
| -------------------------- | ----------------------------------------------------------- |
| `useNewUrlParser: true`    | Use the new MongoDB URL parser                              |
| `useUnifiedTopology: true` | Enables the new topology engine (required for replica sets) |
| `readPreference`           | Controls which nodes are used for read operations           |


Common readPreference values:

primary → Reads only from primary (default)

secondary → Reads only from secondaries

secondaryPreferred → Prefer secondaries, fallback to primary if none available

primaryPreferred → Prefer primary, fallback to secondary

