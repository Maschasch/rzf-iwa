
/**
 * @module world/@main
 * Sets up all the world interactions
 */

const API = require("./../directline/main.js");
const Promise = require('es6-promise').Promise;
const world = require("./world.js");
const busy = require("./busy.js");



/**
 * Contructor
 * @param  {String} SECRET The app secret
 * @return {Promise}
 */
const _initialize = (SECRET) => {
	return new Promise(function(resolve, reject) {
		world.initialize();
		document.querySelector("form.chat-input").addEventListener("submit", _onSubmit);
		resolve(SECRET);
	});
};


/**
 * Eventhandler for sending a message to the bot
 * Prevents the default form action
 * @param  {DOM-Event} event native DOM_event
 * @return {Bool}       false
 */
const _onSubmit = (event) => {
	let _value;
	let _input = event.target.querySelector(".chat-input--text");

	_value = _input.value;
	event.preventDefault();
	if(_value.length) {
		_input.value = "";
		busy.set();
		API.postMessage(_value)
			.then( () => {
				busy.unset();
			})
			.catch( (error) => {
				console.log(error)
			})
		;
	}
	return false;
}


/**
 * API: Contructor
 * @param  {String} SECRET The app secret
 * @return {Promise}
 */
exports.initialize = _initialize;


