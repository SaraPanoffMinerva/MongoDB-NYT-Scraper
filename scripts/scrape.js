//scrape script

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://www.scoopcharlotte.com/", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];

        $(".post-box-overlay-content").each(function(i, element){
            var head = $(this).children(".title").text().trim();
            //var sum = $(this).children(".")

            if(head){
                var headNeat = head.replace(/(\r\n|\n|\r|t|\s+)/gm, "").trim();

                var dataToAdd = {
                    headline: headNeat,
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    })
}
module.exports = scrape;