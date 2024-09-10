const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: [true, "Firstname is required"] },
    lastname: { type: String, required: [true, "Lastname is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "password is required"] },
    emailVerified: Boolean,
    image: { type: String, required: [true, "image is required"] },
    jwtToken: String,
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function(enteredPwd){
  return await bcrypt.compare(enteredPwd, this.password)
}
userSchema.pre('save', async function(next){
  if(!this.isModified){
    next();
  }
  
   const saltRound = 10;
   this.password = await bcrypt.hash(this.password, saltRound);

})
const User = mongoose.model("User",userSchema);

module.exports = User;