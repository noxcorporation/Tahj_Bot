var bot = require("discord-music-bot");
var logger = require("./lib/logger.js");
var express = require('express');
var fs = require('fs');
var rl = require('readline');

var httpServer = express();

var logpath ='./server.log';

var serverName = "Les Lyth";
var textChannelName = "robots";
var voiceChannelName = "Music";
var aliasesFile = "alias.txt";
var botToken = "MzMwMTgwNTYwNjQxMDY0OTcx.DDdQJw.UuZ6j-jIqQkWZ8fBAYEqWbVeeKo";


httpServer.set('port', (process.env.PORT || 5000));
httpServer.use(express.static(__dirname + '/public'));

function logToJson(logfile, callback){
    var ret = [];
    var linereader = rl.createInterface({
        input: fs.createReadStream('./server.log')
    });

    linereader.on('line', function(line){
        ret.push(JSON.parse(line));
    });

    linereader.on('close', function(){
        callback(JSON.stringify(ret, null, 2));
    });
}

httpServer.get('/log', function(req, res, cb){
    logToJson(logpath, function(result){
        res.writeHeader(200, {"Content-type":"application/json"});
        res.write(result);
        res.end();

        return cb();
    });
});

bot.setYoutubeKey("AIzaSyC3k9Qc4_XsYJdadZq0a3jq68UYmzr3FZ4");
bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);