/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConversionProvider": () => (/* binding */ ConversionProvider)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_services_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


class ConversionProvider {
    handleFile(func) {
        let editor = vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let path = vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor.document.uri.path;
        let doc = editor.document;
        if (doc.languageId === "markdown") {
            switch (func) {
                case "html": {
                    return this._convertHtml(path, doc);
                }
                case "jsx": {
                    return this._convertJSX(path, doc);
                }
                default: {
                    return undefined;
                }
            }
        }
        else {
            vscode__WEBPACK_IMPORTED_MODULE_0__.window.showErrorMessage("Only Markdown is available");
        }
        return undefined;
    }
    _convertHtml(path, doc) {
        return (0,_lib_services_export__WEBPACK_IMPORTED_MODULE_1__.exportHtml)(path, doc);
    }
    _convertJSX(path, doc) {
        return (0,_lib_services_export__WEBPACK_IMPORTED_MODULE_1__.exportJSX)(path, doc);
    }
    dispose() { }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exportHtml": () => (/* binding */ exportHtml),
/* harmony export */   "exportJSX": () => (/* binding */ exportJSX)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _html_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _jsx_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);



function exportHtml(path, data) {
    try {
        if (path) {
            vscode__WEBPACK_IMPORTED_MODULE_0__.window.showInformationMessage("Export Html Completed successfully");
            return (0,_html_parser__WEBPACK_IMPORTED_MODULE_1__.htmlParser)(data.getText());
            // fs.writeFileSync(path.split('.')[0] + ".html", htmlParser(data.getText()), 'utf8');
        }
    }
    catch (err) {
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showErrorMessage("Error Occurred while exporting html file");
    }
    return undefined;
}
function exportJSX(path, data) {
    try {
        if (path) {
            let parsedHtml = (0,_html_parser__WEBPACK_IMPORTED_MODULE_1__.htmlParser)(data.getText());
            return _jsx_parser__WEBPACK_IMPORTED_MODULE_2__.importSection + (0,_jsx_parser__WEBPACK_IMPORTED_MODULE_2__.renderSection)(parsedHtml);
            // fs.writeFileSync(path.split(".")[0] + ".jsx", parsedJSX, "utf8");
        }
    }
    catch (err) {
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showErrorMessage("Error Occurred while exporting JSX file");
    }
    return undefined;
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "File": () => (/* binding */ File),
/* harmony export */   "Directory": () => (/* binding */ Directory),
/* harmony export */   "FSP": () => (/* binding */ FSP)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/*---------------------------------------------------------------------------------------------
 *  This file referenced Microsoft VSCode Extension Sample FSProvider
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


class File {
    constructor(name) {
        this.type = vscode__WEBPACK_IMPORTED_MODULE_0__.FileType.File;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
    }
}
class Directory {
    constructor(name) {
        this.type = vscode__WEBPACK_IMPORTED_MODULE_0__.FileType.Directory;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
        this.entries = new Map();
    }
}
class FSP {
    constructor() {
        this.root = new Directory("");
        // --- manage file events
        this._emitter = new vscode__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this._bufferedEvents = [];
        this.onDidChangeFile = this._emitter.event;
    }
    // --- manage file metadata
    stat(uri) {
        return this._lookup(uri, false);
    }
    readDirectory(uri) {
        const entry = this._lookupAsDirectory(uri, false);
        const result = [];
        for (const [name, child] of entry.entries) {
            result.push([name, child.type]);
        }
        return result;
    }
    // --- manage file contents
    readFile(uri) {
        const data = this._lookupAsFile(uri, false).data;
        if (data) {
            return data;
        }
        throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileNotFound();
    }
    writeFile(uri, content, options) {
        const basename = path__WEBPACK_IMPORTED_MODULE_1__.posix.basename(uri.path);
        const parent = this._lookupParentDirectory(uri);
        let entry = parent.entries.get(basename);
        if (entry instanceof Directory) {
            throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileIsADirectory(uri);
        }
        if (!entry && !options.create) {
            throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileNotFound(uri);
        }
        if (entry && options.create && !options.overwrite) {
            throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileExists(uri);
        }
        if (!entry) {
            entry = new File(basename);
            parent.entries.set(basename, entry);
            this._fireSoon({ type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Created, uri });
        }
        entry.mtime = Date.now();
        entry.size = content.byteLength;
        entry.data = content;
        this._fireSoon({ type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Changed, uri });
    }
    // --- manage files/folders
    rename(oldUri, newUri, options) {
        if (!options.overwrite && this._lookup(newUri, true)) {
            throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileExists(newUri);
        }
        const entry = this._lookup(oldUri, false);
        const oldParent = this._lookupParentDirectory(oldUri);
        const newParent = this._lookupParentDirectory(newUri);
        const newName = path__WEBPACK_IMPORTED_MODULE_1__.posix.basename(newUri.path);
        oldParent.entries.delete(entry.name);
        entry.name = newName;
        newParent.entries.set(newName, entry);
        this._fireSoon({ type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Deleted, uri: oldUri }, { type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Created, uri: newUri });
    }
    delete(uri) {
        const dirname = uri.with({ path: path__WEBPACK_IMPORTED_MODULE_1__.posix.dirname(uri.path) });
        const basename = path__WEBPACK_IMPORTED_MODULE_1__.posix.basename(uri.path);
        const parent = this._lookupAsDirectory(dirname, false);
        if (!parent.entries.has(basename)) {
            throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileNotFound(uri);
        }
        parent.entries.delete(basename);
        parent.mtime = Date.now();
        parent.size -= 1;
        this._fireSoon({ type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Changed, uri: dirname }, { uri, type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Deleted });
    }
    createDirectory(uri) {
        const basename = path__WEBPACK_IMPORTED_MODULE_1__.posix.basename(uri.path);
        const dirname = uri.with({ path: path__WEBPACK_IMPORTED_MODULE_1__.posix.dirname(uri.path) });
        const parent = this._lookupAsDirectory(dirname, false);
        const entry = new Directory(basename);
        parent.entries.set(entry.name, entry);
        parent.mtime = Date.now();
        parent.size += 1;
        this._fireSoon({ type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Changed, uri: dirname }, { type: vscode__WEBPACK_IMPORTED_MODULE_0__.FileChangeType.Created, uri });
    }
    _lookup(uri, silent) {
        const parts = uri.path.split("/");
        let entry = this.root;
        for (const part of parts) {
            if (!part) {
                continue;
            }
            let child;
            if (entry instanceof Directory) {
                child = entry.entries.get(part);
            }
            if (!child) {
                if (!silent) {
                    throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileNotFound(uri);
                }
                else {
                    return undefined;
                }
            }
            entry = child;
        }
        return entry;
    }
    _lookupAsDirectory(uri, silent) {
        const entry = this._lookup(uri, silent);
        if (entry instanceof Directory) {
            return entry;
        }
        throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileNotADirectory(uri);
    }
    _lookupAsFile(uri, silent) {
        const entry = this._lookup(uri, silent);
        if (entry instanceof File) {
            return entry;
        }
        throw vscode__WEBPACK_IMPORTED_MODULE_0__.FileSystemError.FileIsADirectory(uri);
    }
    _lookupParentDirectory(uri) {
        const dirname = uri.with({ path: path__WEBPACK_IMPORTED_MODULE_1__.posix.dirname(uri.path) });
        return this._lookupAsDirectory(dirname, false);
    }
    watch(_resource) {
        // ignore, fires for all changes...
        return new vscode__WEBPACK_IMPORTED_MODULE_0__.Disposable(() => { });
    }
    _fireSoon(...events) {
        this._bufferedEvents.push(...events);
        if (this._fireSoonHandle) {
            clearTimeout(this._fireSoonHandle);
        }
        this._fireSoonHandle = setTimeout(() => {
            this._emitter.fire(this._bufferedEvents);
            this._bufferedEvents.length = 0;
        }, 5);
    }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlParser": () => (/* binding */ htmlParser)
