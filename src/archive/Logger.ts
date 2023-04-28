import { LoggerOptions, createLogger as createWinstonLogger } from "winston"
import Tom5 from "../classes/Tom5"

export function createLogger(options?: LoggerOptions, client?: Tom5) {

    const Logger = createWinstonLogger(
        {
            handleExceptions: options?.handleExceptions ? true,
            handleRejections: options?.handleRejections ? true,
            exitOnError: false
        }
    )
}