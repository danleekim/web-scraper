var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
    
    // Superbabies: Baby Geniuses 2 (2004)
    // url = 'http://www.imdb.com/title/tt0270846/';
    
    // Birdemic: Shock and Terror (2010)
    url = 'http://www.imdb.com/title/tt1316037/';

    
    // url = 'http://www.nba.com/lakers/roster';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {
                title: "",
                release: "",
                rating: ""
            };

            var name;
            var json = {
                name: "",
                release: "",
                rating: ""
            };

            // $('.nba-player-header__details-bottom').filter(function () {
            //     var data = $(this);
            //     name = data.children().first().text().trim();
            //     json.name = name;
            // })

            // $('.nba-player-header__details-bottom').filter(function () {
            //     var data = $(this);
            //     // name = data.children().first().text().trim();
            //     name = data.children().first().text().trim();
            //     json.name = name;
            // })


            $('.title_wrapper').filter(function () {
                var data = $(this);
                title = data.children().first().text().trim();
                release = data.children().last().children().last().text().trim();

                json.title = title;
                json.release = release;
            })

            $('.ratingValue').filter(function () {
                var data = $(this);
                rating = data.text().trim();

                json.rating = rating;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;