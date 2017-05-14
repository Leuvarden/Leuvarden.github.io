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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return swiperConfigs; });
var swiperConfigs = {
    containerSelector: ".video-container",
    scrollValue: 270,
    paginationSelector: ".video-main .pagination"
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Swiper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs_swiper__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Slider = function () {
    function Slider(params) {
        var _this = this;

        _classCallCheck(this, Slider);

        this.input = params.input;
        this.searchBtn = params.searchBtn;
        this.youtubeApi = params.youtubeApi;
        this.getPost = params.getPost;
        this.swiper = new __WEBPACK_IMPORTED_MODULE_0__Swiper__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__configs_swiper__["a" /* swiperConfigs */], this.loadMoreResults.bind(this));
        this.swiper.init();

        params.searchBtn.addEventListener("click", function () {
            var searchValue = _this.input.value;
            _this.youtubeApi.getSearchResults(searchValue).then(function (videoData) {
                return _this.getPostsArray(videoData);
            }).then(function (postArray) {
                return _this.swiper.loadSlides(postArray);
            });
        });
    }

    _createClass(Slider, [{
        key: "getPostsArray",
        value: function getPostsArray(videoData) {
            var postArray = [];
            for (var i in videoData) {
                postArray.push(this.getPost(videoData[i]));
            }
            return postArray;
        }
    }, {
        key: "loadMoreResults",
        value: function loadMoreResults() {
            var _this2 = this;

            this.youtubeApi.getMoreResults().then(function (videoData) {
                return _this2.getPostsArray(videoData);
            }).then(function (postArray) {
                return _this2.swiper.loadSlides(postArray, true);
            });
        }
    }]);

    return Slider;
}();

