var responseGenerator = require('../common/response-generator')

module.exports = function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  console.log(err.stack)
  res.status(err.status || 500)
  .send(
    responseGenerator.generateErrorResponse(err.message,err.stack)
  );
}