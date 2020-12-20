import Mongoose from 'mongoose'

import logger from './../shared/Logging'

const MONGO_HOST = String(process.env.MONGO_HOST)
const MONGO_PORT = Number(process.env.MONGO_PORT)
const MONGO_DATABASE = String(process.env.MONGO_DATABASE)
const MONGO_AUTH_DATABASE = String(process.env.MONGO_AUTH_DATABASE)
const MONGO_AUTH_USERNAME = String(process.env.MONGO_AUTH_USERNAME)
const MONGO_AUTH_PASSWORD = String(process.env.MONGO_AUTH_PASSWORD)

export const MongoUrl = `mongodb://${MONGO_AUTH_USERNAME}:${MONGO_AUTH_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

export const MongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    authSource : MONGO_AUTH_DATABASE,
    autoIndex: false
}

logger.debug(`MongoUrl: ${MongoUrl}`)
logger.debug(`MongoOptions: ${JSON.stringify(MongoOptions, null, 2)}`)

export default Mongoose