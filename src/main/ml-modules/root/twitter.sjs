'use strict';
// Gets array of tweets for hastag using auth token
function getTweets(hashtag, token) {
    var uri = "https://api.twitter.com/1.1/search/tweets.json?q=" + encodeURI(hashtag) + "&amp;include_entities=true&amp;tweet_mode=extended";
    var res = xdmp.httpGet(uri, {"headers": {"authorization": "Bearer " + token}});
    if(res.toArray()[0].code == 200) {
        return res.toArray()[1].toObject().statuses;
    }
    else {
        throw res.toArray()[0].code + " " + res.toArray()[0].message;
    }
}

// Builds an access token given a key and secret
function getToken(key, secret) {
    var uri = "https://api.twitter.com/oauth2/token";
    var auth = xdmp.base64Encode(key + ":" + secret);
    var res = xdmp.httpPost(uri, {"headers": {"authorization": "Basic " + auth, "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}, "data": "grant_type=client_credentials"});
    if(res.toArray()[0].code == 200) {
        return res.toArray()[1].toObject().access_token;
    }
    else {
        throw res.toArray()[1].code + " " + res.toArray()[1].message;
    }
}


 var key = "JuS8gKrdMMuqzUbxgdV6f1EFF";
 var secret = "qKfvxr5a5VADgq69X1E3OiNTSViQsH23TvNPMVLR0leDEUlYsp";
    var token = getToken(key, secret);
    var results = new Array();
 for (var tweet of getTweets("Omission IPA", token)) {
   results.push(tweet)
 }
   results
   
