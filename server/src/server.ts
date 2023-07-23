import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import env from "./utils/envalid";
import { blogRoutes } from "./routes/blogRoutes";
import { errorHandler } from "./controllers/blogControllers";
const app = express();

app.use(cors({ origin: env.ALLOWED_ROUTE, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", blogRoutes);
app.use(errorHandler);

mongoose
  .connect(env.DB_URI)
  .then(() => {
    app.listen(env.PORT, async () => {
      await console.log("Listening to port", env.PORT);
      console.log("Connected to database");
    });
  })
  .catch((err) => console.error(err));
