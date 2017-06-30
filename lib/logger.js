var winston = require('winston'),
    logger = new winston.Logger({
        level: 'info',
        transports: [
            new (winston.transports.Console)({
                level: 'silly',
                timestamp: function(){
                    var now = new Date(Date.now());
                    return now.toISOString();
                },
                formatter: function(options){
                    return options.timestamp() +' ['+ options.level.toUpperCase() +'] '+ (options.message ? options.message : ''); 
                }
            }),
            new (winston.transports.File)({ filename : 'server.log' })
        ]
    });

module.exports = logger;