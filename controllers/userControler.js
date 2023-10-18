const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.socialLogin = async (req, res) => {
        try {
                let userData = await userModel.findOne({ socialId: req.body.socialId, socialType: req.body.socialType });
                if (userData) {
                        let updateResult = await userModel.findByIdAndUpdate({ _id: userData._id }, { $set: { deviceToken: req.body.deviceToken } }, { new: true });
                        if (updateResult) {
                                var token = jwt.sign({ _id: updateResult._id, socialId: updateResult.socialId }, 'DMandir', { expiresIn: '365d' });
                                let obj = {
                                        _id: updateResult._id,
                                        firstName: updateResult.firstName,
                                        lastName: updateResult.lastName,
                                        socialId: updateResult.socialId,
                                        userType: updateResult.userType,
                                        token: token
                                }
                                return res.status(200).send({ status: 200, message: "Login successfully ", data: obj, });
                        }
                } else {
                        req.body.firstName = req.body.firstName;
                        req.body.lastName = req.body.lastName;
                        req.body.countryCode = req.body.countryCode;
                        req.body.mobileNumber = req.body.mobileNumber;
                        req.body.email = req.body.email;
                        req.body.socialId = req.body.socialId;
                        req.body.socialType = req.body.socialType;
                        let saveUser = await userModel(req.body).save();
                        if (saveUser) {
                                var token = jwt.sign({ _id: saveUser._id, socialId: saveUser.socialId }, 'DMandir', { expiresIn: '365d' });
                                let obj = {
                                        _id: saveUser._id,
                                        firstName: saveUser.firstName,
                                        lastName: saveUser.lastName,
                                        mobileNumber: saveUser.mobileNumber,
                                        userType: saveUser.userType,
                                        token: token
                                }
                                return res.status(200).send({ status: 200, message: "Login successfully ", data: obj, });
                        }
                }
        } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Server error" });
        }
};
exports.loginWithPhone = async (req, res) => {
        try {
                const phone = await userModel.findOne({ mobileNumber: req.body.mobileNumber });
                if (phone) {
                        const otp = Math.floor(100000 + Math.random() * 900000).toString();
                        let update = await userModel.findByIdAndUpdate({ _id: phone._id }, { $set: { otp: otp } }, { new: true });
                        return res.status(200).send({ status: 200, message: "Login successfully ", data: update, });
                } else {
                        const otp = Math.floor(100000 + Math.random() * 900000).toString();
                        req.body.otp = otp;
                        const newUser = await userModel.create(req.body);
                        return res.status(200).send({ status: 200, message: "Login successfully ", data: newUser, });
                }
        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        errorName: error.name,
                        message: error.message,
                });
        }
};
exports.verifyOtp = async (req, res) => {
        try {
                const { otp } = req.body;
                const user = await userModel.findById(req.params.id);
                if (!user) {
                        return res.status(404).send({ message: "user not found" });
                }
                if (user.otp !== otp || user.otpExpiration < Date.now()) {
                        return res.status(400).json({ message: "Invalid OTP" });
                }
                const updated = await userModel.findByIdAndUpdate({ _id: user._id }, { accountVerification: true }, { new: true });
                const accessToken = await jwt.sign({ id: user._id }, 'DMandir', {
                        expiresIn: '365d',
                });
                let obj = {
                        userId: updated._id,
                        otp: updated.otp,
                        phone: updated.phone,
                        token: accessToken,
                }
                return res.status(200).send({ status: 200, message: "logged in successfully", data: obj });
        } catch (err) {
                console.log(err.message);
                return res.status(500).send({ error: "internal server error" + err.message });
        }
};