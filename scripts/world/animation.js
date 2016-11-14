/**
 * @module world/animation
 * @description simple abstraction for the css-animations
 */

/**
 * Toggles an element by adding or removing a css-class
 * @param  {DOM-Node} element the element to animate
 * @param  {string} start   the current class
 * @param  {string} end     the end class
 * @param  {string} [force]   "hide" or "show" - forces a specific direction
 * @return {boolean}
 */
const _toggleElement = (element, start, end, force) => {
	element.classList.add("animation--state");
	element.classList.remove("animation--state-"+start);
	element.classList.add("animation--state-"+end);
	window.requestAnimationFrame(() => {
		if(force === "hide"){
			return element.classList.remove("animation--state-active");
		}
		if(force === "show"){
			return element.classList.add("animation--state-active");
		}
		return element.classList.toggle("animation--state-active");
	})
 }

/**
 * Toggles an element by adding or removing a css-class
 * @param  {DOM-Node} element the element to animate
 * @param  {string} start   the current class
 * @param  {string} end     the end class
 * @param  {string} [force]   "hide" or "show" - forces a specific direction
 * @return {boolean}
 */
exports.toggle = _toggleElement;

/**
 * Shows an element by adding or removing a css-class
 * @param  {string} start   the current class
 * @param  {string} end     the end class
 * @return {boolean}
 */
exports.show = (element, start, end) => {
	_toggleElement(element, start, end, "show");
};

/**
 * Shows an element by adding or removing a css-class
 * @param  {string} start   the current class
 * @param  {string} end     the end class
 * @return {boolean}
 */
exports.hide = (element, start, end) => {
	_toggleElement(element, start, end, "hide");
};

