const winston = require('winston');
const rotate = require('winston-daily-rotate-file');
const config = require('../config/config.dev');
const fs = require('fs');

const dir = config.logFileDir;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


let logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
        }),
        new winston.transports.DailyRotateFile({
            filename: config.logFileName,
            dirname: config.logFileDir,
            maxsize: 20971520, //20MB
            maxFiles: 25,
            datePattern: '.dd-MM-yyyy'
        })
    ]
});

exports.logger;