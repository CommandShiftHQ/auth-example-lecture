import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { attemptLogin, fetchHash } from "../utils/fakeLogin"
import Header from "./Header"
import jwtDecode from "jwt-decode"
import Cookie from "js-cookie"
import bcrypt from "bcryptjs"
import hashPassword from "../utils/hashPassword"

import AuthContext from "../utils/AuthContext"

const Login = () => {
    const [details, setDetails] = useState({ username: "", email: "", password: "" })
    const [hashedPassword, setHashedPassword] = useState("")
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [error, setError] = useState(null)
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (hashedPassword) submitAuth()
    })

    const handleChange = ({ target: { value, id } }) => {
        setDetails(prev => ({ ...prev, [id]: value }))
    }

    const handlePasswordGenChange = (e) => {
        const pass = hashPassword(e.target.value)
        setGeneratedPassword(pass)
    }

    async function submitAuth() {
        const credentials = {
            username: details.username,
            email: details.email,
            password: hashedPassword
        }
        const res = attemptLogin(credentials)
        if (res.error) {
            setError(res.error)
        } else {
            const currentUser = jwtDecode(res.token)
            setUser(currentUser)
            setError(null)
            // expiry date is expressed in days. 1/24 == 1 hour expiry time
            Cookie.set("token", res.token, {expires: 1/24})
            navigate('/account')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const fetchHashResult = fetchHash(details.username, details.email)
        if (fetchHashResult.error) {
            setError(fetchHashResult.error)
        }  else {
            const correctHash = bcrypt.compareSync(details.password, fetchHashResult.hash)
            if (correctHash) {
                setHashedPassword(fetchHashResult.hash)
            } else {
                setError("Invalid credentials")
            }
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
            <div className="container">
                <label htmlFor="hashPassword">Password Hash Generator</label><br />
                <input id="hashPassword" type="text" onChange={handlePasswordGenChange} /><br />
                <div>Hashed Password: {generatedPassword}</div>
            </div>
        </div>
    )
}

export default Login