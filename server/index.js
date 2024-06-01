import express from "express"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import connectDB from "./connect.js"
import cors from "cors"
import cookieParser from "cookie-parser"

connectDB();
const app = express();
app.use(cors(({credentials: true, origin:'http://localhost:5173'})))
app.use(cookieParser());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => console.log("listening"));

