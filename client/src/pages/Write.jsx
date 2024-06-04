import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

export default function Write() {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc ||'');
    const [title, setTitle] = useState(state?.title ||'');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat ||'');
    const navigate = useNavigate();

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch(err) {
            console.log(err)
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try{
            state 
                ? await axios.put(`http://localhost:8000/api/posts/${state.id}`,{
                    title, 
                    desc: value, 
                    cat, 
                    img: file ? imgUrl : "",
                  })
                : await axios.post(`http://localhost:8000/api/posts/`,{
                    title, 
                    desc: value, 
                    cat, 
                    img: file ? imgUrl : "",
                });
                 navigate("/");

        }catch(err) {
            console.log(err)
        }
    }
    return(
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
                <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input style={{display: "none"}}type="file" id="file"  onChange={e=>setFile(e.target.files)} />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as draft</button>
                        <button onClick={handleClick}>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type="radio" checked={cat === "art"} id="art" value="art" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "cinema"} id="cinema" value="cinema" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "science"} id="science" value="science" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "technology"} id="technology" value="technology" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "food"} id="food" value="food" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="food">Food</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "design"} id="design" value="design" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="design">Design</label>               
                    </div>
                </div>
            </div>
        </div>
    )
}