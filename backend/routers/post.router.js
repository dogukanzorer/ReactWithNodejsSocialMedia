const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const {v4:uuidv4} = require("uuid");

router.post("/post" , async(req,res) => {
    try {
        const {userId,content} = req.body;
        const post = new Post({
            _id: uuidv4(),
            userId:userId,
            content:content,
            createDate: new Date()
        });
        await post.save();
        res.json({message: "Post shared"});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// Get Post 

router.get("/posts", async (req,res) => {
    try {
        const post = await Post.aggregate([
            {
          $lookup:{
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "users"
            }  
        }  
        ]).sort({createDate:-1});
        res.json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;