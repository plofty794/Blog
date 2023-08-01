import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
} from "../controllers/blogControllers";

router.get("/blogs", getBlogs);
router.get("/blogs/page/:page", getBlog);
router.post("/blogs", createBlog);
router.delete("/blogs/:id", deleteBlog);

export { router as blogRoutes };
