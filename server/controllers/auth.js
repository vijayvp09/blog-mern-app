import User from "../model/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({message: "All fields are important"})
    }
    
    try{
        const data = await User.findOne({username,email})
        if(data) return res.status(409).json({message: "User already exist"})

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username, email, password: hashPassword
        });
        const saveUser = await newUser.save();
        res.status(200).json({msg: "Registerd succesfully"})
    }
    catch(err){
        return res.json(err)
    }
}

export const login = async(req, res) => {
    
    const body = req.body;
    if(!body.username || !body.password) return res.status(400).json({message: "All fields are important"});

    try{
        const user = await User.findOne({username: body.username}).lean();
        if(!user) return res.status(404).json({message: "User not found!"});
        
        const passwordOk = bcrypt.compareSync(body.password, user.password);
        if(!passwordOk) return res.status(401).json({message: "wrong Username or Password!"});
        
        const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY)
        const {password, ...other} = user;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

    }catch(err){
        res.json(err)
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure: true}).status(200).json({message: "Logged out"})
}