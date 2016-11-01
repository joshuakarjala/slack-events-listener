# slack-events-listener
Easy to use web server which emits all events received from Slack Events API. It handles the intial verification with Slack and emits all events posted to you by Slack.

## How To
`npm install slack-events-listener`

The module returns an `EventEmitter` which emits `slack_event` events which contain the whole JSON payload from Slack.

```javascript
const slackEvents = require('slack-events-listener')({
  port: process.env.PORT || 3000,
  eventUrl: process.env.SLACK_EVENT_URL || '/slack_event',
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN || '<your application token>'
});

slackEvents.on('slack_event', console.log);
```

This module requires three options to be set when loaded:

- `port` *Which port should the webserer bind to (defaults to 3000)*
- `eventUrl` *The path that you should point the Slack Events API towards (defaults to /slack_event)*
- `verificationToken` *Find this variable in your Slack application settings*

## Payload format
List of payloads is available at https://api.slack.com/events-api#event_types
