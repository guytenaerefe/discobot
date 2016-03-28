var Discord = require("discord.js");
var stackexchange = require('stackexchange');
var omdb = require('omdb');
require('dotenv').config();
 
var options = { version: 2.2 }
var context = new stackexchange(options);
var searchQuery = '';

discoBot = new Discord.Client();
discoBot.on('debug', (m) => console.log('[debug]', m));
discoBot.on('warn', (m) => console.log('[warn]', m));

function listReplace(input, mappings) {
    var replaceList = new RegExp(Object.keys(mappings).join("|"), "gi");
    return input.replace(replaceList, function(match) {
        return mappings[match];
    });
}

discoBot.on('message', function(message){
    if (message.content === "quit") {
        discoBot.reply(message, 'ok bye');
        process.exit();
        // NONSENSE
    } else if (message.content === 'what did you say') {
        discoBot.reply(message, 'we\'re taking the bots to isengard');
        // STACKOVERFOLOW
    } else if (message.content.indexOf('stackoverflow') == 0) {
        searchQuery = message.content.replace('stackoverflow', '');
        var filter = {
            key: process.env.SE_API_KEY,
            pagesize: 1,
            q: searchQuery,
            site: 'stackoverflow'
        };
        context.search.advanced(filter, function(err, results) {
            if (err) {
                throw err;
            }
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
        // OMDB/IMDB
    } else if (message.content.indexOf('imdb') === 0 || message.content.indexOf('omdb') === 0) {
        var replaceList = {
            imdb: '',
            omdb: '',
            search: ''
        }
        if(message.content.indexOf('search') === 5) {
            message.content = listReplace(message.content, replaceList).trim();
            omdb.search(message.content, function(err, movies) {
                if(err) {
                   throw err; 
                }
                if(false === movies) {
                   discoBot.reply(message, 'No movies found.'); 
                }
                movies.forEach(function(movie) {
                    discoBot.reply(message,  movie.title + ' ' + movie.year);
                });
            });
        } else {
            message.content = listReplace(message.content, replaceList).trim();
            omdb.get({ title: message.content}, true, function(err, movie) {
                if(err) {
                   throw err; 
                }
                if(typeof movie === undefined) {
                   discoBot.reply(message, 'No movie found.'); 
                }
                discoBot.reply(
                    message,  movie.title + 
                    ' (' + movie.year + 
                    ') - IMDB Rating: ' +  movie.imdb.rating + 
                    ' - Metacritic ' + movie.metacritic + 
                    ' - Plot summary: ' + movie.plot +
                    ' - ' + movie.poster + 
                    ' - http://www.imdb.com/title/' + movie.imdb.id
                );
            });
        }
    }

});

discoBot.login(process.env.USERNAME, process.env.PASSWORD).catch((e) => console.log(e));;
