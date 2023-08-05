import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  getBlogsPerPage,
  getBlogs,
} from "../controllers/blogControllers";
import { authUserToken } from "../middlewares/authToken";

router.get("/blogs", getBlogs);
router.use(authUserToken);
router.get("/blogs/page/:page", getBlogsPerPage);
router.post("/blogs", createBlog);
router.delete("/blogs/:id", deleteBlog);

export { router as blogRoutes };
