/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var item = {\r\n    name: \"name\",\r\n    attr: \"attributes\",\r\n    temp: 1,\r\n    childs: [\r\n        {\r\n            name: \"name\",\r\n            attr: \"attributes\",\r\n            temp: 2,\r\n            childs: [\r\n                {\r\n                    name: \"name\",\r\n                    attr: \"attributes\",\r\n                    temp: 3,\r\n                    childs: []\r\n                },\r\n                {\r\n                    name: \"name\",\r\n                    attr: \"attributes\",\r\n                    temp: 4,\r\n                    childs: [\r\n                        {\r\n                            name: \"name\",\r\n                            attr: \"attributes\",\r\n                            temp: 5,\r\n                            childs: []\r\n                        },\r\n                        {\r\n                            name: \"name\",\r\n                            attr: \"attributes\",\r\n                            temp: 6,\r\n                            childs: []\r\n                        }\r\n                    ]\r\n                },\r\n                {\r\n                    name: \"name\",\r\n                    attr: \"attributes\",\r\n                    temp: 7,\r\n                    childs: []\r\n                }\r\n            ]\r\n        },\r\n        {\r\n            name: \"name\",\r\n            attr: \"attributes\",\r\n            temp: 8,\r\n            childs: []\r\n        },\r\n        {\r\n            name: \"name\",\r\n            attr: \"attributes\",\r\n            temp: 9,\r\n            childs: []\r\n        }\r\n    ]\r\n};\r\nvar Tree = /** @class */ (function () {\r\n    function Tree() {\r\n        //  console.log(JSON.stringify(item));\r\n    }\r\n    Tree.prototype._readTree = function (object) {\r\n        var _this = this;\r\n        var ulInner = document.createElement('ul');\r\n        ulInner.className = \"ulInner\";\r\n        var span = document.createElement('span');\r\n        span.className = 'drawTree__title';\r\n        var div = document.createElement('div');\r\n        div.className = 'display-flex tempBlock';\r\n        var li = document.createElement('li');\r\n        li.className = 'drawTree__item';\r\n        var itemInterfaceMenu = ['add', 'delete', 'edit'];\r\n        var _loop_1 = function (key) {\r\n            if (key === \"name\") {\r\n                var spanButton = document.createElement('span');\r\n                spanButton.className = 'drawTree__button';\r\n                spanButton.textContent = \"+\";\r\n                spanButton.addEventListener(\"click\", function (e) {\r\n                    var target = e.target;\r\n                    if (target.parentElement) {\r\n                        if (target.parentElement.nextElementSibling) {\r\n                            target.parentElement.nextElementSibling.classList.toggle('item-open');\r\n                            target.textContent === \"-\" ? target.textContent = \"+\" : target.textContent = \"-\";\r\n                        }\r\n                    }\r\n                });\r\n                div.appendChild(spanButton);\r\n                span.textContent = object[key].toString() + object.temp;\r\n                div.appendChild(span);\r\n                var itemInterface_1 = document.createElement('ul');\r\n                itemInterface_1.className = \"itemInterface margin-left-15px\";\r\n                itemInterfaceMenu.forEach(function (item) {\r\n                    var itemInterface__item = document.createElement('li');\r\n                    itemInterface__item.innerHTML = item;\r\n                    itemInterface__item.className = \"itemInterface__item \";\r\n                    itemInterface_1.appendChild(itemInterface__item);\r\n                });\r\n                div.appendChild(itemInterface_1);\r\n                li.appendChild(div);\r\n            }\r\n            if (Array.isArray(object[key]) && (object[key].length > 0))\r\n                object[key].forEach(function (item) { return ulInner.appendChild(_this._readTree(item)); });\r\n        };\r\n        //  const id:string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);\r\n        for (var key in object) {\r\n            _loop_1(key);\r\n        }\r\n        if (ulInner.childNodes.length > 0)\r\n            li.appendChild(ulInner);\r\n        //   return ulMain; //TODO: почему нельзя сразу вернуть ui.appendChild(li).\r\n        return li;\r\n    };\r\n    Tree.prototype.drawTree = function (object) {\r\n        var ulMain = document.createElement('ul');\r\n        ulMain.className = \"ulMain\";\r\n        if (object) {\r\n            var readyTree = this._readTree(object);\r\n            ulMain.appendChild(readyTree);\r\n        }\r\n        return ulMain;\r\n    };\r\n    return Tree;\r\n}());\r\nvar myTree = new Tree;\r\nvar treeview = document.getElementById('treeview');\r\nif (treeview)\r\n    treeview.appendChild(myTree.drawTree(item));\r\nvar fileInput = document.getElementById(\"fileupload\");\r\nif (fileInput)\r\n    fileInput.addEventListener('change', readFile, false);\r\nfunction readFile(upload) {\r\n    var target = upload.target;\r\n    var reader = new FileReader();\r\n    if (target && target.files) {\r\n        reader.readAsText(target.files[0]);\r\n        reader.onload = function () {\r\n            var result = reader.result;\r\n            //console.log( typeof reader.result);\r\n            console.log(JSON.parse(result));\r\n        };\r\n        reader.onerror = function () {\r\n            console.log(reader.error);\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });