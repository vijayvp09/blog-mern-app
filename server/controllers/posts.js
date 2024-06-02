import User from "../model/user.js"
import Posts from "../model/posts.js"

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
        const postId = req.params;
        console.log(postId)
        const data = await Posts.findOne({_id: postId}).populate('uid').exec();
        return res.status(200).json(data)
    } catch (err) {
        console.error(err)
        return res.json(err)
    }
}

export const addPost = (req, res) => {
    res.json()
}

export const updatePost = (req, res) => {
    res.json()
}

export const deletePost = (req, res) => {
    res.json()
}