/* harmony export */ });
function htmlParser(md) {
    //ul
    md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
    //ol
    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
    //h
    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
    //alt h
    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    });
    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
    return md;
}


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "importSection": () => (/* binding */ importSection),
/* harmony export */   "renderSection": () => (/* binding */ renderSection)
/* harmony export */ });
const importSection = `import React from 'react';`;
function renderSection(code) {
    return `export default function Output() {
    return (
      <div>${code}</div>
    )
  }`;
}


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activate": () => (/* binding */ activate),
/* harmony export */   "deactivate": () => (/* binding */ deactivate)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _provider_conversionProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _provider_fsSystemProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);



async function activate(context) {
    console.log("Markdown to JSX is activated");
    const conversionProvider = new _provider_conversionProvider__WEBPACK_IMPORTED_MODULE_1__.ConversionProvider();
    const fileSystemProvider = new _provider_fsSystemProvider__WEBPACK_IMPORTED_MODULE_2__.FSP();
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.registerFileSystemProvider("mdJSX", fileSystemProvider, {
        isCaseSensitive: true,
    }));
    context.subscriptions.push(conversionProvider);
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand("markdown-to-jsx.initialize", () => {
        vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.updateWorkspaceFolders(0, 0, {
            uri: vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse("mdJSX:/"),
            name: "MD2JSX",
        });
    }));
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand("markdown-to-jsx.convertToJSX", () => {
        const jsxData = conversionProvider.handleFile("jsx");
        if (jsxData) {
            fileSystemProvider.writeFile(vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse(`mdJSX:/output.jsx`), Buffer.from(jsxData), { create: true, overwrite: true });
        }
    }));
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand("markdown-to-jsx.convertToHtml", () => {
        const htmlData = conversionProvider.handleFile("html");
        if (htmlData) {
            fileSystemProvider.writeFile(vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse(`mdJSX:/output.html`), Buffer.from(htmlData), { create: true, overwrite: true });
        }
    }));
}
// this method is called when your extension is deactivated
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map