var Stackexchange = require('stackexchange');

var options = { version: 2.2 }
var stackContext = new Stackexchange(options);
var searchQuery = '';

var process = function(message, apikey) {
        searchQuery = message.content.replace('stackoverflow', '');
        var filter = {
            key: apikey,
            pagesize: 1,
            q: searchQuery,
            site: 'stackoverflow'
        };
        stackContext.search.advanced(filter, function(err, results) {
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
};

exports.process = process;