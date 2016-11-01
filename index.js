'use strict';

const events = require('events');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (options, onevent) {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.post(`${options.eventUrl || '/slack_event'}`, function (req, res) {
    if (!req.body) return res.error(400, 'bad request homes');

    const body = req.body.payload ? JSON.parse(req.body.payload) : req.body;

    if (!options.verificationToken || body.token !== options.verificationToken) return res.error(403, 'could not verify slack token');

    if (body.type === 'url_verification') return res.send(body.challenge);
    if (body.type === 'event_callback') {
      onevent(body, function (err) {
        if (err) return res.error(500, 'something bad happened')
        res.send('ok')
      })
      return
    }

    res.error(400, 'bad request man');
  });

  app.listen(options.port || 3000);
};
