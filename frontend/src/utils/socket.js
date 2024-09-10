import io from "socket.io-client";

const Socket = {
  socket: io(`http://localhost:5000`, {
    transports: ["websocket"],
  }),
};

export default Socket
