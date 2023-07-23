import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blogControllers";

router.get("/blogs", getBlogs);
router.post("/blogs", createBlog);
router.delete("/blogs/:id", deleteBlog);

export { router as blogRoutes };
