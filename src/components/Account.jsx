import "../styles/account.css"
import Cookie from "js-cookie"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

import { useContext } from "react"
import AuthContext from "../utils/AuthContext"

const Account = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleClick = () => {
        Cookie.remove("token")
        setUser(null)
        navigate("/")
    }
    return (
        <div>
            <Header />
            <h1 className="center">My Account</h1>
            <div className="container">
                <p>Welcome {user.username}!</p>
                <p>Here are your current details</p>
                <ul>
                    <li className="account__user-item">username: <b>{user.username}</b></li>
                    <li className="account__user-item">email: <b>{user.email}</b></li>
                </ul>
                <button className="account__button" onClick={handleClick}>Logout</button>
            </div>
        </div>
    )
}

export default Account