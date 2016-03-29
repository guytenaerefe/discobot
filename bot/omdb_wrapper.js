var omdb = require('omdb');
var helper = require('./helper');

var process = function (message) {
       var replaceList = {
            imdb: '',
            omdb: '',
            search: ''
        }
        if(message.content.indexOf('search') === 5) {
            message.content = helper.listReplace(message.content, replaceList).trim();
            omdb.search(message.content, function(err, movies) {
                if(err) {
                   throw err; 
                }
                if(false === movies || typeof movies === 'undefined') {
                   discoBot.reply(message, 'No movies found.'); 
                   return
                }
                movies.forEach(function(movie) {
                    discoBot.reply(message,  movie.title + ' ' + movie.year);
                });
            });
        } else {
            message.content = helper.listReplace(message.content, replaceList).trim();
            omdb.get({ title: message.content}, true, function(err, movie) {
                if(err) {
                   throw err; 
                }
                if(typeof movie === 'undefined' || false === movie) {
                   discoBot.reply(message, 'No movie found.');
                   return;

                }
                discoBot.reply(
                    message,  movie.title + 
                    ' (' + movie.year + 
                    ') - IMDB Rating: ' +  movie.imdb.rating + 
                    ' - Metacritic ' + movie.metacritic + 
                    ' - Plot summary: ' + movie.plot +
                    ' - http://www.imdb.com/title/' + movie.imdb.id
                );
            });
        }
};

exports.process = process;