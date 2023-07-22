//standard template don't worry if you do not get it

const { createLogger, format, transports, loggers } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message,timestamp,error}) => {
    return `${timestamp} ${level}: ${message} ${error}`;
});

const Logger= createLogger({
    format:combine(
        timestamp({format: 'YYYY-MM-DD HH-mm-ss'}),
        customFormat
    ),
    transports:[
        new transports.Console(),//if you will use winston then it will only print in the console
        new transports.File({filename: 'combined.log'})//all the files combine at  the one log file
    ],
});

module.exports=Logger;
  
