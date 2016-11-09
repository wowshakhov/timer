/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	function delay(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            setTimeout(function () { orig.apply(this, args); }, ms);
	        };
	        return descriptor;
	    };
	}
	function debounce(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        var flag = true; //:(
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (flag) {
	                orig.apply(this, args);
	                flag = false;
	                setTimeout(function () { flag = true; }, ms);
	            }
	        };
	        return descriptor;
	    };
	}
	function throttle(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        var flag = true; //:(
	        var call = false; //:(
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (flag) {
	                orig.apply(this, args);
	                flag = false;
	                setTimeout(function () {
	                    flag = true;
	                    if (call) {
	                        orig.apply(this, args);
	                        call = false;
	                    }
	                }, ms);
	            }
	            else {
	                call = true;
	            }
	            return descriptor;
	        };
	    };
	}
	var Test = (function () {
	    function Test() {
	    }
	    Test.prototype.write = function (s) {
	        console.log(s);
	    };
	    __decorate([
	        throttle(3000)
	    ], Test.prototype, "write", null);
	    return Test;
	}());
	var test = new Test();
	test.write("test");
	setTimeout(function () { test.write("test"); }, 1000);
	setTimeout(function () { test.write("test"); }, 1100);
	setTimeout(function () { test.write("test"); }, 1200);


/***/ }
/******/ ]);