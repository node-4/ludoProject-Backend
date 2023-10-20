const auth = require("../controllers/adminController");
const authJwt = require("../middleware/authJwt");
module.exports = (app) => {
        app.post("/api/v1/admin/registration", auth.registration);
        app.post("/api/v1/admin/signin", auth.signin);
        app.post("/api/v1/admin/AddContest", authJwt.verifyToken, auth.AddContest);
        app.get("/api/v1/admin/allContest", auth.getContests);
        app.put("/api/v1/admin/Contest/:id", authJwt.verifyToken, auth.activeBlockContest);
        app.get("/api/v1/admin/Contest/:id", auth.getIdContest);
        app.delete("/api/v1/admin/Contest/:id", [authJwt.verifyToken], auth.deleteContest);
        app.get("/api/v1/admin/userList", auth.userList);
        app.get("/api/v1/admin/User/:id", auth.getUserById);
        app.delete("/api/v1/admin/User/:id", [authJwt.verifyToken], auth.deleteUser);
        app.post("/api/v1/admin/addBonus/:id", [authJwt.verifyToken], auth.addBonusTouser);
}