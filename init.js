'use strict';

var fs = require('fs');
var sql = require('sql.js');

// Load tweets from DB
var sSellerTwitterAccount = '@customerid';
var sNumCommande = 'XXXXXXXXXXXXX';

var aListOfTweets = [
	'A example of tweet with a mention to ' + sSellerTwitterAccount,
	'Another one...  ' + sSellerTwitterAccount,
	'etc...  ' + sSellerTwitterAccount,
];

// Create database & table
var db = new sql.Database();
db.run('CREATE TABLE tweets (id int, tweet char);');

// Add all tweets to the database
for (var t in aListOfTweets) {
	var tweet = aListOfTweets[t];
	db.run('INSERT INTO tweets VALUES (' + t + ', "' + tweet + '")');
    print('New line added in the DB (' + tweet + ')');
}

// Save database
var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync('db/tweets.sqlite', buffer);


/* ------------------------
 * Utils
 * ------------------------
 */
function print (str) {
    console.log(str);
}