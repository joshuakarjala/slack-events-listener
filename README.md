# slack-events-listener

Middleware which emits all events received from Slack Events API. It handles the intial verification with Slack and calls your callback with all events received from Slack.

This example is for `express`, but the middleware is `connect`-compatible. All that's required is that `req.body` is json.

## How To
`npm install slack-events-listener`

Initialize the middleware with your Slack verification token and your event handling callback.

## Example

In this example `express` is being used, but it's not required. It's only required that `req.body` is json.

``` javascript
var slackEvents = require('slack-events-listener')('<verificationToken>', onSlackEvent);
var bodyParser = require('body-parser');
var app = require('express')();

function onSlackEvent(event, cb) {
  // do something. call cb with err if you want Slack to resend the message (your database might be down)
  writeToDatabase(event, cb);
}

// /slack_events should match whatever webhook you set in Slack
app.use('/slack_events', bodyParser.json(), slackEvents);
```

## Parameters:

- `verificationToken` *required* *Find this variable in your Slack application settings - if set to false will skip verification (for quick testing)*
- `onSlackEvent` *required* *Every time we receive an event from Slack this function will be called with the event payload*

## Payload format
List of payloads is available at https://api.slack.com/events-api#event_types

