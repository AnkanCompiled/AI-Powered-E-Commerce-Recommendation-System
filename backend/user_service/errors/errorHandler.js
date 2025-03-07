export default function errorHandler(err, req, res, next) {
  console.error(`User service error: ${err}`);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Internal Server Error",
  });
}
