
import { User } from "../models/user.model.js"
import { uploadCLOUDINARY } from "../utils/cloudinary.js";
import * as bcrypt from "bcrypt";
import hash from "bcrypt";
import jwt from "jsonwebtoken"
const register = async (req, res,) => {

try{
  const { fullname, email, password } = req.body;
  if ([fullname, email, password].some((field) => field === "")) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existuser = await User.findOne({ email })
  if (existuser) {
    return res.status(409).send({message:"Email already exist"})
  }
let avater
  if (req.files?.avater) {
    const avaterlocalpath = req.files?.avater[0]?.path
     avater = await uploadCLOUDINARY(avaterlocalpath)
    if (!avater) return res.send({message:"something went wrong while uploading avater to cloudinry"})
  }

  const createdUser = new User(
    { fullname, email, password, avater: avater?.secure_url || "" }
  )
  const createUseResponse = await createdUser.save()
  if (!createUseResponse) {

    return res.status(500).send({ message: "somthins went wrong while storing user in datbase" })

  }
  const Accesstoken = jwt.sign(
    { userId: createUseResponse._id, email: createUseResponse.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }

  )

  res.status(200).send({ massage: "your account created succesfully", user:createdUser, Accesstoken })


}catch(error){
console.log("errot while registration", error)
res.status(500).send({message:"wrror occure while registration ", error})
}

}





const login = async (req, res) => {

  const { password, email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).send({ message: "invalid email or password" })
  }
  const isPasswordCorrected = await user.isPasswordCorrect(password)

  if (!isPasswordCorrected) {
    return res.status(404).send({ message: "invalid email or password" })
  }

  const Accesstoken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }

  )

  res.status(200).send({ message: "have been logedin  successfylly ", user, Accesstoken })
}













const updatePorfile = async (req, res) => {
  const userId = req.params.userId

  const { fullname, email, currentPassword, newPassword } = req.body
  const existingUser = await User.findById(userId)

  if (!existingUser) {
    return res.status(400).send({ message: "user not found" })
  }
  existingUser.fullname = fullname || existingUser.fullname
  existingUser.email = email || existingUser.email

  if (req.files?.avater) {
    const avaterLacalpath = req.files.avater[0]?.path
    const avater = await uploadCLOUDINARY(avaterLacalpath)
    if (!avater) {
      return res.status(500).send({ message: "something went wront while stroing avater" })
    }
    existingUser.avater = avater.secure_url
  }

  if (currentPassword && newPassword) {

    const isPasswordCorrect = await existingUser.isPasswordCorrect(currentPassword)
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "the current passowrd is not currect" })
    }
    existingUser.password = newPassword || existingUser.password

  }

  const updatedUser = await existingUser.save()
  if (!updatedUser) {
    return res.status(500).send({ message: "there is somthing went wrong while updating the profile " })
  }
  res.status(200).send({ message: "profile updated successfully", user:updatedUser })



}



export { register, updatePorfile, login }