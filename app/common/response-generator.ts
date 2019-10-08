import * as path from 'path'
import PropertiesReader from 'properties-reader'

const responseMessages = PropertiesReader(path.join(__dirname, '../config/response-message.properties'));
const errorMessages = PropertiesReader(path.join(__dirname, '../config/error-message.properties'));

export default class ResponseGenerator {
    public static generateSuccessResponse(data, msgKey) {
        return {
            data: data,
            message: responseMessages.get(msgKey),
            timestamp: new Date()
        }
    }

    public static generateErrorResponse(msg, debug) {
        return {
            message: msg,
            debug: debug,
            timestamp: new Date()
        }
    }

    public static generateError(msgKey, status) {
        let error = <any>new Error(errorMessages.get(msgKey));
        error.status = status;
        return error;
    }
}
