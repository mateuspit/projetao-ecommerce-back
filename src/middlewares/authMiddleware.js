import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");

	if (!token) return res.status(401).send("Informe o token!");

	try {
		const userSession = await db.collection("sessions").findOne({ token });
		if (!userSession) return res.status(404).send("Sem permissão");

		res.locals.session = userSession;

		next();
	} catch (err) {
		return res.sendStatus(500);
	}
}
