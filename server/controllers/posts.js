import User from "../model/user.js"
import Posts from "../model/posts.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config(); 

export const getPosts = async (req, res) => {
    try{
        const cat = req.query.cat;
        const query = {};

        if(cat) {
            query.cat = cat;
        }

        const response = await Posts.find(query).lean();
        return res.status(200).json(response);
    }catch(err) {
        console.error(err);
        return res.status(500).json("Server error")
    }
}

export const getPost = async (req, res) => {
    try{
        const postId = req.params.id;
        console.log(postId)
        const data = await Posts.findOne({_id: postId}).populate('uid').exec();
        return res.status(200).json(data)
    } catch (err) {
        console.error(err)
        return res.json(err)
    }
}

export const addPost = async (req, res) => {
    try{
        const token = req.cookie.access_token;
        if(!token) return res.status(401).json({message: "Not authenticated"});

        jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
            if(err) return res.status(403).json({message: "Token is invalid"});
            const data = await Posts.create({
                title: req.body.title, 
                desc: req.body.desc, 
                img: req.body.img, 
                cat: req.body.cat,
                uid: userInfo._id
            });
            res.status(200).json({message: "Post has been created."});
        });
        
    }catch(err) {
        res.json(err);
    }
}

export const updatePost = async (req, res) => {
    try{
        const token = req.cookie.access_token;
        if(!token) return res.status(401).json({message: "Not authenticated"});

        jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
            if(err) return res.status(403).json({message: "Token is invalid"});

            const data = await Posts.findOneAndUpdate({
                _id: req.params.id,
                uid: userInfo._id,
            },{$set:{
                title: req.body.title, 
                desc: req.body.desc, 
                img: req.body.img, 
                cat: req.body.cat,
            }},
            {new: true, runValidators: true});

            res.status(200).json({message: "Post has been updated."});
        });
        
    }catch(err) {
        res.json(err);
    }
}

export const deletePost = async (req, res) => {
    try{
        const token = req.cookie.access_token;
        if(!token) return res.status(401).json({message: "Not authenticated"});

        jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
            if(err) return res.status(403).json({message: "Token is invalid"});
            try{
                const data = await Posts.deleteOne({_id: req.params.id, uid: userInfo._id})
                res.status(200).json({message: "succesfully deleted"});
            }catch(err){
                res.status(403).json({message: "you can delete only your post!"})
            }
            
        } )
    }catch(err) {
        res.json(err)
    }
}


