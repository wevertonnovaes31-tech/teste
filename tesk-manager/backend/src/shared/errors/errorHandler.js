export default function errorHandler(err, req, res, next) {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            details: err.details
        })
    }

    console.log(err)

    return res.status(500).json({
        error: 'InternalServerError',
        message: 'Erro interno do servidor'
    })
}