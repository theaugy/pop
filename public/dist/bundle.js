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
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(70);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Song_1 = __webpack_require__(52);
var Tag_1 = __webpack_require__(104);
var Tags_1 = __webpack_require__(17);
var Query_1 = __webpack_require__(105);
var Queue_1 = __webpack_require__(53);
var Player_1 = __webpack_require__(30);
var Player_2 = __webpack_require__(51);
function makeArgs(args) {
    var ret = [];
    for (var i = 0; i < args.length; i += 2) {
        ret.push(encodeURIComponent(args[i])
            + "=" +
            encodeURIComponent(args[i + 1]));
    }
    return ret.join("&");
}
Query_1.default.update.addCallback({
    id: "AutoLoadQueue",
    cb: function () {
        Queue_1.default.setSongs(Query_1.default.songs);
    }
});
var BackendImpl = (function () {
    function BackendImpl() {
        this.requestCount = 0;
        this.totalRequests = 0;
    }
    BackendImpl.prototype.requestStart = function () {
        ++this.requestCount;
        ++this.totalRequests;
    };
    BackendImpl.prototype.requestFinish = function () {
        --this.requestCount;
    };
    BackendImpl.prototype.playerStatusReceived = function (response) {
        var s = JSON.parse(response);
        var state = new Player_2.default();
        state.status = s.status;
        state.title = s.title;
        state.artist = s.artist;
        state.album = s.album;
        state.path = s.path;
        state.duration = parseInt(s.duration);
        state.position = parseInt(s.position);
        state.shuffle = s.shuffle === "true";
        Player_1.default.setState(state);
    };
    BackendImpl.prototype.queueStatusReceived = function (response) {
        var qs = JSON.parse(response);
        Queue_1.default.setSongs(this.cmusToPopSongs(qs.songs));
    };
    BackendImpl.prototype.cmusToPopSongs = function (cmus) {
        var _this = this;
        var ret = [];
        cmus.forEach(function (s) { ret.push(_this.cmusToPopSong(s)); });
        return ret;
    };
    BackendImpl.prototype.cmusToPopSong = function (cmus) {
        var tags = [];
        // convert tag names to actual Tags
        cmus.tags.forEach(function (tname) {
            var t = Tags_1.default.getTag(tname);
            if (t) {
                tags.push(t);
            }
        });
        var song = new Song_1.default;
        // copy fields into a song
        song.artist = cmus.artist;
        song.title = cmus.title;
        song.album = cmus.album;
        song.year = cmus.year;
        song.length = cmus.length;
        song.track = cmus.track;
        song.id = cmus.id;
        song.format = cmus.format;
        song.bitrate = cmus.bitrate;
        song.path = cmus.path;
        song.tags = tags;
        return song;
    };
    BackendImpl.prototype.cmusToPopTag = function (t) {
        return new Tag_1.default(t.name, t.count);
    };
    BackendImpl.prototype.cmusToPopTags = function (tags) {
        var popTags = [];
        for (var i = 0; i < tags.length; ++i) {
            var t = Tags_1.default.getTag(tags[i].name);
            if (t === null) {
                t = this.cmusToPopTag(tags[i]);
            }
            else {
                t.count = tags[i].count;
            }
            popTags.push(t);
        }
        return popTags;
    };
    BackendImpl.prototype.tagsReceived = function (response) {
        var parsed = JSON.parse(response);
        parsed.sort(function (a, b) { return a.name.localeCompare(b.name); });
        Tags_1.default.setTags(this.cmusToPopTags(parsed));
    };
    BackendImpl.prototype.requestAndUpdatePlayerStatus = function (req) {
        var This = this;
        var cb = function (response) {
            This.playerStatusReceived(response);
        };
        this.request({ path: req, callback: cb });
    };
    BackendImpl.prototype.requestAndUpdateQueueStatus = function (req) {
        var This = this;
        var cb = function (response) {
            This.queueStatusReceived(response);
        };
        this.request({ path: req, callback: cb });
    };
    BackendImpl.prototype.requestAndUpdateTags = function (req) {
        var This = this;
        var cb = function (response) {
            This.tagsReceived(response);
        };
        this.request({ path: req, callback: cb });
    };
    BackendImpl.prototype.requestAndInitCmusPlaylist = function (req) {
        var This = this;
        var cb = function (response) {
            This.queueStatusReceived(response);
            // _after_ receiving the initial cmus playlist, hook things up
            // so that whenever we update the queue, we will also update
            // the cmus playlist.
            Queue_1.default.update.removeCallback("KeepCmusInSyncWithQueue");
            Queue_1.default.update.addCallback({
                id: "KeepCmusInSyncWithQueue",
                cb: function () {
                    exports.Server.SetCmusPlaylist(Queue_1.default.songs);
                }
            });
        };
        this.request({ path: req, callback: cb });
    };
    // gets the cmus remote url
    BackendImpl.prototype.serverUrl = function () {
        // NOTE: If you wanted to redirect everything to a different server,
        // you would do that here.
        //return "http://" + window.location.hostname+ ":8000" + "/cmus";
        return "http://pi:8000/cmus";
        //return "cmus";
    };
    BackendImpl.prototype.request = function (req) {
        this.requestStart();
        var r = new XMLHttpRequest();
        var rstr = this.serverUrl() + "/" + req.path;
        var This = this;
        r.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    This.requestFinish();
                    if (req.callback)
                        req.callback(this.responseText);
                }
                else {
                }
            }
        };
        r.open("GET", rstr, true);
        r.setRequestHeader("Cache-Control", "no-cache");
        r.send();
    };
    BackendImpl.prototype.post = function (req, data) {
        this.requestStart();
        var r = new XMLHttpRequest();
        var rstr = this.serverUrl() + "/" + req.path;
        var This = this;
        r.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    This.requestFinish();
                    if (req.callback)
                        req.callback(this.responseText);
                }
                else {
                }
            }
        };
        r.open("POST", rstr, true);
        r.setRequestHeader("Cache-Control", "no-cache");
        r.send(data);
    };
    BackendImpl.prototype.Play = function () {
        this.requestAndUpdatePlayerStatus("play");
    };
    BackendImpl.prototype.Shuffle = function () {
        this.requestAndUpdatePlayerStatus("shuffle");
    };
    BackendImpl.prototype.Pause = function () {
        this.requestAndUpdatePlayerStatus("pause");
    };
    BackendImpl.prototype.NextSong = function () {
        this.requestAndUpdatePlayerStatus("next");
    };
    BackendImpl.prototype.PreviousSong = function () {
        this.requestAndUpdatePlayerStatus("prev");
    };
    /*
    // You probably shouldn't be calling this, because
    // if you supply a callback, you will get the
    // raw status response from the backend passed to
    // your callback. You'd probably rather call
    // UpdatePlayerStatus() and response to NewPlayerStatus
    // event.
    GetPlayerStatus(callback) {
        this.request("status", callback);
    }
    */
    BackendImpl.prototype.UpdatePlayerStatus = function () {
        this.requestAndUpdatePlayerStatus("status");
    };
    BackendImpl.prototype.UpdateTags = function () {
        this.requestAndUpdateTags("tagStatus");
    };
    BackendImpl.prototype.FavoriteCurrentSong = function () {
        this.request({ path: "fav", callback: function () { } }); // elicits no response
    };
    BackendImpl.prototype.SeekForward1Minute = function () {
        this.requestAndUpdatePlayerStatus("f1m");
    };
    BackendImpl.prototype.SeekBackward1Minute = function () {
        this.requestAndUpdatePlayerStatus("b1m");
    };
    BackendImpl.prototype.SeekToSecond = function (second) {
        var s = "" + second;
        this.requestAndUpdatePlayerStatus("seekto?" + makeArgs(["s", s]));
    };
    BackendImpl.prototype.QueueJump = function (song) {
        this.requestAndUpdatePlayerStatus("queueJump?" + makeArgs(['path', song.path]));
    };
    BackendImpl.prototype.TagSong = function (tag, song) {
        song.tags.push(tag);
        this.requestAndUpdateTags("tag?" + makeArgs(['tag', tag.name, 'path', song.path]));
    };
    BackendImpl.prototype.TagSongs = function (tag, songs) {
        var args = ['tag', tag.name];
        songs.forEach(function (s) { args.push("path"); args.push(s.path); s.tags.push(tag); });
        this.requestAndUpdateTags("tag?" + makeArgs(args));
    };
    // array removal
    BackendImpl.prototype.arem = function (a, v) {
        var i = a.indexOf(v);
        if (i >= 0) {
            a.splice(i, 1);
        }
    };
    BackendImpl.prototype.UntagSong = function (tag, song) {
        this.arem(song.tags, tag);
        this.requestAndUpdateTags("untag?" + makeArgs(['tag', tag.name, 'path', song.path]));
    };
    BackendImpl.prototype.DeleteTag = function (tag) {
        this.requestAndUpdateTags("tagDelete?" + makeArgs(['tag', tag.name]));
    };
    BackendImpl.prototype.UntagSongs = function (tag, songs) {
        var _this = this;
        var args = ['tag', tag.name];
        songs.forEach(function (s) { args.push("path"); args.push(s.path); _this.arem(s.tags, tag); });
        this.requestAndUpdateTags("untag?" + makeArgs(args));
    };
    // args=name,value,name,value,etc
    BackendImpl.prototype.RunServerSideTool = function (args, callback) {
        this.request({ path: "tool?" + makeArgs(args), callback: callback });
    };
    BackendImpl.prototype.SwitchToChromecast = function () {
        this.RunServerSideTool(['name', 'chromecast'], function () { });
    };
    BackendImpl.prototype.SwitchToDesk = function () {
        this.RunServerSideTool(['name', 'desk'], function () { });
    };
    //
    // NOTE: These queries-that-accept-callbacks need to change. There should
    // be the ui-code-facing layer, which just takes inputs and hardcodes the
    // callbacks; those callbacks update backend state and trigger events to
    // notify ui code when things change.
    //
    BackendImpl.prototype.requestAndReceiveQuery = function (path) {
        var _this = this;
        var cb = function (res) {
            var parsed = JSON.parse(res);
            Query_1.default.setSongs(_this.cmusToPopSongs(parsed.songs));
        };
        this.request({ path: path, callback: cb });
    };
    // returns something like { songs: [ song1, song2, ... ] }
    BackendImpl.prototype.SearchForSongs = function (query) {
        this.requestAndReceiveQuery("search?" + makeArgs(["q", query]));
    };
    BackendImpl.prototype.SearchForTag = function (tag) {
        this.requestAndReceiveQuery("tagFetch?" + makeArgs(["tag", tag.name]));
    };
    BackendImpl.prototype.GetRandomTaggedSongs = function (n) {
        var nstr = "" + n;
        this.requestAndReceiveQuery("randomTagged?" + makeArgs(["n", nstr]));
    };
    // same return as SearchForSongs
    BackendImpl.prototype.GetRandomSongs = function (n) {
        var nstr = "" + n;
        this.requestAndReceiveQuery("random?" + makeArgs(["n", nstr]));
    };
    // This is used to tell cmus what to put in its "now playing" or "current" playlist.
    // We ignore the response
    BackendImpl.prototype.SetCmusPlaylist = function (songs) {
        var args = [];
        var cb = function () { };
        songs.forEach(function (s) { return args.push(s.path); });
        this.post({
            path: "setMain?" + makeArgs(['bodyFormat', 'NewlineSeparatedPaths']),
            callback: cb
        }, args.join("\n"));
    };
    BackendImpl.prototype.SetCmusPlaylistPos = function (pos) {
        var p = "" + pos;
        this.requestAndUpdatePlayerStatus("setMainPos?" + makeArgs(['pos', p]));
    };
    // NOTE: this should only be called once on page startup. probably.
    BackendImpl.prototype.GetCmusPlaylist = function () {
        this.requestAndInitCmusPlaylist("getMain");
    };
    BackendImpl.prototype.LoadAugysPhone = function () {
        this.request({ path: "loadAugysPhone", callback: function (response) {
                console.log(response);
            } });
    };
    BackendImpl.prototype.LoadStellasPhone = function () {
        this.request({ path: "loadStellasPhone", callback: function (response) {
                console.log(response);
            } });
    };
    return BackendImpl;
}());
exports.BackendImpl = BackendImpl;
exports.Server = new BackendImpl();
exports.default = exports.Server;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(147),
    getValue = __webpack_require__(170);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    getPrototype = __webpack_require__(166),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(225)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(224)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(13);
var _Signals = (function () {
    function _Signals() {
        this.trackShowEvent = new Events.Event("TrackShow");
        this.trackInfoEvent = new Events.Event("TrackInfo");
        this.fieldSelectedEvent = new Events.Event("FieldSelected");
        this.selectCurrentSongEvent = new Events.Event("SelectCurrentSong");
        this.selectAllSongsEvent = new Events.Event("SelectAllSongs");
        this.deselectAllSongsEvent = new Events.Event("DeselectAllSongs");
        this.tagSelectedSongsEvent = new Events.Event("TagSelectedSongs");
        this.untagSelectedSongsEvent = new Events.Event("UntagSelectedSongs");
    }
    _Signals.prototype.trackShowByPath = function (p) {
        this.trackShowPath = p;
        this.trackShowEvent.trigger();
    };
    _Signals.prototype.trackInfo = function (s) {
        this.trackInfoSong = s;
        this.trackInfoEvent.trigger();
    };
    _Signals.prototype.fieldSelected = function (f) {
        this.fieldSelectedField = f;
        this.fieldSelectedEvent.trigger();
    };
    _Signals.prototype.selectCurrentSong = function () {
        this.selectCurrentSongEvent.trigger();
    };
    _Signals.prototype.selectAllSongs = function () {
        this.selectAllSongsEvent.trigger();
    };
    _Signals.prototype.deselectAllSongs = function () {
        this.deselectAllSongsEvent.trigger();
    };
    _Signals.prototype.tagSelectedSongs = function () {
        this.tagSelectedSongsEvent.trigger();
    };
    _Signals.prototype.untagSelectedSongs = function () {
        this.untagSelectedSongsEvent.trigger();
    };
    return _Signals;
}());
;
var Signals = new _Signals();
exports.default = Signals;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(79),
    overRest = __webpack_require__(76),
    setToString = __webpack_require__(77);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(name) {
        this.name = name;
        this.callbacks = [];
        this.count = 0;
    }
    Event.prototype.getName = function () {
        return this.name;
    };
    Event.prototype.addCallback = function (cb) {
        this.callbacks.push(cb);
    };
    Event.prototype.removeCallback = function (id) {
        var i = 0;
        for (i = 0; i < this.callbacks.length; ++i) {
            if (this.callbacks[i].id == id) {
                break;
            }
        }
        if (i >= 0 && i < this.callbacks.length) {
            this.callbacks.splice(i, 1);
        }
    };
    Event.prototype.trigger = function () {
        ++this.count;
        this.callbacks.forEach(function (cb) { return cb.cb(); });
    };
    return Event;
}());
exports.Event = Event;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22),
    getRawTag = __webpack_require__(167),
    objectToString = __webpack_require__(196);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(13);
var _Tags = (function () {
    function _Tags() {
        // NOTE: It is theoretically possible to have tags in TagMap
        // that no longer exist; we don't prune old names. Therefore,
        // if you need to iterate tags, use Tags instead of TagMap
        this.tagMap = {};
        this.tags = [];
        this.selected = [];
        this.update = new Events.Event("TagsUpdated");
        this.initialized = new Events.Event("TagsInitialized");
    }
    _Tags.prototype.setTags = function (tags) {
        this.tags = [];
        for (var i = 0; i < tags.length; ++i) {
            var t = tags[i];
            this.tags.push(t);
            this.tagMap[t.name] = t;
        }
        this.update.trigger();
        if (this.initialized.count === 0) {
            this.initialized.trigger();
        }
    };
    _Tags.prototype.getTag = function (name) {
        var t = this.tagMap[name];
        if (typeof t === 'undefined') {
            return null;
        }
        return t;
    };
    _Tags.prototype.select = function (name) {
        if (this.selected.indexOf(name) < 0)
            this.selected.push(name);
    };
    _Tags.prototype.deselect = function (name) {
        var i = this.selected.indexOf(name);
        if (i >= 0)
            this.selected.splice(i, 1);
    };
    _Tags.prototype.getSelected = function () {
        return this.selected;
    };
    return _Tags;
}());
var Tags = new _Tags();
exports.default = Tags;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.END_DRAG = exports.DROP = exports.HOVER = exports.PUBLISH_DRAG_SOURCE = exports.BEGIN_DRAG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.beginDrag = beginDrag;
exports.publishDragSource = publishDragSource;
exports.hover = hover;
exports.drop = drop;
exports.endDrag = endDrag;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isArray = __webpack_require__(2);

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = __webpack_require__(12);

var _isObject2 = _interopRequireDefault(_isObject);

var _matchesType = __webpack_require__(56);

var _matchesType2 = _interopRequireDefault(_matchesType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BEGIN_DRAG = exports.BEGIN_DRAG = 'dnd-core/BEGIN_DRAG';
var PUBLISH_DRAG_SOURCE = exports.PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE';
var HOVER = exports.HOVER = 'dnd-core/HOVER';
var DROP = exports.DROP = 'dnd-core/DROP';
var END_DRAG = exports.END_DRAG = 'dnd-core/END_DRAG';

function beginDrag(sourceIds) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { publishSource: true, clientOffset: null };
  var publishSource = options.publishSource,
      clientOffset = options.clientOffset,
      getSourceClientOffset = options.getSourceClientOffset;

  (0, _invariant2.default)((0, _isArray2.default)(sourceIds), 'Expected sourceIds to be an array.');

  var monitor = this.getMonitor();
  var registry = this.getRegistry();
  (0, _invariant2.default)(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');

  for (var i = 0; i < sourceIds.length; i++) {
    (0, _invariant2.default)(registry.getSource(sourceIds[i]), 'Expected sourceIds to be registered.');
  }

  var sourceId = null;
  for (var _i = sourceIds.length - 1; _i >= 0; _i--) {
    if (monitor.canDragSource(sourceIds[_i])) {
      sourceId = sourceIds[_i];
      break;
    }
  }
  if (sourceId === null) {
    return;
  }

  var sourceClientOffset = null;
  if (clientOffset) {
    (0, _invariant2.default)(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
    sourceClientOffset = getSourceClientOffset(sourceId);
  }

  var source = registry.getSource(sourceId);
  var item = source.beginDrag(monitor, sourceId);
  (0, _invariant2.default)((0, _isObject2.default)(item), 'Item must be an object.');

  registry.pinSource(sourceId);

  var itemType = registry.getSourceType(sourceId);
  return {
    type: BEGIN_DRAG,
    itemType: itemType,
    item: item,
    sourceId: sourceId,
    clientOffset: clientOffset,
    sourceClientOffset: sourceClientOffset,
    isSourcePublic: publishSource
  };
}

function publishDragSource() {
  var monitor = this.getMonitor();
  if (!monitor.isDragging()) {
    return;
  }

  return { type: PUBLISH_DRAG_SOURCE };
}

function hover(targetIdsArg) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$clientOffset = _ref.clientOffset,
      clientOffset = _ref$clientOffset === undefined ? null : _ref$clientOffset;

  (0, _invariant2.default)((0, _isArray2.default)(targetIdsArg), 'Expected targetIds to be an array.');
  var targetIds = targetIdsArg.slice(0);

  var monitor = this.getMonitor();
  var registry = this.getRegistry();
  (0, _invariant2.default)(monitor.isDragging(), 'Cannot call hover while not dragging.');
  (0, _invariant2.default)(!monitor.didDrop(), 'Cannot call hover after drop.');

  // First check invariants.
  for (var i = 0; i < targetIds.length; i++) {
    var targetId = targetIds[i];
    (0, _invariant2.default)(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');

    var target = registry.getTarget(targetId);
    (0, _invariant2.default)(target, 'Expected targetIds to be registered.');
  }

  var draggedItemType = monitor.getItemType();

  // Remove those targetIds that don't match the targetType.  This
  // fixes shallow isOver which would only be non-shallow because of
  // non-matching targets.
  for (var _i2 = targetIds.length - 1; _i2 >= 0; _i2--) {
    var _targetId = targetIds[_i2];
    var targetType = registry.getTargetType(_targetId);
    if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
      targetIds.splice(_i2, 1);
    }
  }

  // Finally call hover on all matching targets.
  for (var _i3 = 0; _i3 < targetIds.length; _i3++) {
    var _targetId2 = targetIds[_i3];
    var _target = registry.getTarget(_targetId2);
    _target.hover(monitor, _targetId2);
  }

  return {
    type: HOVER,
    targetIds: targetIds,
    clientOffset: clientOffset
  };
}

function drop() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var monitor = this.getMonitor();
  var registry = this.getRegistry();
  (0, _invariant2.default)(monitor.isDragging(), 'Cannot call drop while not dragging.');
  (0, _invariant2.default)(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');

  var targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);

  targetIds.reverse();
  targetIds.forEach(function (targetId, index) {
    var target = registry.getTarget(targetId);

    var dropResult = target.drop(monitor, targetId);
    (0, _invariant2.default)(typeof dropResult === 'undefined' || (0, _isObject2.default)(dropResult), 'Drop result must either be an object or undefined.');
    if (typeof dropResult === 'undefined') {
      dropResult = index === 0 ? {} : monitor.getDropResult();
    }

    _this.store.dispatch({
      type: DROP,
      dropResult: _extends({}, options, dropResult)
    });
  });
}

