var Discord = require("discord.js");
var stackexchange = require('stackexchange');
require('dotenv').config();
 
var options = { version: 2.2 }
var context = new stackexchange(options);

discoBot = new Discord.Client();
discoBot.on('debug', (m) => console.log('[debug]', m));
discoBot.on('warn', (m) => console.log('[warn]', m));

discoBot.on('message', function(message){
    if (message.content === "quit") {
        discoBot.reply(message, 'ok bye');
        process.exit();
    } else if (message.content === 'what did you say') {
        discoBot.reply(message, 'we\'re taking the bots to isengard');
    } else if (message.content.indexOf('stackoverflow') == 0) {

        words = message.content.replace('stackoverflow', '');

        var filter = {
            key: process.env.SE_API_KEY,
            pagesize: 1,
            q: words,
            site: 'stackoverflow'
        };

        context.search.advanced(filter, function(err, results) {
            if (err) throw err;

            results.items.forEach(function(item, index) {
                var creationDate = new Date(item.creation_date * 1000);
                discoBot.reply(
                    message, item.view_count + 
                    ' viewed this question with a score of ' + item.score + 
                    ' and  ' + (item.is_answered ? 'has an accepted answer' : 'still needs an answer')  + 
                    '. (' + creationDate.toDateString()   +
                    ') : '  + item.link);

            });
        });        

    }

});

discoBot.login(process.env.USERNAME, process.env.PASSWORD).catch((e) => console.log(e));;
