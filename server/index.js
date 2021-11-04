const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
require("dotenv/config");

const {CLIENT_URL} = process.env;

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"]
      }
});

//initializing the socket io connection 
io.on("connection", socket => {
    socket.emit("message", "Welcome to the chat app");
    socket.on('message', data => {
        console.log(data);
    });
});
