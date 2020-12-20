import Joi from 'joi'
import joigoose from 'joigoose'
import Mongoose from 'mongoose'

import { v4 as uuid } from 'uuid'

const Joigoose = joigoose(Mongoose)

export const TodoSchema = Joi.object({
    _id : Joi.string()
        .guid({ version : "uuidv4" })
        .meta({ _mongoose : { default: () => uuid() } }),
    benutzerId: Joi.string()
        .guid({ version : "uuidv4" })
        .required(),
    aufgabe: Joi.string()
        .required()
        .min(8)
})

export const TodoMongooseSchema = Joigoose.convert(TodoSchema)

export const TodoModel = Mongoose.model('Todo', TodoMongooseSchema)