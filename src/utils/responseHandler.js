const StatusCodes = require('http-status-codes');
const CustomError = require('./errorHandler');

const send = (err, req, res, data) => {
    if (err) {
        let errorResponse = buildErrorResponse(err);
        res.status(errorResponse.statusCode).send(errorResponse);
    } else if (!err && !data) {
        res.status(StatusCodes.NO_CONTENT).json();
    } else {
        res.status(StatusCodes.OK).send(data);
    }
}

const buildErrorResponse = (error) => {
    let errorRes = {}

    switch (true) {
        case (error instanceof CustomError):
            errorRes.statusCode = error.statusCode;
            errorRes.message = error.message;
            break;
        case (error instanceof ReferenceError):
            errorRes.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            errorRes.message = error.message;
            break;
    }

    return errorRes;
}

module.exports = { send }