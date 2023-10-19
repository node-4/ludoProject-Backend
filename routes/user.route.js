const auth = require("../controllers/userControler");
const authJwt = require("../middleware/authJwt");
module.exports = (app) => {
        app.post("/api/v1/user/socialLogin", auth.socialLogin);
        app.post("/api/v1/user/loginWithPhone", auth.loginWithPhone);
        app.post("/api/v1/user/:id", auth.verifyOtp);
        app.post("/api/v1/user/joinContest/:contestId", [authJwt.verifyToken], auth.joinContest);
        app.post("/api/v1/user/winnerContest", [authJwt.verifyToken], auth.winnerContest);
        app.post("/api/v1/user/secondPrizeContest", [authJwt.verifyToken], auth.secondPrizeContest);
        app.post("/api/v1/user/thirdPrizeContest", [authJwt.verifyToken], auth.thirdPrizeContest);
}