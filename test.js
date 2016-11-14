exports["timer"] =
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var lib_1 = __webpack_require__(1);
	var Test = (function () {
	    function Test() {
	        this.flag = 0;
	        this.flag = 0;
	    }
	    Test.prototype.test_delay = function () {
	        this.flag++;
	    };
	    Test.prototype.test_debounce = function () {
	        this.flag++;
	    };
	    Test.prototype.test_throttle = function () {
	        this.flag++;
	    };
	    Test.prototype.test_cumulative_debounce = function () {
	        this.flag++;
	    };
	    __decorate([
	        lib_1.delay(1000)
	    ], Test.prototype, "test_delay", null);
	    __decorate([
	        lib_1.debounce(1000)
	    ], Test.prototype, "test_debounce", null);
	    __decorate([
	        lib_1.throttle(1000)
	    ], Test.prototype, "test_throttle", null);
	    __decorate([
	        lib_1.cumulative_debounce(1000)
	    ], Test.prototype, "test_cumulative_debounce", null);
	    return Test;
	}());
	exports.Test = Test;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	/*
	delay decorator -- delays function calls by ms milliseconds

	ms: number -- delay in milliseconds

	returns function descriptor
	*/
	function delay(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        descriptor.value = function () {
	            var _this = this;
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            setTimeout(function () {
	                //call function with original arguments after timeout ms
	                orig.apply(_this, args);
	            }, ms);
	        };
	        return descriptor;
	    };
	}
	exports.delay = delay;
	/*
	debounce decorator -- prevents successive calls of a function within ms milliseconds

	ms: number -- time interval in milliseconds

	returns function descriptor
	*/
	function debounce(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        //flag indicates if the function is in the cooldown state
	        var flag = true;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            //if function isn't in cooldown
	            if (flag) {
	                //call function with original arguments
	                orig.apply(this, args);
	                //prevent following calls
	                flag = false;
	                //allow calls after ms milliseconds
	                setTimeout(function () {
	                    flag = true;
	                }, ms);
	            }
	        };
	        return descriptor;
	    };
	}
	exports.debounce = debounce;
	/*
	cumulative_debounce decorator -- prevents successive calls of a function within ms milliseconds
	if the function is called during cooldown. the cooldown period extends by another ms milliseconds

	ms: number -- time interval in milliseconds

	returns function descriptor
	*/
	function cumulative_debounce(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        var flag = true;
	        //timer identifier
	        var time = null;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (flag) {
	                orig.apply(this, args);
	                flag = false;
	                time = setTimeout(function () {
	                    flag = true;
	                }, ms);
	            }
	            else {
	                //if in cooldown - extend the cooldown period by resetting the timer
	                clearTimeout(time);
	                time = setTimeout(function () {
	                    flag = true;
	                }, ms);
	            }
	        };
	        return descriptor;
	    };
	}
	exports.cumulative_debounce = cumulative_debounce;
	/*
	throttle  decorator -- prevents successive calls of a function within ms milliseconds
	with guaranteed call after the last cooldown period

	ms: number -- time interval in milliseconds

	returns function descriptor
	*/
	function throttle(ms) {
	    return function (target, property, descriptor) {
	        var orig = descriptor.value;
	        var flag = true;
	        //true if there was a call during the cooldown period
	        var call = false;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (flag) {
	                orig.apply(this, args);
	                flag = false;
	                var that_1 = this;
	                var g = function h() {
	                    setTimeout(function () {
	                        //allow function calls
	                        flag = true;
	                        //if there was a call during cooldown
	                        if (call) {
	                            //perform the call
	                            orig.apply(that_1, args);
	                            //start cooldown again
	                            call = false;
	                            flag = false;
	                            h();
	                        }
	                    }, ms);
	                };
	                //start cooldown
	                g();
	            }
	            else {
	                call = true;
	            }
	        };
	    };
	}
	exports.throttle = throttle;


/***/ }
/******/ ]);