import { useState, createContext, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (input) => {
        const response = await axios.put("http://localhost:8000/api/auth/login", input);
        setCurrentUser(response.data);
    }

    const logout = async () => {
        const response = await axios.put("http://localhost:8000/api/auth/logout");
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{login, logout, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}