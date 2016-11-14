/**
 * @module world/busy.js
 * @description provides visual and functional feedback while waiting
 */

const cache = require("./cache.js")
const animation = require("./animation.js")

/**
 * Disables the submit button
 * @return {Boolean}
 */
const _disableButton = () => {
	cache.button().setAttribute("disabled","disabled");
	return true;
}

/**
 * Enables the submit button
 * @return {Boolean}
 */
const _enableButton = () => {
	cache.button().removeAttribute("disabled");
	return true;
}

/**
 * Shows the visual feedback indicator
 * @return {Boolean}
 */
const _showIndicator = () => {
	animation.toggle(cache.indicator(), "left-right", "right-left");
	return true;
};

/**
 * Hides the visual feedback indicator
 * @return {Boolean}
 */
const _hideIndicator = () => {
	animation.toggle(cache.indicator(), "right-left", "left-right");
	return true;
};

/**
 * Sets the waiting-state
 * @return {Boolean}
 */
const _set = () => {
	_showIndicator();
	// _disableButton();
	return true;
}

/**
 * Removes the waiting-state
 * @return {Boolean}
 */
const _unset = () => {
	_hideIndicator();
	_enableButton();
	return true;
}

/**
 * Sets the waiting-state
 * @return {Boolean}
 */
exports.set = _set;

/**
 * Removes the waiting-state
 * @return {Boolean}
 */
exports.unset = _unset;

