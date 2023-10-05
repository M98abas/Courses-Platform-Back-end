function handleHttpError(err: any, req: any, res: any, next: any) {
  let statusCode = 500; // Default to Internal Server Error
  let errorMessage = "Internal Server Error";

  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    errorMessage = "Unauthorized";
  } else if (err.name === "ForbiddenError") {
    statusCode = 403;
    errorMessage = "Forbidden";
  } else if (err.name === "BadRequestError") {
    statusCode = 400;
    errorMessage = "Bad Request";
  } else if (err.name === "TooManyRequestsError") {
    statusCode = 429;
    errorMessage = "Too Many Requests";
  } else if (err.name === "InternalServerError") {
    statusCode = 500;
    errorMessage = "Internal Server Error";
  } else if (err.name === "BadGatewayError") {
    statusCode = 502;
    errorMessage = "Bad Gateway";
  } else if (err.name === "ServiceUnavailableError") {
    statusCode = 503;
    errorMessage = "Service Unavailable";
  } else if (err.name === "GatewayTimeoutError") {
    statusCode = 504;
    errorMessage = "Gateway Timeout";
  } else if (err.name === "NotImplementedError") {
    statusCode = 501;
    errorMessage = "Not Implemented";
  }

  res.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  });
}

export default handleHttpError;