function endDrag() {
  var monitor = this.getMonitor();
  var registry = this.getRegistry();
  (0, _invariant2.default)(monitor.isDragging(), 'Cannot call endDrag while not dragging.');

  var sourceId = monitor.getSourceId();
  var source = registry.getSource(sourceId, true);
  source.endDrag(monitor, sourceId);

  registry.unpinSource();

  return { type: END_DRAG };
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSource = addSource;
exports.addTarget = addTarget;
exports.removeSource = removeSource;
exports.removeTarget = removeTarget;
var ADD_SOURCE = exports.ADD_SOURCE = 'dnd-core/ADD_SOURCE';
var ADD_TARGET = exports.ADD_TARGET = 'dnd-core/ADD_TARGET';
var REMOVE_SOURCE = exports.REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';
var REMOVE_TARGET = exports.REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';

function addSource(sourceId) {
  return {
    type: ADD_SOURCE,
    sourceId: sourceId
  };
}

function addTarget(targetId) {
  return {
    type: ADD_TARGET,
    targetId: targetId
  };
}

function removeSource(sourceId) {
  return {
    type: REMOVE_SOURCE,
    sourceId: sourceId
  };
}

function removeTarget(targetId) {
  return {
    type: REMOVE_TARGET,
    targetId: targetId
  };
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(181),
    listCacheDelete = __webpack_require__(182),
    listCacheGet = __webpack_require__(183),
    listCacheHas = __webpack_require__(184),
    listCacheSet = __webpack_require__(185);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(38),
    setCacheAdd = __webpack_require__(198),
    setCacheHas = __webpack_require__(199);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(4);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(15);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(178);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(82),
    isLength = __webpack_require__(83);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(27),
    isObjectLike = __webpack_require__(7);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkDecoratorArguments;
function checkDecoratorArguments(functionName, signature) {
  if (process.env.NODE_ENV !== 'production') {
    for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i += 1) {
      var arg = arguments.length <= i + 2 ? undefined : arguments[i + 2];
      if (arg && arg.prototype && arg.prototype.render) {
        console.error( // eslint-disable-line no-console
        'You seem to be applying the arguments in the wrong order. ' + ('It should be ' + functionName + '(' + signature + ')(Component), not the other way around. ') + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
        return;
      }
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __webpack_require__(51);
var Events = __webpack_require__(13);
var _Player = (function () {
    function _Player() {
        this.state = new Player_1.default();
        this.update = new Events.Event("PlayerUpdated");
        this.trackChange = new Events.Event("TrackChanged");
        this.startPlaying = new Events.Event("StartedPlaying");
        this.pause = new Events.Event("Paused");
    }
    _Player.prototype.setState = function (p) {
        // trigger events
        var prev = this.state;
        this.state = p;
        if (this.trackChanged(prev)) {
            this.trackChange.trigger();
        }
        if (this.nowPlaying(prev)) {
            this.startPlaying.trigger();
        }
        else if (this.nowPaused(prev)) {
            this.pause.trigger();
        }
        this.update.trigger();
    };
    _Player.prototype.trackChanged = function (prev) {
        if (prev === null && this.state !== null) {
            return true;
        }
        if (prev.artist !== this.state.artist) {
            return true;
        }
        else if (prev["title"] !== this.state["title"]) {
            return true;
        }
        return false;
    };
    // true if we weren't playing before, but are now
    _Player.prototype.nowPlaying = function (prev) {
        var playing = (this.state !== null && this.state.status === "playing");
        var was = (prev !== null && prev.status === "playing");
        return playing && !was;
    };
    // true if we WERE playing beofre, but are NOT now
    _Player.prototype.nowPaused = function (prev) {
        var paused = (this.state !== null && this.state.status !== "playing");
        var was = (prev !== null && prev.status !== "playing");
        return paused && !was;
    };
    _Player.prototype.getStatus = function () { return this.state.status; };
    _Player.prototype.getTitle = function () { return this.state.title; };
    _Player.prototype.getArtist = function () { return this.state.artist; };
    _Player.prototype.getAlbum = function () { return this.state.album; };
    _Player.prototype.getPath = function () { return this.state.path; };
    _Player.prototype.getDuration = function () { return this.state.duration; };
    _Player.prototype.getPosition = function () { return this.state.position; };
    // true if we are playing any song
    _Player.prototype.isPlaying = function () {
        if (this.state.status === "playing") {
            return true;
        }
        else {
            return false;
        }
    };
    return _Player;
}());
var Player = new _Player();
exports.default = Player;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = isDisposable;

function isDisposable(obj) {
  return Boolean(obj && typeof obj.dispose === 'function');
}

module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(65),
    baseLodash = __webpack_require__(43);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(65),
    baseLodash = __webpack_require__(43);

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(186),
    mapCacheDelete = __webpack_require__(187),
    mapCacheGet = __webpack_require__(188),
    mapCacheHas = __webpack_require__(189),
    mapCacheSet = __webpack_require__(190);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(141);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(63),
    isFlattenable = __webpack_require__(176);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FILE = exports.FILE = '__NATIVE_FILE__';
var URL = exports.URL = '__NATIVE_URL__';
var TEXT = exports.TEXT = '__NATIVE_TEXT__';

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowEqual;
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }

    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// NOTE: We can't currently represent the currently playing song as an actual Pop.Song right now.
// We would need cmr to issue a query for the song path every time we request the player status,
// which would slow things down too much.
var Player = (function () {
    function Player() {
    }
    return Player;
}());
exports.default = Player;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Song = (function () {
    function Song() {
        this.artist = "";
        this.title = "";
        this.album = "";
        this.year = "";
        this.length = "";
        this.track = "";
        this.id = "";
        this.format = "";
        this.bitrate = "";
        this.path = "";
        this.tags = [];
    }
    return Song;
}());
exports.default = Song;
;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(13);
var _Queue = (function () {
    function _Queue() {
        this.songs = [];
        this.update = new Events.Event("QueueUpdated");
    }
    _Queue.prototype.setSongs = function (songs) {
        this.songs = songs;
        this.update.trigger();
    };
    return _Queue;
}());
var Queue = new _Queue();
exports.default = Queue;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dirtyHandlerIds;
exports.areDirty = areDirty;

var _xor = __webpack_require__(222);

var _xor2 = _interopRequireDefault(_xor);

var _intersection = __webpack_require__(213);

var _intersection2 = _interopRequireDefault(_intersection);

var _dragDrop = __webpack_require__(18);

var _registry = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NONE = [];
var ALL = [];

function dirtyHandlerIds() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NONE;
  var action = arguments[1];
  var dragOperation = arguments[2];

  switch (action.type) {
    case _dragDrop.HOVER:
      break;
    case _registry.ADD_SOURCE:
    case _registry.ADD_TARGET:
    case _registry.REMOVE_TARGET:
    case _registry.REMOVE_SOURCE:
      return NONE;
    case _dragDrop.BEGIN_DRAG:
    case _dragDrop.PUBLISH_DRAG_SOURCE:
    case _dragDrop.END_DRAG:
    case _dragDrop.DROP:
    default:
      return ALL;
  }

  var targetIds = action.targetIds;
  var prevTargetIds = dragOperation.targetIds;

  var result = (0, _xor2.default)(targetIds, prevTargetIds);

  var didChange = false;
  if (result.length === 0) {
    for (var i = 0; i < targetIds.length; i++) {
      if (targetIds[i] !== prevTargetIds[i]) {
        didChange = true;
        break;
      }
    }
  } else {
    didChange = true;
  }

  if (!didChange) {
    return NONE;
  }

  var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
  var innermostTargetId = targetIds[targetIds.length - 1];

  if (prevInnermostTargetId !== innermostTargetId) {
    if (prevInnermostTargetId) {
      result.push(prevInnermostTargetId);
    }
    if (innermostTargetId) {
      result.push(innermostTargetId);
    }
  }

  return result;
}

function areDirty(state, handlerIds) {
  if (state === NONE) {
    return false;
  }

  if (state === ALL || typeof handlerIds === 'undefined') {
    return true;
  }

  return (0, _intersection2.default)(handlerIds, state).length > 0;
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = dragOffset;
exports.getSourceClientOffset = getSourceClientOffset;
exports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;

var _dragDrop = __webpack_require__(18);

var initialState = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};

function areOffsetsEqual(offsetA, offsetB) {
  if (offsetA === offsetB) {
    return true;
  }
  return offsetA && offsetB && offsetA.x === offsetB.x && offsetA.y === offsetB.y;
}

function dragOffset() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _dragDrop.BEGIN_DRAG:
      return {
        initialSourceClientOffset: action.sourceClientOffset,
        initialClientOffset: action.clientOffset,
        clientOffset: action.clientOffset
      };
    case _dragDrop.HOVER:
      if (areOffsetsEqual(state.clientOffset, action.clientOffset)) {
        return state;
      }
      return _extends({}, state, {
        clientOffset: action.clientOffset
      });
    case _dragDrop.END_DRAG:
    case _dragDrop.DROP:
      return initialState;
    default:
      return state;
  }
}

function getSourceClientOffset(state) {
  var clientOffset = state.clientOffset,
      initialClientOffset = state.initialClientOffset,
      initialSourceClientOffset = state.initialSourceClientOffset;

  if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
    return null;
  }
  return {
    x: clientOffset.x + initialSourceClientOffset.x - initialClientOffset.x,
    y: clientOffset.y + initialSourceClientOffset.y - initialClientOffset.y
  };
}

function getDifferenceFromInitialOffset(state) {
  var clientOffset = state.clientOffset,
      initialClientOffset = state.initialClientOffset;

  if (!clientOffset || !initialClientOffset) {
    return null;
  }
  return {
    x: clientOffset.x - initialClientOffset.x,
    y: clientOffset.y - initialClientOffset.y
  };
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchesType;

var _isArray = __webpack_require__(2);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchesType(targetType, draggedItemType) {
  if ((0, _isArray2.default)(targetType)) {
    return targetType.some(function (t) {
      return t === draggedItemType;
    });
  } else {
    return targetType === draggedItemType;
  }
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(32);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(152),
    isArguments = __webpack_require__(80),
    isArray = __webpack_require__(2),
    isBuffer = __webpack_require__(81),
    isIndex = __webpack_require__(73),
    isTypedArray = __webpack_require__(84);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(68);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(21),
    arrayIncludes = __webpack_require__(39),
    arrayIncludesWith = __webpack_require__(40),
    arrayMap = __webpack_require__(41),
    baseUnary = __webpack_require__(44),
    cacheHas = __webpack_require__(24);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(21),
    arrayIncludes = __webpack_require__(39),
    arrayIncludesWith = __webpack_require__(40),
    cacheHas = __webpack_require__(24),
    createSet = __webpack_require__(160),
    setToArray = __webpack_require__(45);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(21),
    arraySome = __webpack_require__(137),
    cacheHas = __webpack_require__(24);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var metaMap = __webpack_require__(192),
    noop = __webpack_require__(46);

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var realNames = __webpack_require__(197);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(151),
    shortOut = __webpack_require__(200);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(143),
    isObjectLike = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(4),
    stubFalse = __webpack_require__(219);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    isObject = __webpack_require__(12);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(148),
    baseUnary = __webpack_require__(44),
    nodeUtil = __webpack_require__(195);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(66),
    baseRest = __webpack_require__(11),
    isArrayLikeObject = __webpack_require__(28);

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = exports.isFirefox = undefined;

var _memoize = __webpack_require__(217);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFirefox = exports.isFirefox = (0, _memoize2.default)(function () {
  return (/firefox/i.test(navigator.userAgent)
  );
});
var isSafari = exports.isSafari = (0, _memoize2.default)(function () {
  return Boolean(window.safari);
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpackBackendForEs5Users = exports.createChildContext = exports.CHILD_CONTEXT_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = DragDropContext;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dndCore = __webpack_require__(126);

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _hoistNonReactStatics = __webpack_require__(34);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _checkDecoratorArguments = __webpack_require__(29);

var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHILD_CONTEXT_TYPES = exports.CHILD_CONTEXT_TYPES = {
  dragDropManager: _propTypes2.default.object.isRequired
};

var createChildContext = exports.createChildContext = function createChildContext(backend, context) {
  return {
    dragDropManager: new _dndCore.DragDropManager(backend, context)
  };
};

var unpackBackendForEs5Users = exports.unpackBackendForEs5Users = function unpackBackendForEs5Users(backendOrModule) {
  // Auto-detect ES6 default export for people still using ES5
  var backend = backendOrModule;
  if ((typeof backend === 'undefined' ? 'undefined' : _typeof(backend)) === 'object' && typeof backend.default === 'function') {
    backend = backend.default;
  }
  (0, _invariant2.default)(typeof backend === 'function', 'Expected the backend to be a function or an ES6 module exporting a default function. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html');
  return backend;
};

function DragDropContext(backendOrModule) {
  _checkDecoratorArguments2.default.apply(undefined, ['DragDropContext', 'backend'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params

  var backend = unpackBackendForEs5Users(backendOrModule);
  var childContext = createChildContext(backend);

  return function decorateContext(DecoratedComponent) {
    var _class, _temp;

    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    var DragDropContextContainer = (_temp = _class = function (_Component) {
      _inherits(DragDropContextContainer, _Component);

      function DragDropContextContainer() {
        _classCallCheck(this, DragDropContextContainer);

        return _possibleConstructorReturn(this, (DragDropContextContainer.__proto__ || Object.getPrototypeOf(DragDropContextContainer)).apply(this, arguments));
      }

      _createClass(DragDropContextContainer, [{
        key: 'getDecoratedComponentInstance',
        value: function getDecoratedComponentInstance() {
          (0, _invariant2.default)(this.child, 'In order to access an instance of the decorated component it can ' + 'not be a stateless component.');
          return this.child;
        }
      }, {
        key: 'getManager',
        value: function getManager() {
          return childContext.dragDropManager;
        }
      }, {
        key: 'getChildContext',
        value: function getChildContext() {
          return childContext;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, {
            ref: function ref(child) {
              return _this2.child = child;
            }
          }));
        }
      }]);

      return DragDropContextContainer;
    }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = 'DragDropContext(' + displayName + ')', _class.childContextTypes = CHILD_CONTEXT_TYPES, _temp);


    return (0, _hoistNonReactStatics2.default)(DragDropContextContainer, DecoratedComponent);
  };
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = areOptionsEqual;

var _shallowEqual = __webpack_require__(48);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function areOptionsEqual(nextOptions, currentOptions) {
  if (currentOptions === nextOptions) {
    return true;
  }

  return currentOptions !== null && nextOptions !== null && (0, _shallowEqual2.default)(currentOptions, nextOptions);
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = decorateHandler;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _disposables = __webpack_require__(119);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _hoistNonReactStatics = __webpack_require__(34);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _shallowEqual = __webpack_require__(48);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _shallowEqualScalar = __webpack_require__(93);

var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function decorateHandler(_ref) {
  var _class, _temp;

  var DecoratedComponent = _ref.DecoratedComponent,
      createHandler = _ref.createHandler,
      createMonitor = _ref.createMonitor,
      createConnector = _ref.createConnector,
      registerHandler = _ref.registerHandler,
      containerDisplayName = _ref.containerDisplayName,
      getType = _ref.getType,
      collect = _ref.collect,
      options = _ref.options;
  var _options$arePropsEqua = options.arePropsEqual,
      arePropsEqual = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

  var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

  var DragDropContainer = (_temp = _class = function (_Component) {
    _inherits(DragDropContainer, _Component);

    _createClass(DragDropContainer, [{
      key: 'getHandlerId',
      value: function getHandlerId() {
        return this.handlerId;
      }
    }, {
      key: 'getDecoratedComponentInstance',
      value: function getDecoratedComponentInstance() {
        return this.decoratedComponentInstance;
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
      }
    }]);

    function DragDropContainer(props, context) {
      _classCallCheck(this, DragDropContainer);

      var _this = _possibleConstructorReturn(this, (DragDropContainer.__proto__ || Object.getPrototypeOf(DragDropContainer)).call(this, props, context));

      _this.handleChange = _this.handleChange.bind(_this);
      _this.handleChildRef = _this.handleChildRef.bind(_this);

      (0, _invariant2.default)(_typeof(_this.context.dragDropManager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to wrap the top-level component of your app with DragDropContext. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

      _this.manager = _this.context.dragDropManager;
      _this.handlerMonitor = createMonitor(_this.manager);
      _this.handlerConnector = createConnector(_this.manager.getBackend());
      _this.handler = createHandler(_this.handlerMonitor);

      _this.disposable = new _disposables.SerialDisposable();
      _this.receiveProps(props);
      _this.state = _this.getCurrentState();
      _this.dispose();
      return _this;
    }

    _createClass(DragDropContainer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.isCurrentlyMounted = true;
        this.disposable = new _disposables.SerialDisposable();
        this.currentType = null;
        this.receiveProps(this.props);
        this.handleChange();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!arePropsEqual(nextProps, this.props)) {
          this.receiveProps(nextProps);
          this.handleChange();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.dispose();
        this.isCurrentlyMounted = false;
      }
    }, {
      key: 'receiveProps',
      value: function receiveProps(props) {
        this.handler.receiveProps(props);
        this.receiveType(getType(props));
      }
    }, {
      key: 'receiveType',
      value: function receiveType(type) {
        if (type === this.currentType) {
          return;
        }

        this.currentType = type;

        var _registerHandler = registerHandler(type, this.handler, this.manager),
            handlerId = _registerHandler.handlerId,
            unregister = _registerHandler.unregister;

        this.handlerId = handlerId;
        this.handlerMonitor.receiveHandlerId(handlerId);
        this.handlerConnector.receiveHandlerId(handlerId);

        var globalMonitor = this.manager.getMonitor();
        var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });

        this.disposable.setDisposable(new _disposables.CompositeDisposable(new _disposables.Disposable(unsubscribe), new _disposables.Disposable(unregister)));
      }
    }, {
      key: 'handleChange',
      value: function handleChange() {
        if (!this.isCurrentlyMounted) {
          return;
        }

        var nextState = this.getCurrentState();
        if (!(0, _shallowEqual2.default)(nextState, this.state)) {
          this.setState(nextState);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        this.disposable.dispose();
        this.handlerConnector.receiveHandlerId(null);
      }
    }, {
      key: 'handleChildRef',
      value: function handleChildRef(component) {
        this.decoratedComponentInstance = component;
        this.handler.receiveComponent(component);
      }
    }, {
      key: 'getCurrentState',
      value: function getCurrentState() {
        var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor);

        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)((0, _isPlainObject2.default)(nextState), 'Expected `collect` specified as the second argument to ' + '%s for %s to return a plain object of props to inject. ' + 'Instead, received %s.', containerDisplayName, displayName, nextState);
        }

        return nextState;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
          ref: this.handleChildRef
        }));
      }
    }]);

    return DragDropContainer;
  }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = containerDisplayName + '(' + displayName + ')', _class.contextTypes = {
    dragDropManager: _propTypes2.default.object.isRequired
  }, _temp);


  return (0, _hoistNonReactStatics2.default)(DragDropContainer, DecoratedComponent);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragDropContext = __webpack_require__(88);

Object.defineProperty(exports, 'DragDropContext', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragDropContext).default;
  }
});

var _DragDropContextProvider = __webpack_require__(234);

Object.defineProperty(exports, 'DragDropContextProvider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragDropContextProvider).default;
  }
});

var _DragLayer = __webpack_require__(235);

Object.defineProperty(exports, 'DragLayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragLayer).default;
  }
});

var _DragSource = __webpack_require__(236);

Object.defineProperty(exports, 'DragSource', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragSource).default;
  }
});

var _DropTarget = __webpack_require__(237);

Object.defineProperty(exports, 'DropTarget', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropTarget).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
       value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isValidType;

