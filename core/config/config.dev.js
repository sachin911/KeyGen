const path = require('path');

let config = {};
config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
// config.dbHost = process.env.dbHost || 'localhost';
// config.dbPort = process.env.dbPort || '27017';
// config.dbName = process.env.dbName || 'trains';
config.serverPort = process.env.serverPort || 3001;

module.exports = config;