const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}.json`);

/**
 * Used for exporting config globally based on Environment
 */
module.exports = config;
