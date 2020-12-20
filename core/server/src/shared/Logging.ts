import winston from 'winston'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
            )
        })
    ]
})

export const requestLogger = { write : (message : string) => logger.info(message) }

export default logger