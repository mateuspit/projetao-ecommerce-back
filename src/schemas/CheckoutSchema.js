import joi from "joi";

export const checkoutSchema = joi.object({
	cardName: joi.string().trim().min(3).max(100).required().messages({
		"string.min": "O nome do cartão deve ter pelo menos 3 caracteres.",
		"string.max": "O nome do cartão deve ter no máximo 100 caracteres.",
		"any.required": "O nome do cartão é obrigatório.",
	}),
	cardNumber: joi.string().trim().length(16).creditCard().required().messages({
		"string.length": "O número do cartão deve ter exatamente 16 dígitos.",
		"string.creditCard": "O número do cartão de crédito é inválido.",
		"any.required": "O número do cartão é obrigatório.",
	}),
	expirationDate: joi
		.string()
		.trim()
		.regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
		.required()
		.messages({
			"string.pattern.base":
				"A data de validade deve estar no formato MM/AA ou MM/AAAA.",
			"any.required": "A data de validade é obrigatória.",
		}),
	cardCVC: joi
		.string()
		.trim()
		.length(3)
		.regex(/^[0-9]{3}$/)
		.required()
		.messages({
			"string.length": "O CVC deve ter exatamente 3 dígitos.",
			"string.pattern.base": "O CVC deve conter apenas números.",
			"any.required": "O CVC é obrigatório.",
		}),
});
