module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/http.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/adapters/http.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "../node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/buildFullPath.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/defaults.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/http.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "../node_modules/axios/package.json":
/*!******************************************!*\
  !*** ../node_modules/axios/package.json ***!
  \******************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, bundlesize, dependencies, deprecated, description, devDependencies, homepage, keywords, license, main, name, repository, scripts, typings, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"axios@^0.19.0\",\"_id\":\"axios@0.19.2\",\"_inBundle\":false,\"_integrity\":\"sha512-fjgm5MvRHLhx+osE2xoekY70AhARk3a6hkN+3Io1jc00jtquGvxYlKlsFUhmUET0V5te6CcZI7lcv2Ym61mjHA==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"axios@^0.19.0\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"^0.19.0\",\"saveSpec\":null,\"fetchSpec\":\"^0.19.0\"},\"_requiredBy\":[\"/\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.19.2.tgz\",\"_shasum\":\"3ea36c5d8818d0d5f8a8a97a6d36b86cdc00cb27\",\"_spec\":\"axios@^0.19.0\",\"_where\":\"/home/circleci/project\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundleDependencies\":false,\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"1.5.10\"},\"deprecated\":false,\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"homepage\":\"https://github.com/axios/axios\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test && bundlesize\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"version\":\"0.19.2\"}");

/***/ }),

/***/ "../node_modules/contentful-sdk-core/dist/index.es-modules.js":
/*!********************************************************************!*\
  !*** ../node_modules/contentful-sdk-core/dist/index.es-modules.js ***!
  \********************************************************************/
/*! exports provided: createHttpClient, createRequestConfig, enforceObjPath, freezeSys, getUserAgentHeader, toPlainObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHttpClient", function() { return createHttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRequestConfig", function() { return createRequestConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforceObjPath", function() { return enforceObjPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freezeSys", function() { return freezeSys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserAgentHeader", function() { return getUserAgentHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPlainObject", function() { return toPlainObject; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isPlainObject */ "../node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! os */ "os");
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_3__);





function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var attempts = {};
var defaultsByInstance = new Map();
var networkErrorAttempts = 0;
function rateLimit(instance, defaults) {
  var maxRetry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  defaultsByInstance.set(instance, defaults);
  var instanceDefaults = defaultsByInstance.get(instance);
  var _instanceDefaults$res = instanceDefaults.responseLogger,
      responseLogger = _instanceDefaults$res === void 0 ? function () {
    return undefined;
  } : _instanceDefaults$res,
      _instanceDefaults$req = instanceDefaults.requestLogger,
      requestLogger = _instanceDefaults$req === void 0 ? function () {
    return undefined;
  } : _instanceDefaults$req;
  instance.interceptors.request.use(function (config) {
    requestLogger(config);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use(function (response) {
    // we don't need to do anything here
    responseLogger(response);
    return response;
  }, function (error) {
    var response = error.response,
        config = error.config; // Do not retry if it is disabled or no request config exists (not an axios error)

    if (!config || !instanceDefaults.retryOnError) {
      return Promise.reject(error);
    }

    var retryErrorType = null;
    var wait = 0; // Errors without response did not recieve anything from the server

    if (!response) {
      retryErrorType = 'Connection';
      networkErrorAttempts++;

      if (networkErrorAttempts > maxRetry) {
        error.attempts = networkErrorAttempts;
        return Promise.reject(error);
      }

      wait = Math.pow(Math.SQRT2, networkErrorAttempts);
      response = {};
    } else {
      networkErrorAttempts = 0;
    }

    if (response.status >= 500 && response.status < 600) {
      // 5** errors are server related
      retryErrorType = "Server ".concat(response.status);
      var headers = response.headers || {};
      var requestId = headers['x-contentful-request-id'] || null;
      attempts[requestId] = attempts[requestId] || 0;
      attempts[requestId]++; // we reject if there are too many errors with the same request id or request id is not defined

      if (attempts[requestId] > maxRetry || !requestId) {
        error.attempts = attempts[requestId];
        return Promise.reject(error);
      }

      wait = Math.pow(Math.SQRT2, attempts[requestId]);
    } else if (response.status === 429) {
      // 429 errors are exceeded rate limit exceptions
      retryErrorType = 'Rate limit'; // all headers are lowercased by axios https://github.com/mzabriskie/axios/issues/413

      if (response.headers && error.response.headers['x-contentful-ratelimit-reset']) {
        wait = response.headers['x-contentful-ratelimit-reset'];
      }
    }

    var delay = function delay(ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    };

    if (retryErrorType) {
      // convert to ms and add jitter
      wait = Math.floor(wait * 1000 + Math.random() * 200 + 500);
      instanceDefaults.logHandler('warning', "".concat(retryErrorType, " error occurred. Waiting for ").concat(wait, " ms before retrying..."));
      /* Somehow between the interceptor and retrying the request the httpAgent/httpsAgent gets transformed from an Agent-like object
         to a regular object, causing failures on retries after rate limits. Removing these properties here fixes the error, but retry
         requests still use the original http/httpsAgent property */

      delete config.httpAgent;
      delete config.httpsAgent;
      return delay(wait).then(function () {
        return instance(config);
      });
    }

    return Promise.reject(error);
  });
}

function isNode() {
  /**
   * Polyfills of 'process' might set process.browser === true
   *
   * See:
   * https://github.com/webpack/node-libs-browser/blob/master/mock/process.js#L8
   * https://github.com/defunctzombie/node-process/blob/master/browser.js#L156
  **/
  return typeof process !== 'undefined' && !process.browser;
}
function getNodeVersion() {
  return process.versions.node ? "v".concat(process.versions.node) : process.version;
}

// Also enforces toplevel domain specified, no spaces and no protocol

var HOST_REGEX = /^(?!\w+:\/\/)([^\s:]+\.[^\s:]+)(?::(\d+))?(?!:)$/;
/**
 * Create pre configured axios instance
 * @private
 * @param {Object} axios - Axios library
 * @param {Object} httpClientParams - Initialization parameters for the HTTP client
 * @prop {string} space - Space ID
 * @prop {string} accessToken - Access Token
 * @prop {boolean=} insecure - If we should use http instead
 * @prop {string=} host - Alternate host
 * @prop {Object=} httpAgent - HTTP agent for node
 * @prop {Object=} httpsAgent - HTTPS agent for node
 * @prop {function=} adapter - Axios adapter to handle requests
 * @prop {function=} requestLogger - Gets called on every request triggered by the SDK, takes the axios request config as an argument
 * @prop {function=} responseLogger - Gets called on every response, takes axios response object as an argument
 * @prop {Object=} proxy - Axios proxy config
 * @prop {Object=} headers - Additional headers
 * @prop {function=} logHandler - A log handler function to process given log messages & errors. Receives the log level (error, warning & info) and the actual log data (Error object or string). (Default can be found here: https://github.com/contentful/contentful-sdk-core/blob/master/lib/create-http-client.js)
 * @return {Object} Initialized axios instance
 */

function createHttpClient(axios, options) {
  var defaultConfig = {
    insecure: false,
    retryOnError: true,
    logHandler: function logHandler(level, data) {
      if (level === 'error' && data) {
        var title = [data.name, data.message].filter(function (a) {
          return a;
        }).join(' - ');
        console.error("[error] ".concat(title));
        console.error(data);
        return;
      }

      console.log("[".concat(level, "] ").concat(data));
    },
    // Passed to axios
    headers: {},
    httpAgent: false,
    httpsAgent: false,
    timeout: 30000,
    proxy: false,
    basePath: '',
    adapter: false,
    maxContentLength: 1073741824 // 1GB

  };

  var config = _objectSpread2({}, defaultConfig, {}, options);

  if (!config.accessToken) {
    var missingAccessTokenError = new TypeError('Expected parameter accessToken');
    config.logHandler('error', missingAccessTokenError);
    throw missingAccessTokenError;
  } // Construct axios baseURL option


  var protocol = config.insecure ? 'http' : 'https';
  var space = config.space ? "".concat(config.space, "/") : '';
  var hostname = config.defaultHostname;
  var port = config.insecure ? 80 : 443;

  if (HOST_REGEX.test(config.host)) {
    var parsed = config.host.split(':');

    if (parsed.length === 2) {
      var _parsed = _slicedToArray(parsed, 2);

      hostname = _parsed[0];
      port = _parsed[1];
    } else {
      hostname = parsed[0];
    }
  } // Ensure that basePath does start but not end with a slash


  if (config.basePath) {
    config.basePath = "/".concat(config.basePath.split('/').filter(Boolean).join('/'));
  }

  var baseURL = options.baseURL || "".concat(protocol, "://").concat(hostname, ":").concat(port).concat(config.basePath, "/spaces/").concat(space);

  if (!config.headers['Authorization']) {
    config.headers['Authorization'] = 'Bearer ' + config.accessToken;
  } // Set these headers only for node because browsers don't like it when you
  // override user-agent or accept-encoding.
  // The SDKs should set their own X-Contentful-User-Agent.


  if (isNode()) {
    config.headers['user-agent'] = 'node.js/' + getNodeVersion();
    config.headers['Accept-Encoding'] = 'gzip';
  }

  var axiosOptions = {
    // Axios
    baseURL: baseURL,
    headers: config.headers,
    httpAgent: config.httpAgent,
    httpsAgent: config.httpsAgent,
    paramsSerializer: qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify,
    proxy: config.proxy,
    timeout: config.timeout,
    adapter: config.adapter,
    maxContentLength: config.maxContentLength,
    // Contentful
    logHandler: config.logHandler,
    responseLogger: config.responseLogger,
    requestLogger: config.requestLogger,
    retryOnError: config.retryOnError
  };
  var instance = axios.create(axiosOptions);
  instance.httpClientParams = options;
  /**
   * Creates a new axios instance with the same default base parameters as the
   * current one, and with any overrides passed to the newParams object
   * This is useful as the SDKs use dependency injection to get the axios library
   * and the version of the library comes from different places depending
   * on whether it's a browser build or a node.js build.
   * @private
   * @param {Object} httpClientParams - Initialization parameters for the HTTP client
   * @return {Object} Initialized axios instance
   */

  instance.cloneWithNewParams = function (newParams) {
    return createHttpClient(axios, _objectSpread2({}, lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(options), {}, newParams));
  };

  rateLimit(instance, axiosOptions, config.retryLimit);
  return instance;
}

/**
 * Creates request parameters configuration by parsing an existing query object
 * @private
 * @param {Object} query
 * @return {Object} Config object with `params` property, ready to be used in axios
 */

function createRequestConfig(_ref) {
  var query = _ref.query;
  var config = {};
  delete query.resolveLinks;
  config.params = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(query);
  return config;
}

function enforceObjPath(obj, path) {
  if (!(path in obj)) {
    var err = new Error();
    err.name = 'PropertyMissing';
    err.message = "Required property ".concat(path, " missing from:\n\n").concat(JSON.stringify(obj), "\n\n");
    throw err;
  }

  return true;
}

function freezeObjectDeep(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default()(value)) {
      freezeObjectDeep(value);
    }
  });
  return Object.freeze(obj);
}

function freezeSys(obj) {
  freezeObjectDeep(obj.sys || {});
  return obj;
}

function isReactNative() {
  return typeof window !== 'undefined' && 'navigator' in window && 'product' in window.navigator && window.navigator.product === 'ReactNative';
}

function getBrowserOS() {
  if (!window) {
    return null;
  }

  var userAgent = window.navigator.userAgent;
  var platform = window.navigator.platform;
  var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  var os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function getNodeOS() {
  var os = Object(os__WEBPACK_IMPORTED_MODULE_3__["platform"])() || 'linux';
  var version = Object(os__WEBPACK_IMPORTED_MODULE_3__["release"])() || '0.0.0';
  var osMap = {
    android: 'Android',
    aix: 'Linux',
    darwin: 'macOS',
    freebsd: 'Linux',
    linux: 'Linux',
    openbsd: 'Linux',
    sunos: 'Linux',
    win32: 'Windows'
  };

  if (os in osMap) {
    return "".concat(osMap[os] || 'Linux', "/").concat(version);
  }

  return null;
}

function getUserAgentHeader(sdk, application, integration, feature) {
  var headerParts = [];

  if (application) {
    headerParts.push("app ".concat(application));
  }

  if (integration) {
    headerParts.push("integration ".concat(integration));
  }

  if (feature) {
    headerParts.push('feature ' + feature);
  }

  headerParts.push("sdk ".concat(sdk));
  var os = null;

  try {
    if (isReactNative()) {
      os = getBrowserOS();
      headerParts.push('platform ReactNative');
    } else if (isNode()) {
      os = getNodeOS();
      headerParts.push("platform node.js/".concat(getNodeVersion()));
    } else {
      os = getBrowserOS();
      headerParts.push("platform browser");
    }
  } catch (e) {
    os = null;
  }

  if (os) {
    headerParts.push("os ".concat(os));
  }

  return "".concat(headerParts.filter(function (item) {
    return item !== '';
  }).join('; '), ";");
}

/**
 * Mixes in a method to return just a plain object with no additional methods
 * @private
 * @param {Object} data - Any plain JSON response returned from the API
 * @return {Object} Enhanced object with toPlainObject method
 */

function toPlainObject(data) {
  return Object.defineProperty(data, 'toPlainObject', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value() {
      return lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(this);
    }
  });
}




/***/ }),

/***/ "../node_modules/debug/src/browser.js":
/*!********************************************!*\
  !*** ../node_modules/debug/src/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "../node_modules/debug/src/debug.js":
/*!******************************************!*\
  !*** ../node_modules/debug/src/debug.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "../node_modules/debug/src/index.js":
/*!******************************************!*\
  !*** ../node_modules/debug/src/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "../node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "../node_modules/debug/src/node.js");
}


/***/ }),

/***/ "../node_modules/debug/src/node.js":
/*!*****************************************!*\
  !*** ../node_modules/debug/src/node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(/*! supports-color */ "../node_modules/supports-color/index.js");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "../node_modules/follow-redirects/index.js":
/*!*************************************************!*\
  !*** ../node_modules/follow-redirects/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var assert = __webpack_require__(/*! assert */ "assert");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/index.js")("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data and end
  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;
    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "../node_modules/lodash/_Hash.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/_Hash.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "../node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "../node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "../node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "../node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "../node_modules/lodash/_hashSet.js");

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

/***/ "../node_modules/lodash/_ListCache.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_ListCache.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "../node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "../node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "../node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "../node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "../node_modules/lodash/_listCacheSet.js");

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

/***/ "../node_modules/lodash/_Map.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/_Map.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../node_modules/lodash/_MapCache.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_MapCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "../node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "../node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "../node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "../node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "../node_modules/lodash/_mapCacheSet.js");

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

/***/ "../node_modules/lodash/_Stack.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/_Stack.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "../node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "../node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "../node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "../node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "../node_modules/lodash/_stackSet.js");

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

/***/ "../node_modules/lodash/_arrayEach.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_arrayEach.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "../node_modules/lodash/_assignValue.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_assignValue.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js");

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

/***/ "../node_modules/lodash/_assocIndexOf.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_assocIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js");

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

/***/ "../node_modules/lodash/_baseAssign.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseAssign.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "../node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "../node_modules/lodash/_baseAssignIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_baseAssignIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "../node_modules/lodash/_baseAssignValue.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_baseAssignValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "../node_modules/lodash/_defineProperty.js");

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

/***/ "../node_modules/lodash/_baseClone.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseClone.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "../node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "../node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "../node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "../node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "../node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "../node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "../node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "../node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "../node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "../node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "../node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "../node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "../node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "../node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "../node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "../node_modules/lodash/keys.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
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

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "../node_modules/lodash/_baseCreate.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseCreate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

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

/***/ "../node_modules/lodash/_baseGetTag.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseGetTag.js ***!
  \*********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_cloneBuffer.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_cloneBuffer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/_copyArray.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_copyArray.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_copyObject.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_copyObject.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "../node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../node_modules/lodash/_baseAssignValue.js");

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

/***/ "../node_modules/lodash/_copySymbols.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_copySymbols.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "../node_modules/lodash/_copySymbolsIn.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_copySymbolsIn.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "../node_modules/lodash/_defineProperty.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_defineProperty.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "../node_modules/lodash/_freeGlobal.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_freeGlobal.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),

/***/ "../node_modules/lodash/_getAllKeys.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getAllKeys.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../node_modules/lodash/_getAllKeysIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getAllKeysIn.js ***!
  \***********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_getMapData.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getMapData.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "../node_modules/lodash/_isKeyable.js");

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

/***/ "../node_modules/lodash/_getNative.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getNative.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_getPrototype.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getPrototype.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "../node_modules/lodash/_getSymbols.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getSymbols.js ***!
  \*********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_getSymbolsIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getSymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_getTag.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/_getTag.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_hashClear.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_hashClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

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

/***/ "../node_modules/lodash/_hashDelete.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_hashDelete.js ***!
  \*********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_hashGet.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

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

/***/ "../node_modules/lodash/_hashHas.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

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

/***/ "../node_modules/lodash/_hashSet.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

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

