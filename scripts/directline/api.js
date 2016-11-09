/**
 * Direct Line API
 * Adapted from https://github.com/rockq-org/DirectLineApi
 * https://docs.botframework.com/en-us/restapi/directline/
 */

const SETTINGS = require("./../settings.json");
const baseUrl = SETTINGS.BASEURI+"/api";
require("any-promise/register/es6-promise")
var request = require("request-promise-any");


var world = require("./../world/world.js")

function DirectLineClient() {}

/**
 * Create a conversation
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
DirectLineClient.prototype.createConversation = function(token) {
	return request({
		method: "POST",
		uri: baseUrl + "/conversations",
		headers: {
			"Authorization": "BotConnector " + token,
			"Content-length": "0",
			"Accept": "application/json"
		}
	})
};

/**
 * Post a message for a conversation
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} message        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.postMessage = function(token, conversationId, body) {
	return request({
		method: "POST",
		uri: baseUrl + "/conversations/" + conversationId + "/messages",
		headers: {
			"Authorization": "BotConnector " + token,
			"Content-Type": "application/json"
		},
		json: true,
		body: body
	});

};


/**
 * Get Messages for a conversation
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} watermark      [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.getMessages = function(token, conversationId, watermark) {
	return request({
		method: "GET",
		uri: baseUrl + "/conversations/" + conversationId + "/messages/?" + (watermark ? "watermark=" + watermark : ""),
		headers: {
			"Authorization": "BotConnector " + token,
			"Accept": "application/json"
		}
	});
};

/**
 * generate a token for a new conversation.
 * #TODO what difference with GET /tokens ?
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} message        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.generateConversationAndToken = function(secret) {
	return request({
		method: "POST",
		uri: baseUrl + "/tokens/conversation",
		headers: {
			"Authorization": "BotConnector " + secret
		}
	});

};


/**
 * Constantly polls for new messages. Updates the watermark and renders only bot messages to the chat window
 * @param  {[type]} conversationId [description]
 * @param  {[type]} token          [description]
 * @param  {[type]} content        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.poll = function(token, conversationId ) {

	var self = this;
	var watermark = 0;

	function waitForResponse() {
		setTimeout(() => {
			self.getMessages(token, conversationId, watermark)
				.then( (body)  => {
					return JSON.parse(body);
				})
				.then( (body)  => {
					// console.info("POLL MESSGAES", body,body.messages)
					if(!body.messages || !body.messages.length) {
						throw new Error("no messages")
					}
					// keep only messages from the bot
					body.messages.filtered = body.messages.filter((message) => {
						return message.from.toLowerCase() === SETTINGS.BOTNAME.toLowerCase();
					});
					body.messages.filtered.forEach(function(message) {
						// console.info( "==>  add message", message)
						world.addMessage(message)
					});
					watermark = body.watermark;
					waitForResponse();
				} )
				.catch( (error) => {
					// console.info("Error on polling messages: ", error)
					waitForResponse();
				});
		}, 250);
	}

	waitForResponse();

}



exports = module.exports = new DirectLineClient();
