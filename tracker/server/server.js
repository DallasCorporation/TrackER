const express = require("express");
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");


require("dotenv").config({ path: "./.env" });
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true }, () => {
  console.log("CONNECTED")
})
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/buildings"));
app.use(require("./routes/activity"));
app.use(require("./routes/userPreference"));
app.use(require("./routes/mailer"));
app.use(require("./routes/organization"));
app.use(require("./routes/renewable"))
app.use(require("./routes/bills.js"))

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});


const io = new Server({
  cors: {
    origin: "http://localhost:3001"
  }
})

var onlineUsers = [];

const addNewUser = (id, socketId) => {
  !onlineUsers.some((user) => user.id === id) && (
    onlineUsers.push({ id, socketId }), console.log("New Connection", id))
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return onlineUsers.find((user) => user.id === id);
};

io.on("connection", (socket) => {
  socket.on("newUser", (id) => {
    addNewUser(id, socket.id);
  });

  socket.on("newBuilding", ({ sender, receiver }) => {
    const rec = getUser(receiver)
    if(!rec) return
    io.to(rec.socketId).emit("getNotification", {
      sender, msg: "has added a new building under your organization!", type: "New"
    });
  })

  socket.on("newRenewable", ({ sender, receiver }) => {
    const rec = getUser(receiver)
    if(!rec) return
    io.to(rec.socketId).emit("getNotification", {
      sender, msg: "has installed a new energy resources from your Organization!", type: "Renewable"
    });
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User Disconnected", socket.id)
  });
})
io.listen(3002)