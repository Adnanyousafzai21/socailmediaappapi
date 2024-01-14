import mongoose from "mongoose";
import bcrypt from "bcrypt"
const usershema = new mongoose.Schema({
fullname:{
    type: String,
    require: true,
    
},
email :{
    type: String,
    require:true,
    unique: true
},
password:{
    type: String,
    require :[true, "password is required"],
  
},
avater:{
    type:String,
    // reqired:true,
}
})


usershema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    } else {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    }
  });
usershema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
} 
 const User = mongoose.model("User", usershema)
 export {User}