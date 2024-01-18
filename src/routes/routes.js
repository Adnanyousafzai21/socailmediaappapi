import { Router } from "express";
import { register } from "../controlers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { login } from "../controlers/user.controller.js";
import { updatePorfile } from "../controlers/user.controller.js";

import { Posting, addComment, deleteComment, getForUpdate, getPosts, getYourPost, postDelete, updatePost } from "../controlers/post.controller.js";

const userRouter = Router();
const postRouter = Router();

userRouter.post("/register", upload.fields([{ name: "avater", maxCount: 2 }]), register);
userRouter.post("/updateProfile/:userId", upload.fields([{ name: "avater", maxCount: 2 }]), updatePorfile);
userRouter.post("/login", login);

postRouter.route("/Posting").post(upload.fields([{ name: "file" }]), Posting);
postRouter.route("/updatePost/:userId").post(upload.fields([{ name: "file" }]), updatePost);
postRouter.route("/postDelete/:postId").delete(postDelete);
postRouter.route("/addcomment/:postId/comment").post(addComment);
postRouter.route("/deleteComment/:postId/:commentId").delete(deleteComment);



// get endpoint
postRouter.route("/getPosts").get(getPosts);
postRouter.get("/getYourPost/:userId", getYourPost)
postRouter.get("/getForUpdate/:postId", getForUpdate)
export { userRouter, postRouter };
