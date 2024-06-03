import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'
import { set } from 'mongoose';

export default function Write() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState('');

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
        } catch(err) {
            console.log(err)
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
        upload();
    }
    return(
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
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
                    <input type="radio" id="art" value="art" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="cinema" value="cinema" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="science" value="science" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="technology" value="technology" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="food" value="food" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="food">Food</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="design" value="design" name="cat" onChange={e=>setCat(e.target.value)} />
                    <label htmlFor="design">Design</label>               
                    </div>
                </div>
            </div>
        </div>
    )
}