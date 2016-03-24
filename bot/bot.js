var Discord = require("discord.js");
stackexchange = require('stackexchange');
require('dotenv').config();
 
var options = { version: 2.2 }
var context = new stackexchange(options);

discoBot = new Discord.Client();
//Debug and warning handlers, these log debug messages and warnings to console
discoBot.on('debug', (m) => console.log('[debug]', m));
discoBot.on('warn', (m) => console.log('[warn]', m));

discoBot.on('message', function(message){
    if (message.content === "quit") {
        discoBot.reply(message, 'ok bye');
        process.exit();
    } else if (message.content === 'what did you say') {
        discoBot.reply(message, 'we\'re taking the bots to isenguard');
    } else if (message.content.indexOf('stackoverflow') == 0) {

        words = message.content.replace('stackoverflow', '');
        console.log(words);

        var filter = {
            key: process.env.SE_API_KEY,
            pagesize: 2,
            //tagged: 'php',
            intitle: words,
            sort: 'score',
            order: 'desc',
            site: 'stackoverflow'
        };

        //context.questions.questions(filter, function(err, results) {
        context.search.search(filter, function(err, results) {
            if (err) throw err;
        
            console.log(results.items);
        });        

    }

});

/**
 * Login
 */
discoBot.login(process.env.USERNAME, process.env.PASSWORD).catch((e) => console.log(e));;
