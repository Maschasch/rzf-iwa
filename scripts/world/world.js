/**
 * @module ui/world
 * @description handles all DOM manipulations
 */

 const Mustache = require("mustache");
 const cache = require("./cache.js");
 const animation = require("./animation.js");
 const Promise = require('es6-promise').Promise;
 const SETTINGS = require("./../settings.json");

 const uuid = "uuid-"+new Date().getTime();
 // const templateMessage = require('./template.mst');

const templateMessage =  document.getElementById("templateMessage").innerHTML;
const templateIndicator =  document.getElementById("templateIndicator").innerHTML;
const templateChatWrapper =  document.getElementById("templateChatWrapper").innerHTML;
const templateChatBase =  document.getElementById("templateChatBase").innerHTML;




/**
 * Constructor
 * @return {Promise}
 */
const _initialize = () => {
	return new Promise(function(resolve, reject) {


		Mustache.parse(templateMessage);
		Mustache.parse(templateIndicator);
		Mustache.parse(templateChatWrapper);
		Mustache.parse(templateChatBase);

		animation.show(_createChatBase(), "bottom-top", "top-bottom");
		_createChatWrapper();
		_createIndicator();
		resolve(true);
	});
};


/**
 * Consumes a strign of HTML, produces a set of DOM-Nodes
 * @param  {String} htmlstring String of HTML
 * @return {DOM}            DOM-Nodes
 */
const _toDom = (htmlstring) => {
	return new DOMParser().parseFromString( htmlstring, "text/html" ).body.firstChild;
}

/**
 * Creates the chat-wrapper-element
 * @return {DOM} the chat wrapper node
 */
const _createChatBase = () => {
	cache.root().innerHTML = "";
	cache.root().appendChild( _toDom( templateChatBase ) ) ;
	return cache.box();
 }

/**
 * Creates the chat-wrapper-element
 * @return {DOM} the chat wrapper node
 */
const _createChatWrapper = () => {
	cache.dialogue().appendChild( _toDom( Mustache.render(templateChatWrapper, {uuid : uuid}) ) ) ;
	return document.getElementById(uuid);
}


/**
 * Creates the loading-indicator-element.
 * Let the element appear with an animation
 * @return {Void}
 */
const _createIndicator = () => {
	cache.dialogue().insertBefore( _toDom( Mustache.render(templateIndicator, {from : SETTINGS.BOTNAME, text: "typing "}) ), cache.dialogue().firstChild ) ;
	animation.toggle(cache.indicator(), "right-left", "left-right", "hide");
}


/**
 * Updates the DOM with a chat message.
 * Let the message appear with an animation
 * @param  {Object} data Data-Object for the message to display
 * @return {Void}
 */
const _addMessage = (data) => {
	console.log("MESSAGE", data)
	if(!data) { return false;}
	data.BASEURI = SETTINGS.BASEURI;
	console.info( "data", data )
	console.info( Mustache.render(templateMessage, data) )
	cache.chat().insertBefore( _toDom(  Mustache.render(templateMessage, data) ) , cache.chat().firstChild ) ;
	if(data.from === "me") {
		animation.toggle(cache.chat().firstChild, "left-right", "right-left", "show")
	}
	else {
		animation.toggle(cache.chat().firstChild,  "right-left", "left-right", "show")
	}
}

/**
 * API: Contructor
 * @return {Promise}
 */
exports.initialize = _initialize;

/**
 * Updates the DOM with a chat message.
 * Let the message appear with an animation
 * @param  {Object} data Data-Object for the message to display
 * @return {Void}
 */
exports.addMessage = _addMessage;

// exports.showChatMe = (item) => { animation.toggle(item, "left-right", "right-left", "show") };
// exports.showChatBot = (item) => { animation.toggle(item, "left-right", "right-left", "show"); };





