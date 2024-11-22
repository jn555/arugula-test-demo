import express, { Request, Response } from "express";
import Board from "../models/mongo/Board";
import Post from "../models/mongo/Post";

const router = express.Router();
console.log(`Here`);

// Get board and posts for a specific forum
router.get("/:forum", async (req: Request, res: Response) => {
  const { forum } = req.params;

  try {
    // Fetch board by name
    const board = await Board.findOne({ name: forum });

    if (!board) {
      return res.status(404).json({ message: `Forum "${forum}" not found` });
    }

    // Fetch posts related to the board
    const posts = await Post.find({ boardId: board._id });
    res.json({
      board,
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Add a new post to a board
router.post("/:forum/posts", async (req: Request, res: Response) => {
  const { forum } = req.params;
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ message: "Title and content and userId are required" });
  }
  try {
    const board = await Board.findOne({ name: forum });

    if (!board) {
      return res.status(404).json({ message: `Forum "${forum}" not found` });
    }

    const newPost = new Post({
      title,
      content,
      boardId: board._id,
      userId,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
