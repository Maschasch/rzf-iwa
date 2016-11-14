var builder = require('botbuilder');
var prompts = require('./tcomPresentationBotPrompts.js');

/* chat bot config start */
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '37ce4029-6485-4bbc-9a83-c28261653ba6', //process.env.MICROSOFT_APP_ID,
    appPassword: '4XiKtRvMD6w7EJAG3ZSekEm' //process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=562a1557-8377-46f0-bafc-30ecc63ebe4a&subscription-key=f5c1a100911048e5839f2a8c7b7c253c';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Add intent handlers
dialog.matches('intro', [
    function (session, args, next) {
        // session.send('introduction');
        session.send(prompts.intro);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('entgelttabellen', [
    function (session, args, next) {
        // session.send('introduction');
        session.send(prompts.entgelttabellen);
        next();
    },
    function (session, results, next) {
        next();
    }
]);


dialog.matches('DTSE', [
    function (session, args, next) {
        session.send(prompts.DTSE);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('altersteilzeit', [
    function (session, args, next) {
        session.send(prompts.altersteilzeit);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('grippeschutzimpfung', [
    function (session, args, next) {
        session.send(prompts.grippeschutzimpfung);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('speiseplan', [
    function (session, args, next) {
        session.send(prompts.speiseplan);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('bonn', [
    function (session, args, next) {
        session.send(prompts.bonn);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

var curTouch = 0;
dialog.matches('krankheit', [
    function (session, args, next) {
        if(curTouch % 2 === 0)
            session.send(prompts.krankheit);
        else
            session.send(prompts.krankmelden);
        curTouch++;
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('krankmelden', [
    function (session, args, next) {
        session.send(prompts.krankmelden);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.matches('cool', [
    function (session, args, next) {
        session.send(prompts.cool);
        next();
    },
    function (session, results, next) {
        next();
    }
]);

dialog.onDefault(builder.DialogAction.send(prompts.sorry));

