import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
        console.log(error);
        const statusCode = error || StatusCodes.INTERNAL_SERVER_ERROR;
        const msg = error.message || "Algo deu errado!";
        res.status(500).json({msg});
    };


export default errorHandlerMiddleware;