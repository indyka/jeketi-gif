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

var streamT = T.stream('lists/statuses', { slug: 'gif', owner_screen_name: 'jeketigif' });

streamT.on('tweet', function (tweet) {
  console.log(tweet.screen_name + ': ' + tweet.text);
  keyword = tweet.text.split(" ");
  giphy.translate({s: keyword[Math.floor(Math.random() * keyword.length)]}, function(error, gif, res){
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
            T.post('statuses/update', { status: '@' + tweet.user.screen_name, in_reply_to_status_id: tweet.id_str, media_ids: [mediaIdStr] }, function(err, data, response) {
              console.log(data)
            });
          } else {
            console.log('error cuk');
          }
        })
      })
    });
  });
});



