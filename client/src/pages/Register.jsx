import { Link } from "react-router-dom"

export default function Register() {
    return(
        <div className="auth">
            <h1>Register</h1>
            <form action="">
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button>Register</button>
                <p>This is an error!</p>
                <span>Do you have an account?<Link to="/login">Login</Link></span>
            </form>
            
        </div>
    )
}