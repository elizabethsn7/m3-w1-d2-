const express = require("express");
const path = require("path");
const routes = require("./routes/index");


const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use( express.static( "public" ) );
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


module.exports = app;

// const bootstrap = require("bootstrap");
