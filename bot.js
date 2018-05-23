var Twit = require('twit')
var Giphy = require('giphy');
var async = require('async');
var request = require('request');
var fs = require('fs');
var sys = require('util')
var exec = require('child_process').exec;

require('dotenv').config();

var giphy = new Giphy(process.env.giphyKey);

var T = new Twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret,
  timeout_ms: 60*1000,
});

console.log('Listening to Twitter...');

T.get('lists/members', { slug: 'crawled-members', owner_screen_name: 'balesin_timti', count: 70 },  function (err, data, response) {
  users = data.users.map(a => a.id_str);
  console.log(users);
  var streamT = T.stream('statuses/filter', { follow: users });
  streamT.on('tweet', function (tweet) {
    console.log(tweet.user.screen_name + ': ' + tweet.text);
    if (isInArray(tweet.user.id_str, users) && tweet.in_reply_to_status_id == null && tweet.text != null) {
      console.log('Replying...');
      keyword = tweet.text.split(" ");
      keyword = keyword[Math.floor(Math.random() * keyword.length)]
      giphy.translate({s: keyword}, function(error, gif, res){
        url = "https://media.giphy.com/media/" + gif.data.id + "/giphy.gif"; 
        request({
          method: 'GET',
          url: url,
          encoding: 'binary'
        }, function(error, response, body){
          var b = new Buffer(body.toString(), 'binary');
          image = b.toString('base64');
          T.post('media/upload', { media_data: image }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var meta_params = { media_id: mediaIdStr }    
            T.post('media/metadata/create', meta_params, function (err, data, response) {
              if (!err) {  
                T.post('statuses/update', { status: '@' + tweet.user.screen_name + ' ' + keyword + '...', in_reply_to_status_id: tweet.id_str, media_ids: [mediaIdStr] }, function(err, data, response) {
                  console.log(data);
                });
              } else {
                console.log('[ERROR] ' + response);
              }
            })
          })
        });
      });
    }
  });
})

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}



