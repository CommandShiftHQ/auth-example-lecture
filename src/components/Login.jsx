import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import fakeLogin from "../utils/fakeLogin"
import Header from "./Header"
import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"

import AuthContext from "../utils/AuthContext"

const Login = () => {
    const [details, setDetails] = useState({ username: "", email: "", password: "" })
    const [error, setError] = useState(null)
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = ({ target: { value, id } }) => {
        setDetails(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        /* Normally the password (in details) would be hashed with bcrypt
        This example uses hardcoded data without the backend but you must always
        remember to hash your passwords before sending them to the backend */
        const res = fakeLogin(details)
        if (res.error) {
            setError(res.error)
        } else {
            const currentUser = jwtDecode(res.token)
            console.log(currentUser, "<-- currentUser")
            setUser(currentUser)
            setError(null)
            // expiry date is expressed in days. 1/24 == 1 hour expiry time
            Cookie.set("token", res.token, {expires: 1/24})
            navigate('/account')
        }
    }

    return (
        <div>
            <Header />
            <p className="center">Please enter your details below to login</p>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label><br />
                    <input id="username" onChange={handleChange} /><br />
                    <label htmlFor="email">Email</label><br />
                    <input id="email" onChange={handleChange} /><br />
                    <label htmlFor="password">Password</label><br />
                    <input id="password" type="password" onChange={handleChange} /><br />
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login