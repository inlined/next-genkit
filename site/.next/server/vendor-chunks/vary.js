"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/vary";
exports.ids = ["vendor-chunks/vary"];
exports.modules = {

/***/ "(rsc)/./node_modules/vary/index.js":
/*!************************************!*\
  !*** ./node_modules/vary/index.js ***!
  \************************************/
/***/ ((module) => {

eval("/*!\n * vary\n * Copyright(c) 2014-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n */\n\nmodule.exports = vary\nmodule.exports.append = append\n\n/**\n * RegExp to match field-name in RFC 7230 sec 3.2\n *\n * field-name    = token\n * token         = 1*tchar\n * tchar         = \"!\" / \"#\" / \"$\" / \"%\" / \"&\" / \"'\" / \"*\"\n *               / \"+\" / \"-\" / \".\" / \"^\" / \"_\" / \"`\" / \"|\" / \"~\"\n *               / DIGIT / ALPHA\n *               ; any VCHAR, except delimiters\n */\n\nvar FIELD_NAME_REGEXP = /^[!#$%&'*+\\-.^_`|~0-9A-Za-z]+$/\n\n/**\n * Append a field to a vary header.\n *\n * @param {String} header\n * @param {String|Array} field\n * @return {String}\n * @public\n */\n\nfunction append (header, field) {\n  if (typeof header !== 'string') {\n    throw new TypeError('header argument is required')\n  }\n\n  if (!field) {\n    throw new TypeError('field argument is required')\n  }\n\n  // get fields array\n  var fields = !Array.isArray(field)\n    ? parse(String(field))\n    : field\n\n  // assert on invalid field names\n  for (var j = 0; j < fields.length; j++) {\n    if (!FIELD_NAME_REGEXP.test(fields[j])) {\n      throw new TypeError('field argument contains an invalid header name')\n    }\n  }\n\n  // existing, unspecified vary\n  if (header === '*') {\n    return header\n  }\n\n  // enumerate current values\n  var val = header\n  var vals = parse(header.toLowerCase())\n\n  // unspecified vary\n  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {\n    return '*'\n  }\n\n  for (var i = 0; i < fields.length; i++) {\n    var fld = fields[i].toLowerCase()\n\n    // append value (case-preserving)\n    if (vals.indexOf(fld) === -1) {\n      vals.push(fld)\n      val = val\n        ? val + ', ' + fields[i]\n        : fields[i]\n    }\n  }\n\n  return val\n}\n\n/**\n * Parse a vary header into an array.\n *\n * @param {String} header\n * @return {Array}\n * @private\n */\n\nfunction parse (header) {\n  var end = 0\n  var list = []\n  var start = 0\n\n  // gather tokens\n  for (var i = 0, len = header.length; i < len; i++) {\n    switch (header.charCodeAt(i)) {\n      case 0x20: /*   */\n        if (start === end) {\n          start = end = i + 1\n        }\n        break\n      case 0x2c: /* , */\n        list.push(header.substring(start, end))\n        start = end = i + 1\n        break\n      default:\n        end = i + 1\n        break\n    }\n  }\n\n  // final token\n  list.push(header.substring(start, end))\n\n  return list\n}\n\n/**\n * Mark that a request is varied on a header field.\n *\n * @param {Object} res\n * @param {String|Array} field\n * @public\n */\n\nfunction vary (res, field) {\n  if (!res || !res.getHeader || !res.setHeader) {\n    // quack quack\n    throw new TypeError('res argument is required')\n  }\n\n  // get existing header\n  var val = res.getHeader('Vary') || ''\n  var header = Array.isArray(val)\n    ? val.join(', ')\n    : String(val)\n\n  // set new header\n  if ((val = append(header, field))) {\n    res.setHeader('Vary', val)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdmFyeS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxjQUFjO0FBQ3pCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsY0FBYztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1nZW5raXQvLi9ub2RlX21vZHVsZXMvdmFyeS9pbmRleC5qcz8zMGQ4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogdmFyeVxuICogQ29weXJpZ2h0KGMpIDIwMTQtMjAxNyBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB2YXJ5XG5tb2R1bGUuZXhwb3J0cy5hcHBlbmQgPSBhcHBlbmRcblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggZmllbGQtbmFtZSBpbiBSRkMgNzIzMCBzZWMgMy4yXG4gKlxuICogZmllbGQtbmFtZSAgICA9IHRva2VuXG4gKiB0b2tlbiAgICAgICAgID0gMSp0Y2hhclxuICogdGNoYXIgICAgICAgICA9IFwiIVwiIC8gXCIjXCIgLyBcIiRcIiAvIFwiJVwiIC8gXCImXCIgLyBcIidcIiAvIFwiKlwiXG4gKiAgICAgICAgICAgICAgIC8gXCIrXCIgLyBcIi1cIiAvIFwiLlwiIC8gXCJeXCIgLyBcIl9cIiAvIFwiYFwiIC8gXCJ8XCIgLyBcIn5cIlxuICogICAgICAgICAgICAgICAvIERJR0lUIC8gQUxQSEFcbiAqICAgICAgICAgICAgICAgOyBhbnkgVkNIQVIsIGV4Y2VwdCBkZWxpbWl0ZXJzXG4gKi9cblxudmFyIEZJRUxEX05BTUVfUkVHRVhQID0gL15bISMkJSYnKitcXC0uXl9gfH4wLTlBLVphLXpdKyQvXG5cbi8qKlxuICogQXBwZW5kIGEgZmllbGQgdG8gYSB2YXJ5IGhlYWRlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBhcHBlbmQgKGhlYWRlciwgZmllbGQpIHtcbiAgaWYgKHR5cGVvZiBoZWFkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaGVhZGVyIGFyZ3VtZW50IGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghZmllbGQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmaWVsZCBhcmd1bWVudCBpcyByZXF1aXJlZCcpXG4gIH1cblxuICAvLyBnZXQgZmllbGRzIGFycmF5XG4gIHZhciBmaWVsZHMgPSAhQXJyYXkuaXNBcnJheShmaWVsZClcbiAgICA/IHBhcnNlKFN0cmluZyhmaWVsZCkpXG4gICAgOiBmaWVsZFxuXG4gIC8vIGFzc2VydCBvbiBpbnZhbGlkIGZpZWxkIG5hbWVzXG4gIGZvciAodmFyIGogPSAwOyBqIDwgZmllbGRzLmxlbmd0aDsgaisrKSB7XG4gICAgaWYgKCFGSUVMRF9OQU1FX1JFR0VYUC50ZXN0KGZpZWxkc1tqXSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ZpZWxkIGFyZ3VtZW50IGNvbnRhaW5zIGFuIGludmFsaWQgaGVhZGVyIG5hbWUnKVxuICAgIH1cbiAgfVxuXG4gIC8vIGV4aXN0aW5nLCB1bnNwZWNpZmllZCB2YXJ5XG4gIGlmIChoZWFkZXIgPT09ICcqJykge1xuICAgIHJldHVybiBoZWFkZXJcbiAgfVxuXG4gIC8vIGVudW1lcmF0ZSBjdXJyZW50IHZhbHVlc1xuICB2YXIgdmFsID0gaGVhZGVyXG4gIHZhciB2YWxzID0gcGFyc2UoaGVhZGVyLnRvTG93ZXJDYXNlKCkpXG5cbiAgLy8gdW5zcGVjaWZpZWQgdmFyeVxuICBpZiAoZmllbGRzLmluZGV4T2YoJyonKSAhPT0gLTEgfHwgdmFscy5pbmRleE9mKCcqJykgIT09IC0xKSB7XG4gICAgcmV0dXJuICcqJ1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmxkID0gZmllbGRzW2ldLnRvTG93ZXJDYXNlKClcblxuICAgIC8vIGFwcGVuZCB2YWx1ZSAoY2FzZS1wcmVzZXJ2aW5nKVxuICAgIGlmICh2YWxzLmluZGV4T2YoZmxkKSA9PT0gLTEpIHtcbiAgICAgIHZhbHMucHVzaChmbGQpXG4gICAgICB2YWwgPSB2YWxcbiAgICAgICAgPyB2YWwgKyAnLCAnICsgZmllbGRzW2ldXG4gICAgICAgIDogZmllbGRzW2ldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG4vKipcbiAqIFBhcnNlIGEgdmFyeSBoZWFkZXIgaW50byBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2UgKGhlYWRlcikge1xuICB2YXIgZW5kID0gMFxuICB2YXIgbGlzdCA9IFtdXG4gIHZhciBzdGFydCA9IDBcblxuICAvLyBnYXRoZXIgdG9rZW5zXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBoZWFkZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBzd2l0Y2ggKGhlYWRlci5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDB4MjA6IC8qICAgKi9cbiAgICAgICAgaWYgKHN0YXJ0ID09PSBlbmQpIHtcbiAgICAgICAgICBzdGFydCA9IGVuZCA9IGkgKyAxXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMHgyYzogLyogLCAqL1xuICAgICAgICBsaXN0LnB1c2goaGVhZGVyLnN1YnN0cmluZyhzdGFydCwgZW5kKSlcbiAgICAgICAgc3RhcnQgPSBlbmQgPSBpICsgMVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZW5kID0gaSArIDFcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBmaW5hbCB0b2tlblxuICBsaXN0LnB1c2goaGVhZGVyLnN1YnN0cmluZyhzdGFydCwgZW5kKSlcblxuICByZXR1cm4gbGlzdFxufVxuXG4vKipcbiAqIE1hcmsgdGhhdCBhIHJlcXVlc3QgaXMgdmFyaWVkIG9uIGEgaGVhZGVyIGZpZWxkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBmaWVsZFxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHZhcnkgKHJlcywgZmllbGQpIHtcbiAgaWYgKCFyZXMgfHwgIXJlcy5nZXRIZWFkZXIgfHwgIXJlcy5zZXRIZWFkZXIpIHtcbiAgICAvLyBxdWFjayBxdWFja1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlcyBhcmd1bWVudCBpcyByZXF1aXJlZCcpXG4gIH1cblxuICAvLyBnZXQgZXhpc3RpbmcgaGVhZGVyXG4gIHZhciB2YWwgPSByZXMuZ2V0SGVhZGVyKCdWYXJ5JykgfHwgJydcbiAgdmFyIGhlYWRlciA9IEFycmF5LmlzQXJyYXkodmFsKVxuICAgID8gdmFsLmpvaW4oJywgJylcbiAgICA6IFN0cmluZyh2YWwpXG5cbiAgLy8gc2V0IG5ldyBoZWFkZXJcbiAgaWYgKCh2YWwgPSBhcHBlbmQoaGVhZGVyLCBmaWVsZCkpKSB7XG4gICAgcmVzLnNldEhlYWRlcignVmFyeScsIHZhbClcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/vary/index.js\n");

/***/ })

};
;