import { Router } from "express";
import { register } from "../controlers/user.controller.js";
import { login } from "../controlers/user.controller.js";
import { updatePorfile } from "../controlers/user.controller.js";

import { LikePost, Posting, addComment, deleteComment, getForUpdate, getPosts, getSinglePost, postDelete, updatePost } from "../controlers/post.controller.js";

const userRouter = Router();
const postRouter = Router();

userRouter.post("/register",register);
userRouter.post("/updateProfile/:userId", updatePorfile);
userRouter.post("/login", login);

postRouter.route("/Posting").post( Posting);
postRouter.route("/updatePost/:userId").post(updatePost);
postRouter.route("/postDelete/:postId").delete(postDelete);
postRouter.route("/addcomment/:postId/comment").post(addComment);
postRouter.route("/likeToggling/:postId/:userId").post(LikePost);
postRouter.route("/deleteComment/:postId/:commentId").delete(deleteComment);



// get endpoint
postRouter.route("/getPosts").get(getPosts);
postRouter.get("/getYourPost/:userId", getSinglePost)
postRouter.get("/getForUpdate/:postId", getForUpdate)
export { userRouter, postRouter };
