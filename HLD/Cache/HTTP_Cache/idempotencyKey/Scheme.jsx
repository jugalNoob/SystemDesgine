const mongoose = require("mongoose");

const IdempotencySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true, // ensures each key is stored only once
    },
    result: {
        type: Object, // store the response of the update
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24, // optional: automatically delete after 24 hours
    },
});

module.exports = mongoose.model("Idempotency", IdempotencySchema);
