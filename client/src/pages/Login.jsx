import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import {useContext} from "react"
import { AuthContext } from "../context/authContext.jsx"

export default function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        
        try{
            await login(inputs);
            navigate("/")
        }
        catch(err){
            setError(err.response.data.message)
        }
    }

    return(
        <div className="auth">
            <h1>Login</h1>
            <form action="">
                <input type="text" name="username" placeholder="username" onChange={handleChange} />
                <input type="password" name="password" placeholder="password" onChange={handleChange} />
                <button onClick={handleClick} >Login</button>
                {err && <p>{err}</p>}
                <span>Don't you have an account?<Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}