import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = error.message || "Algo deu errado!";
  res.status(statusCode).json({ msg });

  //res.status(statusCode).json({ msg });
  //res.status(error.statusCode).json({ msg });
};


export default errorHandlerMiddleware;