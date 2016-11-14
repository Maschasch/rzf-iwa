
/**
 * @module directline/main
 * facade for the directline-API
 * @type {[type]}
 */
const API = require("./api.js");
// const API = require("directline-api");
const world = require("./../world/world.js");
const Promise = require('es6-promise').Promise;



let token = null;
let conversationId = null;

/**
 * [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
const _postMessage = (message) => {
	let body = {
		text: message,
		from: "me"
	}
	world.addMessage(body);
	return API.postMessage(token, conversationId, body).then(world.addMessage);
}

/**
 * Contructor
 * @param  {String} SECRET the app secret
 * @return {Promise}        promise of the conversation
 */
const _initialize = (SECRET) => {
	return new Promise(function(resolve, reject) {
		API.generateConversationAndToken(SECRET)
			.then((data) => {

				// token = data;
				token = SECRET;
				return token;
			})
			.then(API.createConversation)
			.then((body) => {
				return JSON.parse(body);
			})
			.then((data) => {
				conversationId = data.conversationId
				token = data.token
				resolve(data);
			})
			.then((data) => {
				API.poll(token,conversationId);
			})
			.catch((error) => {
				reject(error);
			})
	});
};




exports.initialize = _initialize;
exports.postMessage = _postMessage;

