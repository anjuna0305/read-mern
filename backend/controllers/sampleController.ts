import { Request, Response } from 'express'

import Post from "../models/sampleModel"
import User from "../models/sampleModel2"

/* CREATE */
export const createPost = async (req: Request, res: Response) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        if (!user)
            throw new Error

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err) {
        if (err instanceof Error) {
            res.status(409).json({ message: err.message });
        } else {
            res.status(409).json({ message: "An unknown error occurred" });
        }
    }
};

/* READ */
export const getFeedPosts = async (req: Request, res: Response) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(404).json({ message: "An unknown error occurred" });
        }
    }
};

export const getUserPosts = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(404).json({ message: "An unknown error occurred" });
        }
    }
};

/* UPDATE */
export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post?.likes?.get(userId);

        if (isLiked) {
            post?.likes?.delete(userId);
        } else {
            post?.likes?.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post?.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(404).json({ message: "An unknown error occurred" });
        }
    }
};
