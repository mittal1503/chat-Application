const mongoose = require('mongoose');

const database = async() =>{
return await mongoose
  .connect(process.env.MONGODB_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("connection error", err);
  });

}

module.exports = database;