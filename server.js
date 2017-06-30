var fs = require('fs');
var logpath ='./server.log';

var access = fs.createWriteStream(logpath);
process.stdout.write = process.stderr.write = access.write.bind(access);

process.on('uncaughtException', function(err) {
 	console.error((err && err.stack) ? err.stack : err);
});

var bot = require("discord-music-bot");
var express = require('express');
var rl = require('readline');

var httpServer = express();

var serverName = "Les Lyth";
var textChannelName = "robots";
var voiceChannelName = "Music";
var aliasesFile = "alias.txt";
var botToken = "MzMwMTgwNTYwNjQxMDY0OTcx.DDdQJw.UuZ6j-jIqQkWZ8fBAYEqWbVeeKo";


httpServer.set('port', (process.env.PORT || 5000));
httpServer.use(express.static(__dirname + '/public'));

function logToJson(logfile, callback){
    var ret = '';
    var linereader = rl.createInterface({
        input: fs.createReadStream('./server.log')
    });

    linereader.on('line', function(line){
        ret += line + '\n';
    });

    linereader.on('close', function(){
        callback(ret);
    });
}

httpServer.get('/log', function(req, res, cb){
    logToJson(logpath, function(result){
        res.writeHeader(200, {"Content-type":"text/html"});
        res.write(result);
        res.end();

        return cb();
    });
});

httpServer.listen(httpServer.get('port'), function(){
	console.log("Web server is listening on: %s", httpServer.get('port'));
});

bot.setYoutubeKey("AIzaSyC3k9Qc4_XsYJdadZq0a3jq68UYmzr3FZ4");
bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);