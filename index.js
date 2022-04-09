const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { uuid } = require("uuidv4");

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const clientCount = io.engine.clientsCount;
    console.log("clientCount", clientCount);
    socket.broadcast.emit("chat message", { msg, clientCount, id: uuid() });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
