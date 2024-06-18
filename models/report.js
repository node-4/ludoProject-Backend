const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
        user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
        },
        contestId: {
                type: mongoose.Schema.ObjectId,
                ref: "contest",
        },
        rounds: [{
                roundNumber: Number,
                scores: {
                        you: Number,
                        right: Number,
                        top: Number,
                        left: Number
                }
        }],
        totalScores: {
                you: Number,
                right: Number,
                top: Number,
                left: Number
        }
}, { timestamps: true });
const transaction = mongoose.model("report", transactionSchema);
module.exports = transaction;
