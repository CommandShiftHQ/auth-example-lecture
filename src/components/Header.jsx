import "../styles/header.css"
import { Link } from "react-router-dom"

import { useContext } from "react"
import AuthContext from "../utils/AuthContext"

const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="header">
            {user?.username}
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}

export default Header