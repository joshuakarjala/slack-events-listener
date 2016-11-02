var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var slackEvents = require('./index')(false, function (slackEvent, cb) {
  console.log(slackEvent);
  cb();
});

app.use('/slack_events', bodyParser.json(), slackEvents);

app.listen(3000);


