import jwt from "jsonwebtoken"

const validUser = [
    {
        username: "Ben",
        email: "ben.s@builtbypixel.com",
        password: "supermelon"
    },
    {
        username: "testUser",
        email: "test@email.com",
        password: "$2a$10$DgcGIvOKIWoMzhKPznDGs.jMW5hUDqJKTleN7coAXrv3cZmpql7sa"
    }
]

export const attemptLogin = (details) => {
    const isUser = validUser.find((user) => {
        return (
            user.username === details.username &&
            user.email === details.email &&
            user.password === details.password
        )
    })
    if (isUser) {
        const token = jwt.sign({
            email: details.email,
            username: details.username
        },
            process.env.REACT_APP_KEY
        )
        return { token: token }
    } else {
        return { error: "details are incorrect" }
    }
}

export const fetchHash = (username, email) => {
    const foundUser = validUser.find((user) => {
        return (
            user.username === username &&
            user.email === email
        )
    })
    if (foundUser) {
        return { hash: foundUser.password }
    } else {
        return { error: "Credentails are invalid" }
    }
}
