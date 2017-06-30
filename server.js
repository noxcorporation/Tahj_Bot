var bot = require("discord-music-bot");

var serverName = "Les Lyth";
var textChannelName = "robots";
var voiceChannelName = "Music";
var aliasesFile = "alias.txt";
var botToken = "MzMwMTgwNTYwNjQxMDY0OTcx.DDdQJw.UuZ6j-jIqQkWZ8fBAYEqWbVeeKo";

bot.setYoutubeKey("AIzaSyC3k9Qc4_XsYJdadZq0a3jq68UYmzr3FZ4");
bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);