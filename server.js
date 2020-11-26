import { server as config } from "./config";
import express from "express";

const server = express();
const cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true
};
server.use(cors(corsOptions));

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/rcv', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var session = require('express-session')
server.use(session({
  secret: '@rcv',
  resave: false,
  saveUninitialized: true
}));

const log4js = require("log4js");
import log from "./models/logger";
server.use(
  log4js.connectLogger(log, {
    level: "auto",
    statusRules: [{ codes: [304], level: "info" }],
  })
);

// View
server.engine("html", require("ejs").renderFile);
server.set("view engine", "html");

// Router
const router = require("./router.js");
server.use("/", router);

server.use(express.static("public"));

const http = require('http').createServer(server);
const io = require('socket.io')(http);
var socket = require('./sockets')(io);

http.listen(config.port, config.host, () => {
  log.info("Express listening on port", config.port);
});