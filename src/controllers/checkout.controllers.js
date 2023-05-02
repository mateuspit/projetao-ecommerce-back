import { db } from "../database/database.connection.js";
// import { ObjectId } from "mongodb";

export async function handleCheckout(req, res) {
	const historyCollection = db.collection("history");
	const checkoutInfo = req.body;

    //middlewares usando schemas em routes filtra a entrada

	checkoutInfo.userID = res.locals.session.userID;

	checkoutInfo.timestamp = new Date();

	try {
		const result = await historyCollection.insertOne(checkoutInfo);
		if (!result) return res.status(409).send("Erro ao registrar compra");
		res.sendStatus(201);
	} catch (err) {
		console.error("Erro ao inserir informações de checkout:", err);
		res.sendStatus(500);
	}
}
