import express from "express";
const router = express.Router();
import {
  getUsers,
  getUser,
  createUser,
  logInUser,
  logOutUser,
} from "../controllers/userControllers";

router.get("/users", getUsers);
router.post("/users/signup", createUser);
router.post("/users/signin", logInUser);
router.get("/users/:id", getUser);
router.delete("/users/logOut", logOutUser);

export { router as userRoutes };
