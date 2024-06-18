const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
const path = require("path");
app.use(compression({ threshold: 500 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV == "production") {
        console.log = function () { };
}
app.get("/", (req, res) => {
        res.send("Hello World!");
});

require('./routes/user.route')(app);
require('./routes/admin.route')(app);


mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host} : ludo-Backend`);
});
app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}!`);
});
module.exports = app;
module.exports.handler = serverless(app);