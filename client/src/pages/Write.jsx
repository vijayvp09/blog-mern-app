import ReactQuill from 'react-quill';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'

export default function Write() {
    const [value, setValue] = useState('');
    return(
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" />
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
                    <input style={{display: "none"}}type="file" id="file"  />
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as draft</button>
                        <button>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type="radio" id="art" value="art" name="cat" />
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="cinema" value="cinema" name="cat" />
                    <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="science" value="science" name="cat" />
                    <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="technology" value="technology" name="cat" />
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="food" value="food" name="cat" />
                    <label htmlFor="food">Food</label>
                    </div>
                    <div className="cat">
                    <input type="radio" id="design" value="design" name="cat" />
                    <label htmlFor="design">Design</label>               
                    </div>
                </div>
            </div>
        </div>
    )
}