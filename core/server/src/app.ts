require('dotenv').config()

import http from 'http'

import express from 'express'
import bodyParser from'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'

import { default as logger, requestLogger } from './shared/Logging'
import Mongoose, { MongoUrl, MongoOptions } from './repos/Database'
import routes from './routes'

const APP_NAME = process.env.APP_NAME
const HTTP_BIND : string = String(process.env.HTTP_BIND)
const HTTP_PORT : number = Number(process.env.HTTP_PORT)

const todoApp = express()

todoApp.use(helmet())
todoApp.use(bodyParser.json())

todoApp.use(morgan('combined', { stream : requestLogger }))

todoApp.use('/api', routes)

const startHttpServer = function (http : http.Server) : Promise<void>  {
    return new Promise((resolve, reject) => {
        try {
            http.listen(HTTP_PORT, HTTP_BIND, () => {
                logger.info(`APP: http://${HTTP_BIND}:${HTTP_PORT} listening`)
                resolve()
            })
        } catch(err) {
            reject(err)
        }
    })
}

const startApp = () => new Promise<void>(async (resolve, reject) => {
    try {
        await Mongoose.connect(MongoUrl, MongoOptions)
        logger.info("DB: DB connected")
        await startHttpServer(http.createServer(todoApp)).catch()
        logger.info("HTTP: Server started")
        resolve()
    } catch(err) {
        if(err instanceof Object) {
            reject(JSON.stringify(err, null, 2))
        } else {
            reject(err)
        }
    }
})

startApp().catch(logger.error)

// export default todoApp
