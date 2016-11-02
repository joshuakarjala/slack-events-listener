'use strict';

module.exports = function (verificationToken, onSlackEvent) {
  return function (req, res, next) {
    if (req.method !== 'POST') return next();
    if (!req.body) {
      res.stausCode = 400;
      res.end('bad request - no body found');
      return;
    }

    var body = req.body.payload ? JSON.parse(req.body.payload) : req.body;

    if (verificationToken && body.token !== verificationToken) {
      res.statusCode = 403;
      res.end('could not verify slack token');
      return;
    }

    if (body.type === 'url_verification') return res.end(body.challenge);
    if (body.type === 'event_callback') {
      onSlackEvent(body, function (err) {
        if (!err) return res.end('ok');
        res.statusCode = 400;
        res.end('please retry');
      });
      return;
    }

    res.statusCode = 400;
    res.end('bad request - not slack event api');
  };
};
