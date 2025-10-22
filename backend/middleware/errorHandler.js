export const notFound = (req, res, next) => {
  // console.log(req);
  const error = new Error(`Not Founded - ${req.originalUrl}`);
  res.status(404); // if not setting status, the default is 200, and that is not expected for error if not found
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If the response status is still 200 (OK) when we reach this error handler,that means something went wrong — but nobody set an error status yet — so let’s change it to 500 (Internal Server Error).
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
