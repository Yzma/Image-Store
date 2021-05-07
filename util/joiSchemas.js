
import Joi from "joi";

const CLEAN_NAME_REGEX = /^[a-zA-Z0-9\-]+$/

const VALID_LABEL_NAME = Joi.string()
                .pattern(CLEAN_NAME_REGEX, { name: 'Valid Image Name Regex' })
                .min(1)
                .max(30)

export const imageSchema = Joi.object({
    title: VALID_LABEL_NAME
        .alter({
            create: (schema) => schema.required(),
            update: (schema) => schema.optional()
        }),

    description: Joi.string()
        .max(150)
        .alter({
            create: (schema) => schema.optional(),
            update: (schema) => schema.optional(),
        }),

    private: Joi.boolean()
        .alter({
            create: (schema) => schema.optional(),
            update: (schema) => schema.optional(),
        }),
});

export const userBalanceSchema = Joi.object({
    balance: Joi.number()
        .greater(0)
        .less(1000)
});
