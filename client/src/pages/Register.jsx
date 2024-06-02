import { Link, useNavigate } from "react-router-dom"
import {useState} from "react"
import axios from "axios"

export default function Register() {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const [err, setError] = useState(null);

    function handleChange(e) {
        setInput((prev)=> ({...prev, [e.target.name]: e.target.value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try{
        const res = await axios.post("/auth/register", input)
        navigate("/login")
        }
        catch(err){
            setError(err.response.data.message);
        }
    }

    return(
        <div className="auth">
            <h1>Register</h1>
            <form >
                <input type="text" name="username" placeholder="username" onChange={handleChange} />
                <input type="email" name="email" placeholder="email" onChange={handleChange} />
                <input type="password" name="password" placeholder="password" onChange={handleChange} />
                <button onClick={handleSubmit} >Register</button>
                {err && <p>{err}</p>}
                <span>Do you have an account?<Link to="/login">Login</Link></span>
            </form>
            
        </div>
    )
}