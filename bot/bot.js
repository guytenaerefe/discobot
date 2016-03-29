require('dotenv').config();
var Discord = require("discord.js");
var omdbWrapper = require('./omdb_wrapper');
var stackWrapper = require('./stackexchange_wrapper');
 
discoBot = new Discord.Client();
discoBot.on('debug', (m) => console.log('[debug]', m));
discoBot.on('warn', (m) => console.log('[warn]', m));

discoBot.on('message', function(message){
    // TODO: slice into array and case switch
    if (message.content === "quit") {
        discoBot.reply(message, 'ok bye');
        process.exit();
    } else if (message.content === 'what did you say') {
        // NONSENSE
        discoBot.reply(message, 'we\'re taking the bots to isengard');
    } else if (message.content.indexOf('stackoverflow') == 0) {
        // STACKOVERFOLOW
        stackWrapper.process(message, process.env.SE_API_KEY);
    } else if (message.content.indexOf('omdb') === 0) {
        // OMDB/IMDB
        omdbWrapper.process(message);
    }

});

discoBot.login(process.env.USERNAME, process.env.PASSWORD).catch((e) => console.log(e));