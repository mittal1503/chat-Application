const express = require('express');
const app = express();
const port = process.env.port || 5000
const http = require('http');
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");
const websocket = require("./controllers/socket")
const {Server} = require('socket.io')
require('dotenv').config();
const { join } = require("node:path");
const cors = require('cors');
const { notFound ,errorHandler} = require('./middlware/errorHandling');
const database = require('./config/database');

database();
app.use(
  cors()
);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use(notFound);
app.use(errorHandler);


const server = app.listen(port,(req,res)=>{
    console.log("listening on port",port)
})
websocket(server);