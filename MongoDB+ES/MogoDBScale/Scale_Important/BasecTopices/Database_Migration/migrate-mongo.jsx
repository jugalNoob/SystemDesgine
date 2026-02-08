Nice 👍 this is very practical + interview-useful.

I’ll explain migrate-mongo in the simplest possible way, then show full working steps.

🧠 What is migrate-mongo? (1 line)

migrate-mongo = a tool to manage MongoDB database migrations in a safe, versioned way.

It:

tracks which migrations ran

runs each migration once

works across dev / prod

🔥 Why use migrate-mongo?

Without tool ❌

manual scripts

forget what ran

production bugs

With migrate-mongo ✅

migration history stored in DB

repeatable

team-friendly

🚀 Install
npm install -g migrate-mongo


or project only:

npm install migrate-mongo

📁 Initialize migration setup
npx migrate-mongo init


Creates:

migrate-mongo-config.js
migrations/

⚙️ Configuration file
// migrate-mongo-config.js
module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "testdb",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};


📌 changelog collection tracks applied migrations

✍️ Create a migration
npx migrate-mongo create add-isActive-field


Creates file:

migrations/20260125123000-add-isActive-field.js

🧱 Migration file (UP & DOWN)
module.exports = {
  async up(db) {
    await db.collection("users").updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } }
    );
  },

  async down(db) {
    await db.collection("users").updateMany(
      {},
      { $unset: { isActive: "" } }
    );
  }
};

▶️ Run migrations
npx migrate-mongo up


Output:

Applied migration: add-isActive-field

🔙 Rollback (undo last migration)
npx migrate-mongo down

🔍 Check migration status
npx migrate-mongo status


Shows:

Applied  ✔ add-isActive-field
Pending  ⏳ add-email-field

📦 What happens inside MongoDB?

New collection created:

changelog

{
  "fileName": "20260125123000-add-isActive-field.js",
  "appliedAt": "2026-01-25T10:00:00Z"
}


This prevents running same migration twice 🔒

🧠 VERY IMPORTANT RULES

✅ Never edit old migration files
✅ One change = one migration
✅ Always test in staging
❌ Never run manually in prod DB

🎯 Real Use Cases

Add new field

Backfill data

Create indexes

Rename fields

Cleanup bad data

🧠 Interview One-Liner

migrate-mongo is a versioned migration tool that safely evolves MongoDB schemas and data across environments.

🔥 When NOT to use migrate-mongo

One-off script

Small hobby project

No production DB