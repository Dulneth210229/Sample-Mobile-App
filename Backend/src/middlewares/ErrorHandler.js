const errorHandler = (err, req, res, next) => {
  //Error property contains the error message that has been thrown
  const statusCode = res.statusCode == 200 ? 401 : res.statusCode;

  res.statusCode(statusCode);
  res.json({
    message: err.message,
    stack: err.stack, //* --> Stack contains file that the error is going to be occurred
  });
};
module.exports = errorHandler;
