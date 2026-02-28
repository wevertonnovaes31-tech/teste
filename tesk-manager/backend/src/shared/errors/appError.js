export default class AppError extends Error {
    constructor(message, statusCode = 400, details = null) {
        super(message)

        this.name = 'AppError'
        this.statusCode = statusCode
        this.details = details
        this.isOperational = true

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}