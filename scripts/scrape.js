//scrape script

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://www.scoopcharlotte.com/", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];
console.log("hello")
console.log(head)
        $(".post-box-overlay-content").each(function(i, element){
            var head = $(this).children(".title").text().trim();
            //var sum = $(this).children(".")
            console.log(head)

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