var Discord = require("discord.js");
stackexchange = require('stackexchange');
require('dotenv').config();
 
var options = { version: 2.2 }
var context = new stackexchange(options);

discoBot = new Discord.Client();
//Debug and warning handlers, these log debug messages and warnings to console
discoBot.on("debug", (m) => console.log("[debug]", m));
discoBot.on("warn", (m) => console.log("[warn]", m));

discoBot.on("message", function(message){
    if (message.content === "who is the best") {
        discoBot.reply(message, "brix is the best");
    } else if (message.content === 'what did you say') {
        discoBot.reply(message, 'we\'re taking the bots to isenguard');
    } else if (message.content.indexOf('stackoverflow' == 0)) {

        var filter = {
            key: process.env.SE_API_KEY,
            pagesize: 5,
            tagged: 'php',
            sort: 'activity',
            order: 'asc'
        };
        context.questions.questions(filter, function(err, results) {
            if (err) throw err;
        
            console.log(results.items);
            console.log(results.has_more);
        });        

    }

});

/**
 * Login
 */
discoBot.login(process.env.USERNAME, process.env.PASSWORD).catch((e) => console.log(e));;
