/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
function activate(context) {
    console.log('Congratulations, your extension "markdown-to-jsx" is now active!');
    let mdReader = new MDReader();
    let disposable = vscode.commands.registerCommand('markdown-to-jsx.convertToJSX', () => {
        mdReader.readMarkdown();
    });
    context.subscriptions.push(mdReader);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
class MDReader {
    readMarkdown() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let doc = editor.document;
        if (doc.languageId === "markdown") {
            let sample = this._sample(doc);
            vscode.window.showInformationMessage(sample);
        }
        else {
            vscode.window.showInformationMessage("Only Markdown is available");
        }
        return;
    }
    _sample(doc) {
        console.log("sample");
        return 'hi';
    }
    dispose() {
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map