var _isArray = __webpack_require__(2);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidType(type, allowArray) {
       return typeof type === 'string' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' || allowArray && (0, _isArray2.default)(type) && type.every(function (t) {
              return isValidType(t, false);
       });
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = shallowEqualScalar;
function shallowEqualScalar(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i])) {
      return false;
    }

    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB || (typeof valA === 'undefined' ? 'undefined' : _typeof(valA)) === 'object' || (typeof valB === 'undefined' ? 'undefined' : _typeof(valB)) === 'object') {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapConnectorHooks;

var _react = __webpack_require__(0);

var _cloneWithRef = __webpack_require__(246);

var _cloneWithRef2 = _interopRequireDefault(_cloneWithRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function throwIfCompositeComponentElement(element) {
  // Custom components can no longer be wrapped directly in React DnD 2.0
  // so that we don't need to depend on findDOMNode() from react-dom.
  if (typeof element.type === 'string') {
    return;
  }

  var displayName = element.type.displayName || element.type.name || 'the component';

  throw new Error('Only native element nodes can now be passed to React DnD connectors.' + ('You can either wrap ' + displayName + ' into a <div>, or turn it into a ') + 'drag source or a drop target itself.');
}

function wrapHookToRecognizeElement(hook) {
  return function () {
    var elementOrNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    // When passed a node, call the hook straight away.
    if (!(0, _react.isValidElement)(elementOrNode)) {
      var node = elementOrNode;
      hook(node, options);
      return undefined;
    }

    // If passed a ReactElement, clone it and attach this function as a ref.
    // This helps us achieve a neat API where user doesn't even know that refs
    // are being used under the hood.
    var element = elementOrNode;
    throwIfCompositeComponentElement(element);

    // When no options are passed, use the hook directly
    var ref = options ? function (node) {
      return hook(node, options);
    } : hook;

    return (0, _cloneWithRef2.default)(element, ref);
  };
}

function wrapConnectorHooks(hooks) {
  var wrappedHooks = {};

  Object.keys(hooks).forEach(function (key) {
    var hook = hooks[key];
    var wrappedHook = wrapHookToRecognizeElement(hook);
    wrappedHooks[key] = function () {
      return wrappedHook;
    };
  });

  return wrappedHooks;
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Nav_1 = __webpack_require__(96);
var Songlist_1 = __webpack_require__(99);
var Transport_1 = __webpack_require__(102);
var SongDetail_1 = __webpack_require__(98);
var Signals_1 = __webpack_require__(10);
__webpack_require__(107);
var Pop = (function (_super) {
    __extends(Pop, _super);
    function Pop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pop.prototype.render = function () {
        return React.createElement("div", { className: "component-pop" },
            React.createElement(Nav_1.default, null),
            React.createElement(Transport_1.default, null),
            React.createElement(SongDetail_1.default, null),
            React.createElement(Songlist_1.default, null),
            React.createElement("input", { className: "component-pop-input-sink", autoFocus: true }));
    };
    Pop.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.handleKeyDown);
    };
    Pop.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.handleKeyDown);
    };
    Pop.prototype.handleKeyDown = function (e) {
        if (e.target && e.target.tagName) {
            if (e.target.tagName.toLowerCase() === 'input')
                return;
            if (e.target.tagName.toLowerCase() === 'textarea')
                return;
        }
        var key = (e && e.key && e.key.toLowerCase()) || null;
        if (!key)
            return;
        if (key === 'x') {
            // note: this can also select a tag
            Signals_1.default.selectCurrentSong();
        }
        else if (key === 'a') {
            Signals_1.default.selectAllSongs();
        }
        else if (key === 'l') {
            Signals_1.default.deselectAllSongs();
        }
        else if (key === 't') {
            if (e.shiftKey)
                Signals_1.default.untagSelectedSongs();
            else
                Signals_1.default.tagSelectedSongs();
        }
    };
    return Pop;
}(React.Component));
exports.Pop = Pop;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Taglist_1 = __webpack_require__(101);
__webpack_require__(106);
var Backend = __webpack_require__(5);
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nav.prototype.render = function () {
        var _this = this;
        var rclick = function (event) { _this.handleRandomClick(event); };
        var rtclick = function (event) { _this.handleRandomTaggedClick(event); };
        var l7click = function (event) { _this.handleLast7Clicked(event); };
        var tophone = function (event) { _this.handleToPhoneClick(event); };
        var chromecast = function (event) { _this.handleChromecastClick(event); };
        var desk = function (event) { _this.handleDeskClick(event); };
        return React.createElement("div", { className: "component-nav" },
            React.createElement("button", { onClick: l7click, className: "component-nav-last7" }, "last 7"),
            React.createElement("button", { onClick: rclick, className: "component-nav-random" }, "random"),
            React.createElement("button", { onClick: rtclick, className: "component-nav-random-tagged" }, "random tagged"),
            React.createElement(Taglist_1.default, null),
            React.createElement("button", { onClick: tophone, className: "component-nav-tophone" }, "tophone"),
            React.createElement("button", { onClick: chromecast, className: "component-nav-chromecast" }, "chromecast"),
            React.createElement("button", { onClick: desk, className: "component-nav-chromecast" }, "desk"));
    };
    Nav.prototype.handleLast7Clicked = function (event) {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        var zpad = function (s) { var ret = s + ""; while (ret.length < 2)
            ret = '0' + ret; return ret; };
        var q = "added:" + d.getFullYear() + "-" + zpad(d.getMonth() + 1) + "-" + zpad(d.getDate()) + "..";
        console.log(q);
        Backend.Server.SearchForSongs(q);
    };
    Nav.prototype.handleRandomClick = function (event) {
        Backend.Server.GetRandomSongs(50);
    };
    Nav.prototype.handleRandomTaggedClick = function (event) {
        Backend.Server.GetRandomTaggedSongs(50);
    };
    Nav.prototype.handleToPhoneClick = function (event) {
        Backend.Server.LoadAugysPhone();
    };
    Nav.prototype.handleChromecastClick = function (event) {
        Backend.Server.SwitchToChromecast();
    };
    Nav.prototype.handleDeskClick = function (event) {
        Backend.Server.SwitchToDesk();
    };
    return Nav;
}(React.Component));
exports.Nav = Nav;
exports.default = Nav;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(16);
var Backend = __webpack_require__(5);
__webpack_require__(108);
var Signals_1 = __webpack_require__(10);
var Tags_1 = __webpack_require__(17);
var Player_1 = __webpack_require__(30);
// I don't really know what this WithContext thing means
var react_tag_input_1 = __webpack_require__(247);
var Song = (function (_super) {
    __extends(Song, _super);
    function Song(props) {
        var _this = _super.call(this, props) || this;
        _this.topNextUpdate = false;
        _this.callbackId = 'Song_' + props.playlistIndex + '_' + Math.random();
        _this.state = {
            song: props.song,
            field: props.field,
            playing: false,
            current: false,
            selected: false
        };
        _this._mouseWithin = false;
        return _this;
    }
    Song.prototype.render = function () {
        var _this = this;
        var enter = function (e) { return _this.onMouseEnter(e); };
        var leave = function (e) { return _this.onMouseLeave(e); };
        var tags = this.state.song.tags.map(function (t) { return { id: t.name, text: t.name }; });
        var suggestions = Tags_1.default.tags.map(function (t) { return t.name; });
        var tdel = function (i) { return _this.deleteTagAtIndex(i); };
        var tadd = function (t) { return _this.addTag(t); };
        var noop = function () { };
        var tagsField = function () {
            return React.createElement(react_tag_input_1.WithContext, { tags: tags, suggestions: suggestions, handleDelete: tdel, handleAddition: tadd, handleDrag: noop });
        };
        var field = (function () {
            switch (_this.state.field) {
                case 'album':
                    return React.createElement("div", null, _this.state.song.album);
                case 'artist':
                    return React.createElement("div", null, _this.state.song.artist);
                case 'title':
                    return React.createElement("div", null, _this.state.song.title);
                case 'album':
                    return React.createElement("div", null, _this.state.song.album);
                case 'year':
                    return React.createElement("div", null, _this.state.song.year);
                case 'length':
                    return React.createElement("div", null, _this.state.song.length);
                case 'track':
                    return React.createElement("div", null, _this.state.song.track);
                case 'id':
                    return React.createElement("div", null, _this.state.song.id);
                case 'format':
                    return React.createElement("div", null, _this.state.song.format);
                case 'bitrate':
                    return React.createElement("div", null, _this.state.song.bitrate);
                case 'tags':
                default:
                    return tagsField();
            }
        })();
        var classes = ["component-song"];
        if (this.state.selected === true)
            classes.push("component-song-selected");
        if (this.state.playing === true)
            classes.push("component-song-playing");
        if (this.state.current === true)
            classes.push("component-song-current");
        var textClasses = ["component-song-text"];
        if (this.state.selected === true)
            textClasses.push("component-song-selected");
        if (this.state.playing === true)
            textClasses.push("component-song-playing");
        if (this.state.current === true)
            textClasses.push("component-song-current");
        var clickText = function () { return _this.textClicked(); };
        return React.createElement("div", { onMouseEnter: enter, onMouseLeave: leave, className: classes.join(' ') },
            React.createElement("button", { onClick: clickText, className: textClasses.join(' ') }, this.state.song.artist + " - " + this.state.song.title),
            React.createElement("div", { className: "component-song-field" }, field));
    };
    Song.prototype.textClicked = function () {
        Backend.Server.SetCmusPlaylistPos(this.props.playlistIndex);
    };
    Song.prototype.componentDidMount = function () {
        var _this = this;
        Signals_1.default.trackShowEvent.addCallback({
            id: this.callbackId,
            cb: function () { return _this.trackShow(); }
        });
        Signals_1.default.fieldSelectedEvent.addCallback({
            id: this.callbackId,
            cb: function () { return _this.setState({
                field: Signals_1.default.fieldSelectedField
            }); }
        });
        Player_1.default.trackChange.addCallback({
            id: this.callbackId,
            cb: function () { return _this.setPlaying(_this.state.song.path === Player_1.default.getPath()); }
        });
        this.setPlaying(this.state.song.path === Player_1.default.getPath());
        Signals_1.default.selectCurrentSongEvent.addCallback({
            id: this.callbackId,
            cb: function () {
                if (_this._mouseWithin === true) {
                    _this.setSelected(!_this.state.selected);
                }
            }
        });
        Signals_1.default.selectAllSongsEvent.addCallback({
            id: this.callbackId,
            cb: function () {
                _this.setSelected(true);
            }
        });
        Signals_1.default.deselectAllSongsEvent.addCallback({
            id: this.callbackId,
            cb: function () {
                _this.setSelected(false);
            }
        });
        Signals_1.default.tagSelectedSongsEvent.addCallback({
            id: this.callbackId,
            cb: function () {
                if (_this.state.selected) {
                    Tags_1.default.selected.forEach(function (name) { return _this.addTag(name); });
                    _this.setSelected(false);
                }
            }
        });
        Signals_1.default.untagSelectedSongsEvent.addCallback({
            id: this.callbackId,
            cb: function () {
                if (_this.state.selected) {
                    Tags_1.default.selected.forEach(function (name) { return Backend.Server.UntagSong(Tags_1.default.getTag(name), _this.state.song); });
                    _this.setSelected(false);
                }
            }
        });
    };
    Song.prototype.componentWillUnmount = function () {
        Signals_1.default.trackShowEvent.removeCallback(this.callbackId);
        Signals_1.default.fieldSelectedEvent.removeCallback(this.callbackId);
        Player_1.default.trackChange.removeCallback(this.callbackId);
        Signals_1.default.selectCurrentSongEvent.removeCallback(this.callbackId);
        Signals_1.default.selectAllSongsEvent.removeCallback(this.callbackId);
        Signals_1.default.deselectAllSongsEvent.removeCallback(this.callbackId);
        Signals_1.default.tagSelectedSongsEvent.removeCallback(this.callbackId);
        Signals_1.default.untagSelectedSongsEvent.removeCallback(this.callbackId);
    };
    Song.prototype._newState = function () {
        return {
            song: this.state.song,
            field: this.state.field,
            playing: this.state.playing,
            current: this.state.current,
            selected: this.state.selected
        };
    };
    Song.prototype.setSong = function (song) {
        this.setState({ song: song });
    };
    Song.prototype.setPlaying = function (b) {
        if (b !== this.state.playing) {
            this.setState({ playing: b });
        }
    };
    Song.prototype.setCurrent = function (b) {
        if (b !== this.state.current) {
            this.setState({ current: b });
        }
    };
    Song.prototype.setSelected = function (b) {
        if (b !== this.state.selected) {
            this.setState({ selected: b });
        }
    };
    Song.prototype.onMouseEnter = function (event) {
        Signals_1.default.trackInfo(this.state.song);
        this._mouseWithin = true;
    };
    Song.prototype.onMouseLeave = function (event) {
        this._mouseWithin = false;
    };
    Song.prototype.deleteTagAtIndex = function (i) {
        if (i >= 0 && i < this.state.song.tags.length) {
            Backend.Server.UntagSong(this.state.song.tags[i], this.state.song);
            this.setState(this._newState());
        }
    };
    Song.prototype.addTag = function (name) {
        var tag = Tags_1.default.getTag(name);
        if (tag) {
            console.log("Tagging " + tag.name);
            Backend.Server.TagSong(tag, this.state.song);
            this.setState(this._newState());
        }
        else {
            console.log(name + " is not a tag");
        }
    };
    Song.prototype.componentDidUpdate = function () {
        if (this.topNextUpdate === true) {
            this.topNextUpdate = false;
            document.body.scrollTop = 0; // For Chrome, Safari and Opera 
            document.documentElement.scrollTop = 0; // For IE and Firefox
        }
    };
    Song.prototype.setField = function (field) {
        this.topNextUpdate = true;
        this.setState({ field: field });
    };
    Song.prototype.trackShow = function () {
        if (this.state.song.path === Signals_1.default.trackShowPath) {
            var element = ReactDOM.findDOMNode(this);
            var elementRect = element.getBoundingClientRect();
            var absoluteElementTop = elementRect.top + window.pageYOffset;
            var middle = absoluteElementTop - (window.innerHeight / 2);
            window.scrollTo(0, middle);
        }
    };
    return Song;
}(React.Component));
exports.Song = Song;
exports.default = Song;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Backend = __webpack_require__(5);
var Song_1 = __webpack_require__(52);
__webpack_require__(109);
var Signals_1 = __webpack_require__(10);
var SongDetail = (function (_super) {
    __extends(SongDetail, _super);
    function SongDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.random = Math.random();
        _this.state = { song: null };
        return _this;
    }
    SongDetail.prototype.componentDidMount = function () {
        var _this = this;
        Signals_1.default.trackInfoEvent.addCallback({
            id: 'SongDetail_' + this.random,
            cb: function () { _this.setSong(Signals_1.default.trackInfoSong); }
        });
    };
    SongDetail.prototype.componentWillUnmount = function () {
        Signals_1.default.trackInfoEvent.removeCallback('SongDetail_' + this.random);
    };
    SongDetail.prototype.render = function () {
        var _this = this;
        var s = this.state.song;
        if (!s) {
            s = new Song_1.default();
        }
        var qartist = function (e) { return _this.searchArtist(); };
        var qtitle = function (e) { return _this.searchTitle(); };
        var qalbum = function (e) { return _this.searchAlbum(); };
        var qyear = function (e) { return _this.searchYear(); };
        var qlength = function (e) { return _this.searchLength(); };
        var qtrack = function (e) { return _this.searchTrack(); };
        var qid = function (e) { return _this.searchId(); };
        var qformat = function (e) { return _this.searchFormat(); };
        var qbitrate = function (e) { return _this.searchBitrate(); };
        var qpath = function (e) { return _this.searchPath(); };
        var qtags = function (e) { return _this.searchTags(); };
        return React.createElement("div", { className: "component-song-detail" },
            React.createElement("button", { onClick: qartist },
                "Artist: ",
                s.artist),
            React.createElement("button", { onClick: qtitle },
                "Title: ",
                s.title),
            React.createElement("button", { onClick: qalbum },
                "Album: ",
                s.album),
            React.createElement("button", { onClick: qyear },
                "Year: ",
                s.year),
            React.createElement("button", { onClick: qlength },
                "Length: ",
                s.length),
            React.createElement("button", { onClick: qtrack },
                "Track: ",
                s.track),
            React.createElement("button", { onClick: qid },
                "ID: ",
                s.id),
            React.createElement("button", { onClick: qformat },
                "Format: ",
                s.format),
            React.createElement("button", { onClick: qbitrate },
                "Bitrate: ",
                s.bitrate),
            React.createElement("button", { onClick: qpath },
                "Path: ",
                s.path),
            React.createElement("button", { onClick: qtags },
                "Tags: ",
                this.tagString(s)));
    };
    SongDetail.prototype.tagString = function (song) {
        var s = [];
        song.tags.forEach(function (t) { return s.push(t.name); });
        return s.join(", ");
    };
    SongDetail.prototype.setSong = function (s) {
        this.setState({ song: s });
    };
    SongDetail.prototype.q = function (field) {
        var fields = this.state.song;
        Backend.Server.SearchForSongs(field + ":" + fields[field]);
    };
    SongDetail.prototype.searchArtist = function () {
        this.q("artist");
    };
    SongDetail.prototype.searchTitle = function () {
        this.q("title");
    };
    SongDetail.prototype.searchAlbum = function () {
        this.q("album");
    };
    SongDetail.prototype.searchYear = function () {
        this.q("year");
    };
    SongDetail.prototype.searchLength = function () {
        this.q("length");
    };
    SongDetail.prototype.searchTrack = function () {
        this.q("track");
    };
    SongDetail.prototype.searchId = function () {
        this.q("id");
    };
    SongDetail.prototype.searchFormat = function () {
        this.q("format");
    };
    SongDetail.prototype.searchBitrate = function () {
        this.q("bitrate");
    };
    SongDetail.prototype.searchPath = function () {
        this.q("path");
    };
    SongDetail.prototype.searchTags = function () {
        console.log("No tag search--use left side tag nav");
    };
    return SongDetail;
}(React.Component));
exports.SongDetail = SongDetail;
exports.default = SongDetail;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Song_1 = __webpack_require__(97);
var Queue_1 = __webpack_require__(53);
var Backend = __webpack_require__(5);
var Signals_1 = __webpack_require__(10);
__webpack_require__(110);
var Songlist = (function (_super) {
    __extends(Songlist, _super);
    function Songlist(props) {
        var _this = _super.call(this, props) || this;
        _this.selectableFields =
            [
                'tags',
                'artist',
                'title',
                'album',
                'year',
                'length',
                'track',
                'id',
                'format',
                'bitrate'
            ];
        _this.state = { songs: [], field: 'tags' };
        _this.random = Math.random();
        return _this;
    }
    Songlist.prototype.componentDidMount = function () {
        var _this = this;
        Queue_1.default.update.addCallback({
            id: this.random + '_SonglistCallback',
            cb: function () { return _this.setSongs(Queue_1.default.songs); }
        });
        Signals_1.default.fieldSelectedEvent.addCallback({
            id: 'Songlist_' + this.random,
            cb: function () { return _this.setState({
                songs: _this.state.songs,
                field: Signals_1.default.fieldSelectedField
            }); }
        });
        Backend.Server.GetCmusPlaylist();
    };
    Songlist.prototype.componentWillUnmount = function () {
        Queue_1.default.update.removeCallback(this.random + "_SonglistCallback");
    };
    Songlist.prototype.render = function () {
        var _this = this;
        var sorted = this.state.songs.slice(); // shallow copy songs
        sorted.sort(function (s1, s2) {
            if (_this.state.field === 'tags') {
                var i1 = _this.state.songs.indexOf(s1);
                var i2 = _this.state.songs.indexOf(s2);
                return i1 < i2 ? -1 : 1;
            }
            if (!s1[_this.state.field]) {
                console.log(_this.state.field + ' not in ' + JSON.stringify(s1));
            }
            return s1[_this.state.field].localeCompare(s2[_this.state.field]);
        });
        // field selector
        var fields = function () {
            return _this.selectableFields.map(function (f) { return React.createElement("option", { key: f, value: f }, f); });
        };
        var change = function (event) { return _this.handleOnChange(event); };
        var selector = React.createElement("select", { onChange: change, className: "component-songlist-select" }, fields());
        // TODO: If the songlist is sorted, it will not match the playlist of Cmus, and so
        // will play in the default order. This will be confusing.
        var i = 0;
        var f = sorted.map(function (s) {
            return React.createElement(Song_1.default, { key: s.path, song: s, playlistIndex: i++, field: _this.state.field });
        });
        return React.createElement("div", { className: "component-songlist" },
            selector,
            f);
    };
    Songlist.prototype.handleOnChange = function (event) {
        Signals_1.default.fieldSelected(event.target.value);
    };
    Songlist.prototype.fieldSelected = function () {
        this.setState({ songs: this.state.songs, field: Signals_1.default.fieldSelectedField });
    };
    Songlist.prototype.setSongs = function (songs) {
        this.setState({ songs: songs, field: this.state.field });
    };
    Songlist.prototype.componentDidUpdate = function () {
        document.body.scrollTop = 0; // For Chrome, Safari and Opera 
        document.documentElement.scrollTop = 0; // For IE and Firefox
    };
    return Songlist;
}(React.Component));
exports.Songlist = Songlist;
exports.default = Songlist;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Tags_1 = __webpack_require__(17);
var Backend = __webpack_require__(5);
var Signals_1 = __webpack_require__(10);
__webpack_require__(111);
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag(props) {
        var _this = _super.call(this, props) || this;
        _this._mouseWithin = false;
        _this.random = Math.random();
        _this.state = { count: _this.props.count, selected: false };
        return _this;
    }
    Tag.prototype.getCallbackId = function () {
        return 'Tag_' + this.random;
    };
    Tag.prototype.componentDidMount = function () {
        var _this = this;
        Tags_1.default.update.addCallback({
            id: this.getCallbackId(),
            cb: function () { return _this.updateCount(Tags_1.default.getTag(_this.props.name).count); }
        });
        Signals_1.default.selectCurrentSongEvent.addCallback({
            id: this.getCallbackId(),
            cb: function () {
                if (_this._mouseWithin === true) {
                    _this.setSelected(!_this.state.selected);
                }
            }
        });
    };
    Tag.prototype.setSelected = function (b) {
        if (b !== this.state.selected) {
            console.log(this.props.name + " selected: " + b);
            this.setState({ selected: b });
            if (b)
                Tags_1.default.select(this.props.name);
            else
                Tags_1.default.deselect(this.props.name);
        }
    };
    Tag.prototype.onMouseEnter = function (event) {
        this._mouseWithin = true;
    };
    Tag.prototype.onMouseLeave = function (event) {
        this._mouseWithin = false;
    };
    Tag.prototype.componentWillUnmount = function () {
        Tags_1.default.update.removeCallback(this.getCallbackId());
        Signals_1.default.selectCurrentSongEvent.removeCallback(this.getCallbackId());
    };
    Tag.prototype.render = function () {
        var _this = this;
        var enter = function (e) { return _this.onMouseEnter(e); };
        var leave = function (e) { return _this.onMouseLeave(e); };
        var hc = function (e) { return _this.handleClicked(e); };
        var classes = ["component-tag-name"];
        if (this.state.selected === true) {
            classes.push("component-tag-selected");
        }
        return React.createElement("div", { onMouseEnter: enter, onMouseLeave: leave, className: "component-tag" },
            React.createElement("button", { onClick: hc },
                React.createElement("div", { className: classes.join(' ') }, this.props.name),
                React.createElement("div", { className: "component-tag-count" }, this.state.count)));
    };
    Tag.prototype.updateCount = function (n) {
        this.setState({ count: n });
    };
    Tag.prototype.handleClicked = function (event) {
        if (this.state.count === 0) {
            console.log("Deleting empty tag " + this.props.name);
            Backend.Server.DeleteTag(Tags_1.default.getTag(this.props.name));
            return;
        }
        Backend.Server.SearchForTag(Tags_1.default.getTag(this.props.name));
    };
    return Tag;
}(React.Component));
exports.Tag = Tag;
exports.default = Tag;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Tag_1 = __webpack_require__(100);
var Backend = __webpack_require__(5);
var Tags_1 = __webpack_require__(17);
__webpack_require__(112);
var Taglist = (function (_super) {
    __extends(Taglist, _super);
    function Taglist(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { tags: [] };
        _this.random = Math.random();
        return _this;
    }
    Taglist.prototype.componentDidMount = function () {
        var _this = this;
        Tags_1.default.update.addCallback({
            id: this.random + "_TaglistCallback",
            cb: function () { return _this.setTags(Tags_1.default.tags); }
        });
        Backend.Server.UpdateTags();
    };
    Taglist.prototype.componentWillUnmount = function () {
        Tags_1.default.update.removeCallback(this.random + "_TaglistCallback");
    };
    Taglist.prototype.render = function () {
        var list = this.state.tags.map(function (t) {
            return React.createElement(Tag_1.default, { key: t.name, name: t.name, count: t.count });
        });
        return React.createElement("div", { className: "component-taglist" },
            " ",
            list,
            " ");
    };
    Taglist.prototype.setTags = function (tags) {
        if (tags.length === 0) {
            console.log("Got back zero tags");
        }
        console.log("Got " + tags.length + " tags");
        this.setState({ tags: tags });
    };
    return Taglist;
}(React.Component));
exports.Taglist = Taglist;
exports.default = Taglist;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Player_1 = __webpack_require__(30);
__webpack_require__(113);
var Backend = __webpack_require__(5);
var Signals_1 = __webpack_require__(10);
var Transport = (function (_super) {
    __extends(Transport, _super);
    function Transport(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { player: null };
        _this.random = Math.random();
        return _this;
    }
    Transport.prototype.getProgressPercent = function () {
        if (this.state.player && this.state.player.position) {
            var prog = (this.state.player.position / this.state.player.duration) * 100;
            return prog;
        }
        return 1;
    };
    Transport.prototype.render = function () {
        var _this = this;
        var progress = { width: this.getProgressPercent() + "%" };
        var scrub = function (event) { _this.handleClicked(event); };
        var scrubref = function (obj) { _this.scrubber = obj; };
        var play = function (event) { _this.handlePlayClicked(event); };
        var shuffle = function (event) { _this.handleShuffleClicked(event); };
        var track = function (event) { _this.handleTrackClicked(event); };
        var searchref = function (obj) { _this.searchInput = obj; };
        var keyup = function (event) { return _this.searchKeyUp(event); };
        return React.createElement("div", { className: "component-transport" },
            React.createElement("button", { className: "component-transport-play", onClick: play }, this.playStatus()),
            React.createElement("button", { className: "component-transport-shuffle", onClick: shuffle }, this.shuffleStatus()),
            React.createElement("button", { className: "component-transport-track", onClick: track }, this.trackString()),
            React.createElement("input", { className: "component-transport-search", ref: searchref, onKeyUp: keyup, placeholder: "Search . . ." }),
            React.createElement("div", { className: "component-transport-numbers" }, this.positionString()),
            React.createElement("div", { onClick: scrub, ref: scrubref, className: "component-transport-progress-background" },
                React.createElement("div", { style: progress, className: "component-transport-progress-bar" })));
    };
    Transport.prototype.playStatus = function () {
        if (this.state.player) {
            return this.state.player.status;
        }
        return "dunno";
    };
    Transport.prototype.shuffleStatus = function () {
        if (this.state.player) {
            return this.state.player.shuffle ? "shuffling" : "not shuffling";
        }
        return "dunno";
    };
    Transport.prototype.positionString = function () {
        if (this.state.player) {
            return this.state.player.position + " / " + this.state.player.duration;
        }
        return "dunno";
    };
    Transport.prototype.trackString = function () {
        if (this.state.player) {
            var p = this.state.player;
            if (p) {
                return p.artist + " - " + p.title + " (" + p.album + ")";
            }
        }
        return "dunno";
    };
    Transport.prototype.handlePlayClicked = function (event) {
        if (Player_1.default.isPlaying()) {
            Backend.Server.Pause();
        }
        else {
            Backend.Server.Play();
        }
    };
    Transport.prototype.handleShuffleClicked = function (event) {
        Backend.Server.Shuffle();
    };
    Transport.prototype.handleTrackClicked = function (event) {
        Signals_1.default.trackShowByPath(this.state.player.path);
    };
    Transport.prototype.handleClicked = function (event) {
        var x = event.nativeEvent.offsetX;
        var pos = event.nativeEvent.offsetX / this.scrubber.offsetWidth;
        pos = Math.round(pos * this.state.player.duration);
        Backend.Server.SeekToSecond(pos);
    };
    Transport.prototype.getCallbackId = function () {
        return "Transport_" + this.random;
    };
    Transport.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ player: Player_1.default.state });
        Player_1.default.update.addCallback({
            id: this.getCallbackId(),
            cb: function () { return _this.setState({ player: Player_1.default.state }); }
        });
        var whilePlaying = function () {
            if (_this.playerTimer) {
                clearTimeout(_this.playerTimer);
                _this.playerTimer = null;
            }
            var cpy = JSON.parse(JSON.stringify(Player_1.default.state));
            if (cpy.position % 10 === 0 ||
                cpy.position >= cpy.duration) {
                Backend.Server.UpdatePlayerStatus();
            }
            else {
                cpy.position += 1;
                Player_1.default.setState(cpy);
            }
            _this.playerTimer = setTimeout(whilePlaying, 1000);
        };
        // when we start playing, set up a timer to track playback position
        Player_1.default.startPlaying.addCallback({
            id: this.getCallbackId(),
            cb: function () {
                whilePlaying();
                _this.setState({ player: Player_1.default.state });
            }
        });
        // in case the player is already playing...
        if (Player_1.default.isPlaying())
            whilePlaying();
        // when we stop playing, clear the timer
        Player_1.default.pause.addCallback({
            id: this.getCallbackId(),
            cb: function () {
                if (_this.playerTimer) {
                    clearTimeout(_this.playerTimer);
                    _this.playerTimer = null;
                }
            }
        });
        Backend.Server.UpdatePlayerStatus();
    };
    Transport.prototype.componentWillUnmount = function () {
        Player_1.default.update.removeCallback(this.getCallbackId());
    };
    Transport.prototype.searchKeyUp = function (event) {
        if (event.keyCode === 13) {
            var input = this.searchInput;
            Backend.Server.SearchForSongs(input.value);
        }
    };
    return Transport;
}(React.Component));
exports.Transport = Transport;
exports.default = Transport;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(16);
var Pop_1 = __webpack_require__(95);
ReactDOM.render(React.createElement(Pop_1.Pop, null), document.getElementById("pop"));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tag = (function () {
    function Tag(name, count) {
        this.name = name;
        this.count = count;
    }
    return Tag;
}());
exports.default = Tag;
;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events = __webpack_require__(13);
// holds the result of the last query
var _Query = (function () {
    function _Query() {
        this.songs = [];
        this.update = new Events.Event("QueryUpdated");
    }
    _Query.prototype.setSongs = function (songs) {
        this.songs = songs;
        this.update.trigger();
    };
    return _Query;
}());
var Query = new _Query();
exports.default = Query;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(115);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _isDisposable = __webpack_require__(31);

