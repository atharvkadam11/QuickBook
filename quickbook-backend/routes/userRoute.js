// const router = require("express").Router();
// const User = require("../models/userModel");
// // const bcrypt = require("bcrypt");

// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   try {
//     const userExists = await User.findOne({ email: req.body.email });
//     console.log(userExists);
//     if (userExists) {
//       return res.send({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPass = await bcrypt.hash(req.body.password,salt);
//     // req.body.password=req.body.password;
//     const newUser = await User(req.body);
//     // console.log(newUser);
//     await newUser.save();
//     res.send({
//       success: true,
//       message: "User registered, Please login",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// //login
// router.post("/login", async (req, res) => {
//   console.log(req.body.email);
//   console.log(User);
//   const user = await User.findOne({ email: req.body.email });
//   // console.log(user);
//   if (!user) {
//     return res.send({
//       success: false,
//       message: "User does not exist",
//     });
//   }

//   if (user.password !== req.body.password) {
//     return res.send({
//       success: false,
//       message: "Wrong Password entered",
//     });
//   }
//   //   const validPass = await bcrypt.compare(req.body.password, user.password);

//   // if(!validPass){
//   //     return res.send({
//   //         success:false,
//   //         message:"Wrong Password entered"
//   //     })
//   // }
//   res.send({
//     success: true,
//     message: "User logged in successfully",
//   });
// });

// module.exports = router;

import express from "express";
import {
  createUserController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.get("/users/:id", getUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;
