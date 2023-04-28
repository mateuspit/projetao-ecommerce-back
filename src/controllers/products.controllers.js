import { db } from "../database/database.connection.js";

export async function getAllProducts(req, res) {
	try {
		let data = await db.collection("products").find().toArray();
		data = data.slice(0, 20);
		res.send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

export async function getProduct(req, res) {
	try {
		const id = req.params;
		if (!id) return res.status(422).send("Id format wrong!");
		let data = await db.collection("products").findOne({ id }).toArray();
		if (!data) return res.status(404).send("Product not found!");
		data = data.slice(0, 20);
		res.send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
}