var _isDisposable2 = _interopRequireWildcard(_isDisposable);

/**
 * Represents a group of disposable resources that are disposed together.
 */

var CompositeDisposable = (function () {
  function CompositeDisposable() {
    for (var _len = arguments.length, disposables = Array(_len), _key = 0; _key < _len; _key++) {
      disposables[_key] = arguments[_key];
    }

    _classCallCheck(this, CompositeDisposable);

    if (Array.isArray(disposables[0]) && disposables.length === 1) {
      disposables = disposables[0];
    }

    for (var i = 0; i < disposables.length; i++) {
      if (!_isDisposable2['default'](disposables[i])) {
        throw new Error('Expected a disposable');
      }
    }

    this.disposables = disposables;
    this.isDisposed = false;
  }

  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Disposable} item Disposable to add.
   */

  CompositeDisposable.prototype.add = function add(item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
    }
  };

  /**
   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
   * @param {Disposable} item Disposable to remove.
   * @returns {Boolean} true if found; false otherwise.
   */

  CompositeDisposable.prototype.remove = function remove(item) {
    if (this.isDisposed) {
      return false;
    }

    var index = this.disposables.indexOf(item);
    if (index === -1) {
      return false;
    }

    this.disposables.splice(index, 1);
    item.dispose();
    return true;
  };

  /**
   * Disposes all disposables in the group and removes them from the group.
   */

  CompositeDisposable.prototype.dispose = function dispose() {
    if (this.isDisposed) {
      return;
    }

    var len = this.disposables.length;
    var currentDisposables = new Array(len);
    for (var i = 0; i < len; i++) {
      currentDisposables[i] = this.disposables[i];
    }

    this.isDisposed = true;
    this.disposables = [];
    this.length = 0;

    for (var i = 0; i < len; i++) {
      currentDisposables[i].dispose();
    }
  };

  return CompositeDisposable;
})();

exports['default'] = CompositeDisposable;
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.__esModule = true;
var noop = function noop() {};

/**
 * The basic disposable.
 */

var Disposable = (function () {
  function Disposable(action) {
    _classCallCheck(this, Disposable);

    this.isDisposed = false;
    this.action = action || noop;
  }

  Disposable.prototype.dispose = function dispose() {
    if (!this.isDisposed) {
      this.action.call(null);
      this.isDisposed = true;
    }
  };

  _createClass(Disposable, null, [{
    key: "empty",
    enumerable: true,
    value: { dispose: noop }
  }]);

  return Disposable;
})();

exports["default"] = Disposable;
module.exports = exports["default"];

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _isDisposable = __webpack_require__(31);

var _isDisposable2 = _interopRequireWildcard(_isDisposable);

var SerialDisposable = (function () {
  function SerialDisposable() {
    _classCallCheck(this, SerialDisposable);

    this.isDisposed = false;
    this.current = null;
  }

  /**
   * Gets the underlying disposable.
   * @return The underlying disposable.
   */

  SerialDisposable.prototype.getDisposable = function getDisposable() {
    return this.current;
  };

  /**
   * Sets the underlying disposable.
   * @param {Disposable} value The new underlying disposable.
   */

  SerialDisposable.prototype.setDisposable = function setDisposable() {
    var value = arguments[0] === undefined ? null : arguments[0];

    if (value != null && !_isDisposable2['default'](value)) {
      throw new Error('Expected either an empty value or a valid disposable');
    }

    var isDisposed = this.isDisposed;
    var previous = undefined;

    if (!isDisposed) {
      previous = this.current;
      this.current = value;
    }

    if (previous) {
      previous.dispose();
    }

    if (isDisposed && value) {
      value.dispose();
    }
  };

  /**
   * Disposes the underlying disposable as well as all future replacements.
   */

  SerialDisposable.prototype.dispose = function dispose() {
    if (this.isDisposed) {
      return;
    }

    this.isDisposed = true;
    var previous = this.current;
    this.current = null;

    if (previous) {
      previous.dispose();
    }
  };

  return SerialDisposable;
})();

exports['default'] = SerialDisposable;
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _isDisposable2 = __webpack_require__(31);

var _isDisposable3 = _interopRequireWildcard(_isDisposable2);

exports.isDisposable = _isDisposable3['default'];

var _Disposable2 = __webpack_require__(117);

var _Disposable3 = _interopRequireWildcard(_Disposable2);

exports.Disposable = _Disposable3['default'];

var _CompositeDisposable2 = __webpack_require__(116);

var _CompositeDisposable3 = _interopRequireWildcard(_CompositeDisposable2);

exports.CompositeDisposable = _CompositeDisposable3['default'];

var _SerialDisposable2 = __webpack_require__(118);

var _SerialDisposable3 = _interopRequireWildcard(_SerialDisposable2);

exports.SerialDisposable = _SerialDisposable3['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createStore = __webpack_require__(250);

var _createStore2 = _interopRequireDefault(_createStore);

var _reducers = __webpack_require__(128);

var _reducers2 = _interopRequireDefault(_reducers);

var _dragDrop = __webpack_require__(18);

var dragDropActions = _interopRequireWildcard(_dragDrop);

var _DragDropMonitor = __webpack_require__(121);

var _DragDropMonitor2 = _interopRequireDefault(_DragDropMonitor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragDropManager = function () {
  function DragDropManager(createBackend) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, DragDropManager);

    var store = (0, _createStore2.default)(_reducers2.default);
    this.context = context;
    this.store = store;
    this.monitor = new _DragDropMonitor2.default(store);
    this.registry = this.monitor.registry;
    this.backend = createBackend(this);

    store.subscribe(this.handleRefCountChange.bind(this));
  }

  _createClass(DragDropManager, [{
    key: 'handleRefCountChange',
    value: function handleRefCountChange() {
      var shouldSetUp = this.store.getState().refCount > 0;
      if (shouldSetUp && !this.isSetUp) {
        this.backend.setup();
        this.isSetUp = true;
      } else if (!shouldSetUp && this.isSetUp) {
        this.backend.teardown();
        this.isSetUp = false;
      }
    }
  }, {
    key: 'getContext',
    value: function getContext() {
      return this.context;
    }
  }, {
    key: 'getMonitor',
    value: function getMonitor() {
      return this.monitor;
    }
  }, {
    key: 'getBackend',
    value: function getBackend() {
      return this.backend;
    }
  }, {
    key: 'getRegistry',
    value: function getRegistry() {
      return this.registry;
    }
  }, {
    key: 'getActions',
    value: function getActions() {
      var manager = this;
      var dispatch = this.store.dispatch;


      function bindActionCreator(actionCreator) {
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var action = actionCreator.apply(manager, args);
          if (typeof action !== 'undefined') {
            dispatch(action);
          }
        };
      }

      return Object.keys(dragDropActions).filter(function (key) {
        return typeof dragDropActions[key] === 'function';
      }).reduce(function (boundActions, key) {
        var action = dragDropActions[key];
        boundActions[key] = bindActionCreator(action); // eslint-disable-line no-param-reassign
        return boundActions;
      }, {});
    }
  }]);

  return DragDropManager;
}();

exports.default = DragDropManager;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isArray = __webpack_require__(2);

var _isArray2 = _interopRequireDefault(_isArray);

var _matchesType = __webpack_require__(56);

var _matchesType2 = _interopRequireDefault(_matchesType);

var _HandlerRegistry = __webpack_require__(124);

var _HandlerRegistry2 = _interopRequireDefault(_HandlerRegistry);

var _dragOffset = __webpack_require__(55);

var _dirtyHandlerIds = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragDropMonitor = function () {
  function DragDropMonitor(store) {
    _classCallCheck(this, DragDropMonitor);

    this.store = store;
    this.registry = new _HandlerRegistry2.default(store);
  }

  _createClass(DragDropMonitor, [{
    key: 'subscribeToStateChange',
    value: function subscribeToStateChange(listener) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var handlerIds = options.handlerIds;

      (0, _invariant2.default)(typeof listener === 'function', 'listener must be a function.');
      (0, _invariant2.default)(typeof handlerIds === 'undefined' || (0, _isArray2.default)(handlerIds), 'handlerIds, when specified, must be an array of strings.');

      var prevStateId = this.store.getState().stateId;
      var handleChange = function handleChange() {
        var state = _this.store.getState();
        var currentStateId = state.stateId;
        try {
          var canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !(0, _dirtyHandlerIds.areDirty)(state.dirtyHandlerIds, handlerIds);

          if (!canSkipListener) {
            listener();
          }
        } finally {
          prevStateId = currentStateId;
        }
      };

      return this.store.subscribe(handleChange);
    }
  }, {
    key: 'subscribeToOffsetChange',
    value: function subscribeToOffsetChange(listener) {
      var _this2 = this;

      (0, _invariant2.default)(typeof listener === 'function', 'listener must be a function.');

      var previousState = this.store.getState().dragOffset;
      var handleChange = function handleChange() {
        var nextState = _this2.store.getState().dragOffset;
        if (nextState === previousState) {
          return;
        }

        previousState = nextState;
        listener();
      };

      return this.store.subscribe(handleChange);
    }
  }, {
    key: 'canDragSource',
    value: function canDragSource(sourceId) {
      var source = this.registry.getSource(sourceId);
      (0, _invariant2.default)(source, 'Expected to find a valid source.');

      if (this.isDragging()) {
        return false;
      }

      return source.canDrag(this, sourceId);
    }
  }, {
    key: 'canDropOnTarget',
    value: function canDropOnTarget(targetId) {
      var target = this.registry.getTarget(targetId);
      (0, _invariant2.default)(target, 'Expected to find a valid target.');

      if (!this.isDragging() || this.didDrop()) {
        return false;
      }

      var targetType = this.registry.getTargetType(targetId);
      var draggedItemType = this.getItemType();
      return (0, _matchesType2.default)(targetType, draggedItemType) && target.canDrop(this, targetId);
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      return Boolean(this.getItemType());
    }
  }, {
    key: 'isDraggingSource',
    value: function isDraggingSource(sourceId) {
      var source = this.registry.getSource(sourceId, true);
      (0, _invariant2.default)(source, 'Expected to find a valid source.');

      if (!this.isDragging() || !this.isSourcePublic()) {
        return false;
      }

      var sourceType = this.registry.getSourceType(sourceId);
      var draggedItemType = this.getItemType();
      if (sourceType !== draggedItemType) {
        return false;
      }

      return source.isDragging(this, sourceId);
    }
  }, {
    key: 'isOverTarget',
    value: function isOverTarget(targetId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { shallow: false };
      var shallow = options.shallow;

      if (!this.isDragging()) {
        return false;
      }

      var targetType = this.registry.getTargetType(targetId);
      var draggedItemType = this.getItemType();
      if (!(0, _matchesType2.default)(targetType, draggedItemType)) {
        return false;
      }

      var targetIds = this.getTargetIds();
      if (!targetIds.length) {
        return false;
      }

      var index = targetIds.indexOf(targetId);
      if (shallow) {
        return index === targetIds.length - 1;
      } else {
        return index > -1;
      }
    }
  }, {
    key: 'getItemType',
    value: function getItemType() {
      return this.store.getState().dragOperation.itemType;
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      return this.store.getState().dragOperation.item;
    }
  }, {
    key: 'getSourceId',
    value: function getSourceId() {
      return this.store.getState().dragOperation.sourceId;
    }
  }, {
    key: 'getTargetIds',
    value: function getTargetIds() {
      return this.store.getState().dragOperation.targetIds;
    }
  }, {
    key: 'getDropResult',
    value: function getDropResult() {
      return this.store.getState().dragOperation.dropResult;
    }
  }, {
    key: 'didDrop',
    value: function didDrop() {
      return this.store.getState().dragOperation.didDrop;
    }
  }, {
    key: 'isSourcePublic',
    value: function isSourcePublic() {
      return this.store.getState().dragOperation.isSourcePublic;
    }
  }, {
    key: 'getInitialClientOffset',
    value: function getInitialClientOffset() {
      return this.store.getState().dragOffset.initialClientOffset;
    }
  }, {
    key: 'getInitialSourceClientOffset',
    value: function getInitialSourceClientOffset() {
      return this.store.getState().dragOffset.initialSourceClientOffset;
    }
  }, {
    key: 'getClientOffset',
    value: function getClientOffset() {
      return this.store.getState().dragOffset.clientOffset;
    }
  }, {
    key: 'getSourceClientOffset',
    value: function getSourceClientOffset() {
      return (0, _dragOffset.getSourceClientOffset)(this.store.getState().dragOffset);
    }
  }, {
    key: 'getDifferenceFromInitialOffset',
    value: function getDifferenceFromInitialOffset() {
      return (0, _dragOffset.getDifferenceFromInitialOffset)(this.store.getState().dragOffset);
    }
  }]);

  return DragDropMonitor;
}();

