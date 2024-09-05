import express from "express";
import {Response, Request} from "express"
import { getFeedPosts, getUserPosts, likePost } from "../controllers/sampleController";
import { createStockItem } from "../controllers/stockController";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const testFunction=(req:Request, res:Response)=>{
    res.status(200).json("greetings!");
}

const testFunction2=(req:Request, res:Response)=>{
    const body_was = req.body
    console.log(body_was)
    res.status(200).json(body_was);
}

/* READ */
router.get("/", testFunction);
router.post("/", testFunction2);
router.get("/:userId/posts", getUserPosts);
router.post("/item/create", createStockItem);

/* UPDATE */
router.patch("/:id/like", likePost);

export default router;
