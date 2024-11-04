const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        const post = new Post({ title, content, user: userId });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", ["username"]);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
