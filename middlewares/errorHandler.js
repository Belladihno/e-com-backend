import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.keys(err.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// development error handler
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
// production error handler
const sendErrorProd = (err, res) => {
  //for errors we expect
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // for unexpected errors
  } else {
    console.error("ERROR", err);
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went wrong",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
      error.isOperational = true;
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
      error.isOperational = true;
    }
    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
      error.isOperational = true;
    }
    sendErrorProd(error, res);
  }
};

export default errorHandler;
