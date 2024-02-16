import express from "express";
import {
  todogetController,
  todopostController,
} from "../controllers/todoController.js";
const router = express.Router();

router.get("/todos", todogetController);
router.post("/todos", todopostController);

export default router;
