import express from "express";
import { createChat } from "../controllers/chat.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", createChat);
export default router;
