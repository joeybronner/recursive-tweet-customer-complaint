# Recursive Tweet Customer Complaint

### Description

Post recursive Tweet (each day), mentioning a specific seller and his business if you are in conflict with him.

### Third parties

 - https://github.com/node-schedule/node-schedule

### Step 1 

Create a twitter account (http://twitter.com)

### Step 2

Create a new app for your twitter account
 - https://apps.twitter.com/
 - Click on "Create New App"
 - Define a name, description, website and click on "Create New App"

Go to the "Keys and Access Tokens" tab and retrieve the following information, they will be used to connect your Node script to your twitter account and tweet. The information you need to get:
 - Consumer Key (API Key)
 - Consumer Secret (API Secret)

Now, click on "Create my Access Token" and get:
 - Access Token
 - Access Token Secret

Be sure your "Access Level"	is set on "Read and write"

### Step 3

Add the Consumer Key (API Key), Consumer Secret (API Secret), Access Token and Access Token Secret to your Twit object initialization.

	var T = new Twit({
	    consumer_key:         'YOUR_CURSTOMER_KEY',
	    consumer_secret:      'YOUR_CUSTOMER_SECRET',
	    access_token:         'YOUR_ACCESS_TOKEN',
	    access_token_secret:  'YOUR_ACCESS_TOKEN_SECRET',
	    timeout_ms:           60 * 1000
	});