exports.default = DragDropMonitor;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragSource = function () {
  function DragSource() {
    _classCallCheck(this, DragSource);
  }

  _createClass(DragSource, [{
    key: "canDrag",
    value: function canDrag() {
      return true;
    }
  }, {
    key: "isDragging",
    value: function isDragging(monitor, handle) {
      return handle === monitor.getSourceId();
    }
  }, {
    key: "endDrag",
    value: function endDrag() {}
  }]);

  return DragSource;
}();

exports.default = DragSource;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropTarget = function () {
  function DropTarget() {
    _classCallCheck(this, DropTarget);
  }

  _createClass(DropTarget, [{
    key: "canDrop",
    value: function canDrop() {
      return true;
    }
  }, {
    key: "hover",
    value: function hover() {}
  }, {
    key: "drop",
    value: function drop() {}
  }]);

  return DropTarget;
}();

exports.default = DropTarget;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isArray = __webpack_require__(2);

var _isArray2 = _interopRequireDefault(_isArray);

var _asap = __webpack_require__(114);

var _asap2 = _interopRequireDefault(_asap);

var _registry = __webpack_require__(19);

var _getNextUniqueId = __webpack_require__(131);

var _getNextUniqueId2 = _interopRequireDefault(_getNextUniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandlerRoles = {
  SOURCE: 'SOURCE',
  TARGET: 'TARGET'
};

function validateSourceContract(source) {
  (0, _invariant2.default)(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
  (0, _invariant2.default)(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
  (0, _invariant2.default)(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
}

function validateTargetContract(target) {
  (0, _invariant2.default)(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
  (0, _invariant2.default)(typeof target.hover === 'function', 'Expected hover to be a function.');
  (0, _invariant2.default)(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
}

function validateType(type, allowArray) {
  if (allowArray && (0, _isArray2.default)(type)) {
    type.forEach(function (t) {
      return validateType(t, false);
    });
    return;
  }

  (0, _invariant2.default)(typeof type === 'string' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol', allowArray ? 'Type can only be a string, a symbol, or an array of either.' : 'Type can only be a string or a symbol.');
}

function getNextHandlerId(role) {
  var id = (0, _getNextUniqueId2.default)().toString();
  switch (role) {
    case HandlerRoles.SOURCE:
      return 'S' + id;
    case HandlerRoles.TARGET:
      return 'T' + id;
    default:
      (0, _invariant2.default)(false, 'Unknown role: ' + role);
  }
}

function parseRoleFromHandlerId(handlerId) {
  switch (handlerId[0]) {
    case 'S':
      return HandlerRoles.SOURCE;
    case 'T':
      return HandlerRoles.TARGET;
    default:
      (0, _invariant2.default)(false, 'Cannot parse handler ID: ' + handlerId);
  }
}

var HandlerRegistry = function () {
  function HandlerRegistry(store) {
    _classCallCheck(this, HandlerRegistry);

    this.store = store;

    this.types = {};
    this.handlers = {};

    this.pinnedSourceId = null;
    this.pinnedSource = null;
  }

  _createClass(HandlerRegistry, [{
    key: 'addSource',
    value: function addSource(type, source) {
      validateType(type);
      validateSourceContract(source);

      var sourceId = this.addHandler(HandlerRoles.SOURCE, type, source);
      this.store.dispatch((0, _registry.addSource)(sourceId));
      return sourceId;
    }
  }, {
    key: 'addTarget',
    value: function addTarget(type, target) {
      validateType(type, true);
      validateTargetContract(target);

      var targetId = this.addHandler(HandlerRoles.TARGET, type, target);
      this.store.dispatch((0, _registry.addTarget)(targetId));
      return targetId;
    }
  }, {
    key: 'addHandler',
    value: function addHandler(role, type, handler) {
      var id = getNextHandlerId(role);
      this.types[id] = type;
      this.handlers[id] = handler;

      return id;
    }
  }, {
    key: 'containsHandler',
    value: function containsHandler(handler) {
      var _this = this;

      return Object.keys(this.handlers).some(function (key) {
        return _this.handlers[key] === handler;
      });
    }
  }, {
    key: 'getSource',
    value: function getSource(sourceId, includePinned) {
      (0, _invariant2.default)(this.isSourceId(sourceId), 'Expected a valid source ID.');

      var isPinned = includePinned && sourceId === this.pinnedSourceId;
      var source = isPinned ? this.pinnedSource : this.handlers[sourceId];

      return source;
    }
  }, {
    key: 'getTarget',
    value: function getTarget(targetId) {
      (0, _invariant2.default)(this.isTargetId(targetId), 'Expected a valid target ID.');
      return this.handlers[targetId];
    }
  }, {
    key: 'getSourceType',
    value: function getSourceType(sourceId) {
      (0, _invariant2.default)(this.isSourceId(sourceId), 'Expected a valid source ID.');
      return this.types[sourceId];
    }
  }, {
    key: 'getTargetType',
    value: function getTargetType(targetId) {
      (0, _invariant2.default)(this.isTargetId(targetId), 'Expected a valid target ID.');
      return this.types[targetId];
    }
  }, {
    key: 'isSourceId',
    value: function isSourceId(handlerId) {
      var role = parseRoleFromHandlerId(handlerId);
      return role === HandlerRoles.SOURCE;
    }
  }, {
    key: 'isTargetId',
    value: function isTargetId(handlerId) {
      var role = parseRoleFromHandlerId(handlerId);
      return role === HandlerRoles.TARGET;
    }
  }, {
    key: 'removeSource',
    value: function removeSource(sourceId) {
      var _this2 = this;

      (0, _invariant2.default)(this.getSource(sourceId), 'Expected an existing source.');
      this.store.dispatch((0, _registry.removeSource)(sourceId));

      (0, _asap2.default)(function () {
        delete _this2.handlers[sourceId];
        delete _this2.types[sourceId];
      });
    }
  }, {
    key: 'removeTarget',
    value: function removeTarget(targetId) {
      var _this3 = this;

      (0, _invariant2.default)(this.getTarget(targetId), 'Expected an existing target.');
      this.store.dispatch((0, _registry.removeTarget)(targetId));

      (0, _asap2.default)(function () {
        delete _this3.handlers[targetId];
        delete _this3.types[targetId];
      });
    }
  }, {
    key: 'pinSource',
    value: function pinSource(sourceId) {
      var source = this.getSource(sourceId);
      (0, _invariant2.default)(source, 'Expected an existing source.');

      this.pinnedSourceId = sourceId;
      this.pinnedSource = source;
    }
  }, {
    key: 'unpinSource',
    value: function unpinSource() {
      (0, _invariant2.default)(this.pinnedSource, 'No source is pinned at the time.');

      this.pinnedSourceId = null;
      this.pinnedSource = null;
    }
  }]);

  return HandlerRegistry;
}();

exports.default = HandlerRegistry;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createBackend;

var _noop = __webpack_require__(46);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestBackend = function () {
  function TestBackend(manager) {
    _classCallCheck(this, TestBackend);

    this.actions = manager.getActions();
  }

  _createClass(TestBackend, [{
    key: 'setup',
    value: function setup() {
      this.didCallSetup = true;
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      this.didCallTeardown = true;
    }
  }, {
    key: 'connectDragSource',
    value: function connectDragSource() {
      return _noop2.default;
    }
  }, {
    key: 'connectDragPreview',
    value: function connectDragPreview() {
      return _noop2.default;
    }
  }, {
    key: 'connectDropTarget',
    value: function connectDropTarget() {
      return _noop2.default;
    }
  }, {
    key: 'simulateBeginDrag',
    value: function simulateBeginDrag(sourceIds, options) {
      this.actions.beginDrag(sourceIds, options);
    }
  }, {
    key: 'simulatePublishDragSource',
    value: function simulatePublishDragSource() {
      this.actions.publishDragSource();
    }
  }, {
    key: 'simulateHover',
    value: function simulateHover(targetIds, options) {
      this.actions.hover(targetIds, options);
    }
  }, {
    key: 'simulateDrop',
    value: function simulateDrop() {
      this.actions.drop();
    }
  }, {
    key: 'simulateEndDrag',
    value: function simulateEndDrag() {
      this.actions.endDrag();
    }
  }]);

  return TestBackend;
}();

function createBackend(manager) {
  return new TestBackend(manager);
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragDropManager = __webpack_require__(120);

Object.defineProperty(exports, 'DragDropManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragDropManager).default;
  }
});

var _DragSource = __webpack_require__(122);

Object.defineProperty(exports, 'DragSource', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragSource).default;
  }
});

var _DropTarget = __webpack_require__(123);

Object.defineProperty(exports, 'DropTarget', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropTarget).default;
  }
});

var _createTestBackend = __webpack_require__(125);

Object.defineProperty(exports, 'createTestBackend', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createTestBackend).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = dragOperation;

var _without = __webpack_require__(85);

var _without2 = _interopRequireDefault(_without);

var _dragDrop = __webpack_require__(18);

var _registry = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: false,
  isSourcePublic: null
};

function dragOperation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _dragDrop.BEGIN_DRAG:
      return _extends({}, state, {
        itemType: action.itemType,
        item: action.item,
        sourceId: action.sourceId,
        isSourcePublic: action.isSourcePublic,
        dropResult: null,
        didDrop: false
      });
    case _dragDrop.PUBLISH_DRAG_SOURCE:
      return _extends({}, state, {
        isSourcePublic: true
      });
    case _dragDrop.HOVER:
      return _extends({}, state, {
        targetIds: action.targetIds
      });
    case _registry.REMOVE_TARGET:
      if (state.targetIds.indexOf(action.targetId) === -1) {
        return state;
      }
      return _extends({}, state, {
        targetIds: (0, _without2.default)(state.targetIds, action.targetId)
      });
    case _dragDrop.DROP:
      return _extends({}, state, {
        dropResult: action.dropResult,
        didDrop: true,
        targetIds: []
      });
    case _dragDrop.END_DRAG:
      return _extends({}, state, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: false,
        isSourcePublic: null,
        targetIds: []
      });
    default:
      return state;
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduce;

var _dragOffset = __webpack_require__(55);

var _dragOffset2 = _interopRequireDefault(_dragOffset);

var _dragOperation = __webpack_require__(127);

var _dragOperation2 = _interopRequireDefault(_dragOperation);

var _refCount = __webpack_require__(129);

var _refCount2 = _interopRequireDefault(_refCount);

var _dirtyHandlerIds = __webpack_require__(54);

var _dirtyHandlerIds2 = _interopRequireDefault(_dirtyHandlerIds);

var _stateId = __webpack_require__(130);

var _stateId2 = _interopRequireDefault(_stateId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reduce() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    dirtyHandlerIds: (0, _dirtyHandlerIds2.default)(state.dirtyHandlerIds, action, state.dragOperation),
    dragOffset: (0, _dragOffset2.default)(state.dragOffset, action),
    refCount: (0, _refCount2.default)(state.refCount, action),
    dragOperation: (0, _dragOperation2.default)(state.dragOperation, action),
    stateId: (0, _stateId2.default)(state.stateId)
  };
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refCount;

var _registry = __webpack_require__(19);

function refCount() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case _registry.ADD_SOURCE:
    case _registry.ADD_TARGET:
      return state + 1;
    case _registry.REMOVE_SOURCE:
    case _registry.REMOVE_TARGET:
      return state - 1;
    default:
      return state;
  }
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateId;
function stateId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return state + 1;
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNextUniqueId;
var nextUniqueId = 0;

function getNextUniqueId() {
  return nextUniqueId++;
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(171),
    hashDelete = __webpack_require__(172),
    hashGet = __webpack_require__(173),
    hashHas = __webpack_require__(174),
    hashSet = __webpack_require__(175);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20),
    stackClear = __webpack_require__(201),
    stackDelete = __webpack_require__(202),
    stackGet = __webpack_require__(203),
    stackHas = __webpack_require__(204),
    stackSet = __webpack_require__(205);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(4);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 137 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(64),
    eq = __webpack_require__(15);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 139 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(63),
    isArray = __webpack_require__(2);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(139),
    baseIsNaN = __webpack_require__(146),
    strictIndexOf = __webpack_require__(206);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(21),
    arrayIncludes = __webpack_require__(39),
    arrayIncludesWith = __webpack_require__(40),
    arrayMap = __webpack_require__(41),
    baseUnary = __webpack_require__(44),
    cacheHas = __webpack_require__(24);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(145),
    isObjectLike = __webpack_require__(7);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(135),
    equalArrays = __webpack_require__(69),
    equalByTag = __webpack_require__(162),
    equalObjects = __webpack_require__(163),
    getTag = __webpack_require__(169),
    isArray = __webpack_require__(2),
    isBuffer = __webpack_require__(81),
    isTypedArray = __webpack_require__(84);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(82),
    isMasked = __webpack_require__(180),
    isObject = __webpack_require__(12),
    toSource = __webpack_require__(78);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(14),
    isLength = __webpack_require__(83),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(74),
    nativeKeys = __webpack_require__(193);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12),
    isPrototype = __webpack_require__(74),
    nativeKeysIn = __webpack_require__(194);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(209),
    defineProperty = __webpack_require__(68),
    identity = __webpack_require__(79);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(66),
    baseFlatten = __webpack_require__(42),
    baseUniq = __webpack_require__(67);

/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }
  var index = -1,
      result = Array(length);

  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}

module.exports = baseXor;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(28);

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),
/* 155 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(138),
    baseAssignValue = __webpack_require__(64);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(4);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(11),
    isIterateeCall = __webpack_require__(177);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var LodashWrapper = __webpack_require__(36),
    flatRest = __webpack_require__(164),
    getData = __webpack_require__(71),
    getFuncName = __webpack_require__(72),
    isArray = __webpack_require__(2),
    isLaziable = __webpack_require__(179);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return flatRest(function(funcs) {
    var length = funcs.length,
        index = length,
        prereq = LodashWrapper.prototype.thru;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      var func = funcs[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
        var wrapper = new LodashWrapper([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];

      var funcName = getFuncName(func),
          data = funcName == 'wrapper' ? getData(func) : undefined;

      if (data && isLaziable(data[0]) &&
            data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
            !data[4].length && data[9] == 1
          ) {
        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = (func.length == 1 && isLaziable(func))
          ? wrapper[funcName]()
          : wrapper.thru(func);
      }
    }
    return function() {
      var args = arguments,
          value = args[0];

      if (wrapper && args.length == 1 && isArray(value)) {
        return wrapper.plant(value).value();
      }
      var index = 0,
          result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

module.exports = createFlow;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(58),
    noop = __webpack_require__(46),
    setToArray = __webpack_require__(45);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(15);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

module.exports = customDefaultsAssignIn;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22),
    Uint8Array = __webpack_require__(136),
    eq = __webpack_require__(15),
    equalArrays = __webpack_require__(69),
    mapToArray = __webpack_require__(191),
    setToArray = __webpack_require__(45);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(165);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(211),
    overRest = __webpack_require__(76),
    setToString = __webpack_require__(77);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(140),
    getSymbols = __webpack_require__(168),
    keys = __webpack_require__(215);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(75);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(61),
    stubArray = __webpack_require__(218);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(132),
    Map = __webpack_require__(37),
    Promise = __webpack_require__(134),
    Set = __webpack_require__(58),
    WeakMap = __webpack_require__(59),
    baseGetTag = __webpack_require__(14),
    toSource = __webpack_require__(78);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 170 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(26);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(26);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(26);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(26);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22),
    isArguments = __webpack_require__(80),
    isArray = __webpack_require__(2);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(15),
    isArrayLike = __webpack_require__(27),
    isIndex = __webpack_require__(73),
    isObject = __webpack_require__(12);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 178 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    getData = __webpack_require__(71),
    getFuncName = __webpack_require__(72),
    lodash = __webpack_require__(221);

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(157);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(23);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(23);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(23);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(23);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(133),
    ListCache = __webpack_require__(20),
    Map = __webpack_require__(37);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(25);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(25);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(25);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(25);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 191 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var WeakMap = __webpack_require__(59);

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(75);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 194 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(70);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module)))

/***/ }),
/* 196 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 197 */
/***/ (function(module, exports) {

/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;


/***/ }),
/* 198 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 199 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 200 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 202 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 203 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 204 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20),
    Map = __webpack_require__(37),
    MapCache = __webpack_require__(38);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 206 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    LodashWrapper = __webpack_require__(36),
    copyArray = __webpack_require__(155);

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(156),
    createAssigner = __webpack_require__(158),
    keysIn = __webpack_require__(216);

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;


/***/ }),
/* 209 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(60),
    assignInWith = __webpack_require__(208),
    baseRest = __webpack_require__(11),
    customDefaultsAssignIn = __webpack_require__(161);

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(42);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var createFlow = __webpack_require__(159);

/**
 * Creates a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flowRight
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow([_.add, square]);
 * addSquare(1, 2);
 * // => 9
 */
var flow = createFlow();

module.exports = flow;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(41),
    baseIntersection = __webpack_require__(142),
    baseRest = __webpack_require__(11),
    castArrayLikeObject = __webpack_require__(154);

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(144);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(62),
    baseKeys = __webpack_require__(149),
    isArrayLike = __webpack_require__(27);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(62),
    baseKeysIn = __webpack_require__(150),
    isArrayLike = __webpack_require__(27);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(38);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 218 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 219 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(42),
    baseRest = __webpack_require__(11),
    baseUniq = __webpack_require__(67),
    isArrayLikeObject = __webpack_require__(28);

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    LodashWrapper = __webpack_require__(36),
    baseLodash = __webpack_require__(43),
    isArray = __webpack_require__(2),
    isObjectLike = __webpack_require__(7),
    wrapperClone = __webpack_require__(207);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(61),
    baseRest = __webpack_require__(11),
    baseXor = __webpack_require__(153),
    isArrayLikeObject = __webpack_require__(28);

/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.without
 * @example
 *
 * _.xor([2, 1], [2, 3]);
 * // => [1, 3]
 */
var xor = baseRest(function(arrays) {
  return baseXor(arrayFilter(arrays, isArrayLikeObject));
});

module.exports = xor;


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(33);
  var warning = __webpack_require__(57);
  var ReactPropTypesSecret = __webpack_require__(86);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(32);
var invariant = __webpack_require__(33);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(32);
var invariant = __webpack_require__(33);
var warning = __webpack_require__(57);

var ReactPropTypesSecret = __webpack_require__(86);
var checkPropTypes = __webpack_require__(223);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _union = __webpack_require__(220);

var _union2 = _interopRequireDefault(_union);

var _without = __webpack_require__(85);

var _without2 = _interopRequireDefault(_without);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnterLeaveCounter = function () {
  function EnterLeaveCounter() {
    _classCallCheck(this, EnterLeaveCounter);

    this.entered = [];
  }

  _createClass(EnterLeaveCounter, [{
    key: 'enter',
    value: function enter(enteringNode) {
      var previousLength = this.entered.length;

      var isNodeEntered = function isNodeEntered(node) {
        return document.documentElement.contains(node) && (!node.contains || node.contains(enteringNode));
      };

      this.entered = (0, _union2.default)(this.entered.filter(isNodeEntered), [enteringNode]);

      return previousLength === 0 && this.entered.length > 0;
    }
  }, {
    key: 'leave',
    value: function leave(leavingNode) {
      var previousLength = this.entered.length;

      this.entered = (0, _without2.default)(this.entered.filter(function (node) {
        return document.documentElement.contains(node);
      }), leavingNode);

      return previousLength > 0 && this.entered.length === 0;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.entered = [];
    }
  }]);

  return EnterLeaveCounter;
}();

exports.default = EnterLeaveCounter;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = __webpack_require__(210);

var _defaults2 = _interopRequireDefault(_defaults);

var _shallowEqual = __webpack_require__(233);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _EnterLeaveCounter = __webpack_require__(226);

var _EnterLeaveCounter2 = _interopRequireDefault(_EnterLeaveCounter);

var _BrowserDetector = __webpack_require__(87);

var _OffsetUtils = __webpack_require__(230);

var _NativeDragSources = __webpack_require__(229);

var _NativeTypes = __webpack_require__(47);

