'use strict';

var fs = require('fs');
var sql = require('sql.js');
var Twit = require('twit');
var schedule = require('node-schedule');
var twitterSettings = require('./twitter/twitter-user-settings.js');

// /!\ Init parameters /!\
var T = new Twit({
    consumer_key:         twitterSettings.get().consumer_key,
    consumer_secret:      twitterSettings.get().consumer_secret,
    access_token:         twitterSettings.get().access_token,
    access_token_secret:  twitterSettings.get().access_token_secret,
    timeout_ms:           twitterSettings.get().timeout_ms
});


// Load the DB
var filebuffer = fs.readFileSync('db/tweets.sqlite');
var db = new sql.Database(filebuffer);

// Launch cron and tweet every X seconds
schedule.scheduleJob('*/180 * * * *', function () {

	print('\n\r---------------------- NEW TWEET ------------------------');
	print('\n\r-------------------- ' + getNowDateTimeInFrench() + ' ----------------------');

	// Get the first tweet in the queue
	var aTweets = db.exec('SELECT * FROM tweets ORDER BY id ASC')[0].values;
	var iNbOfTweets = aTweets.length;
	var iRandomNumber = getRandomInt(0, iNbOfTweets);
	
	var sTweet = aTweets[iRandomNumber][1];
	print(sTweet);

	// It's time to post new tweet
	T.post('statuses/update', { status: sTweet }, function(err, data, response) {
        if (err) {
            print('    Error: ' + err);
        } else {
        	print('    Tweet posted:' + sTweet);
        }
    });

    print('---------------------------------------------------------\n\r');

});

/*
 *
 * UTILS
 *
 */

function print (str) {
    console.log(str);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNowDateTimeInFrench () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return dd + '/' + mm + '/' + yyyy + ' ' + hours + 'h' + minutes;
}
