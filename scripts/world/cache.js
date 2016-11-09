
/**
 * @module world/cache
 * Caches the DOM-queries
 */

let cache = {};


/**
 * returns the element from the selector.
 * Either from the cache or from the DOME
 * @param  {String} selector querySelector
 * @return {DOM-Node}          the element
 */
const _get  = (selector) => {
	if (cache[selector]) {
		return cache[selector];
	} else {
		cache[selector] = document.querySelector(selector);
	}
	return cache[selector];
}

/**
 * Facade for the submit button element
 * @return {DOM-Node}
 */
const _getButton = () => {
	return _get(".chat-input--send");
}

/**
 * Facade for the chat box element
 * @return {DOM-Node}
 */
const _getBox = () => {
	return _get(".chat-box");
}

/**
 * Facade for the dialogue element
 * @return {DOM-Node}
 */
const _getDialogue = () => {
	return _get(".chat-dialogue");
}

/**
 * Facade for the chat wrapper element
 * @return {DOM-Node}
 */
const _getChat = () => {
	return _get(".chat-wrapper");
}

/**
 * Facade for the busy indicator element
 * @return {DOM-Node}
 */
const _getIndicator = () => {
	return _get(".chat-item--indicator");
}

/**
 * Facade for the chat root element
 * @return {DOM-Node}
 */
const _getRoot = () => {
	return _get("#content");
}


/**
 * Facade for the chat root element
 * @return {DOM-Node}
 */
exports.root = _getRoot;


/**
 * Facade for the submit button element
 * @return {DOM-Node}
 */
exports.button = _getButton

/**
 * Facade for the dialogue element
 * @return {DOM-Node}
 */
exports.dialogue = _getDialogue

/**
 * Facade for the chat box element
 * @return {DOM-Node}
 */
exports.box = _getBox

/**
 * Facade for the chat wrapper element
 * @return {DOM-Node}
 */
exports.chat = _getChat

/**
 * Facade for the busy indicator element
 * @return {DOM-Node}
 */
exports.indicator = _getIndicator