var NativeTypes = _interopRequireWildcard(_NativeTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTML5Backend = function () {
  function HTML5Backend(manager) {
    _classCallCheck(this, HTML5Backend);

    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();
    this.context = manager.getContext();

    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.sourceNodes = {};
    this.sourceNodeOptions = {};
    this.enterLeaveCounter = new _EnterLeaveCounter2.default();

    this.dragStartSourceIds = [];
    this.dropTargetIds = [];
    this.dragEnterTargetIds = [];
    this.currentNativeSource = null;
    this.currentNativeHandle = null;
    this.currentDragSourceNode = null;
    this.currentDragSourceNodeOffset = null;
    this.currentDragSourceNodeOffsetChanged = false;
    this.altKeyPressed = false;

    this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
    this.handleTopDragStart = this.handleTopDragStart.bind(this);
    this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
    this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
    this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
    this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
    this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
    this.handleTopDragOver = this.handleTopDragOver.bind(this);
    this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
    this.handleTopDrop = this.handleTopDrop.bind(this);
    this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
    this.handleSelectStart = this.handleSelectStart.bind(this);
    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
    this.endDragNativeItem = this.endDragNativeItem.bind(this);
    this.asyncEndDragNativeItem = this.asyncEndDragNativeItem.bind(this);
  }

  _createClass(HTML5Backend, [{
    key: 'setup',
    value: function setup() {
      if (this.window === undefined) {
        return;
      }

      if (this.window.__isReactDndBackendSetUp) {
        // eslint-disable-line no-underscore-dangle
        throw new Error('Cannot have two HTML5 backends at the same time.');
      }
      this.window.__isReactDndBackendSetUp = true; // eslint-disable-line no-underscore-dangle
      this.addEventListeners(this.window);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      if (this.window === undefined) {
        return;
      }

      this.window.__isReactDndBackendSetUp = false; // eslint-disable-line no-underscore-dangle
      this.removeEventListeners(this.window);
      this.clearCurrentDragSourceNode();
      if (this.asyncEndDragFrameId) {
        this.window.cancelAnimationFrame(this.asyncEndDragFrameId);
      }
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners(target) {
      target.addEventListener('dragstart', this.handleTopDragStart);
      target.addEventListener('dragstart', this.handleTopDragStartCapture, true);
      target.addEventListener('dragend', this.handleTopDragEndCapture, true);
      target.addEventListener('dragenter', this.handleTopDragEnter);
      target.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
      target.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
      target.addEventListener('dragover', this.handleTopDragOver);
      target.addEventListener('dragover', this.handleTopDragOverCapture, true);
      target.addEventListener('drop', this.handleTopDrop);
      target.addEventListener('drop', this.handleTopDropCapture, true);
    }
  }, {
    key: 'removeEventListeners',
    value: function removeEventListeners(target) {
      target.removeEventListener('dragstart', this.handleTopDragStart);
      target.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
      target.removeEventListener('dragend', this.handleTopDragEndCapture, true);
      target.removeEventListener('dragenter', this.handleTopDragEnter);
      target.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
      target.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
      target.removeEventListener('dragover', this.handleTopDragOver);
      target.removeEventListener('dragover', this.handleTopDragOverCapture, true);
      target.removeEventListener('drop', this.handleTopDrop);
      target.removeEventListener('drop', this.handleTopDropCapture, true);
    }
  }, {
    key: 'connectDragPreview',
    value: function connectDragPreview(sourceId, node, options) {
      var _this = this;

      this.sourcePreviewNodeOptions[sourceId] = options;
      this.sourcePreviewNodes[sourceId] = node;

      return function () {
        delete _this.sourcePreviewNodes[sourceId];
        delete _this.sourcePreviewNodeOptions[sourceId];
      };
    }
  }, {
    key: 'connectDragSource',
    value: function connectDragSource(sourceId, node, options) {
      var _this2 = this;

      this.sourceNodes[sourceId] = node;
      this.sourceNodeOptions[sourceId] = options;

      var handleDragStart = function handleDragStart(e) {
        return _this2.handleDragStart(e, sourceId);
      };
      var handleSelectStart = function handleSelectStart(e) {
        return _this2.handleSelectStart(e, sourceId);
      };

      node.setAttribute('draggable', true);
      node.addEventListener('dragstart', handleDragStart);
      node.addEventListener('selectstart', handleSelectStart);

      return function () {
        delete _this2.sourceNodes[sourceId];
        delete _this2.sourceNodeOptions[sourceId];

        node.removeEventListener('dragstart', handleDragStart);
        node.removeEventListener('selectstart', handleSelectStart);
        node.setAttribute('draggable', false);
      };
    }
  }, {
    key: 'connectDropTarget',
    value: function connectDropTarget(targetId, node) {
      var _this3 = this;

      var handleDragEnter = function handleDragEnter(e) {
        return _this3.handleDragEnter(e, targetId);
      };
      var handleDragOver = function handleDragOver(e) {
        return _this3.handleDragOver(e, targetId);
      };
      var handleDrop = function handleDrop(e) {
        return _this3.handleDrop(e, targetId);
      };

      node.addEventListener('dragenter', handleDragEnter);
      node.addEventListener('dragover', handleDragOver);
      node.addEventListener('drop', handleDrop);

      return function () {
        node.removeEventListener('dragenter', handleDragEnter);
        node.removeEventListener('dragover', handleDragOver);
        node.removeEventListener('drop', handleDrop);
      };
    }
  }, {
    key: 'getCurrentSourceNodeOptions',
    value: function getCurrentSourceNodeOptions() {
      var sourceId = this.monitor.getSourceId();
      var sourceNodeOptions = this.sourceNodeOptions[sourceId];

      return (0, _defaults2.default)(sourceNodeOptions || {}, {
        dropEffect: this.altKeyPressed ? 'copy' : 'move'
      });
    }
  }, {
    key: 'getCurrentDropEffect',
    value: function getCurrentDropEffect() {
      if (this.isDraggingNativeItem()) {
        // It makes more sense to default to 'copy' for native resources
        return 'copy';
      }

      return this.getCurrentSourceNodeOptions().dropEffect;
    }
  }, {
    key: 'getCurrentSourcePreviewNodeOptions',
    value: function getCurrentSourcePreviewNodeOptions() {
      var sourceId = this.monitor.getSourceId();
      var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

      return (0, _defaults2.default)(sourcePreviewNodeOptions || {}, {
        anchorX: 0.5,
        anchorY: 0.5,
        captureDraggingState: false
      });
    }
  }, {
    key: 'getSourceClientOffset',
    value: function getSourceClientOffset(sourceId) {
      return (0, _OffsetUtils.getNodeClientOffset)(this.sourceNodes[sourceId]);
    }
  }, {
    key: 'isDraggingNativeItem',
    value: function isDraggingNativeItem() {
      var itemType = this.monitor.getItemType();
      return Object.keys(NativeTypes).some(function (key) {
        return NativeTypes[key] === itemType;
      });
    }
  }, {
    key: 'beginDragNativeItem',
    value: function beginDragNativeItem(type) {
      this.clearCurrentDragSourceNode();

      var SourceType = (0, _NativeDragSources.createNativeDragSource)(type);
      this.currentNativeSource = new SourceType();
      this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
      this.actions.beginDrag([this.currentNativeHandle]);

      // On Firefox, if mouseover fires, the drag is over but browser failed to tell us.
      // See https://bugzilla.mozilla.org/show_bug.cgi?id=656164
      // This is not true for other browsers.
      if ((0, _BrowserDetector.isFirefox)()) {
        this.window.addEventListener('mouseover', this.asyncEndDragNativeItem, true);
      }
    }
  }, {
    key: 'asyncEndDragNativeItem',
    value: function asyncEndDragNativeItem() {
      this.asyncEndDragFrameId = this.window.requestAnimationFrame(this.endDragNativeItem);
      if ((0, _BrowserDetector.isFirefox)()) {
        this.window.removeEventListener('mouseover', this.asyncEndDragNativeItem, true);
        this.enterLeaveCounter.reset();
      }
    }
  }, {
    key: 'endDragNativeItem',
    value: function endDragNativeItem() {
      if (!this.isDraggingNativeItem()) {
        return;
      }

      this.actions.endDrag();
      this.registry.removeSource(this.currentNativeHandle);
      this.currentNativeHandle = null;
      this.currentNativeSource = null;
    }
  }, {
    key: 'endDragIfSourceWasRemovedFromDOM',
    value: function endDragIfSourceWasRemovedFromDOM() {
      var node = this.currentDragSourceNode;
      if (document.body.contains(node)) {
        return;
      }

      if (this.clearCurrentDragSourceNode()) {
        this.actions.endDrag();
      }
    }
  }, {
    key: 'setCurrentDragSourceNode',
    value: function setCurrentDragSourceNode(node) {
      this.clearCurrentDragSourceNode();
      this.currentDragSourceNode = node;
      this.currentDragSourceNodeOffset = (0, _OffsetUtils.getNodeClientOffset)(node);
      this.currentDragSourceNodeOffsetChanged = false;

      // Receiving a mouse event in the middle of a dragging operation
      // means it has ended and the drag source node disappeared from DOM,
      // so the browser didn't dispatch the dragend event.
      this.window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
    }
  }, {
    key: 'clearCurrentDragSourceNode',
    value: function clearCurrentDragSourceNode() {
      if (this.currentDragSourceNode) {
        this.currentDragSourceNode = null;
        this.currentDragSourceNodeOffset = null;
        this.currentDragSourceNodeOffsetChanged = false;
        this.window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
        return true;
      }

      return false;
    }
  }, {
    key: 'checkIfCurrentDragSourceRectChanged',
    value: function checkIfCurrentDragSourceRectChanged() {
      var node = this.currentDragSourceNode;
      if (!node) {
        return false;
      }

      if (this.currentDragSourceNodeOffsetChanged) {
        return true;
      }

      this.currentDragSourceNodeOffsetChanged = !(0, _shallowEqual2.default)((0, _OffsetUtils.getNodeClientOffset)(node), this.currentDragSourceNodeOffset);

      return this.currentDragSourceNodeOffsetChanged;
    }
  }, {
    key: 'handleTopDragStartCapture',
    value: function handleTopDragStartCapture() {
      this.clearCurrentDragSourceNode();
      this.dragStartSourceIds = [];
    }
  }, {
    key: 'handleDragStart',
    value: function handleDragStart(e, sourceId) {
      this.dragStartSourceIds.unshift(sourceId);
    }
  }, {
    key: 'handleTopDragStart',
    value: function handleTopDragStart(e) {
      var _this4 = this;

      var dragStartSourceIds = this.dragStartSourceIds;

      this.dragStartSourceIds = null;

      var clientOffset = (0, _OffsetUtils.getEventClientOffset)(e);

      // Don't publish the source just yet (see why below)
      this.actions.beginDrag(dragStartSourceIds, {
        publishSource: false,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset: clientOffset
      });

      var dataTransfer = e.dataTransfer;

      var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

      if (this.monitor.isDragging()) {
        if (typeof dataTransfer.setDragImage === 'function') {
          // Use custom drag image if user specifies it.
          // If child drag source refuses drag but parent agrees,
          // use parent's node as drag image. Neither works in IE though.
          var sourceId = this.monitor.getSourceId();
          var sourceNode = this.sourceNodes[sourceId];
          var dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;

          var _getCurrentSourcePrev = this.getCurrentSourcePreviewNodeOptions(),
              anchorX = _getCurrentSourcePrev.anchorX,
              anchorY = _getCurrentSourcePrev.anchorY;

          var anchorPoint = { anchorX: anchorX, anchorY: anchorY };
          var dragPreviewOffset = (0, _OffsetUtils.getDragPreviewOffset)(sourceNode, dragPreview, clientOffset, anchorPoint);
          dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
        }

        try {
          // Firefox won't drag without setting data
          dataTransfer.setData('application/json', {});
        } catch (err) {}
        // IE doesn't support MIME types in setData


        // Store drag source node so we can check whether
        // it is removed from DOM and trigger endDrag manually.
        this.setCurrentDragSourceNode(e.target);

        // Now we are ready to publish the drag source.. or are we not?

        var _getCurrentSourcePrev2 = this.getCurrentSourcePreviewNodeOptions(),
            captureDraggingState = _getCurrentSourcePrev2.captureDraggingState;

        if (!captureDraggingState) {
          // Usually we want to publish it in the next tick so that browser
          // is able to screenshot the current (not yet dragging) state.
          //
          // It also neatly avoids a situation where render() returns null
          // in the same tick for the source element, and browser freaks out.
          setTimeout(function () {
            return _this4.actions.publishDragSource();
          });
        } else {
          // In some cases the user may want to override this behavior, e.g.
          // to work around IE not supporting custom drag previews.
          //
          // When using a custom drag layer, the only way to prevent
          // the default drag preview from drawing in IE is to screenshot
          // the dragging state in which the node itself has zero opacity
          // and height. In this case, though, returning null from render()
          // will abruptly end the dragging, which is not obvious.
          //
          // This is the reason such behavior is strictly opt-in.
          this.actions.publishDragSource();
        }
      } else if (nativeType) {
        // A native item (such as URL) dragged from inside the document
        this.beginDragNativeItem(nativeType);
      } else if (!dataTransfer.types && (!e.target.hasAttribute || !e.target.hasAttribute('draggable'))) {
        // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
        // Just let it drag. It's a native type (URL or text) and will be picked up in
        // dragenter handler.
        return; // eslint-disable-line no-useless-return
      } else {
        // If by this time no drag source reacted, tell browser not to drag.
        e.preventDefault();
      }
    }
  }, {
    key: 'handleTopDragEndCapture',
    value: function handleTopDragEndCapture() {
      if (this.clearCurrentDragSourceNode()) {
        // Firefox can dispatch this event in an infinite loop
        // if dragend handler does something like showing an alert.
        // Only proceed if we have not handled it already.
        this.actions.endDrag();
      }
    }
  }, {
    key: 'handleTopDragEnterCapture',
    value: function handleTopDragEnterCapture(e) {
      this.dragEnterTargetIds = [];

      var isFirstEnter = this.enterLeaveCounter.enter(e.target);
      if (!isFirstEnter || this.monitor.isDragging()) {
        return;
      }

      var dataTransfer = e.dataTransfer;

      var nativeType = (0, _NativeDragSources.matchNativeItemType)(dataTransfer);

      if (nativeType) {
        // A native item (such as file or URL) dragged from outside the document
        this.beginDragNativeItem(nativeType);
      }
    }
  }, {
    key: 'handleDragEnter',
    value: function handleDragEnter(e, targetId) {
      this.dragEnterTargetIds.unshift(targetId);
    }
  }, {
    key: 'handleTopDragEnter',
    value: function handleTopDragEnter(e) {
      var _this5 = this;

      var dragEnterTargetIds = this.dragEnterTargetIds;

      this.dragEnterTargetIds = [];

      if (!this.monitor.isDragging()) {
        // This is probably a native item type we don't understand.
        return;
      }

      this.altKeyPressed = e.altKey;

      if (!(0, _BrowserDetector.isFirefox)()) {
        // Don't emit hover in `dragenter` on Firefox due to an edge case.
        // If the target changes position as the result of `dragenter`, Firefox
        // will still happily dispatch `dragover` despite target being no longer
        // there. The easy solution is to only fire `hover` in `dragover` on FF.
        this.actions.hover(dragEnterTargetIds, {
          clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
        });
      }

      var canDrop = dragEnterTargetIds.some(function (targetId) {
        return _this5.monitor.canDropOnTarget(targetId);
      });

      if (canDrop) {
        // IE requires this to fire dragover events
        e.preventDefault();
        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
      }
    }
  }, {
    key: 'handleTopDragOverCapture',
    value: function handleTopDragOverCapture() {
      this.dragOverTargetIds = [];
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver(e, targetId) {
      this.dragOverTargetIds.unshift(targetId);
    }
  }, {
    key: 'handleTopDragOver',
    value: function handleTopDragOver(e) {
      var _this6 = this;

      var dragOverTargetIds = this.dragOverTargetIds;

      this.dragOverTargetIds = [];

      if (!this.monitor.isDragging()) {
        // This is probably a native item type we don't understand.
        // Prevent default "drop and blow away the whole document" action.
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
        return;
      }

      this.altKeyPressed = e.altKey;

      this.actions.hover(dragOverTargetIds, {
        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
      });

      var canDrop = dragOverTargetIds.some(function (targetId) {
        return _this6.monitor.canDropOnTarget(targetId);
      });

      if (canDrop) {
        // Show user-specified drop effect.
        e.preventDefault();
        e.dataTransfer.dropEffect = this.getCurrentDropEffect();
      } else if (this.isDraggingNativeItem()) {
        // Don't show a nice cursor but still prevent default
        // "drop and blow away the whole document" action.
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
      } else if (this.checkIfCurrentDragSourceRectChanged()) {
        // Prevent animating to incorrect position.
        // Drop effect must be other than 'none' to prevent animation.
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }
    }
  }, {
    key: 'handleTopDragLeaveCapture',
    value: function handleTopDragLeaveCapture(e) {
      if (this.isDraggingNativeItem()) {
        e.preventDefault();
      }

      var isLastLeave = this.enterLeaveCounter.leave(e.target);
      if (!isLastLeave) {
        return;
      }

      if (this.isDraggingNativeItem()) {
        this.endDragNativeItem();
      }
    }
  }, {
    key: 'handleTopDropCapture',
    value: function handleTopDropCapture(e) {
      this.dropTargetIds = [];
      e.preventDefault();

      if (this.isDraggingNativeItem()) {
        this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
      }

      this.enterLeaveCounter.reset();
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(e, targetId) {
      this.dropTargetIds.unshift(targetId);
    }
  }, {
    key: 'handleTopDrop',
    value: function handleTopDrop(e) {
      var dropTargetIds = this.dropTargetIds;

      this.dropTargetIds = [];

      this.actions.hover(dropTargetIds, {
        clientOffset: (0, _OffsetUtils.getEventClientOffset)(e)
      });
      this.actions.drop({ dropEffect: this.getCurrentDropEffect() });

      if (this.isDraggingNativeItem()) {
        this.endDragNativeItem();
      } else {
        this.endDragIfSourceWasRemovedFromDOM();
      }
    }
  }, {
    key: 'handleSelectStart',
    value: function handleSelectStart(e) {
      var target = e.target;

      // Only IE requires us to explicitly say
      // we want drag drop operation to start

      if (typeof target.dragDrop !== 'function') {
        return;
      }

      // Inputs and textareas should be selectable
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // For other targets, ask IE
      // to enable drag and drop
      e.preventDefault();
      target.dragDrop();
    }
  }, {
    key: 'window',
    get: function get() {
      if (this.context && this.context.window) {
        return this.context.window;
      } else if (typeof window !== 'undefined') {
        return window;
      }
      return undefined;
    }
  }]);

  return HTML5Backend;
}();

exports.default = HTML5Backend;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint
   no-plusplus: off,
   no-mixed-operators: off
*/
var MonotonicInterpolant = function () {
  function MonotonicInterpolant(xs, ys) {
    _classCallCheck(this, MonotonicInterpolant);

    var length = xs.length;

    // Rearrange xs and ys so that xs is sorted
    var indexes = [];
    for (var i = 0; i < length; i++) {
      indexes.push(i);
    }
    indexes.sort(function (a, b) {
      return xs[a] < xs[b] ? -1 : 1;
    });

    // Get consecutive differences and slopes
    var dys = [];
    var dxs = [];
    var ms = [];
    var dx = void 0;
    var dy = void 0;
    for (var _i = 0; _i < length - 1; _i++) {
      dx = xs[_i + 1] - xs[_i];
      dy = ys[_i + 1] - ys[_i];
      dxs.push(dx);
      dys.push(dy);
      ms.push(dy / dx);
    }

    // Get degree-1 coefficients
    var c1s = [ms[0]];
    for (var _i2 = 0; _i2 < dxs.length - 1; _i2++) {
      var _m = ms[_i2];
      var mNext = ms[_i2 + 1];
      if (_m * mNext <= 0) {
        c1s.push(0);
      } else {
        dx = dxs[_i2];
        var dxNext = dxs[_i2 + 1];
        var common = dx + dxNext;
        c1s.push(3 * common / ((common + dxNext) / _m + (common + dx) / mNext));
      }
    }
    c1s.push(ms[ms.length - 1]);

    // Get degree-2 and degree-3 coefficients
    var c2s = [];
    var c3s = [];
    var m = void 0;
    for (var _i3 = 0; _i3 < c1s.length - 1; _i3++) {
      m = ms[_i3];
      var c1 = c1s[_i3];
      var invDx = 1 / dxs[_i3];
      var _common = c1 + c1s[_i3 + 1] - m - m;
      c2s.push((m - c1 - _common) * invDx);
      c3s.push(_common * invDx * invDx);
    }

    this.xs = xs;
    this.ys = ys;
    this.c1s = c1s;
    this.c2s = c2s;
    this.c3s = c3s;
  }

  _createClass(MonotonicInterpolant, [{
    key: "interpolate",
    value: function interpolate(x) {
      var xs = this.xs,
          ys = this.ys,
          c1s = this.c1s,
          c2s = this.c2s,
          c3s = this.c3s;

      // The rightmost point in the dataset should give an exact result

      var i = xs.length - 1;
      if (x === xs[i]) {
        return ys[i];
      }

      // Search for the interval x is in, returning the corresponding y if x is one of the original xs
      var low = 0;
      var high = c3s.length - 1;
      var mid = void 0;
      while (low <= high) {
        mid = Math.floor(0.5 * (low + high));
        var xHere = xs[mid];
        if (xHere < x) {
          low = mid + 1;
        } else if (xHere > x) {
          high = mid - 1;
        } else {
          return ys[mid];
        }
      }
      i = Math.max(0, high);

      // Interpolate
      var diff = x - xs[i];
      var diffSq = diff * diff;
      return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
    }
  }]);

  return MonotonicInterpolant;
}();

exports.default = MonotonicInterpolant;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nativeTypesConfig;

exports.createNativeDragSource = createNativeDragSource;
exports.matchNativeItemType = matchNativeItemType;

var _NativeTypes = __webpack_require__(47);

var NativeTypes = _interopRequireWildcard(_NativeTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
  var result = typesToTry.reduce(function (resultSoFar, typeToTry) {
    return resultSoFar || dataTransfer.getData(typeToTry);
  }, null);

  return result != null ? // eslint-disable-line eqeqeq
  result : defaultValue;
}

var nativeTypesConfig = (_nativeTypesConfig = {}, _defineProperty(_nativeTypesConfig, NativeTypes.FILE, {
  exposeProperty: 'files',
  matchesTypes: ['Files'],
  getData: function getData(dataTransfer) {
    return Array.prototype.slice.call(dataTransfer.files);
  }
}), _defineProperty(_nativeTypesConfig, NativeTypes.URL, {
  exposeProperty: 'urls',
  matchesTypes: ['Url', 'text/uri-list'],
  getData: function getData(dataTransfer, matchesTypes) {
    return getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n');
  }
}), _defineProperty(_nativeTypesConfig, NativeTypes.TEXT, {
  exposeProperty: 'text',
  matchesTypes: ['Text', 'text/plain'],
  getData: function getData(dataTransfer, matchesTypes) {
    return getDataFromDataTransfer(dataTransfer, matchesTypes, '');
  }
}), _nativeTypesConfig);

function createNativeDragSource(type) {
  var _nativeTypesConfig$ty = nativeTypesConfig[type],
      exposeProperty = _nativeTypesConfig$ty.exposeProperty,
      matchesTypes = _nativeTypesConfig$ty.matchesTypes,
      getData = _nativeTypesConfig$ty.getData;


  return function () {
    function NativeDragSource() {
      var _item, _mutatorMap;

      _classCallCheck(this, NativeDragSource);

      this.item = (_item = {}, _mutatorMap = {}, _mutatorMap[exposeProperty] = _mutatorMap[exposeProperty] || {}, _mutatorMap[exposeProperty].get = function () {
        console.warn( // eslint-disable-line no-console
        'Browser doesn\'t allow reading "' + exposeProperty + '" until the drop event.');
        return null;
      }, _defineEnumerableProperties(_item, _mutatorMap), _item);
    }

    _createClass(NativeDragSource, [{
      key: 'mutateItemByReadingDataTransfer',
      value: function mutateItemByReadingDataTransfer(dataTransfer) {
        delete this.item[exposeProperty];
        this.item[exposeProperty] = getData(dataTransfer, matchesTypes);
      }
    }, {
      key: 'canDrag',
      value: function canDrag() {
        return true;
      }
    }, {
      key: 'beginDrag',
      value: function beginDrag() {
        return this.item;
      }
    }, {
      key: 'isDragging',
      value: function isDragging(monitor, handle) {
        return handle === monitor.getSourceId();
      }
    }, {
      key: 'endDrag',
      value: function endDrag() {}
    }]);

    return NativeDragSource;
  }();
}

function matchNativeItemType(dataTransfer) {
  var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);

  return Object.keys(nativeTypesConfig).filter(function (nativeItemType) {
    var matchesTypes = nativeTypesConfig[nativeItemType].matchesTypes;

    return matchesTypes.some(function (t) {
      return dataTransferTypes.indexOf(t) > -1;
    });
  })[0] || null;
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeClientOffset = getNodeClientOffset;
exports.getEventClientOffset = getEventClientOffset;
exports.getDragPreviewOffset = getDragPreviewOffset;

var _BrowserDetector = __webpack_require__(87);

var _MonotonicInterpolant = __webpack_require__(228);

var _MonotonicInterpolant2 = _interopRequireDefault(_MonotonicInterpolant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint
   no-mixed-operators: off
*/
var ELEMENT_NODE = 1;

function getNodeClientOffset(node) {
  var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

  if (!el) {
    return null;
  }

  var _el$getBoundingClient = el.getBoundingClientRect(),
      top = _el$getBoundingClient.top,
      left = _el$getBoundingClient.left;

  return { x: left, y: top };
}

function getEventClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}

function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint) {
  // The browsers will use the image intrinsic size under different conditions.
  // Firefox only cares if it's an image, but WebKit also wants it to be detached.
  var isImage = dragPreview.nodeName === 'IMG' && ((0, _BrowserDetector.isFirefox)() || !document.documentElement.contains(dragPreview));
  var dragPreviewNode = isImage ? sourceNode : dragPreview;

  var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
  var offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
  };

  var sourceWidth = sourceNode.offsetWidth,
      sourceHeight = sourceNode.offsetHeight;
  var anchorX = anchorPoint.anchorX,
      anchorY = anchorPoint.anchorY;


  var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

  // Work around @2x coordinate discrepancies in browsers
  if ((0, _BrowserDetector.isSafari)() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }

  // Interpolate coordinates depending on anchor point
  // If you know a simpler way to do this, let me know
  var interpolantX = new _MonotonicInterpolant2.default([0, 0.5, 1], [
  // Dock to the left
  offsetFromDragPreview.x,
  // Align at the center
  offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
  // Dock to the right
  offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
  var interpolantY = new _MonotonicInterpolant2.default([0, 0.5, 1], [
  // Dock to the top
  offsetFromDragPreview.y,
  // Align at the center
  offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
  // Dock to the bottom
  offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
  var x = interpolantX.interpolate(anchorX);
  var y = interpolantY.interpolate(anchorY);

  // Work around Safari 8 positioning bug
  if ((0, _BrowserDetector.isSafari)() && isImage) {
    // We'll have to wait for @3x to see if this is entirely correct
    y += (window.devicePixelRatio - 1) * dragPreviewHeight;
  }

  return { x: x, y: y };
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEmptyImage;
var emptyImage = void 0;
function getEmptyImage() {
  if (!emptyImage) {
    emptyImage = new Image();
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  }

  return emptyImage;
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmptyImage = exports.NativeTypes = undefined;
exports.default = createHTML5Backend;

var _HTML5Backend = __webpack_require__(227);

var _HTML5Backend2 = _interopRequireDefault(_HTML5Backend);

var _getEmptyImage = __webpack_require__(231);

var _getEmptyImage2 = _interopRequireDefault(_getEmptyImage);

var _NativeTypes = __webpack_require__(47);

var NativeTypes = _interopRequireWildcard(_NativeTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.NativeTypes = NativeTypes;
exports.getEmptyImage = _getEmptyImage2.default;
function createHTML5Backend(manager) {
  return new _HTML5Backend2.default(manager);
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowEqual;
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }

    var valA = objA[keysA[i]];
    var valB = objB[keysA[i]];

    if (valA !== valB) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(0);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DragDropContext = __webpack_require__(88);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
var DragDropContextProvider = (_temp = _class = function (_Component) {
  _inherits(DragDropContextProvider, _Component);

  function DragDropContextProvider(props, context) {
    _classCallCheck(this, DragDropContextProvider);

    var _this = _possibleConstructorReturn(this, (DragDropContextProvider.__proto__ || Object.getPrototypeOf(DragDropContextProvider)).call(this, props, context));

    _this.backend = (0, _DragDropContext.unpackBackendForEs5Users)(props.backend);
    return _this;
  }

  _createClass(DragDropContextProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      /**
       * This property determines which window global to use for creating the DragDropManager.
       * If a window has been injected explicitly via props, that is used first. If it is available
       * as a context value, then use that, otherwise use the browser global.
       */
      var getWindow = function getWindow() {
        if (_this2.props && _this2.props.window) {
          return _this2.props.window;
        } else if (_this2.context && _this2.context.window) {
          return _this2.context.window;
        } else if (typeof window !== 'undefined') {
          return window;
        }
        return undefined;
      };

      return (0, _DragDropContext.createChildContext)(this.backend, { window: getWindow() });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return DragDropContextProvider;
}(_react.Component), _class.propTypes = {
  backend: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]).isRequired,
  children: _propTypes2.default.element.isRequired,
  window: _propTypes2.default.object }, _class.defaultProps = {
  window: undefined
}, _class.childContextTypes = _DragDropContext.CHILD_CONTEXT_TYPES, _class.displayName = 'DragDropContextProvider', _class.contextTypes = {
  window: _propTypes2.default.object
}, _temp);
exports.default = DragDropContextProvider;

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = DragLayer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(34);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _shallowEqual = __webpack_require__(48);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _shallowEqualScalar = __webpack_require__(93);

var _shallowEqualScalar2 = _interopRequireDefault(_shallowEqualScalar);

var _checkDecoratorArguments = __webpack_require__(29);

var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function DragLayer(collect) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _checkDecoratorArguments2.default.apply(undefined, ['DragLayer', 'collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer ' + 'to be a function that collects props to inject into the component. ', 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', collect);
  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the second argument to DragLayer to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', options);

  return function decorateLayer(DecoratedComponent) {
    var _class, _temp;

    var _options$arePropsEqua = options.arePropsEqual,
        arePropsEqual = _options$arePropsEqua === undefined ? _shallowEqualScalar2.default : _options$arePropsEqua;

    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    var DragLayerContainer = (_temp = _class = function (_Component) {
      _inherits(DragLayerContainer, _Component);

      _createClass(DragLayerContainer, [{
        key: 'getDecoratedComponentInstance',
        value: function getDecoratedComponentInstance() {
          (0, _invariant2.default)(this.child, 'In order to access an instance of the decorated component it can ' + 'not be a stateless component.');
          return this.child;
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !(0, _shallowEqual2.default)(nextState, this.state);
        }
      }]);

      function DragLayerContainer(props, context) {
        _classCallCheck(this, DragLayerContainer);

        var _this = _possibleConstructorReturn(this, (DragLayerContainer.__proto__ || Object.getPrototypeOf(DragLayerContainer)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);

        _this.manager = context.dragDropManager;
        (0, _invariant2.default)(_typeof(_this.manager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to wrap the top-level component of your app with DragDropContext. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

        _this.state = _this.getCurrentState();
        return _this;
      }

      _createClass(DragLayerContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.isCurrentlyMounted = true;

          var monitor = this.manager.getMonitor();
          this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
          this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);

          this.handleChange();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.isCurrentlyMounted = false;

          this.unsubscribeFromOffsetChange();
          this.unsubscribeFromStateChange();
        }
      }, {
        key: 'handleChange',
        value: function handleChange() {
          if (!this.isCurrentlyMounted) {
            return;
          }

          var nextState = this.getCurrentState();
          if (!(0, _shallowEqual2.default)(nextState, this.state)) {
            this.setState(nextState);
          }
        }
      }, {
        key: 'getCurrentState',
        value: function getCurrentState() {
          var monitor = this.manager.getMonitor();
          return collect(monitor);
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          return _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state, {
            ref: function ref(child) {
              return _this2.child = child;
            }
          }));
        }
      }]);

      return DragLayerContainer;
    }(_react.Component), _class.DecoratedComponent = DecoratedComponent, _class.displayName = 'DragLayer(' + displayName + ')', _class.contextTypes = {
      dragDropManager: _propTypes2.default.object.isRequired
    }, _temp);


    return (0, _hoistNonReactStatics2.default)(DragLayerContainer, DecoratedComponent);
  };
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragSource;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _checkDecoratorArguments = __webpack_require__(29);

var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

var _decorateHandler = __webpack_require__(90);

var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

var _registerSource = __webpack_require__(244);

var _registerSource2 = _interopRequireDefault(_registerSource);

var _createSourceFactory = __webpack_require__(239);

var _createSourceFactory2 = _interopRequireDefault(_createSourceFactory);

var _createSourceMonitor = __webpack_require__(240);

var _createSourceMonitor2 = _interopRequireDefault(_createSourceMonitor);

var _createSourceConnector = __webpack_require__(238);

var _createSourceConnector2 = _interopRequireDefault(_createSourceConnector);

var _isValidType = __webpack_require__(92);

var _isValidType2 = _interopRequireDefault(_isValidType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DragSource(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _checkDecoratorArguments2.default.apply(undefined, ['DragSource', 'type, spec, collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
  var getType = type;
  if (typeof type !== 'function') {
    (0, _invariant2.default)((0, _isValidType2.default)(type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', type);
    getType = function getType() {
      return type;
    };
  }
  (0, _invariant2.default)((0, _isPlainObject2.default)(spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', spec);
  var createSource = (0, _createSourceFactory2.default)(spec);
  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);
  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);

  return function decorateSource(DecoratedComponent) {
    return (0, _decorateHandler2.default)({
      connectBackend: function connectBackend(backend, sourceId) {
        return backend.connectDragSource(sourceId);
      },
      containerDisplayName: 'DragSource',
      createHandler: createSource,
      registerHandler: _registerSource2.default,
      createMonitor: _createSourceMonitor2.default,
      createConnector: _createSourceConnector2.default,
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropTarget;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _checkDecoratorArguments = __webpack_require__(29);

var _checkDecoratorArguments2 = _interopRequireDefault(_checkDecoratorArguments);

var _decorateHandler = __webpack_require__(90);

var _decorateHandler2 = _interopRequireDefault(_decorateHandler);

var _registerTarget = __webpack_require__(245);

var _registerTarget2 = _interopRequireDefault(_registerTarget);

var _createTargetFactory = __webpack_require__(242);

var _createTargetFactory2 = _interopRequireDefault(_createTargetFactory);

var _createTargetMonitor = __webpack_require__(243);

var _createTargetMonitor2 = _interopRequireDefault(_createTargetMonitor);

var _createTargetConnector = __webpack_require__(241);

var _createTargetConnector2 = _interopRequireDefault(_createTargetConnector);

var _isValidType = __webpack_require__(92);

var _isValidType2 = _interopRequireDefault(_isValidType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DropTarget(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _checkDecoratorArguments2.default.apply(undefined, ['DropTarget', 'type, spec, collect[, options]'].concat(Array.prototype.slice.call(arguments))); // eslint-disable-line prefer-rest-params
  var getType = type;
  if (typeof type !== 'function') {
    (0, _invariant2.default)((0, _isValidType2.default)(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', type);
    getType = function getType() {
      return type;
    };
  }
  (0, _invariant2.default)((0, _isPlainObject2.default)(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', spec);
  var createTarget = (0, _createTargetFactory2.default)(spec);
  (0, _invariant2.default)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);
  (0, _invariant2.default)((0, _isPlainObject2.default)(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);

  return function decorateTarget(DecoratedComponent) {
    return (0, _decorateHandler2.default)({
      connectBackend: function connectBackend(backend, targetId) {
        return backend.connectDropTarget(targetId);
      },
      containerDisplayName: 'DropTarget',
      createHandler: createTarget,
      registerHandler: _registerTarget2.default,
      createMonitor: _createTargetMonitor2.default,
      createConnector: _createTargetConnector2.default,
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSourceConnector;

var _wrapConnectorHooks = __webpack_require__(94);

var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

var _areOptionsEqual = __webpack_require__(89);

var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSourceConnector(backend) {
  var currentHandlerId = void 0;

  var currentDragSourceNode = void 0;
  var currentDragSourceOptions = void 0;
  var disconnectCurrentDragSource = void 0;

  var currentDragPreviewNode = void 0;
  var currentDragPreviewOptions = void 0;
  var disconnectCurrentDragPreview = void 0;

  function reconnectDragSource() {
    if (disconnectCurrentDragSource) {
      disconnectCurrentDragSource();
      disconnectCurrentDragSource = null;
    }

    if (currentHandlerId && currentDragSourceNode) {
      disconnectCurrentDragSource = backend.connectDragSource(currentHandlerId, currentDragSourceNode, currentDragSourceOptions);
    }
  }

  function reconnectDragPreview() {
    if (disconnectCurrentDragPreview) {
      disconnectCurrentDragPreview();
      disconnectCurrentDragPreview = null;
    }

    if (currentHandlerId && currentDragPreviewNode) {
      disconnectCurrentDragPreview = backend.connectDragPreview(currentHandlerId, currentDragPreviewNode, currentDragPreviewOptions);
    }
  }

  function receiveHandlerId(handlerId) {
    if (handlerId === currentHandlerId) {
      return;
    }

    currentHandlerId = handlerId;
    reconnectDragSource();
    reconnectDragPreview();
  }

  var hooks = (0, _wrapConnectorHooks2.default)({
    dragSource: function connectDragSource(node, options) {
      if (node === currentDragSourceNode && (0, _areOptionsEqual2.default)(options, currentDragSourceOptions)) {
        return;
      }

      currentDragSourceNode = node;
      currentDragSourceOptions = options;

      reconnectDragSource();
    },

    dragPreview: function connectDragPreview(node, options) {
      if (node === currentDragPreviewNode && (0, _areOptionsEqual2.default)(options, currentDragPreviewOptions)) {
        return;
      }

      currentDragPreviewNode = node;
      currentDragPreviewOptions = options;

      reconnectDragPreview();
    }
  });

  return {
    receiveHandlerId: receiveHandlerId,
    hooks: hooks
  };
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSourceFactory;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
var REQUIRED_SPEC_METHODS = ['beginDrag'];

function createSourceFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', ALLOWED_SPEC_METHODS.join(', '), key);
    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
  });
  REQUIRED_SPEC_METHODS.forEach(function (key) {
    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);
  });

  var Source = function () {
    function Source(monitor) {
      _classCallCheck(this, Source);

      this.monitor = monitor;
      this.props = null;
      this.component = null;
    }

    _createClass(Source, [{
      key: 'receiveProps',
      value: function receiveProps(props) {
        this.props = props;
      }
    }, {
      key: 'receiveComponent',
      value: function receiveComponent(component) {
        this.component = component;
      }
    }, {
      key: 'canDrag',
      value: function canDrag() {
        if (!spec.canDrag) {
          return true;
        }

        return spec.canDrag(this.props, this.monitor);
      }
    }, {
      key: 'isDragging',
      value: function isDragging(globalMonitor, sourceId) {
        if (!spec.isDragging) {
          return sourceId === globalMonitor.getSourceId();
        }

        return spec.isDragging(this.props, this.monitor);
      }
    }, {
      key: 'beginDrag',
      value: function beginDrag() {
        var item = spec.beginDrag(this.props, this.monitor, this.component);
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)((0, _isPlainObject2.default)(item), 'beginDrag() must return a plain object that represents the dragged item. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', item);
        }
        return item;
      }
    }, {
      key: 'endDrag',
      value: function endDrag() {
        if (!spec.endDrag) {
          return;
        }

        spec.endDrag(this.props, this.monitor, this.component);
      }
    }]);

    return Source;
  }();

  return function createSource(monitor) {
    return new Source(monitor);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createSourceMonitor;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isCallingCanDrag = false;
var isCallingIsDragging = false;

var SourceMonitor = function () {
  function SourceMonitor(manager) {
    _classCallCheck(this, SourceMonitor);

    this.internalMonitor = manager.getMonitor();
  }

  _createClass(SourceMonitor, [{
    key: 'receiveHandlerId',
    value: function receiveHandlerId(sourceId) {
      this.sourceId = sourceId;
    }
  }, {
    key: 'canDrag',
    value: function canDrag() {
      (0, _invariant2.default)(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');

      try {
        isCallingCanDrag = true;
        return this.internalMonitor.canDragSource(this.sourceId);
      } finally {
        isCallingCanDrag = false;
      }
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      (0, _invariant2.default)(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');

      try {
        isCallingIsDragging = true;
        return this.internalMonitor.isDraggingSource(this.sourceId);
      } finally {
        isCallingIsDragging = false;
      }
    }
  }, {
    key: 'getItemType',
    value: function getItemType() {
      return this.internalMonitor.getItemType();
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      return this.internalMonitor.getItem();
    }
  }, {
    key: 'getDropResult',
    value: function getDropResult() {
      return this.internalMonitor.getDropResult();
    }
  }, {
    key: 'didDrop',
    value: function didDrop() {
      return this.internalMonitor.didDrop();
    }
  }, {
    key: 'getInitialClientOffset',
    value: function getInitialClientOffset() {
      return this.internalMonitor.getInitialClientOffset();
    }
  }, {
    key: 'getInitialSourceClientOffset',
    value: function getInitialSourceClientOffset() {
      return this.internalMonitor.getInitialSourceClientOffset();
    }
  }, {
    key: 'getSourceClientOffset',
    value: function getSourceClientOffset() {
      return this.internalMonitor.getSourceClientOffset();
    }
  }, {
    key: 'getClientOffset',
    value: function getClientOffset() {
      return this.internalMonitor.getClientOffset();
    }
  }, {
    key: 'getDifferenceFromInitialOffset',
    value: function getDifferenceFromInitialOffset() {
      return this.internalMonitor.getDifferenceFromInitialOffset();
    }
  }]);

  return SourceMonitor;
}();

function createSourceMonitor(manager) {
  return new SourceMonitor(manager);
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTargetConnector;

var _wrapConnectorHooks = __webpack_require__(94);

var _wrapConnectorHooks2 = _interopRequireDefault(_wrapConnectorHooks);

var _areOptionsEqual = __webpack_require__(89);

var _areOptionsEqual2 = _interopRequireDefault(_areOptionsEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTargetConnector(backend) {
  var currentHandlerId = void 0;

  var currentDropTargetNode = void 0;
  var currentDropTargetOptions = void 0;
  var disconnectCurrentDropTarget = void 0;

  function reconnectDropTarget() {
    if (disconnectCurrentDropTarget) {
      disconnectCurrentDropTarget();
      disconnectCurrentDropTarget = null;
    }

    if (currentHandlerId && currentDropTargetNode) {
      disconnectCurrentDropTarget = backend.connectDropTarget(currentHandlerId, currentDropTargetNode, currentDropTargetOptions);
    }
  }

  function receiveHandlerId(handlerId) {
    if (handlerId === currentHandlerId) {
      return;
    }

    currentHandlerId = handlerId;
    reconnectDropTarget();
  }

  var hooks = (0, _wrapConnectorHooks2.default)({
    dropTarget: function connectDropTarget(node, options) {
      if (node === currentDropTargetNode && (0, _areOptionsEqual2.default)(options, currentDropTargetOptions)) {
        return;
      }

      currentDropTargetNode = node;
      currentDropTargetOptions = options;

      reconnectDropTarget();
    }
  });

  return {
    receiveHandlerId: receiveHandlerId,
    hooks: hooks
  };
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createTargetFactory;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];

function createTargetFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    (0, _invariant2.default)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', ALLOWED_SPEC_METHODS.join(', '), key);
    (0, _invariant2.default)(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', key, key, spec[key]);
  });

  var Target = function () {
    function Target(monitor) {
      _classCallCheck(this, Target);

      this.monitor = monitor;
      this.props = null;
      this.component = null;
    }

    _createClass(Target, [{
      key: 'receiveProps',
      value: function receiveProps(props) {
        this.props = props;
      }
    }, {
      key: 'receiveMonitor',
      value: function receiveMonitor(monitor) {
        this.monitor = monitor;
      }
    }, {
      key: 'receiveComponent',
      value: function receiveComponent(component) {
        this.component = component;
      }
    }, {
      key: 'canDrop',
      value: function canDrop() {
        if (!spec.canDrop) {
          return true;
        }

        return spec.canDrop(this.props, this.monitor);
      }
    }, {
      key: 'hover',
      value: function hover() {
        if (!spec.hover) {
          return;
        }

        spec.hover(this.props, this.monitor, this.component);
      }
    }, {
      key: 'drop',
      value: function drop() {
        if (!spec.drop) {
          return undefined;
        }

        var dropResult = spec.drop(this.props, this.monitor, this.component);
        if (process.env.NODE_ENV !== 'production') {
          (0, _invariant2.default)(typeof dropResult === 'undefined' || (0, _isPlainObject2.default)(dropResult), 'drop() must either return undefined, or an object that represents the drop result. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', dropResult);
        }
        return dropResult;
      }
    }]);

    return Target;
  }();

  return function createTarget(monitor) {
    return new Target(monitor);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createTargetMonitor;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isCallingCanDrop = false;

var TargetMonitor = function () {
  function TargetMonitor(manager) {
    _classCallCheck(this, TargetMonitor);

    this.internalMonitor = manager.getMonitor();
  }

  _createClass(TargetMonitor, [{
    key: 'receiveHandlerId',
    value: function receiveHandlerId(targetId) {
      this.targetId = targetId;
    }
  }, {
    key: 'canDrop',
    value: function canDrop() {
      (0, _invariant2.default)(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');

      try {
        isCallingCanDrop = true;
        return this.internalMonitor.canDropOnTarget(this.targetId);
      } finally {
        isCallingCanDrop = false;
      }
    }
  }, {
    key: 'isOver',
    value: function isOver(options) {
      return this.internalMonitor.isOverTarget(this.targetId, options);
    }
  }, {
    key: 'getItemType',
    value: function getItemType() {
      return this.internalMonitor.getItemType();
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      return this.internalMonitor.getItem();
    }
  }, {
    key: 'getDropResult',
    value: function getDropResult() {
      return this.internalMonitor.getDropResult();
    }
  }, {
    key: 'didDrop',
    value: function didDrop() {
      return this.internalMonitor.didDrop();
    }
  }, {
    key: 'getInitialClientOffset',
    value: function getInitialClientOffset() {
      return this.internalMonitor.getInitialClientOffset();
    }
  }, {
    key: 'getInitialSourceClientOffset',
    value: function getInitialSourceClientOffset() {
      return this.internalMonitor.getInitialSourceClientOffset();
    }
  }, {
    key: 'getSourceClientOffset',
    value: function getSourceClientOffset() {
      return this.internalMonitor.getSourceClientOffset();
    }
  }, {
    key: 'getClientOffset',
    value: function getClientOffset() {
      return this.internalMonitor.getClientOffset();
    }
  }, {
    key: 'getDifferenceFromInitialOffset',
    value: function getDifferenceFromInitialOffset() {
      return this.internalMonitor.getDifferenceFromInitialOffset();
    }
  }]);

  return TargetMonitor;
}();

function createTargetMonitor(manager) {
  return new TargetMonitor(manager);
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerSource;
function registerSource(type, source, manager) {
  var registry = manager.getRegistry();
  var sourceId = registry.addSource(type, source);

  function unregisterSource() {
    registry.removeSource(sourceId);
  }

  return {
    handlerId: sourceId,
    unregister: unregisterSource
  };
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerTarget;
function registerTarget(type, target, manager) {
  var registry = manager.getRegistry();
  var targetId = registry.addTarget(type, target);

  function unregisterTarget() {
    registry.removeTarget(targetId);
  }

  return {
    handlerId: targetId,
    unregister: unregisterTarget
  };
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneWithRef;

var _invariant = __webpack_require__(1);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneWithRef(element, newRef) {
  var previousRef = element.ref;
  (0, _invariant2.default)(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' + 'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' + 'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');

  if (!previousRef) {
    // When there is no ref on the element, use the new ref directly
    return (0, _react.cloneElement)(element, {
      ref: newRef
    });
  }

  return (0, _react.cloneElement)(element, {
    ref: function ref(node) {
      newRef(node);

      if (previousRef) {
        previousRef(node);
      }
    }
  });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(16);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDnd = __webpack_require__(91);

var _reactDndHtml5Backend = __webpack_require__(232);

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Suggestions = __webpack_require__(248);

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tag = __webpack_require__(249);

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Constants
var Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

var DEFAULT_PLACEHOLDER = "Add new tag";

var DefaultClassNames = {
  tags: "ReactTags__tags",
  tagInput: "ReactTags__tagInput",
  tagInputField: "ReactTags__tagInputField",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion"
};

var ReactTags = function (_Component) {
  _inherits(ReactTags, _Component);

  function ReactTags(props) {
    _classCallCheck(this, ReactTags);

    var _this = _possibleConstructorReturn(this, (ReactTags.__proto__ || Object.getPrototypeOf(ReactTags)).call(this, props));

    _this.state = {
      suggestions: _this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false
    };

    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.moveTag = _this.moveTag.bind(_this);
    _this.handlePaste = _this.handlePaste.bind(_this);
    _this.resetAndFocusInput = _this.resetAndFocusInput.bind(_this);
    _this.handleSuggestionHover = _this.handleSuggestionHover.bind(_this);
    _this.handleSuggestionClick = _this.handleSuggestionClick.bind(_this);
    return _this;
  }

  _createClass(ReactTags, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        classNames: _extends({}, DefaultClassNames, this.props.classNames)
      });
    }
  }, {
    key: "resetAndFocusInput",
    value: function resetAndFocusInput() {
      this.textInput.value = "";
      this.textInput.focus();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          autofocus = _props.autofocus,
          readOnly = _props.readOnly;

      if (autofocus && !readOnly) {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: "filteredSuggestions",
    value: function filteredSuggestions(query, suggestions) {
      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      return suggestions.filter(function (item) {
        return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
      this.setState({
        suggestions: suggestions,
        classNames: _extends({}, DefaultClassNames, props.classNames)
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(i, e) {
      this.props.handleDelete(i);
      this.setState({ query: "" });
      this.resetAndFocusInput();
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value.trim());
      }

      var query = e.target.value.trim();
      var suggestions = this.filteredSuggestions(query, this.props.suggestions);

      var selectedIndex = this.state.selectedIndex;
      if (selectedIndex >= suggestions.length) {
        selectedIndex = suggestions.length - 1;
      }

      this.setState({
        query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var value = e.target.value.trim();
      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value);
        this.textInput.value = "";
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _state = this.state,
          query = _state.query,
          selectedIndex = _state.selectedIndex,
          suggestions = _state.suggestions;

      // hide suggestions menu on escape

      if (e.keyCode === Keys.ESCAPE) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          selectedIndex: -1,
          selectionMode: false,
          suggestions: []
        });
      }

      // When one of the terminating keys is pressed, add current query to the tags.
      // If no text is typed in so far, ignore the action - so we don't end up with a terminating
      // character typed in.
      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
        if (e.keyCode !== Keys.TAB || query !== "") {
          e.preventDefault();
        }

        if (query !== "") {
          if (this.state.selectionMode && this.state.selectedIndex != -1) {
            query = this.state.suggestions[this.state.selectedIndex];
          }
          this.addTag(query);
        }
      }

      // when backspace key is pressed and query is blank, delete tag
      if (e.keyCode === Keys.BACKSPACE && query == "" && this.props.allowDeleteFromEmptyInput) {
        this.handleDelete(this.props.tags.length - 1);
      }

      // up arrow
      if (e.keyCode === Keys.UP_ARROW) {
        e.preventDefault();

        var _state2 = this.state,
            _selectedIndex = _state2.selectedIndex,
            _suggestions = _state2.suggestions;


        _selectedIndex = _selectedIndex <= 0 ? _suggestions.length - 1 : _selectedIndex - 1;

        this.setState({
          selectedIndex: _selectedIndex,
          selectionMode: true
        });
      }

      // down arrow
      if (e.keyCode === Keys.DOWN_ARROW) {
        e.preventDefault();
        this.setState({
          selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
          selectionMode: true
        });
      }
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      var _this2 = this;

      e.preventDefault();

      // See: http://stackoverflow.com/a/6969486/1463681
      var escapeRegex = function escapeRegex(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      };

      // Used to determine how the pasted content is split.
      var delimiterChars = escapeRegex(this.props.delimiters.map(function (delimiter) {
        // See: http://stackoverflow.com/a/34711175/1463681
        var chrCode = delimiter - 48 * Math.floor(delimiter / 48);
        return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
      }).join(""));

      var clipboardData = e.clipboardData || window.clipboardData;
      var string = clipboardData.getData("text");
      var regExp = new RegExp("[" + delimiterChars + "]+");
      string.split(regExp).forEach(function (tag) {
        return _this2.props.handleAddition(tag);
      });
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
      if (this.props.autocomplete) {
        var possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

        if (this.props.autocomplete === 1 && possibleMatches.length === 1 || this.props.autocomplete === true && possibleMatches.length) {
          tag = possibleMatches[0];
        }
      }

      // call method to add
      this.props.handleAddition(tag);

      // reset the state
      this.setState({
        query: "",
        selectionMode: false,
        selectedIndex: -1
      });

      this.resetAndFocusInput();
    }
  }, {
    key: "handleSuggestionClick",
    value: function handleSuggestionClick(i, e) {
      this.addTag(this.state.suggestions[i]);
    }
  }, {
    key: "handleSuggestionHover",
    value: function handleSuggestionHover(i, e) {
      this.setState({
        selectedIndex: i,
        selectionMode: true
      });
    }
  }, {
    key: "moveTag",
    value: function moveTag(dragIndex, hoverIndex) {
      var tags = this.props.tags;

      // locate tags
      var dragTag = tags[dragIndex];

      // call handler with the index of the dragged tag
      // and the tag that is hovered
      this.props.handleDrag(dragTag, dragIndex, hoverIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var moveTag = this.props.handleDrag ? this.moveTag : null;

      var tagItems = this.props.tags.map(function (tag, i) {
        return _react2.default.createElement(_Tag2.default, {
          key: tag.id,
          index: i,
          tag: tag,
          labelField: this.props.labelField,
          onDelete: this.handleDelete.bind(this, i),
          moveTag: moveTag,
          removeComponent: this.props.removeComponent,
          readOnly: this.props.readOnly,
          classNames: this.state.classNames
        });
      }.bind(this));

      // get the suggestions for the given query
      var query = this.state.query.trim(),
          selectedIndex = this.state.selectedIndex,
          suggestions = this.state.suggestions,
          placeholder = this.props.placeholder,
          inputName = this.props.name,
          inputId = this.props.id,
          maxLength = this.props.maxLength;

      var tagInput = !this.props.readOnly ? _react2.default.createElement(
        "div",
        { className: this.state.classNames.tagInput },
        _react2.default.createElement("input", {
          ref: function ref(input) {
            _this3.textInput = input;
          },
          className: this.state.classNames.tagInputField,
          type: "text",
          placeholder: placeholder,
          "aria-label": placeholder,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          onPaste: this.handlePaste,
          name: inputName,
          id: inputId,
          maxLength: maxLength
        }),
        _react2.default.createElement(_Suggestions2.default, {
          query: query,
          suggestions: suggestions,
          selectedIndex: selectedIndex,
          handleClick: this.handleSuggestionClick,
          handleHover: this.handleSuggestionHover,
          minQueryLength: this.props.minQueryLength,
          shouldRenderSuggestions: this.props.shouldRenderSuggestions,
          classNames: this.state.classNames
        })
      ) : null;

      return _react2.default.createElement(
        "div",
        { className: this.state.classNames.tags },
        _react2.default.createElement(
          "div",
          { className: this.state.classNames.selected },
          tagItems,
          this.props.inline && tagInput
        ),
        !this.props.inline && tagInput
      );
    }
  }]);

  return ReactTags;
}(_react.Component);

ReactTags.PropTypes = {
  placeholder: _propTypes2.default.string,
  labelField: _propTypes2.default.string,
  suggestions: _propTypes2.default.array,
  delimiters: _propTypes2.default.array,
  autofocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  handleDelete: _propTypes2.default.func.isRequired,
  handleAddition: _propTypes2.default.func.isRequired,
  handleDrag: _propTypes2.default.func,
  handleFilterSuggestions: _propTypes2.default.func,
  allowDeleteFromEmptyInput: _propTypes2.default.bool,
  handleInputChange: _propTypes2.default.func,
  handleInputBlur: _propTypes2.default.func,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  autocomplete: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  classNames: _propTypes2.default.object,
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  maxLength: _propTypes2.default.string
};

ReactTags.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER,
  tags: [],
  suggestions: [],
  delimiters: [Keys.ENTER, Keys.TAB],
  autofocus: true,
  inline: true,
  allowDeleteFromEmptyInput: true,
  minQueryLength: 2,
  autocomplete: false,
  readOnly: false
};

module.exports = {
  WithContext: (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ReactTags),
  WithOutContext: ReactTags,
  Keys: Keys
};

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = __webpack_require__(214);

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maybeScrollSuggestionIntoView = function maybeScrollSuggestionIntoView(suggestionEl, suggestionsContainer) {
  var containerHeight = suggestionsContainer.offsetHeight;
  var suggestionHeight = suggestionEl.offsetHeight;
  var relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop;

  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop += relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};

var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Suggestions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (nextProps) {
      var _this2 = _this,
          props = _this2.props;

      var shouldRenderSuggestions = props.shouldRenderSuggestions || _this.shouldRenderSuggestions;
      return !(0, _isEqual2.default)(props.suggestions, nextProps.suggestions) || shouldRenderSuggestions(nextProps.query) || shouldRenderSuggestions(nextProps.query) != shouldRenderSuggestions(props.query);
    }, _this.componentDidUpdate = function (prevProps) {
      var suggestionsContainer = _this.refs.suggestionsContainer;
      var _this$props = _this.props,
          selectedIndex = _this$props.selectedIndex,
          classNames = _this$props.classNames;


      if (suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
        var activeSuggestion = suggestionsContainer.querySelector(classNames.activeSuggestion);

        if (activeSuggestion) {
          maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer);
        }
      }
    }, _this.markIt = function (input, query) {
      var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
      return {
        __html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>")
      };
    }, _this.shouldRenderSuggestions = function (query) {
      var _this3 = _this,
          props = _this3.props;

      var minQueryLength = props.minQueryLength || 2;
      return query.length >= minQueryLength;
    }, _this.render = function () {
      var _this4 = _this,
          props = _this4.props;

      var suggestions = props.suggestions.map(function (item, i) {
        return _react2.default.createElement(
          "li",
          {
            key: i,
            onMouseDown: props.handleClick.bind(null, i),
            onMouseOver: props.handleHover.bind(null, i),
            className: i == props.selectedIndex ? props.classNames.activeSuggestion : "" },
          _react2.default.createElement("span", { dangerouslySetInnerHTML: this.markIt(item, props.query) })
        );
      }.bind(_this));

      // use the override, if provided
      var shouldRenderSuggestions = props.shouldRenderSuggestions || _this.shouldRenderSuggestions;
      if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
        return null;
      }

      return _react2.default.createElement(
        "div",
        {
          ref: "suggestionsContainer",
          className: _this.props.classNames.suggestions },
        _react2.default.createElement(
          "ul",
          null,
          " ",
          suggestions,
          " "
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Suggestions;
}(_react.Component);

Suggestions.propTypes = {
  query: _propTypes2.default.string.isRequired,
  selectedIndex: _propTypes2.default.number.isRequired,
  suggestions: _propTypes2.default.array.isRequired,
  handleClick: _propTypes2.default.func.isRequired,
  handleHover: _propTypes2.default.func.isRequired,
  minQueryLength: _propTypes2.default.number,
  shouldRenderSuggestions: _propTypes2.default.func,
  classNames: _propTypes2.default.object
};
exports.default = Suggestions;

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(16);

var _reactDnd = __webpack_require__(91);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _flow = __webpack_require__(212);

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemTypes = { TAG: "tag" };

var tagSource = {
  beginDrag: function beginDrag(props) {
    return { id: props.tag.id, index: props.index };
  },
  canDrag: function canDrag(props) {
    return props.moveTag && !props.readOnly;
  }
};

var tagTarget = {
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
    var hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    var clientOffset = monitor.getClientOffset();
    var hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items width
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.moveTag(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
  canDrop: function canDrop(props) {
    return !props.readOnly;
  }
};

var dragSource = function dragSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

var dropCollect = function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

function RemoveComponent(props) {
  if (props.readOnly) {
    return _react2.default.createElement("span", null);
  }

  if (props.removeComponent) {
    var _Component = props.removeComponent;
    return _react2.default.createElement(_Component, props);
  }

  return _react2.default.createElement(
    "a",
    { onClick: props.onClick, className: props.className },
    String.fromCharCode(215)
  );
}

var Tag = function (_Component2) {
  _inherits(Tag, _Component2);

  function Tag() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tag.__proto__ || Object.getPrototypeOf(Tag)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var _this2 = _this,
          props = _this2.props;

      var label = props.tag[props.labelField];
      var connectDragSource = props.connectDragSource,
          isDragging = props.isDragging,
          connectDropTarget = props.connectDropTarget,
          readOnly = props.readOnly,
          CustomRemoveComponent = props.CustomRemoveComponent;


      var tagComponent = _react2.default.createElement(
        "span",
        {
          style: { opacity: isDragging ? 0 : 1 },
          className: props.classNames.tag },
        label,
        _react2.default.createElement(RemoveComponent, {
          className: props.classNames.remove,
          removeComponent: props.removeComponent,
          onClick: props.onDelete,
          readOnly: props.readOnly
        })
      );
      return connectDragSource(connectDropTarget(tagComponent));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Tag;
}(_react.Component);

Tag.PropTypes = {
  labelField: _propTypes2.default.string,
  onDelete: _propTypes2.default.func.isRequired,
  tag: _propTypes2.default.object.isRequired,
  moveTag: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  readOnly: _propTypes2.default.bool,
  connectDragSource: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired,
  connectDropTarget: _propTypes2.default.func.isRequired
};

Tag.defaultProps = {
  labelField: "text",
  readOnly: false
};

exports.default = (0, _flow2.default)((0, _reactDnd.DragSource)(ItemTypes.TAG, tagSource, dragSource), (0, _reactDnd.DropTarget)(ItemTypes.TAG, tagTarget, dropCollect))(Tag);

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = __webpack_require__(8);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(251);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(252);


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(253);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49), __webpack_require__(50)(module)))

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map