'use strict';

var key = "JuS8gKrdMMuqzUbxgdV6f1EFF";
var secret = "qKfvxr5a5VADgq69X1E3OiNTSViQsH23TvNPMVLR0leDEUlYsp";

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


   



function get(context, params) {
  // return zero or more document nodes
  let title = params.title;

  var token = getToken(key, secret);
  var results = new Array();
for (var tweet of getTweets(title, token)) {
 results.push(tweet)
}
 results


  let company = cts.search(
    cts.jsonPropertyValueQuery("name", title, "case-insensitive")
  );

  company = fn.head(company).toObject();
  company.tweets = results;

  return company;
};

function post(context, params, input) {
  // return zero or more document nodes
};

function put(context, params, input) {
  // return at most one document node
};

function deleteFunction(context, params) {
  // return at most one document node
};

exports.GET = get;
exports.POST = post;
exports.PUT = put;
exports.DELETE = deleteFunction;
