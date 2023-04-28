import joi from "joi";

export const checkoutSchema = joi.object({
	amount: joi.number().min(1).required(),
	cpf: joi.string().required(),
	cardName: joi.string().required(),
	cardNumber: joi.string().creditCard().required(),
	expirationDate: joi.date().required(),
	cardCVC: joi.string().min(3).required(),
});
