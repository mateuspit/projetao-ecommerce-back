import { db } from "../database/database.connection.js";

function generateRandomNumber(randomNumbers, totalNumber) {
	let numeros = [];
	let i = 0;

	while (i < randomNumbers) {
		const num = Math.floor(Math.random() * totalNumber);
		if (!numeros.includes(num)) {
			numeros.push(num);
			i++;
		}
	}

	return numeros;
}

export async function getAllProducts(req, res) {
	try {
		let productsQuantity = await db.collection("products").countDocuments();
		let randomNumbers = generateRandomNumber(4, productsQuantity);
		let data = await Promise.all(randomNumbers.map(async rn => {
            const result = await db.collection("products").find().skip(rn).limit(1).toArray();
            return result[0];
          }));
        res.send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

export async function getProduct(req, res) {
	try {
		const id = req.params;
		let data = await db.collection("products").findOne({ _id: id });
		if (!data) return res.status(404).send("Product not found!");
		data = data.slice(0, 20);
		res.send(data);
	} catch (error) {
		res.status(500).send(error.message);
	}
}
