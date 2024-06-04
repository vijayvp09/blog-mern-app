import express from "express"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import connectDB from "./connect.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"

connectDB();
const app = express();
app.use(cors(({credentials: true, origin:'http://localhost:5173'})))
app.use(cookieParser());
app.use(express.json());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +  '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({dest: './uploads/'})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const  file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => console.log("listening"));

