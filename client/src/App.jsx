import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"


const Layout = () => {
  return(<>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

function App() {
   const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/post/:id",
          element: <Single />
        },
        {
          path: "/write",
          element: <Write />
        }
      ]
    }
   ]); 
  

  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router}></RouterProvider>
      </div>
    </div>

  )
}

export default App
