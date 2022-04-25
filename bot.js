/**var twit = require('twit/lib / twitter ');
var config = require('./config.js');

var Twitter = new twit(config);

var messages = ["Another posted test tweet", "from IDE  "];
var messageLocation = 0;

var writeTweet = function() {
    Twitter.post('statuses/update', {
            status: messages[messageLocation]
        },
        function(err, data, response) {
            console.log(data)
        });
    messageLocation += 1;


    writeTweet()

    setInterval(writeTweet, 15000);
}**/



var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'api.twitter.com',
    'path': '/2/tweets',
    'headers': {
        'Authorization': 'OAuth oauth_consumer_key="{yours}",oauth_token="{yours}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1650613849",oauth_nonce="a04BnOmZo2R",oauth_version="1.0",oauth_signature="{yours}"',
        'Content-Type': 'application/json',
        'Cookie': 'guest_id=v1%3A164975354306593609'
    },
    'maxRedirects': 20
};

var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
        chunks.push(chunk);
    });

    res.on("end", function(chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function(error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "text": "@transformers,will you use the 'I Can Transform Ya' Song in the upcoming movie?"
});

req.write(postData);

req.end();