import Router from 'express'

import todo from './Todo.routes'

const router = Router()

router.use('/todo', todo)

export default router