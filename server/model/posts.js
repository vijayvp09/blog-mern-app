import mongoose, { Schema } from 'mongoose'
import User from './user.js'

const postSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    cat: {type: String},
    uid: {type: mongoose.Schema.Types.ObjectId, ref: User}
});


const Posts = mongoose.model('Posts', postSchema);

export default Posts;