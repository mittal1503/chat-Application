const express = require('express');
const app = express();
const port = process.env.port || 5000

const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");

require('dotenv').config();
const cors = require('cors');
app.use(cors())
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);

app.listen(port,(req,res)=>{
    console.log("listening on port",port)
})