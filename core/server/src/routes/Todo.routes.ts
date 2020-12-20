import { Router } from 'express'
import httpStatusCode from 'http-status-codes'

import { TodoModel, TodoSchema }  from './../schemas/Todo.schema'
import logger from '../shared/Logging'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const {error, value} = TodoSchema.validate(req.body)

        if(error) {
            return res.status(httpStatusCode.BAD_REQUEST).json(error)
        }

        const Todo = new TodoModel(value)
        const todo = await Todo.save()

        res.status(httpStatusCode.CREATED).json(todo)
    } catch(err) {
        logger.error(JSON.stringify(err))
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json()
    }
})

export default router