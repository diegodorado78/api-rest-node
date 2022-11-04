function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err); //llega a otro middleware de tipo error
}
function errorHandler(err, req, res, next) {
  //asi no use next debo ponerla pq es un middle tipo error y necesita los 4 params
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
