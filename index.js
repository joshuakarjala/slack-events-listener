'use strict';

var events = require('events');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (options) {
  options = options || {};
  options.port = options.port || 3000;

  if (!options.verificationToken) {
    throw new Error('verificationToken not found in options');
  }
  if (!options.eventUrl) {
    throw new Error('eventUrl not found in options');
  }

  var that = new events.EventEmitter();
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.post(options.eventUrl, function (req, res) {
    if (!req.body) return res.error(400, 'bad request homes');

    var body = req.body.payload ? JSON.parse(req.body.payload) : req.body;

    if (body.token !== options.verificationToken) {
      return res.error(403, 'could not verify slack token');
    }

    if (body.type === 'url_verification') return res.send(body.challenge);
    if (body.type === 'event_callback') {
      that.emit('slack_event', body);
      return res.send('ok');
    }

    res.error(400, 'bad request man');
  });

  app.listen(options.port || 3000);

  return that;
};
