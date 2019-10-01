var responseGenerator = require('../common/response-generator')

/**
 * For handling errors globally throught the app
 * @param {error} err
 * @param {object} req
 * @param {object} res
 * @param {callback} next
 */
module.exports = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  console.log(err.message)
  res.status(err.status || 500)
  .send(
    responseGenerator.generateErrorResponse(err.message,err.stack)
  );
}