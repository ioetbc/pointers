const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "https://arc-ggd.vercel.app/",
  },
});

app.get("/", (req, res) => {
  res.send("bitch");
  // res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", { msg });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
