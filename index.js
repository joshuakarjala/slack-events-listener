'use strict';

const events = require('events');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (sqs, port) {
  const that = new events.EventEmitter();
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  app.post('/slack_event', function (req, res) {
    if (!req.body) return res.error(400, 'bad request homes');

    const body = req.body.payload ? JSON.parse(req.body.payload) : req.body;

    if (!process.env.SLACK_VERIFICATION_TOKEN || body.token !== process.env.SLACK_VERIFICATION_TOKEN) return res.error(403, 'could not verify slack token');

    if (body.type === 'url_verification') return res.send(body.challenge);
    if (body.type === 'event_callback') {
      that.emit('slack_event', body);
      return res.send('ok');
    }
    if (body.callback_id) {
      that.emit('slack_callback', body);
      return res.end();
    }

    res.error(400, 'bad request man');
  });

  app.listen(port);

  return that;
};
