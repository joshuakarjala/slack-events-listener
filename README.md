# slack-events-listener
Easy to use web server which emits all events received from Slack Events API. It handles the intial verification with Slack and emits all events posted to you by Slack.

## How To
`npm install slack-events-listener`

The module returns an `EventEmitter` which emits `slack_event` events which contain the whole JSON payload from Slack.

```javascript
var slackEvents = require('slack-events-listener')({
  eventUrl: '/slack_event',  // required
  verificationToken: '<your application token>',  // required
  port: 3000  // optional, defaults to 3000
});

slackEvents.on('slack_event', console.log);
```

## Options:

- `eventUrl` *required* *The path that you should point the Slack Events API towards (defaults to /slack_event)*
- `verificationToken` *required* *Find this variable in your Slack application settings*
- `port` *optional* *Which port should the webserer bind to (defaults to 3000)*

## Payload format
List of payloads is available at https://api.slack.com/events-api#event_types
