import { Request, Response } from 'express'
import mongoose from 'mongoose'

import Post from "../models/sampleModel"
import User from "../models/sampleModel2"
import StockItem from '../models/stockItemModel'


// CREATE NEW STOCK ITEM
export const createStockItem = async (req: Request, res: Response) => {
    try {
        const { itemName, quantity, price, description } = req.body;

        const newItem = new StockItem({
            itemName: itemName,
            quantity: quantity,
            price: price,
            description: description,
        })
        await newItem.save()

        const item = await StockItem.find();
        res.status(201).json(item);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: err.message });
        } else if (err instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: `Invalid value provided: ${err.value}` });
        } else if ((err as any).code === 11000) {
            res.status(409).json({ message: `Item with name "${req.body.itemName}" already exists.` });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

// GET STOCK ITEM DATA
export const getStockItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params

        if (itemId) {
            const item = await StockItem.findById(itemId);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: "Item not found" });
            }
        } else {
            // If no itemId is provided, return all items
            const items = await StockItem.find();
            res.status(200).json(items);
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching items" });
    }
};


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
