import { response } from "express";
import { Post } from "../models/post.model.js";
import { uploadCoudinary } from "../utils/coudinary.js";


const Posting = async (req, res) => {
    try {
        const { description, user } = req.body;
        console.log(user)
        let postFile;
        if (req.files?.file) {
            postFile = req.files?.file[0]?.path;

            if (!postFile) {
                return res.status(400).send({ message: "There is an error while sending files to the server." });
            }
        }
        const file = await uploadCoudinary(postFile);

        if (postFile && !file) {
            return res.status(400).send({ message: "File is not getting from Cloudinary." });
        }

        const newPost = new Post({ description, file: file?.url || "", user });
        const savePost = await newPost.save();

        if (!savePost) {
            return res.status(500).send({ message: "Post is not saved." });
        }
        // await savePost.populate('user', 'name email').execPopulate();
        console.log("New Post Saved:", savePost);
        return res.status(200).send({ message: "Post is saved successfully", savePost });
    } catch (error) {
        console.error("Error in Posting:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
const getForUpdate = async (req, res) => {
    try {
        const postId = req.params.postId
        // console.log(postId)
        const post = await Post.findById(postId)
        if (!post) return res.status(404).send({ message: "post doesn't found!!!" })
        res.status(200).send({post})
    } catch (erro) {
        res.status(500).send({ message: "somthing went wrong " })
        console.log(erro)
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.userId; // Updated to use req.params.userId
        console.log("for editing",postId)
        const { description } = req.body;

        const existingPost = await Post.findById(postId);

        if (!existingPost) {
            return res.status(404).send({ message: "Post not found" });
        }

        existingPost.description = description || existingPost.description;

        if (req.files?.file) {
            const localFilePath = req.files.file[0]?.path;
            console.log(localFilePath)
            const updatedFile = await uploadCoudinary(localFilePath);

            if (!updatedFile) {
                return res.status(400).send({ message: "File is not coming from Cloudinary" });
            }

            existingPost.file = updatedFile.url;
        }

        // Save the existingPost directly
        const updatedPost = await existingPost.save();

        if (!updatedPost) {
            return res.status(500).send({ message: "There is something wrong while saving the updated post" });
        }

        res.status(200).send({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        console.error("Error in updating post:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};


const postDelete = async (req, res) => {
    try {
        const postId = req.params.postId
        // console.log(postId)
        const deltedpost = await Post.findByIdAndDelete(postId)
        if (!deltedpost) {
            console.log("post is not deleted")
            return res.status(500).send({ message: "the post is not delted somthing went wrong", postId })
        }
        res.status(200).send({ message: "Post deleted successfully", postId });
        console.log("post deleted")

    } catch (error) {
        res.send(error, "there is somthing went wrong whlie deleting")
    }



}


const addComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { userId, text } = req.body;

        const existingPost = await Post.findById(postId).populate('user', 'fullname avater email');

        if (!existingPost) {
            return res.status(404).send({ message: "Post doesn't exist" });
        }

        existingPost.comments = existingPost.comments || [];
        const newComment = {
            user: userId, // Ensure userId is a valid ObjectId
            text,
        };

        existingPost.comments.push(newComment);
        const savePost = await existingPost.save();

        // Populate the user field in the newly added comment
        const savedComment = savePost.comments[savePost.comments.length - 1];
        await savedComment.populate('user', 'fullname avater email').execPopulate();

        if (!savePost) {
            return res.status(500).send({ message: "Error while saving comment" });
        } else {
            return res.status(200).send({ message: "Comment is saved successfully!!", savePost, savedComment });
        }
    } catch (error) {
        console.log("Error while adding comments", error);
        res.status(500).send("Error while adding comments");
    }
};


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "fullname avater email")


        if (!posts) {
            return res.status(404).send({ message: "Posts not found" });
        }


        res.status(200).send({ message: "Posts fetched successfully !!", posts });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
        console.log("Posts not fetched ", error);
    }
};

const getYourPost = async (req, res) => {
    try {
        const userId = req.params.userId
        // console.log("user id", userId)
        const yourPosts = await Post.find({ "user": userId }).p
        if (yourPosts.length === 0) return res.send("your post is not found ")
        res.status(200).send({ message: "your post fetched successfully ", yourPosts })
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
        console.log("server errror", error)
    }
}



export { Posting, updatePost, postDelete, addComment, getPosts, getYourPost, getForUpdate }