/* harmony default export */ __webpack_exports__["a"] = (Slider);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return youtubeDevKey; });
var youtubeDevKey = "AIzaSyBE9a4KoeP73CiLAKWWAcgM4C4uuX1qVLo";

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (videoData) {
    var uploadDate = videoData.publishedAt.slice(0, 10).replace(/-/g, " ");
    var stats = videoData.statistics;
    var post = document.createElement("li");
    post.className = "slide post video";
    post.innerHTML = "<figure>\n                            <a target=\"_blank\" href=\"https://www.youtube.com/watch?v=" + videoData.videoID + "\">\n                                <img src=\"" + videoData.thumbnails.medium.url + "\" alt=\"" + videoData.title + " thumbnail\">\n                            </a>\n                        </figure>\n                        <div class=\"video-info\">\n                            <div class=\"user-info\">\n                                <strong><a href=\"#\" class=\"video-title\">" + videoData.title + "</a><strong>\n                                <div>\n                                    <a href=\"https://www.youtube.com/channel/" + videoData.channelId + "\" class=\"username\">" + videoData.channelTitle + "</a>\n                                    <br><span>" + uploadDate + "</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"icon-bar\">\n                            <span><i class=\"fa fa-eye\"></i> <br> " + stats.viewCount + "</span>\n                            <span><i class=\"fa fa-commenting-o\"></i> <br> " + stats.commentCount + "</span>\n                            <span><i class=\"fa fa-thumbs-up\"></i> <br> " + stats.likeCount + "</span>\n                            <span><i class=\"fa fa-thumbs-down\"></i> <br> " + stats.dislikeCount + "</span>\n                        </div>\n                        <div class=\"video-info\">\n                            <p>" + videoData.description + "</p>\n                        </div>";
    return post;
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeDataProvider = function () {
    function YoutubeDataProvider(key) {
        _classCallCheck(this, YoutubeDataProvider);

        this.key = key;
        this.videosSearchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" + key + "&maxResults=15";
        this.videoStatURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=" + key;
        this.videos = {};
        this.nextPageToken = "";
    }

    _createClass(YoutubeDataProvider, [{
        key: "getVideosSearchURL",
        value: function getVideosSearchURL(query) {
            return this.videosSearchURL + ("&q=" + query);
        }
    }, {
        key: "getVideosStatURL",
        value: function getVideosStatURL(query) {
            return this.videoStatURL + ("&id=" + query);
        }
    }, {
        key: "getNextVideosSearchURL",
        value: function getNextVideosSearchURL() {
            return this.videosSearchURL + ("&pageToken=" + this.nextPageToken);
        }
    }, {
        key: "getVideosStats",
        value: function getVideosStats(videoIDs) {
            var _this = this;

            return fetch(this.getVideosStatURL(videoIDs)).then(function (responce) {
                return responce.json();
            }).then(function (data) {
                data.items.forEach(function (item) {
                    _this.videos[item.id].statistics = item.statistics;
                });
                return true;
            }).catch(function (err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "getSearchResults",
        value: function getSearchResults() {
            var _this2 = this;

            var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            this.videos = {};
            this.nextPageToken = "";
            return fetch(this.getVideosSearchURL(query)).then(function (responce) {
                return responce.json();
            }).then(function (data) {
                return _this2.saveSearchResults(data);
            }).then(function () {
                return _this2.videos;
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "saveSearchResults",
        value: function saveSearchResults(data) {
            var _this3 = this;

            var videosIDs = [];
            this.nextPageToken = data.nextPageToken;
            data.items.forEach(function (item) {
                var videoID = item.id.videoId;
                videosIDs.push(videoID);
                _this3.videos[videoID] = item.snippet;
                _this3.videos[videoID].videoID = videoID;
            });
            return this.getVideosStats(videosIDs.join(","));
        }
    }, {
        key: "getMoreResults",
        value: function getMoreResults() {
            var _this4 = this;

            if (this.nextPageToken == false) {
                throw new Error("ORLY?");
            }
            return fetch(this.getNextVideosSearchURL()).then(function (responce) {
                return responce.json();
            }).then(function (data) {
                return _this4.saveSearchResults(data);
            }).then(function () {
                return _this4.videos;
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }]);

    return YoutubeDataProvider;
}();

/* harmony default export */ __webpack_exports__["a"] = (YoutubeDataProvider);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs_events__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs_swiper__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Swiper = function () {
    function Swiper(config, inTheEndCallback) {
        _classCallCheck(this, Swiper);

        this.originalPosition = 0;
        this.container = document.querySelector(config.containerSelector);
        this.pagination = document.querySelector(config.paginationSelector);
        this.sliderAmount = 0;
        this.scrollValue = config.scrollValue;
        this.transformValue = 0;
        this.currentSlide = 0;
        this.inTheEndCallback = inTheEndCallback;
        this.slideWindow = 0;

        var isMobile = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

        this.eventType = isMobile ? "mobile" : "desktop";
        this._moveHandler = this._moveHandler.bind(this);
        this._endHandler = this._endHandler.bind(this);
        this.animationTimeoutID = null;
    }

    _createClass(Swiper, [{
        key: "_moveHandler",
        value: function _moveHandler(e) {
            var movePosition = e.clientX + "" || e.touches[0].clientX;
            var swipePosition = -(this.originalPosition - +movePosition) - this.transformValue;
            this.container.style.transform = "translateX(" + swipePosition + "px)";
        }
    }, {
        key: "_endHandler",
        value: function _endHandler(e) {
            document.body.removeEventListener(__WEBPACK_IMPORTED_MODULE_0__configs_events__["a" /* events */][this.eventType].move, this._moveHandler);
            document.body.removeEventListener(__WEBPACK_IMPORTED_MODULE_0__configs_events__["a" /* events */][this.eventType].end, this._endHandler);

            var endPosition = e.clientX + "" || e.touches[0].clientX;
            var whereToMove = this.originalPosition < +endPosition ? "left" : "right";

            this.slideTo(whereToMove);
        }
    }, {
        key: "slideTo",
        value: function slideTo(whereToMove) {
            var _this = this;

            this.container.classList.add("animate");

            var transformTo = 0;
            var slideTo = void 0;

            if (typeof whereToMove == "string") {
                if (whereToMove == "left") {
                    transformTo = this.transformValue - this.scrollValue * this.slideWindow;
                    slideTo = this.currentSlide - this.slideWindow;
                } else {
                    transformTo = this.transformValue + this.scrollValue * this.slideWindow;
                    slideTo = this.currentSlide + this.slideWindow;
                }
            } else {
                slideTo = whereToMove * this.slideWindow;
                transformTo = this.scrollValue * whereToMove * this.slideWindow;
            }

            if (transformTo >= 0 && transformTo < this.sliderAmount * this.scrollValue) {
                this.transformValue = transformTo;
                this.currentSlide = slideTo;
                this.updatePaginationValue();

                if (this.currentSlide + 5 >= this.sliderAmount) {
                    this.inTheEndCallback();
                }
            }

            this.container.style.transform = "translateX(" + -this.transformValue + "px)";
            if (this.animationTimeoutID != null) {
                clearInterval(this.animationTimeoutID);
            }

            this.animationTimeoutID = setTimeout(function () {
                _this.container.classList.remove("animate");
                _this.animationTimeoutID = null;
            }, 500);
        }
    }, {
        key: "initHandlers",
        value: function initHandlers() {
            var _this2 = this;

            this.container.addEventListener(__WEBPACK_IMPORTED_MODULE_0__configs_events__["a" /* events */][this.eventType].start, function (e) {
                _this2.originalPosition = e.clientX || e.touches[0].clientX;
                document.body.addEventListener(__WEBPACK_IMPORTED_MODULE_0__configs_events__["a" /* events */][_this2.eventType].move, _this2._moveHandler);
                document.body.addEventListener(__WEBPACK_IMPORTED_MODULE_0__configs_events__["a" /* events */][_this2.eventType].end, _this2._endHandler);
            });

            window.addEventListener("resize", this._resizeHandler.bind(this));
        }
    }, {
        key: "createPaginationDot",
        value: function createPaginationDot(index) {
            var dot = document.createElement("div");
            dot.className = "dot";
            dot.dataset.index = index;
            return dot;
        }
    }, {
        key: "initPagination",
        value: function initPagination() {
            var dotsAmount = this.sliderAmount / this.slideWindow;
            this.pagination.innerHTML = "";
            for (var i = 0; i < dotsAmount; i++) {
                this.pagination.appendChild(this.createPaginationDot(i));
            }
        }
    }, {
        key: "updatePaginationValue",
        value: function updatePaginationValue() {
            var activeDot = this.pagination.querySelector(".dot.active");
            if (activeDot) {
                activeDot.classList.remove("active");
            }
            this.pagination.querySelectorAll(".dot")[Math.round(this.currentSlide / this.slideWindow)].classList.add("active");
        }
    }, {
        key: "initPaginationClickHandler",
        value: function initPaginationClickHandler() {
            var _this3 = this;

            this.pagination.addEventListener("click", function (e) {
                var paginationDot = e.target;
                if (!paginationDot.matches(".dot")) {
                    return;
                } else {
                    var slideToIndex = parseInt(paginationDot.dataset.index);
                    _this3.slideTo(slideToIndex);
                }
            });
        }
    }, {
        key: "init",
        value: function init() {
            this._resizeHandler();
            this.initHandlers();
            this.initPaginationClickHandler();
        }
    }, {
        key: "_resizeHandler",
        value: function _resizeHandler() {
            var newWidth = Math.floor(document.body.offsetWidth / this.scrollValue);
            if (newWidth !== this.slideWindow && newWidth > 0) {
                var slideTo = Math.floor(this.currentSlide / newWidth);
                this.slideWindow = newWidth;
                this.boundContainer();
                this.initPagination();
                this.slideTo(slideTo);
            }
        }
    }, {
        key: "boundContainer",
        value: function boundContainer() {
            this.container.parentNode.style.width = this.slideWindow * this.scrollValue + "px";
        }
    }, {
        key: "loadSlides",
        value: function loadSlides(postsArray, shouldContinue) {
            var _this4 = this;

            if (!shouldContinue) {
                this.transformValue = 0;
                this.currentSlide = 0;
            }
            this.container.innerHTML = "";
            this.sliderAmount = postsArray.length;

            postsArray.forEach(function (elem) {
                _this4.container.appendChild(elem);
            });

            this.initPagination();
            this.slideTo(this.currentSlide / this.slideWindow);
        }
    }]);

    return Swiper;
}();

/* harmony default export */ __webpack_exports__["a"] = (Swiper);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return events; });
var events = {
    "mobile": {
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    },
    "desktop": {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
    }
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__youtubeData__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Slider__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__videoPost__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configs_youtube__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_css__);








var you = new __WEBPACK_IMPORTED_MODULE_0__youtubeData__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__configs_youtube__["a" /* youtubeDevKey */]);

var sliderParams = {
    input: document.querySelector("#searchQuery"),
    searchBtn: document.querySelector("#startSearch"),
    youtubeApi: you,
    getPost: __WEBPACK_IMPORTED_MODULE_2__videoPost__["a" /* default */]
};

//input, searchBtn, youtubeApi, swiper, getPost
var slider = new __WEBPACK_IMPORTED_MODULE_1__Slider__["a" /* default */](sliderParams);

console.log("inited");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, "html, body {\r\n    height: 100%;\r\n    color: #6d6d6d;\r\n    background-color: #d5d5d5;\r\n    font-family: 'Open Sans', sans-serif;\r\n}\r\n\r\nhtml, body, ul, li {\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.nav {\r\n  width: 100%;\r\n  padding: 20px 0;\r\n  margin-bottom: 20px;\r\n  background-color: #6d6d6d;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-content: center;\r\n}\r\n\r\n.nav input, .nav button {\r\n    flex: 0 1 180px;\r\n    padding: 12px 20px 12px 40px;\r\n\r\n    border: 1px solid #ddd;\r\n\r\n    font-size: 16px;\r\n}\r\n\r\n.nav button {\r\n    font-size: 16px;\r\n    border: none;\r\n    cursor: pointer;\r\n    background-color: #e7e7e7;\r\n    color: black;\r\n    position: relative;\r\n}\r\n\r\n.nav button::before {\r\n  position: absolute;\r\n  top: 13px;\r\n  left: -247px;\r\n  content: \"\\F002\";\r\n  font-family: FontAwesome;\r\n  font-size: 16px;\r\n}\r\n\r\n\r\n.video-container {\r\n    display: flex;\r\n    list-style: none;\r\n}\r\n\r\n.video-container.animate {\r\n    transition: transform .5s ease;\r\n}\r\n\r\n.video-wrapper {\r\n    overflow: hidden;\r\n    margin: 0 auto;\r\n}\r\n\r\n.video {\r\n    height: 350px;\r\n    width: 250px;\r\n    background: #ea8157;\r\n    margin: 0 10px;\r\n    flex: 0 0 250px;\r\n}\r\n\r\n.video:last-of-type {\r\n    margin-right: 0;\r\n}\r\n\r\n.pagination {\r\n    text-align: center;\r\n    padding: 15px 10px;\r\n}\r\n\r\n.pagination .dot {\r\n    width: 10px;\r\n    height: 10px;\r\n    background: #555555;\r\n    margin-right: 4px;\r\n    display: inline-block;\r\n    border-radius: 50%;\r\n    cursor: pointer;\r\n}\r\n\r\n.pagination .dot.active {\r\n    background: #ea8157;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n  color: #ea8157;\r\n}\r\n\r\nul {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.slider-container {\r\n  width: 100%;\r\n   overflow: hidden;\r\n  margin: 0;\r\n  padding: 0;\r\n  transition: transform 1s ease;\r\n}\r\n\r\n.slider-wrapper {\r\n  list-style: none;\r\n  display: flex;\r\n}\r\n\r\n.slide {\r\n  width: 250px;\r\n  height: 450px;\r\n  flex: 0 0 250px;\r\n}\r\n\r\n.slide:not(:first-child) {\r\n  margin-left: 10px;\r\n}\r\n\r\n.slider-wrapper.animate {\r\n  transition: transform .6s ease;\r\n}\r\n\r\n.post {\r\n  overflow: hidden;\r\n  padding-bottom: 10px;\r\n  border-radius: 4px;\r\n  background-color: white;\r\n  font-size: 14px;\r\n}\r\n\r\n.post figure {\r\n min-height: 130px;\r\n margin: 0;\r\n background-color: #f2f2f2;\r\n}\r\n\r\n.video-title {\r\n  max-height: 70px;\r\n}\r\n\r\n.video-info {\r\n  display: table;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  padding: 0 15px;\r\n}\r\n\r\n.video-info:not(:last-child) {\r\n  line-height: 30px;\r\n}\r\n\r\n.icon-bar {\r\n    width: 100%;\r\n  }\r\n\r\n.icon-bar span {\r\n  float: left;\r\n  box-sizing: border-box;\r\n  width: 24.5%;\r\n  padding: 15px 0;\r\n  font-size: 12px;\r\n  transition: all 0.3s ease;\r\n  text-align: center;\r\n  border-top: 1px solid #e2e2e2;\r\n  border-right: 1px solid #e2e2e2;\r\n  border-bottom: 1px solid #e2e2e2;\r\n}\r\n\r\n.icon-bar a:hover {\r\n    border-top: 1px solid #f2f2f2;\r\n    border-right: 1px solid #f2f2f2;\r\n    border-bottom: 1px solid #f2f2f2;\r\n    background-color: #f2f2f2;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);