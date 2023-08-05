import express from "express";
import { verifyRefreshToken } from "../controllers/tokenControllers";
const router = express.Router();

router.post("/accessToken", verifyRefreshToken);

export { router as accessTokenRoute };
