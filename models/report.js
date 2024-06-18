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
        date: {
                type: Date,
                default: Date.now,
        },
        amount: {
                type: Number,
        },
        paymentMode: {
                type: String,
        },
        type: {
                type: String,
        },
        relatedPayments: {
                type: String,
        },
        Status: {
                type: String,
        },
});
const transaction = mongoose.model("report", transactionSchema);
module.exports = transaction;
