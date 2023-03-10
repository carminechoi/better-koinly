var express = require("express");
var cors = require("cors");
require("@prisma/client");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cron = require("node-cron");

var routes = require("./src/routes/routes");

var app = express();

// run cron job
cron.schedule("* 1 * * *", function () {
	console.log("running a task every hour");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// enable CORS for specific origins only
let corsOptions = {
	origin: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3002",
	],
	credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

module.exports = app;
