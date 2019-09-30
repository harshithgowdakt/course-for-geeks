`use strict`
const PropertiesReader = require('properties-reader');
const path = require('path')
const responseMessages = PropertiesReader(path.join(__dirname,'../config/response-message.properties'));
const errorMessages = PropertiesReader(path.join(__dirname,'../config/error-message.properties'));

module.exports.generateSuccessResponse = function(data, msgKey){
  return {
    data: data,
    message: responseMessages.get(msgKey),
    timestamp : new Date()
  }
}

module.exports.generateErrorResponse = function(msg, debug){
  return {
    message: msg,
    debug : debug,
    timestamp : new Date()
  }
}

module.exports.generateError = function(msgKey, status){
  let error = new Error(errorMessages.get(msgKey));
  error.status = status;
  return error;
}