import {Link, useLocation, useNavigate} from "react-router-dom"
import Delete from "../images/delete.png"
import Edit from "../images/edit.png"
import Menu from "../components/Menu"
import {useState, useEffect, useContext} from "react"
import {AuthContext} from "../context/authContext.jsx"
import moment from "moment"
import axios from "axios"


export default function Single() {
    const [post, setPost] = useState({});
      const {currentUser} = useContext(AuthContext);
      const postId = useLocation().pathname.split("/")[2];// check ther should be an error instead use 1
      const navigate = useNavigate();
      useEffect(() => {
        async function fetchPost () {
            try{
                const res = await axios.get(`http://localhost:8000/api/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.error(err)
            }
        };
        fetchPost();
      }, [postId]);

      const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${postId}`);
            navigate("/")
        }catch(err) {
            console.log(err)
        }
      }

    return(
        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
                <div className="user">
                    {post.uid.img && <img src={post.uid.img} alt="" />}
                    <div className="info">
                        <span>{post.uid.username}</span>
                        <p>posted {moment(post.createdAt).fromNow()}</p>
                    </div>
                    {post.uid.username === currentUser.username && ( <div className="edit">
                        <Link to={`/write?edit=2`} state={post}><img src={Edit} alt="edit" /></Link>
                        <img onClick={handleDelete} src={Delete} alt="delete" />
                    </div>)}
                </div>
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
            </div>
            <div className="menu">
                <Menu cat={post.cat} />   
            </div>
        </div>
    )
}