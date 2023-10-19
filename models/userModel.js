const mongoose = require('mongoose');
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var userSchema = new schema({
        firstName: {
                type: String
        },
        lastName: {
                type: String
        },
        mobileNumber: {
                type: String
        },
        email: {
                type: String
        },
        deviceToken: {
                type: String
        },
        socialId: {
                type: String
        },
        socialType: {
                type: String
        },
        otp: {
                type: String,
        },
        otpExpiration: {
                type: Date,
        },
        accountVerification: {
                type: Boolean,
                default: false,
        },
        profilePic: {
                type: String,
                default: null
        },
        password: {
                type: String
        },
        status: {
                type: String,
        },
        wallet: {
                type: Number,
                default: 0,
        },
        deposite: {
                type: Number,
                default: 0,
        },
        winning: {
                type: Number,
                default: 0,
        },
        bonus: {
                type: Number,
                default: 0,
        },
        userType: {
                type: String,
                enum: ["USER", "ADMIN"],
                default: "USER"
        },
},
        { timestamps: true });
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("user", userSchema);