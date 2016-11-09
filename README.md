# rzf-ms-bot-directline
A simple front end to the Bot Connector / MS Bot Framework using the directline API.

## Bower vs NPM
- NPM is the packet manager for all node.js packages
- Bower is the packet manager for all front end packages

## Setup

- Rename ```scripts/_credentials.json``` to ```scripts/credentials.json``` and vscripts/_settings.json``` to ```scripts/settings.json```.
- Add your APP-Secret from the botframework-dashboard to scripts/credentials.json.
- Add your BOTNAME to scripts/settings.json.
- ```$ npm install```
- ```$ bower install```
- build the bundle with ```$ ./node_modules/.bin/browserify ./scripts/main.js -o ./scripts/bundle.js -t [ babelify --presets [ es2015 stage-0 ] ]```
- ```python -m SimpleHTTPServer 8080```
- open ```http://localhost:8080```


## Directline API
- https://docs.botframework.com/en-us/restapi/directline/#navtitle
