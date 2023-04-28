// import db from "../database/database.connection";
// import { ObjectId } from "mongodb";
// import dayjs from "dayjs";

export async function handleCheckout(req, res) {
	// const sessionCollection = db.collection("session");
	// const historyCollection = db.collection("history");
	// const checkoutInfo = req.body;
	// const { session } = res.locals;

	// const date = dayjs().format("MMM D, YYYY h:mm A");

	try {
		// const { user } = sessionCollection.findOne({ _id: session.userId }).toArray()

		// purchesesCollection.insertOne({
		// 	userId: new ObjectId(session._id),
		// 	products: [{ productID, amount }],
		// 	cardInfo: checkoutInfo,
		// 	date,
		// });

		res.sendStatus(201);
	} catch (err) {
		res.sendStatus(500);
	}
}
