import express from "express"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"

const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes)

app.listen(8000, () => console.log("listening"));