/***/ "../node_modules/lodash/_initCloneArray.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_initCloneArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "../node_modules/lodash/_initCloneByTag.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_initCloneByTag.js ***!
  \*************************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_initCloneObject.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_initCloneObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "../node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "../node_modules/lodash/_isKeyable.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_isKeyable.js ***!
  \********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_isPrototype.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_isPrototype.js ***!
  \**********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_listCacheClear.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_listCacheClear.js ***!
  \*************************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_listCacheDelete.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_listCacheDelete.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

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

/***/ "../node_modules/lodash/_listCacheGet.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheGet.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

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

/***/ "../node_modules/lodash/_listCacheHas.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheHas.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

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

/***/ "../node_modules/lodash/_listCacheSet.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheSet.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

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

/***/ "../node_modules/lodash/_mapCacheClear.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_mapCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "../node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/lodash/_Map.js");

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

/***/ "../node_modules/lodash/_mapCacheDelete.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_mapCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

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

/***/ "../node_modules/lodash/_mapCacheGet.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

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

/***/ "../node_modules/lodash/_mapCacheHas.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

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

/***/ "../node_modules/lodash/_mapCacheSet.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

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

/***/ "../node_modules/lodash/_nativeCreate.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_nativeCreate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "../node_modules/lodash/_overArg.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_overArg.js ***!
  \******************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_root.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/_root.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../node_modules/lodash/_stackClear.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_stackClear.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js");

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

/***/ "../node_modules/lodash/_stackDelete.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_stackDelete.js ***!
  \**********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_stackGet.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackGet.js ***!
  \*******************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_stackHas.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackHas.js ***!
  \*******************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/_stackSet.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "../node_modules/lodash/_MapCache.js");

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

/***/ "../node_modules/lodash/cloneDeep.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/cloneDeep.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "../node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "../node_modules/lodash/eq.js":
/*!************************************!*\
  !*** ../node_modules/lodash/eq.js ***!
  \************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isArray.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/isArray.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isBuffer.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isBuffer.js ***!
  \******************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isMap.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/isMap.js ***!
  \***************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isObject.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isObject.js ***!
  \******************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isObjectLike.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/isObjectLike.js ***!
  \**********************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/isPlainObject.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/isPlainObject.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

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

/***/ "../node_modules/lodash/isSet.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/isSet.js ***!
  \***************************************/
/*! no static exports found */
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

/***/ "../node_modules/lodash/keys.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/keys.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../node_modules/lodash/keysIn.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/keysIn.js ***!
  \****************************************/
/*! no static exports found */
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

/***/ "../node_modules/ms/index.js":
/*!***********************************!*\
  !*** ../node_modules/ms/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "../node_modules/qs/lib/formats.js":
/*!*****************************************!*\
  !*** ../node_modules/qs/lib/formats.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = util.assign(
    {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        }
    },
    Format
);


/***/ }),

/***/ "../node_modules/qs/lib/index.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "../node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "../node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "../node_modules/qs/lib/parse.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/parse.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset, 'value');
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "../node_modules/qs/lib/stringify.js":
/*!*******************************************!*\
  !*** ../node_modules/qs/lib/stringify.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "../node_modules/qs/lib/utils.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "../node_modules/supports-color/index.js":
/*!***********************************************!*\
  !*** ../node_modules/supports-color/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
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

/***/ "./contentful-management.js":
/*!**********************************!*\
  !*** ./contentful-management.js ***!
  \**********************************/
/*! exports provided: createClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClient", function() { return createClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _create_contentful_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-contentful-api */ "./create-contentful-api.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @namespace contentfulManagement
 * @see ContentfulClientAPI
 */





/**
 * Create a client instance
 * @func
 * @name createClient
 * @memberof contentfulManagement
 * @param {object} params - Client initialization parameters
 * @prop {string=} params.accessToken - Contentful CDA Access Token
 * @prop {boolean=?} params.insecure - Requests will be made over http instead of the default https (default: false)
 * @prop {boolean=?} params.retryOnError - If we should retry on errors and 429 rate limit exceptions (default: true)
 * @prop {string=?} params.host - API host (default: api.contentful.com)
 * @prop {string=?} params.hostUpload - direct file upload host (default : upload.contentful.com)
 * @prop {Object=?} params.httpAgent - Optional Node.js HTTP agent for proxying (see <a href="https://nodejs.org/api/http.html#http_class_http_agent">Node.js docs</a> and <a href="https://www.npmjs.com/package/https-proxy-agent">https-proxy-agent</a>)
 * @prop {Object=?} params.httpsAgent - Optional Node.js HTTP agent for proxying (see <a href="https://nodejs.org/api/http.html#http_class_http_agent">Node.js docs</a> and <a href="https://www.npmjs.com/package/https-proxy-agent">https-proxy-agent</a>)
 * @prop {Object=?} params.proxy - Optional Axios proxy (see <a href="https://github.com/mzabriskie/axios#request-config"> axios docs </a>)
 * @prop {object=?} params.headers - Optional additional headers
 * @prop {function=} params.logHandler - A log handler function to process given log messages & errors. Receives the log level (error, warning & info) and the actual log data (Error object or string). (The default can be found at: https://github.com/contentful/contentful-sdk-core/blob/master/lib/create-http-client.js)
 * @prop {string=?} params.application - Application name and version e.g myApp/version
 * @prop {string=?} params.integration - Integration name and version e.g react/version
 * @prop {number=} params.timeout - Optional number of milliseconds before the request times out. Default is 30000
 * @prop {number=} params.retryLimit - Optional number of retries before failure. Default is 5
 * @prop {number=} params.maxContentLength - Optional maximum content length in bytes (default: 1073741824 i.e. 1GB)
 * @returns {ContentfulClientAPI.ClientAPI}
 * @example
 * const client = contentfulManagement.createClient({
 *  accessToken: 'myAccessToken'
 * })
 */
function createClient(params) {
  var defaultParameters = {
    defaultHostname: 'api.contentful.com',
    defaultHostnameUpload: 'upload.contentful.com'
  };
  var userAgentHeader = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_2__["getUserAgentHeader"])('contentful-management.js/' + '5.14.0', params.application, params.integration, params.feature);

  var requiredHeaders = {
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-User-Agent': userAgentHeader
  };

  params = _extends({}, defaultParameters, lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(params));

  if (!params.accessToken) {
    throw new TypeError('Expected parameter accessToken');
  }

  params.headers = _extends({}, params.headers, requiredHeaders);

  var http = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_2__["createHttpClient"])(axios__WEBPACK_IMPORTED_MODULE_0___default.a, params);
  var api = Object(_create_contentful_api__WEBPACK_IMPORTED_MODULE_3__["default"])({
    http: http
  });

  return api;
}

/***/ }),

/***/ "./create-contentful-api.js":
/*!**********************************!*\
  !*** ./create-contentful-api.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createClientApi; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-handler */ "./error-handler.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities */ "./entities/index.js");
/**
 * Contentful Management API Client. Contains methods which allow access to
 * any operations that can be performed with a management token.
 * @namespace ContentfulClientAPI
 */

/**
 * Types for meta information found across the different entities in Contentful
 * @namespace Meta
 */

/**
 * System metadata. See <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction/common-resource-attributes">Common Resource Attributes</a> for more details.
 * @memberof Meta
 * @typedef Sys
 * @prop {string} type
 * @prop {string} id
 * @prop {Meta.Link} space
 * @prop {string} createdAt
 * @prop {string} updatedAt
 * @prop {number} revision
 */

/**
 * Link to another entity. See <a href="https://www.contentful.com/developers/docs/concepts/links/">Links</a> for more details.
 * @memberof Meta
 * @typedef Link
 * @prop {string} type - type of this entity. Always link.
 * @prop {string} id
 * @prop {string} linkType - type of this link. If defined, either Entry or Asset
 */

/**
 * @memberof ContentfulClientAPI
 * @typedef {Object} ClientAPI
 * @prop {function} getSpace
 * @prop {function} getSpaces
 * @prop {function} createSpace
 * @prop {function} createPersonalAccessToken
 * @prop {function} getCurrentUser
 * @prop {function} getPersonalAccessTokens
 * @prop {function} getPersonalAccessToken
 * @prop {function} getOrganizations
 * @prop {function} rawRequest
 * @prop {function} getOrganizationUsage
 * @prop {function} getSpaceUsage
 */





/**
 * Creates API object with methods to access functionality from Contentful's
 * Management API
 * @private
 * @param {Object} params - API initialization params
 * @prop {Object} http - HTTP client instance
 * @prop {Function} shouldLinksResolve - Link resolver preconfigured with global setting
 * @return {ClientAPI}
 */
