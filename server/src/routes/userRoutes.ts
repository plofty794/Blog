import express from "express";
const router = express.Router();
import { getUsers, getUser, createUser } from "../controllers/userControllers";

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUser);

export { router as userRoutes };
