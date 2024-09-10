const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const setUpWebSocket = (server) => {
  try {
    let users = {};
    const io = new Server(server);
    io.on("connection", (socket) => {
      console.log("before users and socket",users,socket.id)
      socket.on("token",(token)=>{
        console.log("token received", token);
        const {userId} = jwt.verify(token, process.env.JWT_SECRET);
        console.log("after token userid and socketid", userId,socket.id);
        users[socket.id] = userId;
      })
      socket.on("message", (msg) => {
        console.log("message received", msg);
        console.log("message received users", users);
        console.log(socket.id, "users of <= this socket id", users[socket.id]);
        const messageData = {
          senderId: users[socket.id],
           message: msg,
          timestamp: new Date().toISOString(),
        };
        io.emit("messsage recieved", messageData);
      });

      socket.on("close", () => {
        console.log("connextion closed");
      });
    });
  } catch (e) {
    console.error("Error setting up WebSocket", e);
    process.exit(1); // exit the process with an error code
  }
};

module.exports = setUpWebSocket;
