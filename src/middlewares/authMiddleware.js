import {db} from "../database/database.connection.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.status(401).send("Informe o token!");

    try {
        // code
        next()
    } catch (err) {
        res.sendStatus(500)
    }
}