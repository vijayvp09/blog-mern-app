import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, requried: true},
    img: {type: String},
});

const User = mongoose.model('User', userSchema);

export default User;

