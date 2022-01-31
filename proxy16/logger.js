const winston = require('winston');
const Transport = require('winston-transport');
const { format } = winston;
const { combine, label, json, timestamp, prettyPrint, printf } = format;
var _ = require('underscore')
var f = require('./functions');
var fs = require('fs');

class wsstransport extends Transport {
    constructor(opts) {
      super(opts);
      
      this.logger = opts.logger

    }
   
    log(info, callback) {
      setImmediate(() => {
        this.emit('logged', info);
      });

      if(this.logger.app)
         this.logger.app.wss.sendlogs(info)
      
      callback();
    }
};

winston.addColors({
    foo: 'blue',
    bar: 'green',
    baz: 'yellow',
    foobar: 'red'
});

var Logger = function(_loggers){

    var self = this
    var loggers = _loggers
    var level = 'warn'
    var writelogs = false

    self.app = null

    self.setlevel = function(_level){

        level = _level

        _.each(loggers, function(key){
            var logger = winston.loggers.get(key)

            if(logger) logger.level = level
        })
    }

    self.getlevel = function(){
        return level
    }

    self.setapp = function(app){
        self.app = app
    }

    var transports = function(key){

        var tr = [
            new winston.transports.Console({}),
            new wsstransport({ logger : self })
        ]

        if(writelogs){
            tr.push(
                new winston.transports.File({ 
                    filename: f.path('logs/'+key+'.log'),
                    maxsize: 5242880, 
                    maxFiles: 5,
                })
            )
        }

        return tr

    }

    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      });

    self.w = function(key, level, message, meta){

        var l = winston.loggers.get(key)
        if (l) l.log({level, message, meta})

    }

    self.prepare = function(){
        
        if(global.WRITE_LOGS){
            try{
                if(!fs.existsSync(f.path('logs'))){
                    fs.mkdirSync(f.path('logs'))
                }
    
                writelogs = true
            }
            catch(e){
                console.log("E", e)
                writelogs = false
            }
        }

        if (global.LOG_LEVEL) {
            self.setlevel(global.LOG_LEVEL);
        }
        
    }

   

    self.init = function(){

        self.prepare()

        console.log('writelogs', writelogs, global.WRITE_LOGS)

        _.each(loggers, function(key){

            var logger = winston.loggers.add(key, { 

                level : level,
                
                format: combine(
                    winston.format.colorize(),
                    label({ label: key }),
                    timestamp(),
                    prettyPrint(),
                    myFormat
                ),
        
                transports: transports(key),
            });

            if (writelogs)
                logger.exceptions.handle(
                    new winston.transports.File({ filename: f.path('logs/exceptions.log') })
                );
        })

        return self

    }

    return self

}

module.exports = Logger;