function createClientApi(_ref) {
  var http = _ref.http;
  var _entities$space = _entities__WEBPACK_IMPORTED_MODULE_2__["default"].space,
      wrapSpace = _entities$space.wrapSpace,
      wrapSpaceCollection = _entities$space.wrapSpaceCollection;
  var wrapUser = _entities__WEBPACK_IMPORTED_MODULE_2__["default"].user.wrapUser;
  var _entities$personalAcc = _entities__WEBPACK_IMPORTED_MODULE_2__["default"].personalAccessToken,
      wrapPersonalAccessToken = _entities$personalAcc.wrapPersonalAccessToken,
      wrapPersonalAccessTokenCollection = _entities$personalAcc.wrapPersonalAccessTokenCollection;
  var wrapOrganizationCollection = _entities__WEBPACK_IMPORTED_MODULE_2__["default"].organization.wrapOrganizationCollection;
  var wrapUsageCollection = _entities__WEBPACK_IMPORTED_MODULE_2__["default"].usage.wrapUsageCollection;

  /**
   * Gets all spaces
   * @memberof ContentfulClientAPI
   * @return {Promise<Space.SpaceCollection>} Promise for a collection of Spaces
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpaces()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */

  function getSpaces() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.get('', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSpaceCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Gets a space
   * @memberof ContentfulClientAPI
   * @param {string} id - Space ID
   * @return {Promise<Space.Space>} Promise for a Space
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => console.log(space))
   * .catch(console.error)
   */
  function getSpace(id) {
    return http.get(id).then(function (response) {
      return wrapSpace(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Creates a space
   * @memberof ContentfulClientAPI
   * @see {Space.Space}
   * @param {object} data - Object representation of the Space to be created
   * @param {string=} organizationId - Organization ID, if the associated token can manage more than one organization.
   * @return {Promise<Space.Space>} Promise for the newly created Space
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.createSpace({
   *   name: 'Name of new space'
   * })
   * .then((space) => console.log(space))
   * .catch(console.error)
   */
  function createSpace(data, organizationId) {
    return http.post('', data, {
      headers: organizationId ? { 'X-Contentful-Organization': organizationId } : {}
    }).then(function (response) {
      return wrapSpace(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Gets a collection of Organizations
   * @memberof ContentfulClientAPI
   * @return {Promise<OrganizationCollection>} Promise for a collection of Organizations
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganizations()
   * .then(result => console.log(result.items))
   * .catch(console.error)
   */
  function getOrganizations() {
    var baseURL = http.defaults.baseURL.replace('/spaces/', '/organizations/');
    return http.get('', {
      baseURL: baseURL
    }).then(function (response) {
      return wrapOrganizationCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Get organization usage grouped by {@link Usage.UsageMetricEnum metric}
   *
   * @memberof ContentfulClientAPI
   * @param {string} organizationId - Id of an organization
   * @param {Usage.UsageQuery} query - Query parameters
   * @return {Promise<Usage.UsageCollection>} Promise of a collection of usages
   * @example
   *
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getOrganizationUsage('<organizationId>', {
   *    'metric[in]': 'cma,gql',
   *    'dateRange.startAt': '2019-10-22',
   *    'dateRange.endAt': '2019-11-10'
   *    }
   * })
   * .then(result => console.log(result.items))
   * .catch(console.error)
   */
  function getOrganizationUsage(organizationId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var baseURL = http.defaults.baseURL.replace('/spaces/', '/organizations/' + organizationId + '/organization_periodic_usages');
    return http.get('', { baseURL: baseURL, params: query }).then(function (response) {
      return wrapUsageCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Get organization usage grouped by space and metric
   *
   * @memberof ContentfulClientAPI
   * @param {string} organizationId - Id of an organization
   * @param {Usage.UsageQuery} query - Query parameters
   * @return {Promise<Usage.UsageCollection>} Promise of a collection of usages
   * @example
   *
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpaceUsage('<organizationId>', {
   *    skip: 0,
   *    limit: 10,
   *    'metric[in]': 'cda,cpa,gql',
   *    'dateRange.startAt': '2019-10-22',
   *    'dateRange.endAt': '2020-11-30'
   *    }
   * })
   * .then(result => console.log(result.items))
   * .catch(console.error)
   *
   */
  function getSpaceUsage(organizationId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var baseURL = http.defaults.baseURL.replace('/spaces/', '/organizations/' + organizationId + '/space_periodic_usages');
    return http.get('', { baseURL: baseURL, params: query }).then(function (response) {
      return wrapUsageCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Gets the authenticated user
   * @memberof ContentfulClientAPI
   * @return {Promise<User>} Promise for a User
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getCurrentUser()
   * .then(user => console.log(user.firstName))
   * .catch(console.error)
   */
  function getCurrentUser() {
    var baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/');
    return http.get('', {
      baseURL: baseURL
    }).then(function (response) {
      return wrapUser(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Creates a personal access token
   * @memberof ContentfulClientAPI
   * @param {Object} data - personal access token config
   * @return {Promise<User>} Promise for a Token
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.createPersonalAccessToken(
   *  {
   *    "name": "My Token",
   *    "scope": [
   *      "content_management_manage"
   *    ]
   *  }
   * )
   * .then(personalAccessToken => console.log(personalAccessToken.token))
   * .catch(console.error)
   */
  function createPersonalAccessToken(data) {
    var baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens');
    return http.post('', data, {
      baseURL: baseURL
    }).then(function (response) {
      return wrapPersonalAccessToken(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Gets a personal access token
   * @memberof ContentfulClientAPI
   * @param {Object} data - personal access token config
   * @return {Promise<User>} Promise for a Token
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getPersonalAccessToken(tokenId)
   * .then(token => console.log(token.token))
   * .catch(console.error)
   */
  function getPersonalAccessToken(tokenId) {
    var baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens');
    return http.get(tokenId, {
      baseURL: baseURL
    }).then(function (response) {
      return wrapPersonalAccessToken(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Gets all personal access tokens
   * @memberof ContentfulClientAPI
   * @return {Promise<User>} Promise for a Token
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getPersonalAccessTokens()
   * .then(response => console.log(reponse.items))
   * .catch(console.error)
   */
  function getPersonalAccessTokens() {
    var baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens');
    return http.get('', {
      baseURL: baseURL
    }).then(function (response) {
      return wrapPersonalAccessTokenCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  /**
   * Make a custom request to the Contentful management API's /spaces endpoint
   * @memberof ContentfulClientAPI
   * @param {Object} opts - axios request options (https://github.com/mzabriskie/axios)
   * @return {Promise<Object>} Promise for the response data
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.rawRequest({
   *   method: 'GET',
   *   url: '/custom/path'
   * })
   * .then((responseData) => console.log(responseData))
   * .catch(console.error)
   */
  function rawRequest(opts) {
    return http(opts).then(function (response) {
      return response.data;
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  return {
    getSpaces: getSpaces,
    getSpace: getSpace,
    createSpace: createSpace,
    getOrganizations: getOrganizations,
    getCurrentUser: getCurrentUser,
    createPersonalAccessToken: createPersonalAccessToken,
    getPersonalAccessToken: getPersonalAccessToken,
    getPersonalAccessTokens: getPersonalAccessTokens,
    rawRequest: rawRequest,
    getOrganizationUsage: getOrganizationUsage,
    getSpaceUsage: getSpaceUsage
  };
}

/***/ }),

/***/ "./create-environment-api.js":
/*!***********************************!*\
  !*** ./create-environment-api.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createEnvironmentApi; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-handler */ "./error-handler.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities */ "./entities/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contentful Environment API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @namespace ContentfulEnvironmentAPI
 */





/**
 * @memberof ContentfulEnvironmentAPI
 * @typedef {object} ContentfulEnvironmentAPI
 * @prop {function} delete
 * @prop {function} update
 * @prop {function} getContentType
 * @prop {function} getContentTypes
 * @prop {function} createContentType
 * @prop {function} createContentTypeWithId
 * @prop {function} getEntry
 * @prop {function} getEntries
 * @prop {function} createEntry
 * @prop {function} createEntryWithId
 * @prop {function} getAsset
 * @prop {function} getAssets
 * @prop {function} createAsset
 * @prop {function} createAssetWithId
 * @prop {function} getLocale
 * @prop {function} getLocales
 * @prop {function} createLocale
 * @prop {function} getUiExtension
 * @prop {function} getUiExtensions
 * @prop {function} createUiExtension
 * @prop {function} createUiExtensionWithId
 * @prop {function} getEntrySnapshots
 * @prop {function} getContentTypeSnapshots
 */

/**
 * Creates API object with methods to access the Environment API
 * @private
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulEnvironmentAPI}
 */
function createEnvironmentApi(_ref) {
  var http = _ref.http,
      httpUpload = _ref.httpUpload;
  var wrapEnvironment = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].environment.wrapEnvironment;
  var _entities$contentType = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].contentType,
      wrapContentType = _entities$contentType.wrapContentType,
      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  var _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$asset = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].asset,
      wrapAsset = _entities$asset.wrapAsset,
      wrapAssetCollection = _entities$asset.wrapAssetCollection;
  var _entities$locale = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].locale,
      wrapLocale = _entities$locale.wrapLocale,
      wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  var wrapSnapshotCollection = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].snapshot.wrapSnapshotCollection;
  var wrapEditorInterface = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].editorInterface.wrapEditorInterface;
  var wrapUpload = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].upload.wrapUpload;
  var _entities$uiExtension = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].uiExtension,
      wrapUiExtension = _entities$uiExtension.wrapUiExtension,
      wrapUiExtensionCollection = _entities$uiExtension.wrapUiExtensionCollection;
  /**
   * Environment instances.
   * @namespace Environment
   */

  /**
   * Deletes the environment
   * @memberof Environment
   * @func delete
   * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.delete())
   * .then(() => console.log('Environment deleted.'))
   * .catch(console.error)
  */

  function deleteEnvironment() {
    return http.delete('').then(function (response) {}, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Updates the environment
   * @memberof Environment
   * @func update
   * @return {Promise<Environment.Environment>} Promise for the updated environment.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => {
   *   environment.name = 'New name'
   *   return environment.update()
   * })
   * .then((environment) => console.log(`Environment ${environment.sys.id} renamed.`)
   * .catch(console.error)
  */
  function updateEnvironment() {
    var raw = this.toPlainObject();
    var data = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(raw);
    delete data.sys;
    return http.put('', data, {
      headers: {
        'X-Contentful-Version': raw.sys.version
      }
    }).then(function (response) {
      return wrapEnvironment(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Content Type
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Content Type ID
   * @return {Promise<ContentType.ContentType>} Promise for a Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getContentType('<content_type_id>'))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function getContentType(id) {
    return http.get('content_types/' + id).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an EditorInterface for a ContentType
   * @memberof ContentfulEnvironmentAPI
   * @param {string} contentTypeId - Content Type ID
   * @return {Promise<EditorInterface.EditorInterface>} Promise for an EditorInterface
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getEditorInterfaceForContentType('<content_type_id>'))
   * .then((EditorInterface) => console.log(EditorInterface))
   * .catch(console.error)
   */
  function getEditorInterfaceForContentType(contentTypeId) {
    return http.get('content_types/' + contentTypeId + '/editor_interface').then(function (response) {
      return wrapEditorInterface(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Content Types
   * @memberof ContentfulEnvironmentAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<ContentType.ContentTypeCollection>} Promise for a collection of Content Types
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getContentTypes())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getContentTypes() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.get('content_types', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapContentTypeCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Content Type
   * @memberof ContentfulEnvironmentAPI
   * @see {ContentType}
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createContentType({
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function createContentType(data) {
    return http.post('content_types', data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Content Type with a custom ID
   * @memberof ContentfulEnvironmentAPI
   * @see {ContentType.ContentType}
   * @param {string} id - Content Type ID
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createContentTypeWithId('<content-type-id>', {
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function createContentTypeWithId(id, data) {
    return http.put('content_types/' + id, data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Entry
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Entry ID
   * @param {object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Entry.Entry>} Promise for an Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getEntry('<entry-id>'))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function getEntry(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    normalizeSelect(query);
    return http.get('entries/' + id, Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Entries
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulEnvironmentAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Entry.EntryCollection>} Promise for a collection of Entries
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getEntries() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    normalizeSelect(query);
    return http.get('entries', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapEntryCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Entry
   * @memberof ContentfulEnvironmentAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type ID of the newly created Entry
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createEntry('<content_type_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function createEntry(contentTypeId, data) {
    return http.post('entries', data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Entry with a custom ID
   * @memberof ContentfulEnvironmentAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type of the newly created Entry
   * @param {string} id - Entry ID
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create entry
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createEntryWithId('<content_type_id>', '<entry_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function createEntryWithId(contentTypeId, id, data) {
    return http.put('entries/' + id, data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Asset
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Asset ID
   * @param {object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Asset.Asset>} Promise for an Asset
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getAsset('<asset_id>'))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
  */
  function getAsset(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    normalizeSelect(query);
    return http.get('assets/' + id, Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Assets
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @memberof ContentfulEnvironmentAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Asset.AssetCollection>} Promise for a collection of Assets
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getAssets())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getAssets() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    normalizeSelect(query);
    return http.get('assets', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapAssetCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @memberof ContentfulEnvironmentAPI
   * @see {Asset.Asset}
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createAsset({
   *   fields: {
   *     title: {
   *       'en-US': 'Playsam Streamliner'
   *    },
   *    file: {
   *       'en-US': {
   *         contentType: 'image/jpeg',
   *        fileName: 'example.jpeg',
   *        upload: 'https://example.com/example.jpg'
   *      }
   *    }
   *   }
   * }))
   * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAsset(data) {
    return http.post('assets', data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @memberof ContentfulEnvironmentAPI
   * @see {Asset.Asset}
   * @param {string} id - Asset ID
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createAssetWithId('<asset_id>', {
   *   title: {
   *     'en-US': 'Playsam Streamliner'
   *   },
   *   file: {
   *     'en-US': {
   *       contentType: 'image/jpeg',
   *       fileName: 'example.jpeg',
   *       upload: 'https://example.com/example.jpg'
   *     }
   *   }
   * }))
   * .then((asset) => asset.process())
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAssetWithId(id, data) {
    return http.put('assets/' + id, data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @memberof ContentfulEnvironmentAPI
   * @see {Asset.Asset}
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @param {object} data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createAssetFromFiles({
   *   fields: {
   *     file: {
   *       'en-US': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_english.jpg',
   *          file: createReadStream('path/to/filename_english.jpg')
   *       },
   *       'de-DE': {
   *          contentType: 'image/svg+xml',
   *          fileName: 'filename_german.svg',
   *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
   *       }
   *     }
   *   }
   * }))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAssetFromFiles(data) {
    var file = data.fields.file;

    return Promise.all(Object.keys(file).map(function (locale) {
      var _file$locale = file[locale],
          contentType = _file$locale.contentType,
          fileName = _file$locale.fileName;

      return createUpload(file[locale]).then(function (upload) {
        return _defineProperty({}, locale, {
          contentType: contentType,
          fileName: fileName,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id
            }
          }
        });
      });
    })).then(function (uploads) {
      data.fields.file = uploads.reduce(function (fieldsData, upload) {
        return _extends({}, fieldsData, upload);
      }, {});
      return createAsset(data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Upload.
   * @memberof ContentfulEnvironmentAPI
   * @param {object} data - Object with file information.
   * @param {object} data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
   * @return {Promise<Upload>} Upload object containing information about the uploaded file.
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createUpload({file: uploadStream})
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   */
  function createUpload(data) {
    var file = data.file;

    if (!file) {
      return Promise.reject(new Error('Unable to locate a file to upload.'));
    }
    return httpUpload.post('uploads', file, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }).then(function (uploadResponse) {
      return wrapUpload(httpUpload, uploadResponse.data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Upload
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Upload ID
   * @return {Promise<Upload>} Promise for an Upload
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getUpload('<upload-id>')
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   */
  function getUpload(id) {
    return httpUpload.get('uploads/' + id).then(function (response) {
      return wrapUpload(http, response.data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Locale
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Locale ID
   * @return {Promise<Locale.Locale>} Promise for an Locale
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getLocale('<locale_id>'))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
  */
  function getLocale(id) {
    return http.get('locales/' + id).then(function (response) {
      return wrapLocale(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Locales
   * @memberof ContentfulEnvironmentAPI
   * @return {Promise<Locale.LocaleCollection>} Promise for a collection of Locales
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getLocales())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getLocales() {
    return http.get('locales').then(function (response) {
      return wrapLocaleCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Locale
   * @memberof ContentfulEnvironmentAPI
   * @see {Locale.Locale}
   * @param {object} data - Object representation of the Locale to be created
   * @return {Promise<Locale.Locale>} Promise for the newly created Locale
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create locale
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createLocale({
   *   name: 'German (Austria)',
   *   code: 'de-AT',
   *   fallbackCode: 'de-DE',
   *   optional: true
   * }))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
   */
  function createLocale(data) {
    return http.post('locales', data).then(function (response) {
      return wrapLocale(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an UI Extension
   * @memberof ContentfulEnvironmentAPI
   * @param {string} id - Extension ID
   * @return {Promise<UiExtension.UiExtension>} Promise for an UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getUiExtension('<extension-id>'))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function getUiExtension(id) {
    return http.get('extensions/' + id).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of UI Extension
   * @memberof ContentfulEnvironmentAPI
   * @return {Promise<UiExtension.UiExtensionCollection>} Promise for a collection of UI Extensions
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getUiExtensions()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getUiExtensions() {
    return http.get('extensions').then(function (response) {
      return wrapUiExtensionCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a UI Extension
   * @memberof ContentfulEnvironmentAPI
   * @see {UiExtension.UiExtension}
   * @param {object} data - Object representation of the UI Extension to be created
   * @return {Promise<UiExtension.UiExtension>} Promise for the newly created UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createUiExtension({
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function createUiExtension(data) {
    return http.post('extensions', data).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a UI Extension with a custom ID
   * @memberof ContentfulEnvironmentAPI
   * @see {UiExtension.UiExtension}
   * @param {string} id - Extension ID
   * @param {object} data - Object representation of the UI Extension to be created
   * @return {Promise<UiExtension.UiExtension>} Promise for the newly created UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.createUiExtensionWithId('<extension_id>', {
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function createUiExtensionWithId(id, data) {
    return http.put('extensions/' + id, data).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets all snapshots of an entry
   * @memberof ContentfulEnvironmentAPI
   * @func getEntrySnapshots
   * @param {string} entryId - Entry ID
   * @param {object=} query - query additional query paramaters
   * @param {number=} query.skip - optional, number of items to skip
   * @param {number=} query.limit - optional, limit total number of snapshots returned
   * @param
   * @return {Promise<Snapshot.SnapshotCollection>} Promise for a collection of Entry Snapshots
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getEntrySnapshots('<entry_id>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   */
  function getEntrySnapshots(entryId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return http.get('entries/' + entryId + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSnapshotCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets all snapshots of a contentType
   * @memberof ContentfulEnvironmentAPI
   * @func getContentTypeSnapshots
   * @param {string} contentTypeId - Content Type ID
   * @param {object=} query - query additional query paramaters
   * @param {number=} query.skip - optional, number of items to skip
   * @param {number=} query.limit - optional, limit total number of snapshots returned
   * @return {Promise<Snapshot.SnapshotCollection>} Promise for a collection of Content Type Snapshots
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environment-id>'))
   * .then((environment) => environment.getContentTypeSnapshots('<contentTypeId>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   */
  function getContentTypeSnapshots(contentTypeId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return http.get('content_types/' + contentTypeId + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSnapshotCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /*
   * @private
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   *
   */
  function normalizeSelect(query) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys';
    }
  }

  return {
    delete: deleteEnvironment,
    update: updateEnvironment,
    getContentType: getContentType,
    getContentTypes: getContentTypes,
    createContentType: createContentType,
    createContentTypeWithId: createContentTypeWithId,
    getEditorInterfaceForContentType: getEditorInterfaceForContentType,
    getEntry: getEntry,
    getEntries: getEntries,
    createEntry: createEntry,
    createEntryWithId: createEntryWithId,
    getAsset: getAsset,
    getAssets: getAssets,
    createAsset: createAsset,
    createAssetWithId: createAssetWithId,
    createAssetFromFiles: createAssetFromFiles,
    getUpload: getUpload,
    createUpload: createUpload,
    getLocale: getLocale,
    getLocales: getLocales,
    createLocale: createLocale,
    getUiExtension: getUiExtension,
    getUiExtensions: getUiExtensions,
    createUiExtension: createUiExtension,
    createUiExtensionWithId: createUiExtensionWithId,
    getEntrySnapshots: getEntrySnapshots,
    getContentTypeSnapshots: getContentTypeSnapshots
  };
}

/***/ }),

/***/ "./create-space-api.js":
/*!*****************************!*\
  !*** ./create-space-api.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSpaceApi; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-handler */ "./error-handler.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities */ "./entities/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 * @namespace ContentfulSpaceAPI
 */






/**
 * @memberof ContentfulSpaceAPI
 * @typedef {object} ContentfulSpaceAPI
 * @prop {function} delete
 * @prop {function} update
 * @prop {function} getEnvironment
 * @prop {function} getEnvironments
 * @prop {function} createEnvironment
 * @prop {function} createEnvironmentWithId
 * @prop {function} getContentType
 * @prop {function} getContentTypes
 * @prop {function} createContentType
 * @prop {function} createContentTypeWithId
 * @prop {function} getEntry
 * @prop {function} getEntries
 * @prop {function} createEntry
 * @prop {function} createEntryWithId
 * @prop {function} getAsset
 * @prop {function} getAssets
 * @prop {function} createAsset
 * @prop {function} createAssetWithId
 * @prop {function} getLocale
 * @prop {function} getLocales
 * @prop {function} createLocale
 * @prop {function} getWebhook
 * @prop {function} getWebhooks
 * @prop {function} createWebhook
 * @prop {function} createWebhookWithId
 * @prop {function} getRole
 * @prop {function} getRoles
 * @prop {function} createRole
 * @prop {function} createRoleWithId
 * @prop {function} getSpaceUser
 * @prop {function} getSpaceUsers
 * @prop {function} getSpaceMembership
 * @prop {function} getSpaceMemberships
 * @prop {function} createSpaceMembership
 * @prop {function} createSpaceMembershipWithId
 * @prop {function} getApiKey
 * @prop {function} getApiKeys
 * @prop {function} createApiKey
 * @prop {function} createApiKeyWithId
 * @prop {function} getUiExtension
 * @prop {function} getUiExtensions
 * @prop {function} createUiExtension
 * @prop {function} createUiExtensionWithId
 * @prop {function} getEntrySnapshots
 * @prop {function} getContentTypeSnapshots
 * @prop {function} getEnvironmentAliases
 * @prop {function} getEnvironmentAlias
 */

function raiseDeprecationWarning(method) {
  console.warn(['Deprecated: Space.' + method + '() will be removed in future major versions.', null, 'Please migrate your code to use Environment.' + method + '():', 'https://contentful.github.io/contentful-management.js/contentful-management/latest/ContentfulEnvironmentAPI.html#.' + method, null].join('\n'));
}

/**
 * Creates API object with methods to access the Space API
 * @private
 * @param {object} params - API initialization params
 * @prop {object} http - HTTP client instance
 * @prop {object} entities - Object with wrapper methods for each kind of entity
 * @return {ContentfulSpaceAPI}
 */
function createSpaceApi(_ref) {
  var http = _ref.http,
      httpUpload = _ref.httpUpload;
  var wrapSpace = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].space.wrapSpace;
  var _entities$environment = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].environment,
      wrapEnvironment = _entities$environment.wrapEnvironment,
      wrapEnvironmentCollection = _entities$environment.wrapEnvironmentCollection;
  var _entities$contentType = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].contentType,
      wrapContentType = _entities$contentType.wrapContentType,
      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  var _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$asset = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].asset,
      wrapAsset = _entities$asset.wrapAsset,
      wrapAssetCollection = _entities$asset.wrapAssetCollection;
  var _entities$locale = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].locale,
      wrapLocale = _entities$locale.wrapLocale,
      wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  var _entities$webhook = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].webhook,
      wrapWebhook = _entities$webhook.wrapWebhook,
      wrapWebhookCollection = _entities$webhook.wrapWebhookCollection;
  var _entities$role = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].role,
      wrapRole = _entities$role.wrapRole,
      wrapRoleCollection = _entities$role.wrapRoleCollection;
  var _entities$user = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].user,
      wrapUser = _entities$user.wrapUser,
      wrapUserCollection = _entities$user.wrapUserCollection;
  var _entities$spaceMember = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].spaceMembership,
      wrapSpaceMembership = _entities$spaceMember.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember.wrapSpaceMembershipCollection;
  var _entities$apiKey = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].apiKey,
      wrapApiKey = _entities$apiKey.wrapApiKey,
      wrapApiKeyCollection = _entities$apiKey.wrapApiKeyCollection;
  var _entities$previewApiK = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].previewApiKey,
      wrapPreviewApiKey = _entities$previewApiK.wrapPreviewApiKey,
      wrapPreviewApiKeyCollection = _entities$previewApiK.wrapPreviewApiKeyCollection;
  var wrapSnapshotCollection = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].snapshot.wrapSnapshotCollection;
  var wrapEditorInterface = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].editorInterface.wrapEditorInterface;
  var wrapUpload = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].upload.wrapUpload;
  var _entities$uiExtension = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].uiExtension,
      wrapUiExtension = _entities$uiExtension.wrapUiExtension,
      wrapUiExtensionCollection = _entities$uiExtension.wrapUiExtensionCollection;
  var _entities$environment2 = _entities__WEBPACK_IMPORTED_MODULE_3__["default"].environmentAlias,
      wrapEnvironmentAlias = _entities$environment2.wrapEnvironmentAlias,
      wrapEnvironmentAliasCollection = _entities$environment2.wrapEnvironmentAliasCollection;

  /**
   * Space instances.
   * @namespace Space
   */

  /**
   * Deletes the space
   * @memberof Space
   * @func delete
   * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.delete())
   * .then(() => console.log('Space deleted.'))
   * .catch(console.error)
  */

  function deleteSpace() {
    return http.delete('').then(function (response) {}, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Updates the space
   * @memberof Space
   * @func update
   * @return {Promise<Space.Space>} Promise for the updated space.
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => {
   *   space.name = 'New name'
   *   return space.update()
   * })
   * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
   * .catch(console.error)
  */
  function updateSpace() {
    var raw = this.toPlainObject();
    var data = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(raw);
    delete data.sys;
    return http.put('', data, {
      headers: {
        'X-Contentful-Version': raw.sys.version
      }
    }).then(function (response) {
      return wrapSpace(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an environment
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Environment ID
   * @return {Promise<Environment.Environment>} Promise for an Environment
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironment('<environement_id>'))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   */
  function getEnvironment(id) {
    return http.get('environments/' + id).then(function (response) {
      return wrapEnvironment(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Environments
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Environment.EnvironmentCollection>} Promise for a collection of Environment
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironments())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getEnvironments() {
    return http.get('environments').then(function (response) {
      return wrapEnvironmentCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates an Environement
   * @memberof ContentfulSpaceAPI
   * @see {Environment}
   * @param {object=} data - Object representation of the Environment to be created
   * @return {Promise<Environment.Environment>} Promise for the newly created Environment
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEnvironment({ name: 'Staging' }))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   */
  function createEnvironment() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.post('environments', data).then(function (response) {
      return wrapEnvironment(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates an Environment with a custom ID
   * @memberof ContentfulSpaceAPI
   * @see {Environment}
   * @param {string} id - Environment ID
   * @param {object=} data - Object representation of the Environment to be created
   * @param {string=} sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
   * @return {Promise<Environment.Environment>} Promise for the newly created Environment
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
   * .then((environment) => console.log(environment))
   * .catch(console.error)
   */
  function createEnvironmentWithId(id) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var sourceEnvironmentId = arguments[2];

    return http.put('environments/' + id, data, {
      headers: sourceEnvironmentId ? { 'X-Contentful-Source-Environment': sourceEnvironmentId } : {}
    }).then(function (response) {
      return wrapEnvironment(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Content Type
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Content Type ID
   * @return {Promise<ContentType.ContentType>} Promise for a Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentType('<content_type_id>'))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function getContentType(id) {
    raiseDeprecationWarning('getContentType');
    return http.get('content_types/' + id).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an EditorInterface for a ContentType
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} contentTypeId - Content Type ID
   * @return {Promise<EditorInterface.EditorInterface>} Promise for an EditorInterface
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEditorInterfaceForContentType('<content_type_id>'))
   * .then((EditorInterface) => console.log(EditorInterface))
   * .catch(console.error)
   */
  function getEditorInterfaceForContentType(contentTypeId) {
    raiseDeprecationWarning('getEditorInterfaceForContentType');
    return http.get('content_types/' + contentTypeId + '/editor_interface').then(function (response) {
      return wrapEditorInterface(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Content Types
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<ContentType.ContentTypeCollection>} Promise for a collection of Content Types
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentTypes())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getContentTypes() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    raiseDeprecationWarning('getContentTypes');
    return http.get('content_types', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapContentTypeCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Content Type
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {ContentType}
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createContentType({
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function createContentType(data) {
    raiseDeprecationWarning('createContentType');
    return http.post('content_types', data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Content Type with a custom ID
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {ContentType.ContentType}
   * @param {string} id - Content Type ID
   * @param {object} data - Object representation of the Content Type to be created
   * @return {Promise<ContentType.ContentType>} Promise for the newly created Content Type
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createContentTypeWithId('<content-type-id>', {
   *   name: 'Blog Post',
   *   fields: [
   *     {
   *       id: 'title',
   *       name: 'Title',
   *       required: true,
   *       localized: false,
   *       type: 'Text'
   *     }
   *   ]
   * }))
   * .then((contentType) => console.log(contentType))
   * .catch(console.error)
   */
  function createContentTypeWithId(id, data) {
    raiseDeprecationWarning('createContentTypeWithId');
    return http.put('content_types/' + id, data).then(function (response) {
      return wrapContentType(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Entry
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Entry ID
   * @param {object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Entry.Entry>} Promise for an Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntry('<entry-id>'))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function getEntry(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    raiseDeprecationWarning('getEntry');
    normalizeSelect(query);
    return http.get('entries/' + id, Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Entries
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Entry.EntryCollection>} Promise for a collection of Entries
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getEntries() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    raiseDeprecationWarning('getEntries');
    normalizeSelect(query);
    return http.get('entries', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapEntryCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Entry
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type which this Entry is based on
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createEntry('<content_type_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function createEntry(contentTypeId, data) {
    raiseDeprecationWarning('createEntry');
    return http.post('entries', data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Entry with a custom ID
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Entry.Entry}
   * @param {string} contentTypeId - The Content Type which this Entry is based on
   * @param {string} id - Entry ID
   * @param {object} data - Object representation of the Entry to be created
   * @return {Promise<Entry.Entry>} Promise for the newly created Entry
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create entry
   * client.getSpace('<space_id>')
   * .then((space) => space.createEntryWithId('<content_type_id>', '<entry_id>', {
   *   fields: {
   *     title: {
   *       'en-US': 'Entry title'
   *     }
   *   }
   * }))
   * .then((entry) => console.log(entry))
   * .catch(console.error)
   */
  function createEntryWithId(contentTypeId, id, data) {
    raiseDeprecationWarning('createEntryWithId');
    return http.put('entries/' + id, data, {
      headers: {
        'X-Contentful-Content-Type': contentTypeId
      }
    }).then(function (response) {
      return wrapEntry(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Asset
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Asset ID
   * @param {object=} query - Object with search parameters. In this method it's only useful for `locale`.
   * @return {Promise<Asset.Asset>} Promise for an Asset
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getAsset('<asset_id>'))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
  */
  function getAsset(id) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    raiseDeprecationWarning('getAsset');
    normalizeSelect(query);
    return http.get('assets/' + id, Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Assets
   * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
   * from your entry in the backend
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<Asset.AssetCollection>} Promise for a collection of Assets
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getAssets())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getAssets() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    raiseDeprecationWarning('getAssets');
    normalizeSelect(query);
    return http.get('assets', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapAssetCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Asset.Asset}
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.createAsset({
   *   fields: {
   *     title: {
   *       'en-US': 'Playsam Streamliner'
   *    },
   *    file: {
   *       'en-US': {
   *         contentType: 'image/jpeg',
   *        fileName: 'example.jpeg',
   *        upload: 'https://example.com/example.jpg'
   *      }
   *    }
   *   }
   * }))
   * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAsset(data) {
    return http.post('assets', data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Asset.Asset}
   * @param {string} id - Asset ID
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create asset
   * client.getSpace('<space_id>')
   * .then((space) => space.createAssetWithId('<asset_id>', {
   *   title: {
   *     'en-US': 'Playsam Streamliner'
   *   },
   *   file: {
   *     'en-US': {
   *       contentType: 'image/jpeg',
   *       fileName: 'example.jpeg',
   *       upload: 'https://example.com/example.jpg'
   *     }
   *   }
   * }))
   * .then((asset) => asset.process())
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAssetWithId(id, data) {
    raiseDeprecationWarning('createAssetWithId');
    return http.put('assets/' + id, data).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Asset.Asset}
   * @param {object} data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
   * @param {object} data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
   * @return {Promise<Asset.Asset>} Promise for the newly created Asset
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createAssetFromFiles({
   *   fields: {
   *     file: {
   *       'en-US': {
   *          contentType: 'image/jpeg',
   *          fileName: 'filename_english.jpg',
   *          file: createReadStream('path/to/filename_english.jpg')
   *       },
   *       'de-DE': {
   *          contentType: 'image/svg+xml',
   *          fileName: 'filename_german.svg',
   *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
   *       }
   *     }
   *   }
   * }))
   * .then((asset) => console.log(asset))
   * .catch(console.error)
   */
  function createAssetFromFiles(data) {
    raiseDeprecationWarning('createAssetFromFiles');
    var file = data.fields.file;

    return Promise.all(Object.keys(file).map(function (locale) {
      var _file$locale = file[locale],
          contentType = _file$locale.contentType,
          fileName = _file$locale.fileName;

      return createUpload(file[locale]).then(function (upload) {
        return _defineProperty({}, locale, {
          contentType: contentType,
          fileName: fileName,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id
            }
          }
        });
      });
    })).then(function (uploads) {
      data.fields.file = uploads.reduce(function (fieldsData, upload) {
        return _extends({}, fieldsData, upload);
      }, {});
      return createAsset(data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Upload.
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {object} data - Object with file information.
   * @param {object} data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
   * @return {Promise<Upload>} Upload object containing information about the uploaded file.
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   * client.getSpace('<space_id>')
   * .then((space) => space.createUpload({file: uploadStream, 'image/png'})
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   */
  function createUpload(data) {
    raiseDeprecationWarning('createUpload');
    var file = data.file;

    if (!file) {
      return Promise.reject(new Error('Unable to locate a file to upload.'));
    }
    return httpUpload.post('uploads', file, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }).then(function (uploadResponse) {
      return wrapUpload(httpUpload, uploadResponse.data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Upload
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Upload ID
   * @return {Promise<Upload>} Promise for an Upload
   * @example
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * const uploadStream = createReadStream('path/to/filename_english.jpg')
   * client.getSpace('<space_id>')
   * .then((space) => space.getUpload('<upload-id>')
   * .then((upload) => console.log(upload))
   * .catch(console.error)
   */
  function getUpload(id) {
    raiseDeprecationWarning('getUpload');
    return httpUpload.get('uploads/' + id).then(function (response) {
      return wrapUpload(http, response.data);
    }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Locale
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Locale ID
   * @return {Promise<Locale.Locale>} Promise for an Locale
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getLocale('<locale_id>'))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
  */
  function getLocale(id) {
    raiseDeprecationWarning('getLocale');
    return http.get('locales/' + id).then(function (response) {
      return wrapLocale(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Locales
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Locale.LocaleCollection>} Promise for a collection of Locales
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getLocales())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
  */
  function getLocales() {
    raiseDeprecationWarning('getLocales');
    return http.get('locales').then(function (response) {
      return wrapLocaleCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Locale
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {Locale.Locale}
   * @param {object} data - Object representation of the Locale to be created
   * @return {Promise<Locale.Locale>} Promise for the newly created Locale
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * // Create locale
   * client.getSpace('<space_id>')
   * .then((space) => space.createLocale({
   *   name: 'German (Austria)',
   *   code: 'de-AT',
   *   fallbackCode: 'de-DE',
   *   optional: true
   * }))
   * .then((locale) => console.log(locale))
   * .catch(console.error)
   */
  function createLocale(data) {
    raiseDeprecationWarning('createLocale');
    return http.post('locales', data).then(function (response) {
      return wrapLocale(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Webhook
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Webhook ID
   * @return {Promise<Webhook.Webhook>} Promise for a Webhook
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhook('<webhook_id>'))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
  */
  function getWebhook(id) {
    return http.get('webhook_definitions/' + id).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Webhooks
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Webhook.WebhookCollection>} Promise for a collection of Webhooks
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getWebhooks())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getWebhooks() {
    return http.get('webhook_definitions').then(function (response) {
      return wrapWebhookCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Webhook
   * @memberof ContentfulSpaceAPI
   * @see {Webhook.Webhook}
   * @param {object} data - Object representation of the Webhook to be created
   * @return {Promise<Webhook.Webhook>} Promise for the newly created Webhook
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createWebhook({
   *   'name': 'My webhook',
   *   'url': 'https://www.example.com/test',
   *   'topics': [
   *     'Entry.create',
   *     'ContentType.create',
   *     '*.publish',
   *     'Asset.*'
   *   ]
   * }))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
   */
  function createWebhook(data) {
    return http.post('webhook_definitions', data).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Webhook with a custom ID
   * @memberof ContentfulSpaceAPI
   * @see {Webhook.Webhook}
   * @param {string} id - Webhook ID
   * @param {object} data - Object representation of the Webhook to be created
   * @return {Promise<Webhook.Webhook>} Promise for the newly created Webhook
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createWebhookWithId('<webhook_id>', {
   *   'name': 'My webhook',
   *   'url': 'https://www.example.com/test',
   *   'topics': [
   *     'Entry.create',
   *     'ContentType.create',
   *     '*.publish',
   *     'Asset.*'
   *   ]
   * }))
   * .then((webhook) => console.log(webhook))
   * .catch(console.error)
   */
  function createWebhookWithId(id, data) {
    return http.put('webhook_definitions/' + id, data).then(function (response) {
      return wrapWebhook(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a User
   * @memberof ContentfulSpaceAPI
   * @param {string} id - User ID
   * @return {Promise<User.User>} Promise for a User
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceUser('id'))
   * .then((user) => console.log(user))
   * .catch(console.error)
   */
  function getSpaceUser(id) {
    return http.get('users/' + id).then(function (response) {
      return wrapUser(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Users in a space
   * @memberof ContentfulSpaceAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<User.UserCollection>} Promise a collection of Users in a space
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceUsers(query))
   * .then((data) => console.log(data))
   * .catch(console.error)
   */
  function getSpaceUsers() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.get('users/', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapUserCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Space Membership
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Space Membership ID
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for a Space Membership
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMembership('id'))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   */
  function getSpaceMembership(id) {
    return http.get('space_memberships/' + id).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Space Memberships
   * @memberof ContentfulSpaceAPI
   * @param {object=} query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
   * @return {Promise<SpaceMembership.SpaceMembershipCollection>} Promise for a collection of Space Memberships
   * @example
   * const contentful = require('contentful-management')
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getSpaceMemberships() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return http.get('space_memberships', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSpaceMembershipCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Space Membership
   * @memberof ContentfulSpaceAPI
   * @see {SpaceMembership.SpaceMembership}
   * @param {object} data - Object representation of the Space Membership to be created
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for the newly created Space Membership
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createSpaceMembership({
   *   admin: false,
   *   roles: [
   *     {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *     }
   *   ],
   *   email: 'foo@example.com'
   * }))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   */
  function createSpaceMembership(data) {
    return http.post('space_memberships', data).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Space Membership with a custom ID
   * @memberof ContentfulSpaceAPI
   * @see {SpaceMembership.SpaceMembership}
   * @param {string} id - Space Membership ID
   * @param {object} data - Object representation of the Space Membership to be created
   * @return {Promise<SpaceMembership.SpaceMembership>} Promise for the newly created Space Membership
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
   *   admin: false,
   *   roles: [
   *     {
   *       type: 'Link',
   *       linkType: 'Role',
   *       id: '<role_id>'
   *     }
   *   ],
   *   email: 'foo@example.com'
   * }))
   * .then((spaceMembership) => console.log(spaceMembership))
   * .catch(console.error)
   */
  function createSpaceMembershipWithId(id, data) {
    return http.put('space_memberships/' + id, data).then(function (response) {
      return wrapSpaceMembership(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Role
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Role ID
   * @return {Promise<Role.Role>} Promise for a Role
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createRole({
   *   fields: {
   *     title: {
   *       'en-US': 'Role title'
   *     }
   *   }
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
  */
  function getRole(id) {
    return http.get('roles/' + id).then(function (response) {
      return wrapRole(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Roles
   * @memberof ContentfulSpaceAPI
   * @return {Promise<Role.RoleCollection>} Promise for a collection of Roles
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getRoles())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getRoles() {
    return http.get('roles').then(function (response) {
      return wrapRoleCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Role
   * @memberof ContentfulSpaceAPI
   * @see {Role.Role}
   * @param {object} data - Object representation of the Role to be created
   * @return {Promise<Role.Role>} Promise for the newly created Role
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createRole({
   *   name: 'My Role',
   *   description: 'foobar role',
   *   permissions: {
   *     ContentDelivery: 'all',
   *     ContentModel: ['read'],
   *     Settings: []
   *   },
   *   policies: [
   *     {
   *       effect: 'allow',
   *       actions: 'all',
   *       constraint: {
   *         and: [
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Entry'
   *             ]
   *           },
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Asset'
   *             ]
   *           }
   *         ]
   *       }
   *     }
   *   ]
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
   */
  function createRole(data) {
    return http.post('roles', data).then(function (response) {
      return wrapRole(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Role with a custom ID
   * @memberof ContentfulSpaceAPI
   * @see {Role.Role}
   * @param {string} id - Role ID
   * @param {object} data - Object representation of the Role to be created
   * @return {Promise<Role.Role>} Promise for the newly created Role
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   * client.getSpace('<space_id>')
   * .then((space) => space.createRoleWithId('<role-id>', {
   *   name: 'My Role',
   *   description: 'foobar role',
   *   permissions: {
   *     ContentDelivery: 'all',
   *     ContentModel: ['read'],
   *     Settings: []
   *   },
   *   policies: [
   *     {
   *       effect: 'allow',
   *       actions: 'all',
   *       constraint: {
   *         and: [
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Entry'
   *             ]
   *           },
   *           {
   *             equals: [
   *               { doc: 'sys.type' },
   *               'Asset'
   *             ]
   *           }
   *         ]
   *       }
   *     }
   *   ]
   * }))
   * .then((role) => console.log(role))
   * .catch(console.error)
   */
  function createRoleWithId(id, data) {
    return http.put('roles/' + id, data).then(function (response) {
      return wrapRole(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a Api Key
   * @memberof ContentfulSpaceAPI
   * @param {string} id - API Key ID
   * @return {Promise<ApiKey.ApiKey>} Promise for a Api Key
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKey('<apikey-id>'))
   * .then((apikey) => console.log(apikey))
   * .catch(console.error)
   */
  function getApiKey(id) {
    return http.get('api_keys/' + id).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Api Keys
   * @memberof ContentfulSpaceAPI
   * @return {Promise<ApiKey.ApiKeyCollection>} Promise for a collection of Api Keys
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getApiKeys())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getApiKeys() {
    return http.get('api_keys').then(function (response) {
      return wrapApiKeyCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a preview Api Key
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Preview API Key ID
   * @return {Promise<PreviewApiKey.PreviewApiKey>} Promise for a Preview Api Key
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
   * .then((previewApikey) => console.log(previewApikey))
   * .catch(console.error)
   */
  function getPreviewApiKey(id) {
    return http.get('preview_api_keys/' + id).then(function (response) {
      return wrapPreviewApiKey(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of preview Api Keys
   * @memberof ContentfulSpaceAPI
   * @return {Promise<PreviewApiKey.PreviewApiKeyCollection>} Promise for a collection of Preview Api Keys
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getPreviewApiKeys())
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getPreviewApiKeys() {
    return http.get('preview_api_keys').then(function (response) {
      return wrapPreviewApiKeyCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }
  /**
   * Creates a Api Key
   * @memberof ContentfulSpaceAPI
   * @see {ApiKey.ApiKey}
   * @param {object} data - Object representation of the Api Key to be created
   * @return {Promise<ApiKey.ApiKey>} Promise for the newly created Api Key
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createApiKey({
   *   name: 'API Key name',
   *   environments:[
   *    {
   *     sys: {
   *      type: 'Link'
   *      linkType: 'Environment',
   *      id:'<environment_id>'
   *     }
   *    }
   *   ]
   *   }
   * }))
   * .then((apiKey) => console.log(apiKey))
   * .catch(console.error)
  */
  function createApiKey(data) {
    return http.post('api_keys', data).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a Api Key with a custom ID
   * @memberof ContentfulSpaceAPI
   * @see {ApiKey.ApiKey}
   * @param {string} id - Api Key ID
   * @param {object} data - Object representation of the Api Key to be created
   * @return {Promise<ApiKey.ApiKey>} Promise for the newly created Api Key
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createApiKeyWithId('<api-key-id>', {
   *   name: 'API Key name'
   *   environments:[
   *    {
   *     sys: {
   *      type: 'Link'
   *      linkType: 'Environment',
   *      id:'<environment_id>'
   *     }
   *    }
   *   ]
   *   }
   * }))
   * .then((apiKey) => console.log(apiKey))
   * .catch(console.error)
   */
  function createApiKeyWithId(id, data) {
    return http.put('api_keys/' + id, data).then(function (response) {
      return wrapApiKey(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an UI Extension
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @param {string} id - UI Extension ID
   * @return {Promise<UiExtension.UiExtension>} Promise for an UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getUiExtension('<extension-id>'))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function getUiExtension(id) {
    raiseDeprecationWarning('getUiExtension');
    return http.get('extensions/' + id).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of UI Extension
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @return {Promise<UiExtension.UiExtensionCollection>} Promise for a collection of UI Extensions
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getUiExtensions()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getUiExtensions() {
    raiseDeprecationWarning('getUiExtensions');
    return http.get('extensions').then(function (response) {
      return wrapUiExtensionCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a UI Extension
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {UiExtension.UiExtension}
   * @param {object} data - Object representation of the UI Extension to be created
   * @return {Promise<UiExtension.UiExtension>} Promise for the newly created UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createUiExtension({
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function createUiExtension(data) {
    raiseDeprecationWarning('createUiExtension');
    return http.post('extensions', data).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Creates a UI Extension with a custom ID
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @see {UiExtension.UiExtension}
   * @param {string} id - UI Extension ID
   * @param {object} data - Object representation of the UI Extension to be created
   * @return {Promise<UiExtension.UiExtension>} Promise for the newly created UI Extension
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.createUiExtensionWithId('<extension_id>', {
   *   extension: {
   *     name: 'My awesome extension',
   *     src: 'https://example.com/my',
   *     fieldTypes: [
   *       {
   *         type: 'Symbol'
   *       },
   *       {
   *         type: 'Text'
   *       }
   *     ],
   *     sidebar: false
   *   }
   * }))
   * .then((uiExtension) => console.log(uiExtension))
   * .catch(console.error)
   */
  function createUiExtensionWithId(id, data) {
    raiseDeprecationWarning('createUiExtensionWithId');
    return http.put('extensions/' + id, data).then(function (response) {
      return wrapUiExtension(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets all snapshots of an entry
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @func getEntrySnapshots
   * @param {string} entryId - Entry ID
   * @param {object=} query - additional query paramaters
   * @return {Promise<Snapshot.SnapshotCollection>} Promise for a collection of Entry Snapshots
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEntrySnapshots('<entry_id>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   */
  function getEntrySnapshots(entryId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    raiseDeprecationWarning('getEntrySnapshots');
    return http.get('entries/' + entryId + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSnapshotCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets all snapshots of a contentType
   * @deprecated since version 5.0
   * @memberof ContentfulSpaceAPI
   * @func getContentTypeSnapshots
   * @param {string} contentTypeId - Content Type ID
   * @param {object=} query - additional query paramaters
   * @return {Promise<Snapshot.SnapshotCollection>} Promise for a collection of Content Type Snapshots
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getContentTypeSnapshots('<contentTypeId>'))
   * .then((snapshots) => console.log(snapshots.items))
   * .catch(console.error)
   */
  function getContentTypeSnapshots(contentTypeId) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    raiseDeprecationWarning('getContentTypeSnapshots');
    return http.get('content_types/' + contentTypeId + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
      return wrapSnapshotCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets an Environment Alias
   * @memberof ContentfulSpaceAPI
   * @param {string} id - Environment Alias ID
   * @return {Promise<EnvironmentAlias.EnvironmentAlias>} Promise for an Environment Alias
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAlias('<alias-id>'))
   * .then((alias) => console.log(alias))
   * .catch(console.error)
   */
  function getEnvironmentAlias(id) {
    return http.get('environment_aliases/' + id).then(function (response) {
      return wrapEnvironmentAlias(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /**
   * Gets a collection of Environment Aliases
   * @memberof ContentfulSpaceAPI
   * @return {Promise<EnvironmentAlias.EnvironmentAliasCollection>} Promise for a collection of Environment Aliases
   * @example
   * const contentful = require('contentful-management')
   *
   * const client = contentful.createClient({
   *   accessToken: '<content_management_api_key>'
   * })
   *
   * client.getSpace('<space_id>')
   * .then((space) => space.getEnvironmentAliases()
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getEnvironmentAliases() {
    return http.get('environment_aliases').then(function (response) {
      return wrapEnvironmentAliasCollection(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]);
  }

  /*
   * @private
   * sdk relies heavily on sys metadata
   * so we cannot omit the sys property on sdk level
   *
   */
  function normalizeSelect(query) {
    if (query.select && !/sys/i.test(query.select)) {
      query.select += ',sys';
    }
  }

  return {
    delete: deleteSpace,
    update: updateSpace,
    getEnvironment: getEnvironment,
    getEnvironments: getEnvironments,
    createEnvironment: createEnvironment,
    createEnvironmentWithId: createEnvironmentWithId,
    getContentType: getContentType,
    getContentTypes: getContentTypes,
    createContentType: createContentType,
    createContentTypeWithId: createContentTypeWithId,
    getEditorInterfaceForContentType: getEditorInterfaceForContentType,
    getEntry: getEntry,
    getEntries: getEntries,
    createEntry: createEntry,
    createEntryWithId: createEntryWithId,
    getAsset: getAsset,
    getAssets: getAssets,
    createAsset: createAsset,
    createAssetWithId: createAssetWithId,
    createAssetFromFiles: createAssetFromFiles,
    getUpload: getUpload,
    createUpload: createUpload,
    getLocale: getLocale,
    getLocales: getLocales,
    createLocale: createLocale,
    getWebhook: getWebhook,
    getWebhooks: getWebhooks,
    createWebhook: createWebhook,
    createWebhookWithId: createWebhookWithId,
    getRole: getRole,
    getRoles: getRoles,
    createRole: createRole,
    createRoleWithId: createRoleWithId,
    getSpaceUser: getSpaceUser,
    getSpaceUsers: getSpaceUsers,
    getSpaceMembership: getSpaceMembership,
    getSpaceMemberships: getSpaceMemberships,
    createSpaceMembership: createSpaceMembership,
    createSpaceMembershipWithId: createSpaceMembershipWithId,
    getApiKey: getApiKey,
    getApiKeys: getApiKeys,
    getPreviewApiKeys: getPreviewApiKeys,
    getPreviewApiKey: getPreviewApiKey,
    createApiKey: createApiKey,
    createApiKeyWithId: createApiKeyWithId,
    getUiExtension: getUiExtension,
    getUiExtensions: getUiExtensions,
    createUiExtension: createUiExtension,
    createUiExtensionWithId: createUiExtensionWithId,
    getEntrySnapshots: getEntrySnapshots,
    getContentTypeSnapshots: getContentTypeSnapshots,
    getEnvironmentAlias: getEnvironmentAlias,
    getEnvironmentAliases: getEnvironmentAliases
  };
}

/***/ }),

/***/ "./enhance-with-methods.js":
/*!*********************************!*\
  !*** ./enhance-with-methods.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return enhanceWithMethods; });
/**
 * This method enhances a base object which would normally contain data, with
 * methods from another object that might work on manipulating that data.
 * All the added methods are set as non enumerable, non configurable, and non
 * writable properties. This ensures that if we try to clone or stringify the
 * base object, we don't have to worry about these additional methods.
 * @private
 * @param {object} baseObject - Base object with data
 * @param {object} methodsObject - Object with methods as properties. The key
 * values used here will be the same that will be defined on the baseObject.
 */
function enhanceWithMethods(baseObject, methodsObject) {
  return Object.keys(methodsObject).reduce(function (enhancedObject, methodName) {
    Object.defineProperty(enhancedObject, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: methodsObject[methodName]
    });
    return enhancedObject;
  }, baseObject);
}

/***/ }),

/***/ "./entities/api-key.js":
/*!*****************************!*\
  !*** ./entities/api-key.js ***!
  \*****************************/
/*! exports provided: wrapApiKey, wrapApiKeyCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapApiKey", function() { return wrapApiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapApiKeyCollection", function() { return wrapApiKeyCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Api Key instances
 * @namespace ApiKey
 */






/**
 * @memberof ApiKey
 * @typedef ApiKey
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} description
 * @prop {function(): Object} toPlainObject() - Returns this Api Key as a plain JS object
 */

function createApiKeyApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof ApiKey
     * @func update
     * @return {Promise<ApiKey>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => {
     *  apiKey.name = 'New name'
     *  return apiKey.update()
     * })
     * .then(apiKey => console.log(apiKey.name))
     * .catch(console.error)
     */
    update: function update() {
      if ('accessToken' in this) {
        delete this.accessToken;
      }
      if ('preview_api_key' in this) {
        delete this.preview_api_key;
      }
      if ('policies' in this) {
        delete this.policies;
      }
      var update = Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
        http: http,
        entityPath: 'api_keys',
        wrapperMethod: wrapApiKey
      });
      return update.call(this);
    },

    /**
     * Deletes this object on the server.
     * @memberof ApiKey
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey(<api-key-id>))
     * .then((apiKey) => apiKey.delete())
     * .then(() => console.log('apikey deleted'))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'api_keys'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key data
 * @return {ApiKey} Wrapped api key data
 */
function wrapApiKey(http, data) {
  var apiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(apiKey, createApiKeyApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(apiKey);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key collection data
 * @return {ApiKeyCollection} Wrapped api key collection data
 */
function wrapApiKeyCollection(http, data) {
  var apiKeys = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  apiKeys.items = apiKeys.items.map(function (entity) {
    return wrapApiKey(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(apiKeys);
}

/***/ }),

/***/ "./entities/asset.js":
/*!***************************!*\
  !*** ./entities/asset.js ***!
  \***************************/
/*! exports provided: wrapAsset, wrapAssetCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAsset", function() { return wrapAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAssetCollection", function() { return wrapAssetCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Asset instances
 * @namespace Asset
 */







var ASSET_PROCESSING_CHECK_WAIT = 2000;
var ASSET_PROCESSING_CHECK_RETRIES = 10;

/**
 * @memberof Asset
 * @typedef Asset
 * @prop {Meta.Sys} sys - Standard system metadata with additional asset specific properties
 * @prop {string=} sys.locale - If present, indicates the locale which this asset uses
 * @prop {Object} fields - Object with content for each field
 * @prop {string} fields.title - Title for this asset
 * @prop {string} fields.description - Description for this asset
 * @prop {Object} fields.file - File object for this asset
 * @prop {Object} fields.file.fileName - Name for the file
 * @prop {string} fields.file.contentType - Mime type for the file
 * @prop {string=} fields.file.upload - Url where the file is available to be downloaded from, into the Contentful asset system. After the asset is processed this field is gone.
 * @prop {string=} fields.file.url - Url where the file is available at the Contentful media asset system. This field won't be available until the asset is processed.
 * @prop {Object} fields.file.details - Details for the file, depending on file type (example: image size in bytes, etc)
 * @prop {function(): Object} toPlainObject() - Returns this Asset as a plain JS object
 */

function createAssetApi(http) {
  function checkIfAssetHasUrl(_ref) {
    var resolve = _ref.resolve,
        reject = _ref.reject,
        id = _ref.id,
        locale = _ref.locale,
        _ref$processingCheckW = _ref.processingCheckWait,
        processingCheckWait = _ref$processingCheckW === undefined ? ASSET_PROCESSING_CHECK_WAIT : _ref$processingCheckW,
        _ref$processingCheckR = _ref.processingCheckRetries,
        processingCheckRetries = _ref$processingCheckR === undefined ? ASSET_PROCESSING_CHECK_RETRIES : _ref$processingCheckR,
        _ref$checkCount = _ref.checkCount,
        checkCount = _ref$checkCount === undefined ? 0 : _ref$checkCount;

    http.get('assets/' + id).then(function (response) {
      return wrapAsset(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]).then(function (asset) {
      if (asset.fields.file[locale].url) {
        resolve(asset);
      } else if (checkCount === processingCheckRetries) {
        var error = new Error();
        error.name = 'AssetProcessingTimeout';
        error.message = 'Asset is taking longer then expected to process.';
        reject(error);
      } else {
        checkCount++;
        setTimeout(function () {
          return checkIfAssetHasUrl({
            resolve: resolve,
            reject: reject,
            id: id,
            locale: locale,
            checkCount: checkCount,
            processingCheckWait: processingCheckWait,
            processingCheckRetries: processingCheckRetries
          });
        }, processingCheckWait);
      }
    });
  }

  function processForLocale(locale) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        processingCheckWait = _ref2.processingCheckWait,
        processingCheckRetries = _ref2.processingCheckRetries;

    var assetId = this.sys.id;
    return http.put('assets/' + this.sys.id + '/files/' + locale + '/process', null, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function () {
      return new Promise(function (resolve, reject) {
        return checkIfAssetHasUrl({
          resolve: resolve,
          reject: reject,
          id: assetId,
          locale: locale,
          processingCheckWait: processingCheckWait,
          processingCheckRetries: processingCheckRetries
        });
      });
    }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  function processForAllLocales() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var self = this;
    var locales = Object.keys(this.fields.file || {});

    var mostUpToDateAssetVersion = void 0;

    // Let all the locales process
    // Since they all resolve at different times,
    // we need to pick the last resolved value
    // to reflect the most recent state
    var allProcessingLocales = locales.map(function (locale) {
      return processForLocale.call(self, locale, options).then(function (result) {
        // Side effect of always setting the most up to date asset version
        // The last one to call this will be the last one that finished
        // and thus the most up to date
        mostUpToDateAssetVersion = result;
      });
    });

    return Promise.all(allProcessingLocales).then(function () {
      return mostUpToDateAssetVersion;
    });
  }

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Asset
     * @func update
     * @return {Promise<Asset>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => {
     *   asset.fields.title['en-US'] = 'New asset title'
     *   return asset.update()
     * })
     * .then((asset) => console.log(`Asset ${asset.sys.id} updated.`)
     * .catch(console.error)
    */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createUpdateEntity"])({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Deletes this object on the server.
     * @memberof Asset
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.delete())
     * .then((asset) => console.log(`Asset deleted.`)
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createDeleteEntity"])({
      http: http,
      entityPath: 'assets'
    }),

    /**
     * Publishes the object
     * @memberof Asset
     * @func publish
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.publish())
     * .then((asset) => console.log(`Asset ${asset.sys.id} published.`)
     * .catch(console.error)
    */
    publish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createPublishEntity"])({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Unpublishes the object
     * @memberof Asset
     * @func unpublish
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.unpublish())
     * .then((asset) => console.log(`Asset ${asset.sys.id} unpublished.`)
     * .catch(console.error)
    */
    unpublish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createUnpublishEntity"])({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Archives the object
     * @memberof Asset
     * @func archive
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.archive())
     * .then((asset) => console.log(`Asset ${asset.sys.id} archived.`)
     * .catch(console.error)
    */
    archive: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createArchiveEntity"])({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Unarchives the object
     * @memberof Asset
     * @func unarchive
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.unarchive())
     * .then((asset) => console.log(`Asset ${asset.sys.id} unarchived.`)
     * .catch(console.error)
    */
    unarchive: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createUnarchiveEntity"])({
      http: http,
      entityPath: 'assets',
      wrapperMethod: wrapAsset
    }),

    /**
     * Triggers asset processing after an upload, for the file uploaded to a specific locale.
     * @memberof Asset
     * @func processForLocale
     * @param {string} locale - Locale which processing should be triggered for
     * @param {object} options - Additional options for processing
     * @prop {number} options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop {number} options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner',
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.processForLocale('en-US'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     */
    processForLocale: processForLocale,

    /**
     * Triggers asset processing after an upload, for the files uploaded to all locales of an asset.
     * @memberof Asset
     * @func processForAllLocales
     * @param {object} options - Additional options for processing
     * @prop {number} options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop {number} options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return {Promise<Asset>} Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner',
     *     'de-DE': 'Playsam Streamliner'
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     },
     *     'de-DE': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example-de.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.processForAllLocales())
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     */
    processForAllLocales: processForAllLocales,

    /**
     * Checks if the asset is published. A published asset might have unpublished changes (@see {Asset.isUpdated})
     * @memberof Asset
     * @func isPublished
     * @return {boolean}
     */
    isPublished: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createPublishedChecker"])(),

    /**
     * Checks if the asset is updated. This means the asset was previously published but has unpublished changes.
     * @memberof Asset
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createUpdatedChecker"])(),

    /**
     * Checks if the asset is in draft mode. This means it is not published.
     * @memberof Asset
     * @func isDraft
     * @return {boolean}
     */
    isDraft: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createDraftChecker"])(),

    /**
     * Checks if asset is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Asset
     * @func isArchived
     * @return {boolean}
     */
    isArchived: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createArchivedChecker"])()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw asset data
 * @return {Asset} Wrapped asset data
 */
function wrapAsset(http, data) {
  var asset = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(asset, createAssetApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(asset);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw asset collection data
 * @return {AssetCollection} Wrapped asset collection data
 */
function wrapAssetCollection(http, data) {
  var assets = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  assets.items = assets.items.map(function (entity) {
    return wrapAsset(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(assets);
}

/***/ }),

/***/ "./entities/content-type.js":
/*!**********************************!*\
  !*** ./entities/content-type.js ***!
  \**********************************/
/*! exports provided: wrapContentType, wrapContentTypeCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapContentType", function() { return wrapContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapContentTypeCollection", function() { return wrapContentTypeCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/* harmony import */ var _editor_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor-interface */ "./entities/editor-interface.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./snapshot */ "./entities/snapshot.js");
/**
 * Content Type instances
 * @namespace ContentType
 */








/**
 * @memberof ContentType
 * @typedef ContentType
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} description
 * @prop {string} displayField - Field used as the main display field for Entries
 * @prop {Array<Field>} fields - All the fields contained in this Content Type
 * @prop {function(): Object} toPlainObject() - Returns this Content Type as a plain JS object
 */

function createContentTypeApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties. <br />
     * <strong>Important note about deleting fields</strong>: The standard way to delete a field is with two updates: first omit the property from your responses (set the field attribute "omitted" to true), and then
     * delete it by setting the attribute "deleted" to true. See the "Deleting fields" section in the
     * <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-types/content-type">API reference</a> for more reasoning. Alternatively,
     * you may use the convenience method omitAndDeleteField to do both steps at once.
     * @memberof ContentType
     * @func update
     * @return {Promise<ContentType>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => {
     *  contentType.name = 'New name'
     *  return contentType.update()
     * })
     * .then(contentType => console.log(contentType))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Deletes this object on the server.
     * @memberof ContentType
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.delete())
     * .then(() => console.log('contentType deleted'))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'content_types'
    }),

    /**
     * Publishes the object
     * @memberof ContentType
     * @func publish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.publish())
     * .then((contentType) => console.log(`${contentType.sys.id} is published`))
     * .catch(console.error)
     */
    publish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createPublishEntity"])({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Unpublishes the object
     * @memberof ContentType
     * @func unpublish
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.unpublish())
     * .then((contentType) => console.log(`${contentType.sys.id} is unpublished`))
     * .catch(console.error)
     */
    unpublish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUnpublishEntity"])({
      http: http,
      entityPath: 'content_types',
      wrapperMethod: wrapContentType
    }),

    /**
     * Gets the editor interface for the object <br />
     * <strong>Important note</strong>: The editor interface only represent a published contentType.<br />
     * To get the most recent representation of the contentType make sure to publish it first
     * @memberof ContentType
     * @func getEditorInterface
     * @return {Promise<EditorInterface.EditorInterface>} Object returned from the server with the current editor interface.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.getEditorInterface())
     * .then((editorInterface) => console.log(editorInterface.contorls))
     * .catch(console.error)
     */
    getEditorInterface: function getEditorInterface() {
      return http.get('content_types/' + this.sys.id + '/editor_interface').then(function (response) {
        return Object(_editor_interface__WEBPACK_IMPORTED_MODULE_4__["wrapEditorInterface"])(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },

    /**
     * Gets all snapshots of a contentType
     * @memberof ContentType
     * @func getSnapshots
     * @return Promise<Snapshot>
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((entry) => entry.getSnapshots())
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     */
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return http.get('content_types/' + this.sys.id + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshotCollection"])(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },

    /**
     * Gets a snapshot of a contentType
     * @memberof ContentType
     * @func getSnapshot
     * @param {string} snapshotId - Id of the snapshot
     * @return Promise<Snapshot>
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<content_type-id>'))
     * .then((entry) => entry.getSnapshot('<snapshot-id>'))
     * .then((snapshot) => console.log(snapshot))
     * .catch(console.error)
     */
    getSnapshot: function getSnapshot(snapshotId) {
      return http.get('content_types/' + this.sys.id + '/snapshots/' + snapshotId).then(function (response) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshot"])(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },
    /**
     * Checks if the contentType is published. A published contentType might have unpublished changes (@see {ContentType.isUpdated})
     * @memberof ContentType
     * @func isPublished
     * @return {boolean}
     */
    isPublished: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createPublishedChecker"])(),

    /**
     * Checks if the contentType is updated. This means the contentType was previously published but has unpublished changes.
     * @memberof ContentType
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdatedChecker"])(),

    /**
     * Checks if the contentType is in draft mode. This means it is not published.
     * @memberof ContentType
     * @func isDraft
     * @return {boolean}
     */
    isDraft: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDraftChecker"])(),

    /**
     * Omits and deletes a field if it exists on the contentType. This is a convenience method which does both operations at once and potentially less
     * safe than the standard way. See note about deleting fields on the Update method.
     * @memberof ContentType
     * @func omitAndDeleteField
     * @return {Promise<ContentType>} Object returned from the server with updated metadata.
     */
    omitAndDeleteField: function omitAndDeleteField(id) {
      return this.findAndUpdateField(id, 'omitted', true).then(function (newContentType) {
        return newContentType.findAndUpdateField(id, 'deleted', true);
      }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },

    /**
     * @private
     * @param {string} id - unique ID of the field
     * @param {string} key - the attribute on the field to change
     * @param {string} value - the value to set the attribute to
     * @return {Promise<ContentType>}
     */
    findAndUpdateField: function findAndUpdateField(id, key, value) {
      var field = this.fields.find(function (field) {
        return field.id === id;
      });
      if (!field) {
        return Promise.reject(new Error('Tried to omitAndDeleteField on a nonexistent field, ' + id + ', on the content type ' + this.name + '.'));
      }
      field[key] = value;
      return this.update();
    }
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type data
 * @return {ContentType} Wrapped content type data
 */
function wrapContentType(http, data) {
  var contentType = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(contentType, createContentTypeApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(contentType);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw content type collection data
 * @return {ContentTypeCollection} Wrapped content type collection data
 */
function wrapContentTypeCollection(http, data) {
  var contentTypes = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  contentTypes.items = contentTypes.items.map(function (entity) {
    return wrapContentType(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(contentTypes);
}

/***/ }),

/***/ "./entities/editor-interface.js":
/*!**************************************!*\
  !*** ./entities/editor-interface.js ***!
  \**************************************/
/*! exports provided: wrapEditorInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEditorInterface", function() { return wrapEditorInterface; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/**
 * Editor Interface instances
 * @namespace EditorInterface
 */






/**
 * @memberof EditorInterface
 * @typedef Control
 * @prop {srting} fieldId - the id of the customized field
 * @prop {string} widgetId - customization associated to the field
 */

/**
 * @memberof EditorInterface
 * @typedef EditorInterface
 * @prop {Meta.Sys} sys - System metadata
 * @prop {EditorInterface.Control[]} controls - array of fields and it's associated widgetId
 */

function createEditorInterfaceApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof EditorInterface
     * @func update
     * @return {Promise<EditorInterface>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.getEditorInterface())
     * .then((editorInterface) => {
     *  editorInterface.controls[0] = { "fieldId": "title", "widgetId": "singleLine"}
     *  return editorInterface.update()
     * })
     * .catch(console.error)
     */
    update: function update() {
      var raw = this.toPlainObject();
      var data = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(raw);
      delete data.sys;
      return http.put('content_types/' + this.sys.contentType.sys.id + '/editor_interface', data, {
        headers: { 'X-Contentful-Version': this.sys.version }
      }).then(function (response) {
        return wrapEditorInterface(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },
    /**
     * gets a control for a specific field
     * @memberof EditorInterface
     * @func getControlForField
     * @return {?Object} control object for specific field.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getContentType('<contentType_id>'))
     * .then((contentType) => contentType.getEditorInterface())
     * .then((editorInterface) => {
     *  control = editorInterface.getControlForField('<field-id>')
     *  console.log(control)
     * })
     * .catch(console.error)
     */
    getControlForField: function getControlForField(fieldId) {
      var result = this.controls.filter(function (control) {
        return control.fieldId === fieldId;
      });
      return result && result.length > 0 ? result[0] : null;
    }
  };
}

/**
* @private
* @param {Object} http - HTTP client instance
* @param {Object} data - Raw editor-interface data
* @return {EditorInterface} Wrapped editor-interface data
*/
function wrapEditorInterface(http, data) {
  var editorInterface = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(editorInterface, createEditorInterfaceApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(editorInterface);
}

/***/ }),

/***/ "./entities/entry.js":
/*!***************************!*\
  !*** ./entities/entry.js ***!
  \***************************/
/*! exports provided: wrapEntry, wrapEntryCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEntry", function() { return wrapEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEntryCollection", function() { return wrapEntryCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./snapshot */ "./entities/snapshot.js");
/**
 * Entry instances
 * @namespace Entry
 */







/**
 * Types of fields found in an Entry
 * @namespace EntryFields
 */

/**
 * @memberof EntryFields
 * @typedef Symbol
 * @type string
 */

/**
 * @memberof EntryFields
 * @typedef Text
 * @type string
 */

/**
 * @memberof EntryFields
 * @typedef Integer
 * @type number
 */

/**
 * @memberof EntryFields
 * @typedef Number
 * @type number
 */

/**
 * @memberof EntryFields
 * @typedef Date
 * @type string
 */

/**
 * @memberof EntryFields
 * @typedef Boolean
 * @type boolean
 */

/**
 * @memberof EntryFields
 * @typedef Location
 * @prop {string} lat - latitude
 * @prop {string} lon - longitude
 */

/**
 * A Field in an Entry can have one of the following types that can be defined in Contentful. See <a href="https://www.contentful.com/developers/docs/references/field-type/">Field Types</a> for more details.
 * @memberof EntryFields
 * @typedef Field
 * @type EntryFields.Symbol | EntryFields.Text | EntryFields.Integer | EntryFields.Number | EntryFields.Date | EntryFields.Boolean | EntryFields.Location | Meta.Link | Array<EntryFields.Symbol|Meta.Link> | Object
 */

/**
 * @memberof Entry
 * @typedef Entry
 * @prop {Meta.Sys} sys - Standard system metadata with additional entry specific properties
 * @prop {Meta.Link} sys.contentType - Content Type used by this Entry
 * @prop {string=} sys.locale - If present, indicates the locale which this entry uses
 * @prop {Object<EntryFields.Field>} fields - Object with content for each field
 * @prop {function(): Object} toPlainObject() - Returns this Entry as a plain JS object
 */

function createEntryApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Entry
     * @func update
     * @return {Promise<Entry>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => {
     *   entry.fields.title['en-US'] = 'New entry title'
     *   return entry.update()
     * })
     * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
     * .catch(console.error)
    */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Deletes this object on the server.
     * @memberof Entry
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.delete())
     * .then(() => console.log(`Entry deleted.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'entries'
    }),

    /**
     * Publishes the object
     * @memberof Entry
     * @func publish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.publish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
     * .catch(console.error)
     */
    publish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createPublishEntity"])({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unpublishes the object
     * @memberof Entry
     * @func unpublish
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.unpublish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
     * .catch(console.error)
     */
    unpublish: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUnpublishEntity"])({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Archives the object
     * @memberof Entry
     * @func archive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.archive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} archived.`))
     * .catch(console.error)
     */
    archive: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createArchiveEntity"])({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Unarchives the object
     * @memberof Entry
     * @func unarchive
     * @return {Promise<Entry>} Object returned from the server with updated metadata.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.unarchive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unarchived.`))
     * .catch(console.error)
     */
    unarchive: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUnarchiveEntity"])({
      http: http,
      entityPath: 'entries',
      wrapperMethod: wrapEntry
    }),

    /**
     * Gets all snapshots of an entry
     * @memberof Entry
     * @func getSnapshots
     * @return Promise<Snapshot>
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshots())
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     */
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return http.get('entries/' + this.sys.id + '/snapshots', Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createRequestConfig"])({ query: query })).then(function (response) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_5__["wrapSnapshotCollection"])(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_4__["default"]);
    },

    /**
     * Gets a snapshot of an entry
     * @memberof Entry
     * @func getSnapshot
     * @param {string} snapshotId - Id of the snapshot
     * @return Promise<Snapshot>
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshot('<snapshot_id>'))
     * .then((snapshot) => console.log(snapshot))
     * .catch(console.error)
     */
    getSnapshot: function getSnapshot(snapshotId) {
      return http.get('entries/' + this.sys.id + '/snapshots/' + snapshotId).then(function (response) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_5__["wrapSnapshot"])(http, response.data);
      }, _error_handler__WEBPACK_IMPORTED_MODULE_4__["default"]);
    },
    /**
     * Checks if the entry is published. A published entry might have unpublished changes (@see {Entry.isUpdated})
     * @memberof Entry
     * @func isPublished
     * @return {boolean}
     */
    isPublished: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createPublishedChecker"])(),

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     * @memberof Entry
     * @func isUpdated
     * @return {boolean}
     */
    isUpdated: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdatedChecker"])(),

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     * @memberof Entry
     * @func isDraft
     * @return {boolean}
     */
    isDraft: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDraftChecker"])(),

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     * @memberof Entry
     * @func isArchived
     * @return {boolean}
     */
    isArchived: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createArchivedChecker"])()
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry data
 * @return {Entry} Wrapped entry data
 */
function wrapEntry(http, data) {
  var entry = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(entry, createEntryApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(entry);
}

/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw entry collection data
 * @return {EntryCollection} Wrapped entry collection data
 */
function wrapEntryCollection(http, data, resolveLinks) {
  var entries = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  entries.items = entries.items.map(function (entity) {
    return wrapEntry(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(entries);
}

/***/ }),

/***/ "./entities/environment-alias.js":
/*!***************************************!*\
  !*** ./entities/environment-alias.js ***!
  \***************************************/
/*! exports provided: wrapEnvironmentAlias, wrapEnvironmentAliasCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentAlias", function() { return wrapEnvironmentAlias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentAliasCollection", function() { return wrapEnvironmentAliasCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Environment alias instances
 * @namespace EnvironmentAlias
 * @description Environment aliases allow environments to be accessed through another identifier. You must have a V2 org and manually opt-in to this feature from the
 *  environments settings page in the Contentful web app. If you do not have access to this feature, these methods will return 403 errors.
 */





/**
 * @memberof EnvironmentAlias
 * @typedef EnvironmentAlias
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - EnvironmentAlias id
 * @prop {string} sys.type - Entity type
 * @prop {Environment} environment - the environment this alias points to
 * @prop {function(): Object} toPlainObject() - Returns this EnvironmentAlias as a plain JS object
 */

/**
 * @memberof EnvironmentAlias
 * @typedef EnvironmentAliasCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<EnvironmentAlias.EnvironmentAlias>} items
 * @prop {function(): Object} toPlainObject() - Returns this EnvironmentAlias collection as a plain JS object
 */
function createEnvironmentAliasApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties. Currently, you can only change the id of the alias's underlying environment. See the example below.
     * @memberof EnvironmentAlias
     * @func update
     * @return {Promise<EnvironmentAlias>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<environment_alias_id>'))
     * .then((alias) => {
     *   alias.environment.sys.id = '<environment_id>'
     *   return alias.update()
     * })
     * .then((alias) => console.log(`alias ${alias.sys.id} updated.`))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'environment_aliases',
      wrapperMethod: wrapEnvironmentAlias
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw environment alias data
 * @return {EnvironmentAlias} Wrapped environment alias data
 */
function wrapEnvironmentAlias(http, data) {
  var alias = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(alias, createEnvironmentAliasApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(alias);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw environment alias collection data
 * @return {EnvironmentAliasCollection} Wrapped environment alias collection data
 */
function wrapEnvironmentAliasCollection(http, data) {
  var aliases = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  aliases.items = aliases.items.map(function (entity) {
    return wrapEnvironmentAlias(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(aliases);
}

/***/ }),

/***/ "./entities/environment.js":
/*!*********************************!*\
  !*** ./entities/environment.js ***!
  \*********************************/
/*! exports provided: wrapEnvironment, wrapEnvironmentCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironment", function() { return wrapEnvironment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentCollection", function() { return wrapEnvironmentCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _create_environment_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-environment-api */ "./create-environment-api.js");





/**
 * @memberof Environment
 * @typedef Environment
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - Environment id
 * @prop {string} sys.type - Entity type
 * @prop {string} name - Environment name
 * @prop {function(): Object} toPlainObject() - Returns this Environment as a plain JS object
 */

/**
 * @memberof Environment
 * @typedef SpaceCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Environment.Environment>} items
 * @prop {function(): Object} toPlainObject() - Returns this Environment collection as a plain JS object
 */

/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Environment
 * @return {Environment}
 */
function wrapEnvironment(http, data) {
  var environment = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var _http$httpClientParam = http.httpClientParams,
      hostUpload = _http$httpClientParam.hostUpload,
      defaultHostnameUpload = _http$httpClientParam.defaultHostnameUpload;

  var environmentScopedHttpClient = http.cloneWithNewParams({
    baseURL: http.defaults.baseURL + 'environments/' + environment.sys.id
  });
  var environmentScopedUploadClient = http.cloneWithNewParams({
    space: environment.sys.space.sys.id,
    host: hostUpload || defaultHostnameUpload
  });
  var environmentApi = Object(_create_environment_api__WEBPACK_IMPORTED_MODULE_3__["default"])({
    http: environmentScopedHttpClient,
    httpUpload: environmentScopedUploadClient
  });
  var enhancedEnvironment = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(environment, environmentApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedEnvironment);
}

/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Environment collection
 * @return {SpaceCollection}
 */
function wrapEnvironmentCollection(http, data) {
  var environments = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  environments.items = environments.items.map(function (entity) {
    return wrapEnvironment(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(environments);
}

/***/ }),

/***/ "./entities/index.js":
/*!***************************!*\
  !*** ./entities/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./space */ "./entities/space.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment */ "./entities/environment.js");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entry */ "./entities/entry.js");
/* harmony import */ var _asset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./asset */ "./entities/asset.js");
/* harmony import */ var _content_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content-type */ "./entities/content-type.js");
/* harmony import */ var _editor_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor-interface */ "./entities/editor-interface.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locale */ "./entities/locale.js");
/* harmony import */ var _webhook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./webhook */ "./entities/webhook.js");
/* harmony import */ var _space_membership__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./space-membership */ "./entities/space-membership.js");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./role */ "./entities/role.js");
/* harmony import */ var _api_key__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./api-key */ "./entities/api-key.js");
/* harmony import */ var _preview_api_key__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./preview-api-key */ "./entities/preview-api-key.js");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./upload */ "./entities/upload.js");
/* harmony import */ var _organization__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./organization */ "./entities/organization.js");
/* harmony import */ var _ui_extension__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui-extension */ "./entities/ui-extension.js");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./snapshot */ "./entities/snapshot.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./user */ "./entities/user.js");
/* harmony import */ var _personal_access_token__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./personal-access-token */ "./entities/personal-access-token.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./usage */ "./entities/usage.js");
/* harmony import */ var _environment_alias__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./environment-alias */ "./entities/environment-alias.js");





















/* harmony default export */ __webpack_exports__["default"] = ({
  space: _space__WEBPACK_IMPORTED_MODULE_0__,
  environment: _environment__WEBPACK_IMPORTED_MODULE_1__,
  entry: _entry__WEBPACK_IMPORTED_MODULE_2__,
  asset: _asset__WEBPACK_IMPORTED_MODULE_3__,
  contentType: _content_type__WEBPACK_IMPORTED_MODULE_4__,
  editorInterface: _editor_interface__WEBPACK_IMPORTED_MODULE_5__,
  locale: _locale__WEBPACK_IMPORTED_MODULE_6__,
  webhook: _webhook__WEBPACK_IMPORTED_MODULE_7__,
  spaceMembership: _space_membership__WEBPACK_IMPORTED_MODULE_8__,
  role: _role__WEBPACK_IMPORTED_MODULE_9__,
  apiKey: _api_key__WEBPACK_IMPORTED_MODULE_10__,
  previewApiKey: _preview_api_key__WEBPACK_IMPORTED_MODULE_11__,
  upload: _upload__WEBPACK_IMPORTED_MODULE_12__,
  organization: _organization__WEBPACK_IMPORTED_MODULE_13__,
  uiExtension: _ui_extension__WEBPACK_IMPORTED_MODULE_14__,
  snapshot: _snapshot__WEBPACK_IMPORTED_MODULE_15__,
  user: _user__WEBPACK_IMPORTED_MODULE_16__,
  personalAccessToken: _personal_access_token__WEBPACK_IMPORTED_MODULE_17__,
  usage: _usage__WEBPACK_IMPORTED_MODULE_18__,
  environmentAlias: _environment_alias__WEBPACK_IMPORTED_MODULE_19__
});

/***/ }),

/***/ "./entities/locale.js":
/*!****************************!*\
  !*** ./entities/locale.js ***!
  \****************************/
/*! exports provided: wrapLocale, wrapLocaleCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapLocale", function() { return wrapLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapLocaleCollection", function() { return wrapLocaleCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Locale instances
 * @namespace Locale
 */





/**
 * @memberof Locale
 * @typedef Locale
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} code - Locale code (example: en-us)
 * @prop {string} fallbackCode - the locale code to fallback to when there is not content for the current locale
 * @prop {boolean} contentDeliveryApi - If the content under this locale should be available on the CDA (for public reading)
 * @prop {boolean} contentManagementApi - If the content under this locale should be available on the CMA (for editing)
 * @prop {boolean} default - If this is the default locale
 * @prop {boolean} optional - If the locale needs to be filled in on entries or not
 * @prop {function(): Object} toPlainObject() - Returns this Locale as a plain JS object
 */

function createLocaleApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Locale
     * @func update
     * @return {Promise<Locale>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getLocale('<locale_id>'))
     * .then((locale) => {
     *   locale.name = 'New locale name'
     *   return locale.update()
     * })
     * .then((locale) => console.log(`locale ${locale.sys.id} updated.`))
     * .catch(console.error)
     */
    update: function update() {
      var locale = this;
      delete locale.default; // we should not send this back
      return Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
        http: http,
        entityPath: 'locales',
        wrapperMethod: wrapLocale
      }).call(locale);
    },

    /**
     * Deletes this object on the server.
     * @memberof Locale
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getLocale('<locale_id>'))
     * .then((locale) => locale.delete())
     * .then(() => console.log(`locale deleted.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'locales'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale data
 * @return {Locale} Wrapped locale data
 */
function wrapLocale(http, data) {
  delete data.internal_code;
  var locale = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(locale, createLocaleApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(locale);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw locale collection data
 * @return {LocaleCollection} Wrapped locale collection data
 */
function wrapLocaleCollection(http, data) {
  var locales = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  locales.items = locales.items.map(function (entity) {
    return wrapLocale(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(locales);
}

/***/ }),

/***/ "./entities/organization.js":
/*!**********************************!*\
  !*** ./entities/organization.js ***!
  \**********************************/
/*! exports provided: wrapOrganizationCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganizationCollection", function() { return wrapOrganizationCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");



/**
* This method normalizes each organization in a collection.
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw organization collection data
 * @return {OrganizationCollection} Normalized organization collection data
 */
function wrapOrganizationCollection(http, data) {
  var organizations = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(organizations);
}

/***/ }),

/***/ "./entities/personal-access-token.js":
/*!*******************************************!*\
  !*** ./entities/personal-access-token.js ***!
  \*******************************************/
/*! exports provided: wrapPersonalAccessToken, wrapPersonalAccessTokenCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPersonalAccessToken", function() { return wrapPersonalAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPersonalAccessTokenCollection", function() { return wrapPersonalAccessTokenCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/**
 * Personal access token
 * @namespace PersonalAccessToken
 * */






function createPersonalAccessToken(http) {
  return {
    /**
     * Revokes a personal access token
     * @memberof PersonalAccessToken
     * @func revoke
     * @return {Promise<PersonalAccessToken>} Object the revoked personal access token
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *  accessToken: <content_management_api_key>
     * })
     *
     * client.getPersonalAccessToken('<token-id>')
     *  .then((personalAccessToken) => {
     *    return personalAccessToken.revoke()
     *  })
     *  .catch(console.error)
     */
    revoke: function revoke() {
      var baseURL = http.defaults.baseURL.replace('/spaces/', '/users/me/access_tokens');
      return http.put(this.sys.id + '/revoked', null, {
        baseURL: baseURL
      }).then(function (response) {
        return response.data;
      }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw  personal access token data
 * @return {PersonalAccessToken} Wrapped personal access token
 */
function wrapPersonalAccessToken(http, data) {
  var personalAccessToken = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(personalAccessToken, createPersonalAccessToken(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(personalAccessToken);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw personal access collection data
 * @return {PersonalAccessTokenCollection} Wrapped personal access token collection data
 */
function wrapPersonalAccessTokenCollection(http, data) {
  var personalAccessTokens = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  personalAccessTokens.items = personalAccessTokens.items.map(function (entity) {
    return wrapPersonalAccessToken(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(personalAccessTokens);
}

/***/ }),

/***/ "./entities/preview-api-key.js":
/*!*************************************!*\
  !*** ./entities/preview-api-key.js ***!
  \*************************************/
/*! exports provided: wrapPreviewApiKey, wrapPreviewApiKeyCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPreviewApiKey", function() { return wrapPreviewApiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPreviewApiKeyCollection", function() { return wrapPreviewApiKeyCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/**
 * Preview Api Key instances
 * @namespace PreviewApiKey
 */





/**
 * @memberof PreviewApiKey
 * @typedef PreviewApiKey
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} description
 * @prop {function(): Object} toPlainObject() - Returns this Preview Api Key as a plain JS object
 */

function createPreviewApiKeyApi(http) {
  return {};
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key data
 * @return {PreviewApiKey} Wrapped preview api key data
 */
function wrapPreviewApiKey(http, data) {
  var previewApiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(previewApiKey, createPreviewApiKeyApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(previewApiKey);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw api key collection data
 * @return {PreviewApiKeyCollection} Wrapped api key collection data
 */
function wrapPreviewApiKeyCollection(http, data) {
  var previewApiKeys = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  previewApiKeys.items = previewApiKeys.items.map(function (entity) {
    return wrapPreviewApiKey(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(previewApiKeys);
}

/***/ }),

/***/ "./entities/role.js":
/*!**************************!*\
  !*** ./entities/role.js ***!
  \**************************/
/*! exports provided: wrapRole, wrapRoleCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRole", function() { return wrapRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRoleCollection", function() { return wrapRoleCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Role instances
 * @namespace Role
 */





/**
 * See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/roles/create-a-role
 * @memberof Role
 * @typedef Role
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {object} permissions - Permissions for application sections
 * @prop {object} policies
 * @prop {function(): Object} toPlainObject() - Returns this Role as a plain JS object
 */

function createRoleApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Role
     * @func update
     * @return {Promise<Role>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRole('<roles_id>'))
     * .then((roles) => {
     *   roles.name = 'New role name'
     *   return roles.update()
     * })
     * .then((roles) => console.log(`roles ${roles.sys.id} updated.`))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'roles',
      wrapperMethod: wrapRole
    }),

    /**
     * Deletes this object on the server.
     * @memberof Role
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRole('<role_id>'))
     * .then((role) => role.delete())
     * .then((role) => console.log(`role deleted.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'roles'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role data
 * @return {Role} Wrapped role data
 */
function wrapRole(http, data) {
  var role = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(role, createRoleApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(role);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw role collection data
 * @return {RoleCollection} Wrapped role collection data
 */
function wrapRoleCollection(http, data) {
  var roles = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  roles.items = roles.items.map(function (entity) {
    return wrapRole(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(roles);
}

/***/ }),

/***/ "./entities/snapshot.js":
/*!******************************!*\
  !*** ./entities/snapshot.js ***!
  \******************************/
/*! exports provided: wrapSnapshot, wrapSnapshotCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSnapshot", function() { return wrapSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSnapshotCollection", function() { return wrapSnapshotCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/**
 * Snapshot instances
 * @namespace Snapshot
 */





/**
 * @memberof Snapshot
 * @typedef Snapshot
 * @prop {Meta.Sys} sys - System metadata
 * @prop {Object<EntryFields.Field>} fields - Object with content for each field
 * @prop {function(): Object} toPlainObject() - Returns this Snapshot as a plain JS object
 */
function createSnapshotApi(http) {
  return {/* In case the snapshot object evolve later */};
}
/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw snapshot data
 * @return {Snapshot} Wrapped snapshot data
 */
function wrapSnapshot(http, data) {
  var snapshot = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(snapshot, createSnapshotApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(snapshot);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw snapshot collection data
 * @return {ApiKeyCollection} Wrapped snapshot collection data
 */
function wrapSnapshotCollection(http, data) {
  var snapshots = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  snapshots.items = snapshots.items.map(function (entity) {
    return wrapSnapshot(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(snapshots);
}

/***/ }),

/***/ "./entities/space-membership.js":
/*!**************************************!*\
  !*** ./entities/space-membership.js ***!
  \**************************************/
/*! exports provided: wrapSpaceMembership, wrapSpaceMembershipCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMembership", function() { return wrapSpaceMembership; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMembershipCollection", function() { return wrapSpaceMembershipCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Space Membership instances
 * @namespace SpaceMembership
 */






/**
 * @memberof SpaceMembership
 * @typedef SpaceMembership
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {boolean} admin - User is an admin
 * @prop {array} roles - Array of Role Links
 * @prop {function(): Object} toPlainObject() - Returns this Space Membership as a plain JS object
 */

function createSpaceMembershipApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof SpaceMembership
     * @func update
     * @return {Promise<SpaceMembership>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMembership) => {
     *  spaceMembership.name = 'new space membership name'
     * })
     * .then((spaceMembership) => console.log(`spaceMembership ${spaceMembership.sys.id} updated.`))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'space_memberships',
      wrapperMethod: wrapSpaceMembership
    }),

    /**
     * Deletes this object on the server.
     * @memberof SpaceMembership
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMembership) => spaceMembership.delete())
     * .then(() => console.log(`spaceMembership deleted.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'space_memberships'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership data
 * @return {SpaceMembership} Wrapped space membership data
 */
function wrapSpaceMembership(http, data) {
  var spaceMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(spaceMembership, createSpaceMembershipApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(spaceMembership);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership collection data
 * @return {SpaceMembershipCollection} Wrapped space membership collection data
 */
function wrapSpaceMembershipCollection(http, data) {
  var spaceMemberships = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  spaceMemberships.items = spaceMemberships.items.map(function (entity) {
    return wrapSpaceMembership(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(spaceMemberships);
}

/***/ }),

/***/ "./entities/space.js":
/*!***************************!*\
  !*** ./entities/space.js ***!
  \***************************/
/*! exports provided: wrapSpace, wrapSpaceCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpace", function() { return wrapSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceCollection", function() { return wrapSpaceCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _create_space_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-space-api */ "./create-space-api.js");





/**
 * @memberof Space
 * @typedef Space
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - Space id
 * @prop {string} sys.type - Entity type
 * @prop {string} name - Space name
 * @prop {function(): Object} toPlainObject() - Returns this Space as a plain JS object
 */

/**
 * @memberof Space
 * @typedef SpaceCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Space.Space>} items
 * @prop {function(): Object} toPlainObject() - Returns this Space collection as a plain JS object
 */

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space
 * @return {Space}
 */
function wrapSpace(http, data) {
  var space = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var _http$httpClientParam = http.httpClientParams,
      hostUpload = _http$httpClientParam.hostUpload,
      defaultHostnameUpload = _http$httpClientParam.defaultHostnameUpload;

  var spaceScopedHttpClient = http.cloneWithNewParams({
    space: space.sys.id
  });
  var spaceScopedUploadClient = http.cloneWithNewParams({
    space: space.sys.id,
    host: hostUpload || defaultHostnameUpload
  });
  var spaceApi = Object(_create_space_api__WEBPACK_IMPORTED_MODULE_3__["default"])({
    http: spaceScopedHttpClient,
    httpUpload: spaceScopedUploadClient
  });
  var enhancedSpace = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(space, spaceApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedSpace);
}

/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 * @param  {Object} http - HTTP client instance
 * @param  {Object} data - API response for a Space collection
 * @return {SpaceCollection}
 */
function wrapSpaceCollection(http, data) {
  var spaces = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  spaces.items = spaces.items.map(function (entity) {
    return wrapSpace(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(spaces);
}

/***/ }),

/***/ "./entities/ui-extension.js":
/*!**********************************!*\
  !*** ./entities/ui-extension.js ***!
  \**********************************/
/*! exports provided: wrapUiExtension, wrapUiExtensionCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUiExtension", function() { return wrapUiExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUiExtensionCollection", function() { return wrapUiExtensionCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * UI Extension instances
 * @namespace UiExtension
 */





/**
 * @memberof UiExtension
 * @typedef UiExtension
 * @prop {Meta.Sys} sys - System metadata
 * @prop {object} extension - UI Extension config
 * @prop {string} extension.name - Extension name
 * @prop {array} extension.fieldTypes - Field types where an extension can be used
 * @prop {array} extension.src - URL where the root HTML document of the extension can be found
 * @prop {array} extension.srcdoc - String representation of the extension (e.g. inline HTML code)
 * @prop {boolean} extension.sidebar - Controls the location of the extension. If true it will be rendered on the sidebar instead of replacing the field's editing control
 * @prop {function(): Object} toPlainObject() - Returns this UI Extension as a plain JS object
 */

function createUiExtensionApi(http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof UiExtension
     * @func update
     * @return {Promise<UiExtension>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUiExtension('<ui_extension_id>'))
     * .then((uiExtension) => {
     *   uiExtension.extension.name = 'New UI Extension name'
     *   return uiExtension.update()
     * })
     * .then((uiExtension) => console.log(`UI Extension ${uiExtension.sys.id} updated.`))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createUpdateEntity"])({
      http: http,
      entityPath: 'extensions',
      wrapperMethod: wrapUiExtension
    }),

    /**
     * Deletes this object on the server.
     * @memberof UiExtension
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUiExtension('<ui_extension_id>'))
     * .then((uiExtension) => uiExtension.delete())
     * .then(() => console.log(`UI Extension deleted.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'extensions'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw UI Extension data
 * @return {UiExtension} Wrapped UI Extension data
 */
function wrapUiExtension(http, data) {
  var uiExtension = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(uiExtension, createUiExtensionApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(uiExtension);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw UI Extension collection data
 * @return {UiExtensionCollection} Wrapped UI Extension collection data
 */
function wrapUiExtensionCollection(http, data) {
  var uiExtensions = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  uiExtensions.items = uiExtensions.items.map(function (entity) {
    return wrapUiExtension(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(uiExtensions);
}

/***/ }),

/***/ "./entities/upload.js":
/*!****************************!*\
  !*** ./entities/upload.js ***!
  \****************************/
/*! exports provided: wrapUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUpload", function() { return wrapUpload; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Upload instances
 * @namespace Upload
 */





/**
 * @memberof Upload
 * @typedef {Upload} Upload
 * @prop {Object} sys - Standard system metadata with additional asset specific properties
 * @prop {string} sys.id - The id of the upload
 * @prop {function(): Promise} delete - Deletes an upload
 * @prop {function(): Object} toPlainObject - Returns this Asset as a plain JS object
 */

function createUploadApi(http) {
  return {
    /**
     * Deletes this object on the server.
     * @memberof Upload
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getUpload('<upload_id>'))
     * .then((upload) => upload.delete())
     * .then((upload) => console.log(`upload ${upload.sys.id} updated.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_3__["createDeleteEntity"])({
      http: http,
      entityPath: 'uploads'
    })
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */
function wrapUpload(http, data) {
  var upload = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(upload, createUploadApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(upload);
}

/***/ }),

/***/ "./entities/usage.js":
/*!***************************!*\
  !*** ./entities/usage.js ***!
  \***************************/
/*! exports provided: wrapUsageCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUsageCollection", function() { return wrapUsageCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/**
 * @namespace Usage
 */



/**
 * @memberof Usage
 * @typedef { "cma" | "cda" | "cpa" | "gql" } UsageMetricEnum
 */

/**
 * The <code>dateRange</code> parameter is optional. When some or all of
 * <code>dateRange</code> properties are missing the usage period is derived
 * from today and the maximum reported data points which are currently set to
 * <code>45 days</code>. The calculated usage period is part of the response
 * object see {@link Usage.Usage}
 *
 * @memberof Usage
 * @typedef UsageQuery
 * @prop {string} [metric[in]] - One or more comma separated usage {@link Usage.UsageMetricEnum metrics}. By default no filtering is applied.
 * @prop {string} [dateRange.startAt] - Start of a usage period in <code>yyyy-mm-dd</code> format
 * @prop {string} [dateRange.endAt] - End of a usage period in <code>yyyy-mm-dd</code> format
 * @prop {number} [skip=0]
 * @prop {number} [limit=25]
 * @prop {string} [order="-usage"]
 */

/**
 * @memberof Usage
 * @typedef Usage
 * @prop {string} sys.id - Usage id in form of <code>usage-{metric}-{entity}-key-{key}-{startAt}-{endAt}</code>
 * @prop {"OrganizationPeriodicUsage" | "SpacePeriodicUsage"} sys.type - Usage internal type
 * @prop {Meta.Link} [sys.organization] - Organization link when <code>sys.type</code> is <code>OrganizationPeriodicUsage</code>
 * @prop {Meta.Link} [sys.space] - Space link when <code>sys.code</code> is <code>SpacePeriodicUsage</code>
 * @prop {"apiRequestsCount"} unitOfMeasure - Unit of measurement
 * @prop {Usage.UsageMetricEnum} metric - Type of the requested metric
 * @prop {string} dateRange.startAt - Start of the requested usage period in <code>yyyy-mm-dd</code> format
 * @prop {string} dateRange.endAt - End of the requested usage period in <code>yyyy-mm-dd</code> format
 * @prop {number} usage - Usage total for the requested <code>metric</code> and usage period
 * @prop {Object} usagePerDay - Usage per day for the requested <code>metric</code> and usage period, <code>{ "yyyy-dd-mm": number, ... }</code>
 */

/**
 * @memberof Usage
 * @typedef UsageCollection
 * @prop {number} total
 * @prop {number} limit
 * @prop {number} skip
 * @prop {string} order
 * @prop {Object<{type: "Array"}>} sys
 * @prop {Array<Usage.Usage>} items
 * @prop {function(): Object} toPlainObject() - Returns the collection as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw usage data collection
 * @return {Usage.UsageCollection} Normalized usage collection
 */
function wrapUsageCollection(http, data) {
  var usage = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(data));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(usage);
}

/***/ }),

/***/ "./entities/user.js":
/*!**************************!*\
  !*** ./entities/user.js ***!
  \**************************/
/*! exports provided: wrapUser, wrapUserCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUser", function() { return wrapUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUserCollection", function() { return wrapUserCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);
/**
 * @namespace User
 */




/**
 * @memberof User
 * @typedef User
 * @prop {Object} sys - System metadata
 * @prop {string} sys.id - User id
 * @prop {string} sys.type - Entity type
 * @prop {string} firstName - User first name
 * @prop {string} lastName - User last name
 * @prop {string} avatarUrl - User avatar url
 * @prop {string} email - User email
 * @prop {boolean} activated - User activated
 * @prop {number} signInCount - User sign in count
 * @prop {boolean} confirmed - User confirmed
 * @prop {function(): Object} toPlainObject() - Returns this User as a plain JS object
 */

/**
 * @memberof User
 * @typedef UserCollection
 * @prop {number} total
 * @prop {number} limit
 * @prop {number} skip
 * @prop {Object<{type: "Array"}>} sys
 * @prop {Array<User.User>} items
 * @prop {function(): Object} toPlainObject() - Returns the collection as a plain JS object
 */

/*
 *
 * @private
 * */
function wrapUser(http, data) {
  var user = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_1__["default"])(user, {});
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(user);
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw data collection
 * @return {User.UserCollection} Normalized usage collection
 */
function wrapUserCollection(http, data) {
  var users = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(data));
  users.items = users.items.map(function (entity) {
    return wrapUser(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(users);
}

/***/ }),

/***/ "./entities/webhook.js":
/*!*****************************!*\
  !*** ./entities/webhook.js ***!
  \*****************************/
/*! exports provided: wrapWebhook, wrapWebhookCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapWebhook", function() { return wrapWebhook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapWebhookCollection", function() { return wrapWebhookCollection; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.js");
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error-handler */ "./error-handler.js");
/* harmony import */ var _instance_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../instance-actions */ "./instance-actions.js");
/**
 * Webhook instances
 * @namespace Webhook
 */






/**
 * @memberof Webhook
 * @typedef Webhook
 * @prop {Meta.Sys} sys - System metadata
 * @prop {string} name
 * @prop {string} url - Url which the webhook will call
 * @prop {string} httpBasicUsername - Username for basic HTTP authentication
 * @prop {string} httpBasicPassword - Password for basic HTTP authentication
 * @prop {object} headers - Key value pairs of additional headers to be sent with every webhook call.
 * @prop {array} topics - Topics which this webhook should be subscribed to. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhooks/create-a-webhook for more details
 * @prop {function(): Object} toPlainObject() - Returns this Webhook as a plain JS object
 */

function createWebhookApi(http) {
  return {

    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof Webhook
     * @func update
     * @return {Promise<Webhook>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => {
     *  webhook.name = 'new webhook name'
     *  return webhook.update()
     * })
     * .then((webhook) => console.log(`webhook ${webhook.sys.id} updated.`))
     * .catch(console.error)
     */
    update: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createUpdateEntity"])({
      http: http,
      entityPath: 'webhook_definitions',
      wrapperMethod: wrapWebhook
    }),

    /**
     * Deletes this object on the server.
     * @memberof Webhook
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => webhook.delete())
     * .then((webhook) => console.log(`webhook ${webhook.sys.id} updated.`))
     * .catch(console.error)
     */
    delete: Object(_instance_actions__WEBPACK_IMPORTED_MODULE_4__["createDeleteEntity"])({
      http: http,
      entityPath: 'webhook_definitions'
    }),

    /**
     * List of the most recent webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for list of calls
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => webhook.getCalls())
     * .then((response) => console.log(response.items)) // webhook calls
     * .catch(console.error)
     */
    getCalls: function getCalls() {
      return http.get('webhooks/' + this.sys.id + '/calls').then(function (response) {
        return response.data;
      }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },

    /**
     * Webhook call with specific id. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details
     * @memberof Webhook
     * @func getCalls
     * @return {Promise<object>} Promise for call details
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => webhook.getCall(<call-id>))
     * .then((webhookCall) => console.log(webhookCall))
     * .catch(console.error)
     */
    getCall: function getCall(id) {
      return http.get('webhooks/' + this.sys.id + '/calls/' + id).then(function (response) {
        return response.data;
      }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
    },

    /**
     * Overview of the health of webhook calls. See https://www.contentful.com/developers/docs/references/content-management-api/#/reference/webhook-calls/webhook-call-overviews for more details.
     * @memberof Webhook
     * @func getHealth
     * @return {Promise<object>} Promise for health info
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => webhook.getHealth())
     * .then((webhookHealth) => console.log(webhookHealth))
     * .catch(console.error)
     */
    getHealth: function getHealth() {
      return http.get('webhooks/' + this.sys.id + '/health').then(function (response) {
        return response.data;
      }, _error_handler__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
  };
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook data
 * @return {Webhook} Wrapped webhook data
 */
function wrapWebhook(http, data) {
  var webhook = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(webhook, createWebhookApi(http));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(webhook);
}

/**
 * @memberof Webhook
 * @typedef WebhookCollection
 * @prop {number} total
 * @prop {number} skip
 * @prop {number} limit
 * @prop {Array<Webhook.Webhook>} items
 * @prop {function(): Object} toPlainObject() - Returns this Webhook collection as a plain JS object
 */

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw webhook collection data
 * @return {WebhookCollection} Wrapped webhook collection data
 */
function wrapWebhookCollection(http, data) {
  var webhooks = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(data));
  webhooks.items = webhooks.items.map(function (entity) {
    return wrapWebhook(http, entity);
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(webhooks);
}

/***/ }),

/***/ "./error-handler.js":
/*!**************************!*\
  !*** ./error-handler.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return errorHandler; });
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isPlainObject */ "../node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Handles errors received from the server. Parses the error into a more useful
 * format, places it in an exception and throws it.
 * See https://www.contentful.com/developers/docs/references/errors/
 * for more details on the data received on the errorResponse.data property
 * and the expected error codes.
 * @private
 * @param {Object} errorResponse - Error received from an axios request
 * @throws {ErrorResponse}
 */
function errorHandler(errorResponse) {
  var config = errorResponse.config,
      response = errorResponse.response;

  var errorName = void 0;

  if (!lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(response) || !lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(config)) {
    throw errorResponse;
  }

  var data = response.data;


  var errorData = {
    status: response.status,
    statusText: response.statusText,
    message: '',
    details: {}

    // Obscure the Management token
  };if (config.headers && config.headers['Authorization']) {
    var token = '...' + config.headers['Authorization'].substr(-5);
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(config)) {
    errorData.request = {
      url: config.url,
      headers: config.headers,
      method: config.method,
      payloadData: config.data
    };
  }
  if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_0___default()(data)) {
    if ('requestId' in data) {
      errorData.requestId = data.requestId || 'UNKNOWN';
    }
    if ('message' in data) {
      errorData.message = data.message || '';
    }
    if ('details' in data) {
      errorData.details = data.details || {};
    }
    if ('sys' in data) {
      if ('id' in data.sys) {
        errorName = data.sys.id;
      }
    }
  }

  var error = new Error();
  error.name = errorName && errorName !== 'Unknown' ? errorName : response.status + ' ' + response.statusText;
  error.message = JSON.stringify(errorData, null, '  ');
  throw error;
}

/***/ }),

/***/ "./instance-actions.js":
/*!*****************************!*\
  !*** ./instance-actions.js ***!
  \*****************************/
/*! exports provided: createUpdateEntity, createDeleteEntity, createPublishEntity, createUnpublishEntity, createArchiveEntity, createUnarchiveEntity, createPublishedChecker, createUpdatedChecker, createDraftChecker, createArchivedChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUpdateEntity", function() { return createUpdateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeleteEntity", function() { return createDeleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPublishEntity", function() { return createPublishEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUnpublishEntity", function() { return createUnpublishEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArchiveEntity", function() { return createArchiveEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUnarchiveEntity", function() { return createUnarchiveEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPublishedChecker", function() { return createPublishedChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUpdatedChecker", function() { return createUpdatedChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDraftChecker", function() { return createDraftChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArchivedChecker", function() { return createArchivedChecker; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "../node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-handler */ "./error-handler.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * @private
 */
function createUpdateEntity(_ref) {
  var http = _ref.http,
      entityPath = _ref.entityPath,
      wrapperMethod = _ref.wrapperMethod,
      headers = _ref.headers;

  return function () {
    var raw = this.toPlainObject();
    var data = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(raw);
    delete data.sys;
    return http.put(entityPath + '/' + this.sys.id, data, {
      headers: _extends({
        'X-Contentful-Version': this.sys.version || 0 }, headers)
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createDeleteEntity(_ref2) {
  var http = _ref2.http,
      entityPath = _ref2.entityPath;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id).then(function (response) {}, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createPublishEntity(_ref3) {
  var http = _ref3.http,
      entityPath = _ref3.entityPath,
      wrapperMethod = _ref3.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/published', null, {
      headers: {
        'X-Contentful-Version': this.sys.version
      }
    }).then(function (response) {
      return wrapperMethod(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createUnpublishEntity(_ref4) {
  var http = _ref4.http,
      entityPath = _ref4.entityPath,
      wrapperMethod = _ref4.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/published').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createArchiveEntity(_ref5) {
  var http = _ref5.http,
      entityPath = _ref5.entityPath,
      wrapperMethod = _ref5.wrapperMethod;

  return function () {
    return http.put(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createUnarchiveEntity(_ref6) {
  var http = _ref6.http,
      entityPath = _ref6.entityPath,
      wrapperMethod = _ref6.wrapperMethod;

  return function () {
    return http.delete(entityPath + '/' + this.sys.id + '/archived').then(function (response) {
      return wrapperMethod(http, response.data);
    }, _error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
}

/**
 * @private
 */
function createPublishedChecker() {
  return function () {
    return !!this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createUpdatedChecker() {
  return function () {
    // The act of publishing an entity increases its version by 1, so any entry which has
    // 2 versions higher or more than the publishedVersion has unpublished changes.
    return !!(this.sys.publishedVersion && this.sys.version > this.sys.publishedVersion + 1);
  };
}

/**
 * @private
 */
function createDraftChecker() {
  return function () {
    return !this.sys.publishedVersion;
  };
}

/**
 * @private
 */
function createArchivedChecker() {
  return function () {
    return !!this.sys.archivedVersion;
  };
}

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./contentful-management.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./contentful-management.js */"./contentful-management.js");


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=contentful-management.node.js.map