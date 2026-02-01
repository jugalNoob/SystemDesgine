const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },       // unique name
  price: { type: Number, required: true },
  age: { type: Number, required: true },
  birthDate: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true, unique: true },      // unique email
  hobbies: { type: [String], required: true },
  country: { type: String, required: true },
  bio: { type: String, required: true },
  isEligible: { type: Boolean, required: true },
  gender: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true }
});

/*------------------------------
   PROFESSIONAL INDEXING
-------------------------------*/

// Single-field indexes
userSchema.index({ price: 1 });           // price filtering / sorting
userSchema.index({ age: 1 });             // age filtering
userSchema.index({ date: -1 });           // sort by latest

// Compound indexes (multi-field queries)
userSchema.index({ price: 1, age: 1 });   // queries filtering by price + age
userSchema.index({ country: 1, isEligible: 1 }); // filtering by country and eligibility

// Unique indexes
userSchema.index({ email: 1 }, { unique: true }); // ensure unique email

// Partial / sparse indexes (optional for selective queries)
userSchema.index({ isEligible: 1 }, { partialFilterExpression: { isEligible: true } });

// Text index for search functionality
userSchema.index({ bio: "text", hobbies: "text" }); // full-text search on bio and hobbies

/*------------------------------
   MODEL EXPORT
-------------------------------*/
const RegisterGet = mongoose.model("Means", userSchema);
module.exports = RegisterGet;
