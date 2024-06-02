import {Link, useLocation} from "react-router-dom"
import Delete from "../images/delete.png"
import Edit from "../images/edit.png"
import Menu from "../components/Menu"
import {useState, useEffect, useContext} from "react"
import {AuthContext} from "../context/authContext.jsx"
import moment from "moment"
import axios from "axios"


export default function Single() {
    const [post, setPost] = useState({
        id: 4,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
        createdAt: new Date(),
        img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        uid: {
            img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            username: "vija"
        }
      });
      const {currentUser} = useContext(AuthContext);
      const postId = useLocation().pathname.split("/")[1];// check ther should be an error instead use 1
      
      useEffect(() => {
        async function fetchPost () {
            try{
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.error(err)
            }
        };
        fetchPost();
      }, [postId]);

    return(
        <div className="single">
            <div className="content">
                <img src={post.img} alt="" />
                <div className="user">
                    <img src={post?.uid.img} alt="" />
                    <div className="info">
                        <span>{post.uid.username}</span>
                        <p>posted {moment(post.createdAt).fromNow()}</p>
                    </div>
                    {post.uid.username === currentUser.username && ( <div className="edit">
                        <Link><img src={Edit} alt="edit" /></Link>
                        <img src={Delete} alt="delete" />
                    </div>)}
                </div>
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
            </div>
            <div className="menu">
                <Menu />   
            </div>
        </div>
    )
}