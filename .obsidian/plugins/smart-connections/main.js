var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/smart-embed-model/node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/smart-embed-model/node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup2 = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup2[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 2] + lookup2[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 10] + lookup2[tmp >> 4 & 63] + lookup2[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// ejs.min.cjs
var require_ejs_min = __commonJS({
  "ejs.min.cjs"(exports2, module2) {
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.ejs = f();
      }
    })(function() {
      var define2, module3, exports3;
      return (/* @__PURE__ */ function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i2, true);
                if (u) return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
          return o;
        }
        return r;
      }())({ 1: [function(require2, module4, exports4) {
        "use strict";
        var fs = require2("fs");
        var path = require2("path");
        var utils = require2("./utils");
        var scopeOptionWarned = false;
        var _VERSION_STRING = require2("../package.json").version;
        var _DEFAULT_OPEN_DELIMITER = "<";
        var _DEFAULT_CLOSE_DELIMITER = ">";
        var _DEFAULT_DELIMITER = "%";
        var _DEFAULT_LOCALS_NAME = "locals";
        var _NAME = "ejs";
        var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
        var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
        var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
        var _BOM = /^\uFEFF/;
        var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        exports4.cache = utils.cache;
        exports4.fileLoader = fs.readFileSync;
        exports4.localsName = _DEFAULT_LOCALS_NAME;
        exports4.promiseImpl = new Function("return this;")().Promise;
        exports4.resolveInclude = function(name, filename, isDir) {
          var dirname = path.dirname;
          var extname = path.extname;
          var resolve = path.resolve;
          var includePath = resolve(isDir ? filename : dirname(filename), name);
          var ext = extname(name);
          if (!ext) {
            includePath += ".ejs";
          }
          return includePath;
        };
        function resolvePaths(name, paths) {
          var filePath;
          if (paths.some(function(v) {
            filePath = exports4.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })) {
            return filePath;
          }
        }
        function getIncludePath(path2, options) {
          var includePath;
          var filePath;
          var views = options.views;
          var match = /^[A-Za-z]+:\\|^\//.exec(path2);
          if (match && match.length) {
            path2 = path2.replace(/^\/*/, "");
            if (Array.isArray(options.root)) {
              includePath = resolvePaths(path2, options.root);
            } else {
              includePath = exports4.resolveInclude(path2, options.root || "/", true);
            }
          } else {
            if (options.filename) {
              filePath = exports4.resolveInclude(path2, options.filename);
              if (fs.existsSync(filePath)) {
                includePath = filePath;
              }
            }
            if (!includePath && Array.isArray(views)) {
              includePath = resolvePaths(path2, views);
            }
            if (!includePath && typeof options.includer !== "function") {
              throw new Error('Could not find the include file "' + options.escapeFunction(path2) + '"');
            }
          }
          return includePath;
        }
        function handleCache(options, template) {
          var func;
          var filename = options.filename;
          var hasTemplate = arguments.length > 1;
          if (options.cache) {
            if (!filename) {
              throw new Error("cache option requires a filename");
            }
            func = exports4.cache.get(filename);
            if (func) {
              return func;
            }
            if (!hasTemplate) {
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
          } else if (!hasTemplate) {
            if (!filename) {
              throw new Error("Internal EJS error: no file name or template provided");
            }
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
          func = exports4.compile(template, options);
          if (options.cache) {
            exports4.cache.set(filename, func);
          }
          return func;
        }
        function tryHandleCache(options, data, cb) {
          var result;
          if (!cb) {
            if (typeof exports4.promiseImpl == "function") {
              return new exports4.promiseImpl(function(resolve, reject) {
                try {
                  result = handleCache(options)(data);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              throw new Error("Please provide a callback function");
            }
          } else {
            try {
              result = handleCache(options)(data);
            } catch (err) {
              return cb(err);
            }
            cb(null, result);
          }
        }
        function fileLoader(filePath) {
          return exports4.fileLoader(filePath);
        }
        function includeFile(path2, options) {
          var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
          opts.filename = getIncludePath(path2, opts);
          if (typeof options.includer === "function") {
            var includerResult = options.includer(path2, opts.filename);
            if (includerResult) {
              if (includerResult.filename) {
                opts.filename = includerResult.filename;
              }
              if (includerResult.template) {
                return handleCache(opts, includerResult.template);
              }
            }
          }
          return handleCache(opts);
        }
        function rethrow(err, str, flnm, lineno, esc) {
          var lines = str.split("\n");
          var start = Math.max(lineno - 3, 0);
          var end = Math.min(lines.length, lineno + 3);
          var filename = esc(flnm);
          var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
          }).join("\n");
          err.path = filename;
          err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
          throw err;
        }
        function stripSemi(str) {
          return str.replace(/;(\s*$)/, "$1");
        }
        exports4.compile = function compile(template, opts) {
          var templ;
          if (opts && opts.scope) {
            if (!scopeOptionWarned) {
              console.warn("`scope` option is deprecated and will be removed in EJS 3");
              scopeOptionWarned = true;
            }
            if (!opts.context) {
              opts.context = opts.scope;
            }
            delete opts.scope;
          }
          templ = new Template(template, opts);
          return templ.compile();
        };
        exports4.render = function(template, d, o) {
          var data = d || utils.createNullProtoObjWherePossible();
          var opts = o || utils.createNullProtoObjWherePossible();
          if (arguments.length == 2) {
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
          }
          return handleCache(opts, template)(data);
        };
        exports4.renderFile = function() {
          var args = Array.prototype.slice.call(arguments);
          var filename = args.shift();
          var cb;
          var opts = { filename };
          var data;
          var viewOpts;
          if (typeof arguments[arguments.length - 1] == "function") {
            cb = args.pop();
          }
          if (args.length) {
            data = args.shift();
            if (args.length) {
              utils.shallowCopy(opts, args.pop());
            } else {
              if (data.settings) {
                if (data.settings.views) {
                  opts.views = data.settings.views;
                }
                if (data.settings["view cache"]) {
                  opts.cache = true;
                }
                viewOpts = data.settings["view options"];
                if (viewOpts) {
                  utils.shallowCopy(opts, viewOpts);
                }
              }
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }
            opts.filename = filename;
          } else {
            data = utils.createNullProtoObjWherePossible();
          }
          return tryHandleCache(opts, data, cb);
        };
        exports4.Template = Template;
        exports4.clearCache = function() {
          exports4.cache.reset();
        };
        function Template(text, opts) {
          opts = opts || utils.createNullProtoObjWherePossible();
          var options = utils.createNullProtoObjWherePossible();
          this.templateText = text;
          this.mode = null;
          this.truncate = false;
          this.currentLine = 1;
          this.source = "";
          options.client = opts.client || false;
          options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
          options.compileDebug = opts.compileDebug !== false;
          options.debug = !!opts.debug;
          options.filename = opts.filename;
          options.openDelimiter = opts.openDelimiter || exports4.openDelimiter || _DEFAULT_OPEN_DELIMITER;
          options.closeDelimiter = opts.closeDelimiter || exports4.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
          options.delimiter = opts.delimiter || exports4.delimiter || _DEFAULT_DELIMITER;
          options.strict = opts.strict || false;
          options.context = opts.context;
          options.cache = opts.cache || false;
          options.rmWhitespace = opts.rmWhitespace;
          options.root = opts.root;
          options.includer = opts.includer;
          options.outputFunctionName = opts.outputFunctionName;
          options.localsName = opts.localsName || exports4.localsName || _DEFAULT_LOCALS_NAME;
          options.views = opts.views;
          options.async = opts.async;
          options.destructuredLocals = opts.destructuredLocals;
          options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
          if (options.strict) {
            options._with = false;
          } else {
            options._with = typeof opts._with != "undefined" ? opts._with : true;
          }
          this.opts = options;
          this.regex = this.createRegex();
        }
        Template.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" };
        Template.prototype = { createRegex: function() {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
          return new RegExp(str);
        }, compile: function() {
          var src;
          var fn;
          var opts = this.opts;
          var prepended = "";
          var appended = "";
          var escapeFn = opts.escapeFunction;
          var ctor;
          var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
          if (!this.source) {
            this.generateSource();
            prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error("outputFunctionName is not a valid JS identifier.");
              }
              prepended += "  var " + opts.outputFunctionName + " = __append;\n";
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error("localsName is not a valid JS identifier.");
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                }
                if (i > 0) {
                  destructuring += ",\n  ";
                }
                destructuring += name + " = __locals." + name;
              }
              prepended += destructuring + ";\n";
            }
            if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {\n";
              appended += "  }\n";
            }
            appended += "  return __output;\n";
            this.source = prepended + this.source + appended;
          }
          if (opts.compileDebug) {
            src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
          } else {
            src = this.source;
          }
          if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
            if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
            }
          }
          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
          }
          try {
            if (opts.async) {
              try {
                ctor = new Function("return (async function(){}).constructor;")();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error("This environment does not support async/await");
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }
              e.message += " while compiling ejs\n\n";
              e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
              e.message += "https://github.com/RyanZim/EJS-Lint";
              if (!opts.async) {
                e.message += "\n";
                e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
              }
            }
            throw e;
          }
          var returnedFn = opts.client ? fn : function anonymous(data) {
            var include = function(path2, includeData) {
              var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
              if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }
              return includeFile(path2, opts)(d);
            };
            return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
          };
          if (opts.filename && typeof Object.defineProperty === "function") {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, "name", { value: basename, writable: false, enumerable: false, configurable: true });
            } catch (e) {
            }
          }
          return returnedFn;
        }, generateSource: function() {
          var opts = this.opts;
          if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
          }
          this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
          var self2 = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          if (matches && matches.length) {
            matches.forEach(function(line, index) {
              var closing;
              if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                closing = matches[index + 2];
                if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }
              self2.scanLine(line);
            });
          }
        }, parseTemplateText: function() {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;
          while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }
          if (str) {
            arr.push(str);
          }
          return arr;
        }, _addOutput: function(line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");
            this.truncate = false;
          }
          if (!line) {
            return line;
          }
          line = line.replace(/\\/g, "\\\\");
          line = line.replace(/\n/g, "\\n");
          line = line.replace(/\r/g, "\\r");
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")\n';
        }, scanLine: function(line) {
          var self2 = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;
          newLineCount = line.split("\n").length - 1;
          switch (line) {
            case o + d:
            case o + d + "_":
              this.mode = Template.modes.EVAL;
              break;
            case o + d + "=":
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + "-":
              this.mode = Template.modes.RAW;
              break;
            case o + d + "#":
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
              break;
            case d + c:
            case "-" + d + c:
            case "_" + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }
              this.mode = null;
              this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
              break;
            default:
              if (this.mode) {
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }
                }
                switch (this.mode) {
                  case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";
                    break;
                  case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                    break;
                  case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")\n";
                    break;
                  case Template.modes.COMMENT:
                    break;
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              } else {
                this._addOutput(line);
              }
          }
          if (self2.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += "    ; __line = " + this.currentLine + "\n";
          }
        } };
        exports4.escapeXML = utils.escapeXML;
        exports4.__express = exports4.renderFile;
        exports4.VERSION = _VERSION_STRING;
        exports4.name = _NAME;
        if (typeof window != "undefined") {
          window.ejs = exports4;
        }
      }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function(require2, module4, exports4) {
        "use strict";
        var regExpChars = /[|\\{}()[\]^$+*?.]/g;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasOwn = function(obj, key) {
          return hasOwnProperty.apply(obj, [key]);
        };
        exports4.escapeRegExpChars = function(string) {
          if (!string) {
            return "";
          }
          return String(string).replace(regExpChars, "\\$&");
        };
        var _ENCODE_HTML_RULES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" };
        var _MATCH_HTML = /[&<>'"]/g;
        function encode_char(c) {
          return _ENCODE_HTML_RULES[c] || c;
        }
        var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
        exports4.escapeXML = function(markup) {
          return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
        };
        function escapeXMLToString() {
          return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
        }
        try {
          if (typeof Object.defineProperty === "function") {
            Object.defineProperty(exports4.escapeXML, "toString", { value: escapeXMLToString });
          } else {
            exports4.escapeXML.toString = escapeXMLToString;
          }
        } catch (err) {
          console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
        }
        exports4.shallowCopy = function(to, from) {
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var p in from) {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
          return to;
        };
        exports4.shallowCopyFromList = function(to, from, list) {
          list = list || [];
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var i = 0; i < list.length; i++) {
              var p = list[i];
              if (typeof from[p] != "undefined") {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
          }
          return to;
        };
        exports4.cache = { _data: {}, set: function(key, val) {
          this._data[key] = val;
        }, get: function(key) {
          return this._data[key];
        }, remove: function(key) {
          delete this._data[key];
        }, reset: function() {
          this._data = {};
        } };
        exports4.hyphenToCamel = function(str) {
          return str.replace(/-[a-z]/g, function(match) {
            return match[1].toUpperCase();
          });
        };
        exports4.createNullProtoObjWherePossible = function() {
          if (typeof Object.create == "function") {
            return function() {
              return /* @__PURE__ */ Object.create(null);
            };
          }
          if (!({ __proto__: null } instanceof Object)) {
            return function() {
              return { __proto__: null };
            };
          }
          return function() {
            return {};
          };
        }();
      }, {}], 3: [function(require2, module4, exports4) {
      }, {}], 4: [function(require2, module4, exports4) {
        (function(process2) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports4.resolve = function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process2.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports4.normalize = function(path) {
            var isAbsolute = exports4.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports4.isAbsolute = function(path) {
            return path.charAt(0) === "/";
          };
          exports4.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports4.normalize(filter(paths, function(p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports4.relative = function(from, to) {
            from = exports4.resolve(from).substr(1);
            to = exports4.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "") break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "") break;
              }
              if (start > end) return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports4.sep = "/";
          exports4.delimiter = ":";
          exports4.dirname = function(path) {
            if (typeof path !== "string") path = path + "";
            if (path.length === 0) return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1) return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string") path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1) return "";
            return path.slice(start, end);
          }
          exports4.basename = function(path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports4.extname = function(path) {
            if (typeof path !== "string") path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter) return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs)) res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
            return str.substr(start, len);
          } : function(str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require2("_process"));
      }, { _process: 5 }], 5: [function(require2, module4, exports4) {
        var process2 = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
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
          while (len) {
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
        process2.nextTick = function(fun) {
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
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process2.title = "browser";
        process2.browser = true;
        process2.env = {};
        process2.argv = [];
        process2.version = "";
        process2.versions = {};
        function noop() {
        }
        process2.on = noop;
        process2.addListener = noop;
        process2.once = noop;
        process2.off = noop;
        process2.removeListener = noop;
        process2.removeAllListeners = noop;
        process2.emit = noop;
        process2.prependListener = noop;
        process2.prependOnceListener = noop;
        process2.listeners = function(name) {
          return [];
        };
        process2.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process2.cwd = function() {
          return "/";
        };
        process2.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process2.umask = function() {
          return 0;
        };
      }, {}], 6: [function(require2, module4, exports4) {
        module4.exports = { name: "ejs", description: "Embedded JavaScript templates", keywords: ["template", "engine", "ejs"], version: "3.1.9", author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)", license: "Apache-2.0", bin: { ejs: "./bin/cli.js" }, main: "./lib/ejs.js", jsdelivr: "ejs.min.js", unpkg: "ejs.min.js", repository: { type: "git", url: "git://github.com/mde/ejs.git" }, bugs: "https://github.com/mde/ejs/issues", homepage: "https://github.com/mde/ejs", dependencies: { jake: "^10.8.5" }, devDependencies: { browserify: "^16.5.1", eslint: "^6.8.0", "git-directory-deploy": "^1.5.1", jsdoc: "^4.0.2", "lru-cache": "^4.0.1", mocha: "^10.2.0", "uglify-js": "^3.3.16" }, engines: { node: ">=0.10.0" }, scripts: { test: "mocha -u tdd" } };
      }, {}] }, {}, [1])(1);
    });
  }
});

// node_modules/smart-chat-model/adapters/anthropic.js
var require_anthropic = __commonJS({
  "node_modules/smart-chat-model/adapters/anthropic.js"(exports2) {
    var AnthropicAdapter = class {
      /**
       * Prepares the request body for the Anthropic API by converting ChatML format to a format compatible with Anthropic.
       * @param {Object} opts - The options object containing messages and other parameters in ChatML format.
       * @returns {Object} The request body formatted for the Anthropic API.
       */
      prepare_request_body(opts) {
        return chatml_to_anthropic(opts);
      }
      /**
       * Counts the tokens in the input by estimating them, as the Anthropic model does not provide a direct method.
       * @param {string|Object} input - The input text or object to count tokens in.
       * @returns {Promise<number>} The estimated number of tokens in the input.
       */
      async count_tokens(input) {
        return this.estimate_tokens(input);
      }
      /**
       * Estimates the number of tokens in the input based on a rough average token size.
       * @param {string|Object} input - The input text or object to estimate tokens in.
       * @returns {number} The estimated number of tokens.
       */
      estimate_tokens(input) {
        if (typeof input === "object") input = JSON.stringify(input);
        return Math.ceil(input.length / 6);
      }
      /**
       * Extracts the first tool call from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object|null} The first tool call found, or null if none exist.
       */
      get_tool_call(json) {
        return json.content.find((msg) => msg.type === "tool_use");
      }
      /**
       * Retrieves the input content of a tool call.
       * @param {Object} tool_call - The tool call object from which to extract the input.
       * @returns {Object} The input of the tool call.
       */
      get_tool_call_content(tool_call) {
        return tool_call.input;
      }
      /**
       * Retrieves the name of the tool from a tool call object.
       * @param {Object} tool_call - The tool call object from which to extract the name.
       * @returns {string} The name of the tool.
       */
      get_tool_name(tool_call) {
        return tool_call.name;
      }
      /**
       * Extracts the first message from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object|null} The first message found, or null if none exist.
       */
      get_message(json) {
        return json.content?.[0];
      }
      /**
       * Retrieves the content of the first message from the JSON response.
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string|null} The content of the first message, or null if no message is found.
       */
      get_message_content(json) {
        return this.get_message(json)?.[this.get_message(json)?.type];
      }
    };
    exports2.AnthropicAdapter = AnthropicAdapter;
    function chatml_to_anthropic(opts) {
      let tool_counter = 0;
      const messages = opts.messages.filter((msg) => msg.role !== "system").map((m) => {
        if (m.role === "tool") {
          return { role: "user", content: [
            {
              type: "tool_result",
              tool_use_id: `tool-${tool_counter}`,
              content: m.content
            }
          ] };
        }
        if (m.role === "assistant" && m.tool_calls) {
          tool_counter++;
          const out2 = {
            role: m.role,
            content: m.tool_calls.map((c) => ({
              type: "tool_use",
              id: `tool-${tool_counter}`,
              name: c.function.name,
              input: typeof c.function.arguments === "string" ? JSON.parse(c.function.arguments) : c.function.arguments
            }))
          };
          if (m.content) {
            if (typeof m.content === "string") out2.content.push({ type: "text", text: m.content });
            else m.content.forEach((c) => out2.content.push(c));
          }
          return out2;
        }
        if (typeof m.content === "string") return { role: m.role, content: m.content };
        if (Array.isArray(m.content)) {
          const content = m.content.map((c) => {
            if (c.type === "text") return { type: "text", text: c.text };
            if (c.type === "image_url") {
              const image_url = c.image_url.url;
              let media_type = image_url.split(":")[1].split(";")[0];
              if (media_type === "image/jpg") media_type = "image/jpeg";
              return { type: "image", source: { type: "base64", media_type, data: image_url.split(",")[1] } };
            }
          });
          return { role: m.role, content };
        }
        return m;
      });
      const { model, max_tokens, temperature, tools, tool_choice } = opts;
      const last_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && msg.content.includes("---BEGIN"));
      if (last_system_idx > -1) {
        const system_prompt = "<context>\n" + opts.messages[last_system_idx].content + "\n</context>\n";
        messages[messages.length - 1].content = system_prompt + messages[messages.length - 1].content;
      }
      const out = {
        messages,
        model,
        max_tokens,
        temperature
      };
      if (tools) {
        out.tools = tools.map((tool) => ({
          name: tool.function.name,
          description: tool.function.description,
          input_schema: tool.function.parameters
        }));
        if (tool_choice?.type === "function") {
          const tool_prompt = `Use the "${tool_choice.function.name}" tool!`;
          const last_user_idx = out.messages.findLastIndex((msg) => msg.role === "user");
          out.messages[last_user_idx].content += "\n" + tool_prompt;
          out.system = `Required: use the "${tool_choice.function.name}" tool!`;
        }
      }
      const last_non_context_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && !msg.content.includes("---BEGIN"));
      if (last_non_context_system_idx > -1) out.system = opts.messages[last_non_context_system_idx].content;
      return out;
    }
    exports2.chatml_to_anthropic = chatml_to_anthropic;
  }
});

// node_modules/smart-chat-model/adapters/cohere.js
var require_cohere = __commonJS({
  "node_modules/smart-chat-model/adapters/cohere.js"(exports2) {
    var CohereAdapter = class {
      /**
       * Converts a ChatML object to a format suitable for a request to the Cohere API.
       * @param {Object} chatml - The ChatML object containing the chat history and other parameters.
       * @returns {Object} The request body formatted for the Cohere API.
       */
      prepare_request_body(chatml) {
        return chatml_to_cohere(chatml);
      }
      /**
       * Extracts the message content from a JSON response from the Cohere API.
       * @param {Object} json - The JSON response object from which to extract the text content.
       * @returns {string} The extracted text content from the response.
       */
      get_message_content(json) {
        return json.text;
      }
      /**
       * Processes streaming data received from the Cohere API and extracts text chunks.
       * This method handles the accumulation of text data over multiple events and manages the state of the stream.
       * @param {Object} event - The event object containing streaming data.
       * @returns {string} The accumulated text chunk extracted from the stream.
       */
      get_text_chunk_from_stream(event) {
        if (!this.last_line_index) this.last_line_index = 0;
        clearTimeout(this.last_line_timeout);
        this.last_line_timeout = setTimeout(() => {
          this.last_line_index = 0;
        }, 1e4);
        const data = event.source.xhr.responseText;
        const lines = data.split("\n").slice(this.last_line_index);
        this.last_line_index += lines.length;
        const text_chunk = lines.filter((line) => line.trim() !== "").map((line) => {
          console.log(line);
          const json = JSON.parse(line);
          if (json.event_type === "stream-end") {
            console.log("stream-end");
            this.end_of_stream = true;
            setTimeout(() => {
              this.end_of_stream = false;
            }, 3e3);
            return "";
          }
          return json.text;
        }).join("");
        console.log(text_chunk);
        return text_chunk;
      }
      /**
       * Determines if the end of the stream has been reached based on the event data.
       * @param {Object} event - The event object that may indicate the end of the stream.
       * @returns {boolean} True if the end of the stream is indicated, false otherwise.
       */
      is_end_of_stream(event) {
        return this.end_of_stream;
      }
    };
    exports2.CohereAdapter = CohereAdapter;
    function chatml_to_cohere(chatml) {
      const cohere = {
        model: chatml.model,
        // skip last user message
        chat_history: chatml.messages.slice(0, -1).map((message) => ({
          role: message.role,
          message: parse_message_content_to_string(message)
        })),
        message: parse_message_content_to_string(chatml.messages[chatml.messages.length - 1]),
        temperature: chatml.temperature
        // stream: chatml.stream // currently not supported
      };
      return cohere;
    }
    exports2.chatml_to_cohere = chatml_to_cohere;
    function parse_message_content_to_string(message) {
      return Array.isArray(message.content) ? message.content.filter((c) => c.type === "text").map((c) => c.text).join("\n") : message.content;
    }
  }
});

// node_modules/smart-chat-model/adapters/gemini.js
var require_gemini = __commonJS({
  "node_modules/smart-chat-model/adapters/gemini.js"(exports2) {
    var GeminiAdapter = class {
      /**
       * Constructs a GeminiAdapter instance with a specified model configuration.
       * @param {Object} model - The model configuration object.
       */
      constructor(model) {
        this.model = model;
      }
      /**
       * Prepares the request body for the Gemini API by converting ChatML format to a format compatible with Gemini.
       * @param {Object} body - The options object containing messages and other parameters in ChatML format.
       * @returns {Object} The request body formatted for the Gemini API.
       */
      prepare_request_body(body) {
        return chatml_to_gemini(body);
      }
      /**
       * Extracts the first tool call from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object|null} The first tool call found, or null if none exist.
       */
      get_tool_call(json) {
        return json.candidates?.[0]?.content?.parts?.[0]?.functionCall;
      }
      /**
       * Retrieves the name of the tool from a tool call object.
       * @param {Object} tool_call - The tool call object from which to extract the name.
       * @returns {string|null} The name of the tool, or null if not available.
       */
      get_tool_name(tool_call) {
        return tool_call?.name;
      }
      /**
       * Retrieves the input content of a tool call.
       * @param {Object} tool_call - The tool call object from which to extract the input.
       * @returns {Object|null} The input of the tool call, or null if not available.
       */
      get_tool_call_content(tool_call) {
        return tool_call?.args;
      }
      /**
       * Extracts the first message from the JSON response content.
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object|null} The first message found, or null if none exist.
       */
      get_message(json) {
        return json.candidates?.[0];
      }
      /**
       * Retrieves the content of the first message from the JSON response.
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string|null} The content of the first message, or null if no message is found.
       */
      get_message_content(json) {
        return this.get_message(json)?.content?.parts.map((part) => part.text).join("");
      }
      /**
       * Handles escaped newlines in a streaming text chunk.
       * @param {Object} event - The streaming event containing the data.
       * @returns {string} The text chunk with escaped newlines replaced.
       */
      get_text_chunk_from_stream(event) {
        return event.data.replace(/\\n/g, "\n");
      }
      /**
       * Determines if the streaming response has ended based on the readyState of the XMLHttpRequest.
       * @param {Object} event - The streaming event.
       * @returns {boolean} True if the stream has ended, false otherwise.
       */
      is_end_of_stream(event) {
        return event.source.xhr.readyState === 4;
      }
      /**
       * Counts the tokens in the input by making an API request to the Gemini token counting endpoint.
       * @param {string|Object} input - The input text or object to count tokens in.
       * @returns {Promise<number>} The total number of tokens in the input.
       */
      async count_tokens(input) {
        const req = {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:countTokens?key=${this.model.api_key}`,
          method: "POST",
          headers: { "Content-Type": "application/json" }
        };
        let body;
        if (typeof input === "string") body = chatml_to_gemini({ messages: [{ role: "user", content: input }] });
        else if (Array.isArray(input)) body = chatml_to_gemini({ messages: input });
        else if (typeof input === "object") body = chatml_to_gemini(input);
        else return console.error("Invalid input for count_tokens", input);
        delete body.generationConfig;
        delete body.safetySettings;
        req.body = JSON.stringify(body);
        const resp = await this.model.request_adapter(req);
        return resp?.json?.totalTokens;
      }
      /**
       * Getter for the standard API endpoint with the API key appended.
       * @returns {string} The formatted endpoint URL for non-streaming requests.
       */
      get endpoint() {
        return this.model.config.endpoint.replace("MODEL_NAME", this.model.model_name) + "?key=" + this.model.api_key;
      }
      /**
       * Getter for the streaming API endpoint with the API key appended.
       * @returns {string} The formatted endpoint URL for streaming requests.
       */
      get endpoint_streaming() {
        return this.model.config.endpoint_streaming.replace("MODEL_NAME", this.model.model_name) + "?key=" + this.model.api_key;
      }
    };
    exports2.GeminiAdapter = GeminiAdapter;
    function chatml_to_gemini(opts) {
      const messages = opts.messages.filter((msg) => msg.role !== "system");
      const last_system_idx = opts.messages.findLastIndex((msg) => msg.role === "system" && msg.content.includes("---BEGIN"));
      if (last_system_idx > -1) {
        const system_prompt = "---BEGIN IMPORTANT CONTEXT---\n" + opts.messages[last_system_idx].content + "\n---END IMPORTANT CONTEXT---\n\n";
        messages[messages.length - 1].content = system_prompt + messages[messages.length - 1].content;
      }
      const body = {
        contents: messages.filter((msg) => msg.role !== "system").map((msg) => {
          const content = {};
          content.role = msg.role === "assistant" ? "model" : msg.role;
          content.parts = !Array.isArray(msg.content) ? [{ text: msg.content }] : msg.content.map((c) => {
            if (c.type === "text") {
              return { text: c.text };
            }
            if (c.type === "image_url") {
              const image_url = c.image_url.url;
              let mime_type = image_url.split(":")[1].split(";")[0];
              if (mime_type === "image/jpg") mime_type = "image/jpeg";
              return { inline_data: { mime_type, data: image_url.split(",")[1] } };
            }
          });
          return content;
          ({
            role: msg.role === "assistant" ? "model" : msg.role,
            parts: Array.isArray(msg.content) ? [{ text: msg.content.filter((c) => c.type === "text").map((c) => c.text).join("\n") }] : [{ text: msg.content }]
          });
        }),
        generationConfig: {
          temperature: opts.temperature || 0.9,
          topK: opts.topK || 1,
          topP: opts.topP || 1,
          maxOutputTokens: opts.max_tokens || 2048,
          stopSequences: opts.stopSequences || [],
          candidate_count: opts.n || 1
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      };
      const system_instructions = opts.messages.filter((msg) => msg.role === "system" && !msg.content.includes("---BEGIN"));
      if (system_instructions.length > 0) body.systemInstruction = { parts: system_instructions.map((msg) => ({ text: msg.content })) };
      if (opts.tools) {
        body.tools = [{
          function_declarations: opts.tools.map((tool) => ({
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters
          }))
        }];
        if (opts.tool_choice) {
          if (opts.tool_choice !== "auto") {
            if (opts.model.includes("1.5") || opts.model.includes("flash")) {
              body.tool_config = {
                function_calling_config: {
                  mode: "ANY",
                  allowed_function_names: opts.tools.map((tool) => tool.function.name)
                }
              };
              body.systemInstruction = {
                role: "user",
                parts: [
                  {
                    text: `IMPORTANT: You must use the "${body.tools[0].function_declarations[0].name}" function tool!`
                  }
                ]
              };
            }
            const tool_prompt = `IMPORTANT: You must use the "${body.tools[0].function_declarations[0].name}" function tool!`;
            const last_user_idx = body.contents.findLastIndex((msg) => msg.role === "user");
            body.contents[last_user_idx].parts[0].text += "\n\n" + tool_prompt;
          }
        }
      }
      return body;
    }
    exports2.chatml_to_gemini = chatml_to_gemini;
  }
});

// node_modules/smart-chat-model/adapters/open_router.js
var require_open_router = __commonJS({
  "node_modules/smart-chat-model/adapters/open_router.js"(exports2) {
    var OpenRouterAdapter = class {
      constructor(model) {
        this.model = model;
      }
      get_tool_call(json) {
        if (json.choices[0].message.tool_calls) {
          return json.choices[0].message.tool_calls[0].function;
        }
        if (json.choices[0].message.content.includes("function")) {
          const content = JSON.parse(json.choices[0].message.content);
          if (!content.function) return null;
          return content;
        }
        return null;
      }
      get_tool_name(tool_call) {
        if (tool_call.function) return tool_call.function;
        if (tool_call.name) return tool_call.name;
        return null;
      }
      get_tool_call_content(tool_call) {
        if (tool_call.parameters) return tool_call.parameters;
        if (tool_call.arguments) {
          const args = JSON.parse(tool_call.arguments);
          Object.entries(args).forEach(([key, value]) => {
            args[key] = value.replace(/\\n/g, "\n").replace(/\\t/g, "	").replace(/\\r/g, "\r").replace(/\\'/g, "'").replace(/\\"/g, '"');
          });
          return args;
        }
        return null;
      }
    };
    exports2.OpenRouterAdapter = OpenRouterAdapter;
  }
});

// node_modules/smart-chat-model/adapters.js
var require_adapters = __commonJS({
  "node_modules/smart-chat-model/adapters.js"(exports2) {
    var { AnthropicAdapter } = require_anthropic();
    var { CohereAdapter } = require_cohere();
    var { GeminiAdapter } = require_gemini();
    var { OpenRouterAdapter } = require_open_router();
    exports2.Anthropic = AnthropicAdapter;
    exports2.Cohere = CohereAdapter;
    exports2.Gemini = GeminiAdapter;
    exports2.OpenRouter = OpenRouterAdapter;
  }
});

// node_modules/smart-chat-model/platforms.json
var require_platforms = __commonJS({
  "node_modules/smart-chat-model/platforms.json"(exports2, module2) {
    module2.exports = {
      openai: {
        description: "OpenAI",
        type: "API",
        endpoint: "https://api.openai.com/v1/chat/completions",
        streaming: true,
        actions: true,
        fetch_models: true,
        default_model: "gpt-3.5-turbo",
        signup_url: "https://platform.openai.com/api-keys"
      },
      google_gemini: {
        description: "Google Gemini",
        type: "API",
        api_key_header: "none",
        endpoint: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:generateContent",
        endpoint_streaming: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:streamGenerateContent",
        streaming: true,
        actions: true,
        adapter: "Gemini",
        fetch_models: true,
        default_model: "gemini-1.5-pro",
        signup_url: "https://ai.google.dev/"
      },
      open_router: {
        description: "Open Router",
        type: "API",
        endpoint: "https://openrouter.ai/api/v1/chat/completions",
        streaming: true,
        adapter: "OpenRouter",
        fetch_models: true,
        default_model: "meta-llama/llama-3.1-8b-instruct:free",
        signup_url: "https://accounts.openrouter.ai/sign-up?redirect_url=https%3A%2F%2Fopenrouter.ai%2Fkeys"
      },
      cohere: {
        description: "Cohere Command-R",
        type: "API",
        endpoint: "https://api.cohere.ai/v1/chat",
        streaming: false,
        adapter: "Cohere",
        fetch_models: true,
        default_model: "command-r",
        signup_url: "https://dashboard.cohere.com/welcome/register?redirect_uri=%2Fapi-keys"
      },
      anthropic: {
        description: "Anthropic Claude",
        type: "API",
        endpoint: "https://api.anthropic.com/v1/messages",
        streaming: false,
        api_key_header: "x-api-key",
        headers: {
          "anthropic-version": "2023-06-01",
          "anthropic-beta": "tools-2024-04-04"
        },
        adapter: "Anthropic",
        actions: true,
        fetch_models: true,
        default_model: "claude-3-sonnet-20240229",
        signup_url: "https://console.anthropic.com/login?returnTo=%2Fsettings%2Fkeys"
      },
      custom_local: {
        description: "Custom Local (OpenAI format)",
        type: "API"
      },
      custom_api: {
        description: "Custom API (OpenAI format)",
        type: "API"
      }
    };
  }
});

// node_modules/smart-chat-model/utils/is_valid_tool_call.js
var require_is_valid_tool_call = __commonJS({
  "node_modules/smart-chat-model/utils/is_valid_tool_call.js"(exports2) {
    function is_valid_tool_call(tool, tool_call_content) {
      const props = tool.function.parameters.properties;
      if (typeof props !== "undefined" && Object.keys(tool_call_content).length === 0) {
        console.warn(`Invalid tool call: object is empty`);
        return false;
      }
      Object.entries(tool_call_content).forEach(([key, value]) => {
        if (!props[key]) {
          console.warn(`Invalid tool call: missing key ${key} in tool spec`, props);
          return false;
        }
        if (Array.isArray(value) && props[key].type === "array") {
          const itemType = typeof value[0];
          if (!value.every((item) => typeof item === itemType)) {
            console.warn(`Invalid tool call: array items are not of the same type`);
            return false;
          }
          if (props[key].items.type !== itemType) {
            console.warn(`Invalid tool call: array items are not of the same type as the spec`);
            return false;
          }
        } else if (props[key].type !== typeof value) {
          if (props[key].type === "number" && typeof value === "string") {
            if (isNaN(Number(value))) {
              console.warn(`Invalid tool call: value ${value} is not a valid number`);
              return false;
            }
            tool_call_content[key] = Number(value);
          } else {
            console.warn(`Invalid tool call: value ${value} is not of type ${props[key].type}`);
            return false;
          }
        }
        if (props[key].enum && !props[key].enum.includes(value)) {
          console.warn(`Invalid tool call: value ${value} is not in enum ${props[key].enum}`);
          return false;
        }
      });
      tool.function.parameters.required?.forEach((key) => {
        if (typeof tool_call_content[key] === "undefined") {
          console.warn(`Invalid tool call: missing required key ${key}`);
          return false;
        }
        if (tool_call_content[key] === "") {
          console.warn(`Empty value for required key ${key}`);
          return false;
        }
      });
      return true;
    }
    exports2.is_valid_tool_call = is_valid_tool_call;
  }
});

// node_modules/smart-chat-model/streamer.js
var require_streamer = __commonJS({
  "node_modules/smart-chat-model/streamer.js"(exports2) {
    var SmartStreamer = class {
      constructor(url2, options = {}) {
        const {
          method = "GET",
          headers = {},
          body = null,
          withCredentials = false
        } = options;
        this.url = url2;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.withCredentials = withCredentials;
        this.listeners = {};
        this.readyState = this.CONNECTING;
        this.progress = 0;
        this.chunk = "";
        this.last_event_id = "";
        this.xhr = null;
        this.FIELD_SEPARATOR = ":";
        this.INITIALIZING = -1;
        this.CONNECTING = 0;
        this.OPEN = 1;
        this.CLOSED = 2;
      }
      /**
       * Adds an event listener for the specified event type.
       *
       * @param {string} type - The type of the event.
       * @param {Function} listener - The listener function to be called when the event is triggered.
       */
      addEventListener(type, listener) {
        if (!this.listeners[type]) this.listeners[type] = [];
        if (!this.listeners[type].includes(listener)) this.listeners[type].push(listener);
      }
      /**
       * Removes an event listener from the SmartStreamer instance.
       *
       * @param {string} type - The type of event to remove the listener from.
       * @param {Function} listener - The listener function to remove.
       */
      removeEventListener(type, listener) {
        if (!this.listeners[type]) return;
        this.listeners[type] = this.listeners[type].filter((callback) => callback !== listener);
        if (this.listeners[type].length === 0) delete this.listeners[type];
      }
      /**
       * Dispatches an event to the appropriate event handlers.
       *
       * @param {Event} event - The event to be dispatched.
       * @returns {boolean} - Returns true if the event was successfully dispatched, false otherwise.
       */
      dispatchEvent(event) {
        if (!event) return true;
        event.source = this;
        const onHandler = "on" + event.type;
        if (Object.prototype.hasOwnProperty.call(this, onHandler)) {
          this[onHandler].call(this, event);
          if (event.defaultPrevented) return false;
        }
        if (this.listeners[event.type]) {
          this.listeners[event.type].forEach((callback) => {
            callback(event);
            return !event.defaultPrevented;
          });
        }
        return true;
      }
      /**
       * Initiates the streaming process.
       */
      stream() {
        this.#setReadyState(this.CONNECTING);
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener("progress", this.#onStreamProgress.bind(this));
        this.xhr.addEventListener("load", this.#onStreamLoaded.bind(this));
        this.xhr.addEventListener("readystatechange", this.#checkStreamClosed.bind(this));
        this.xhr.addEventListener("error", this.#onStreamFailure.bind(this));
        this.xhr.addEventListener("abort", this.#onStreamAbort.bind(this));
        this.xhr.open(this.method, this.url);
        for (const header in this.headers) {
          this.xhr.setRequestHeader(header, this.headers[header]);
        }
        if (this.last_event_id) this.xhr.setRequestHeader("Last-Event-ID", this.last_event_id);
        this.xhr.withCredentials = this.withCredentials;
        this.xhr.send(this.body);
      }
      /**
       * Ends the streamer connection.
       * Aborts the current XHR request and sets the ready state to CLOSED.
       */
      end() {
        if (this.readyState === this.CLOSED) return;
        this.xhr.abort();
        this.xhr = null;
        this.#setReadyState(this.CLOSED);
      }
      // private methods
      #setReadyState(state) {
        const event = new CustomEvent("readyStateChange");
        event.readyState = state;
        this.readyState = state;
        this.dispatchEvent(event);
      }
      #onStreamFailure(e) {
        const event = new CustomEvent("error");
        event.data = e.currentTarget.response;
        this.dispatchEvent(event);
        this.end();
      }
      #onStreamAbort(e) {
        const event = new CustomEvent("abort");
        this.end();
      }
      #onStreamProgress(e) {
        if (!this.xhr) return;
        if (this.xhr.status !== 200) {
          this.#onStreamFailure(e);
          return;
        }
        if (this.readyState === this.CONNECTING) {
          this.dispatchEvent(new CustomEvent("open"));
          this.#setReadyState(this.OPEN);
        }
        const data = this.xhr.responseText.substring(this.progress);
        this.progress += data.length;
        data.split(/(\r\n|\r|\n)/g).forEach((part) => {
          if (part.trim().length === 0) {
            this.dispatchEvent(this.#parseEventChunk(this.chunk.trim()));
            this.chunk = "";
          } else {
            this.chunk += part;
          }
        });
      }
      #onStreamLoaded(e) {
        this.#onStreamProgress(e);
        this.dispatchEvent(this.#parseEventChunk(this.chunk));
        this.chunk = "";
      }
      #parseEventChunk(chunk) {
        if (!chunk || chunk.length === 0) return null;
        const e = { id: null, retry: null, data: "", event: "message", text: "" };
        chunk.split(/(\r\n|\r|\n)/).forEach((line) => {
          line = line.trim();
          const index = line.indexOf(this.FIELD_SEPARATOR);
          if (index <= 0) return;
          const field = line.substring(0, index).replace(/^"|"$/g, "");
          if (!["id", "retry", "data", "event", "text"].includes(field)) return;
          const value = line.substring(index + 1).trim().replace(/^"|"$/g, "");
          e.data += value;
        });
        if (e.id) this.last_event_id = e.id;
        const event = new CustomEvent(e.event || "message");
        event.id = e.id;
        event.data = e.data || "";
        event.last_event_id = this.last_event_id;
        return event;
      }
      #checkStreamClosed() {
        if (!this.xhr) return;
        if (this.xhr.readyState === XMLHttpRequest.DONE) this.#setReadyState(this.CLOSED);
      }
    };
    exports2.SmartStreamer = SmartStreamer;
  }
});

// node_modules/smart-chat-model/models/open_router.js
var require_open_router2 = __commonJS({
  "node_modules/smart-chat-model/models/open_router.js"(exports2) {
    async function fetch_open_router_models(api_key, request_adapter = null) {
      try {
        let data;
        if (!request_adapter) {
          const response = await fetch("https://openrouter.ai/api/v1/models");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
        } else {
          const resp = await request_adapter({
            url: "https://openrouter.ai/api/v1/models"
          });
          data = await resp.json;
        }
        return data.data.map((model) => ({
          model_name: model.id,
          key: model.id,
          max_input_tokens: model.context_length,
          description: model.name,
          actions: model.description.includes("tool use") || model.description.includes("function call") && !model.description.includes("function calling depends"),
          multimodal: model.architecture.modality === "multimodal",
          raw: model
        }));
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_open_router_models = fetch_open_router_models;
  }
});

// node_modules/smart-chat-model/models/openai.js
var require_openai = __commonJS({
  "node_modules/smart-chat-model/models/openai.js"(exports2) {
    var model_context = {
      "gpt-3.5-turbo-0125": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-3.5-turbo-0301": {
        "context": 4097,
        "max_out": 4097
      },
      "gpt-3.5-turbo-0613": {
        "context": 4097,
        "max_out": 4097
      },
      "gpt-3.5-turbo-1106": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-3.5-turbo-16k": {
        "context": 16385,
        "max_out": 16385
      },
      "gpt-3.5-turbo-16k-0613": {
        "context": 16385,
        "max_out": 16385
      },
      "gpt-4-0125-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-0314": {
        "context": 8192,
        "max_out": 8192
      },
      "gpt-4-0613": {
        "context": 8192,
        "max_out": 8192
      },
      "gpt-4-1106-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-1106-vision-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-32k-0314": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4-32k-0613": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4-turbo-2024-04-09": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-turbo-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-vision-preview": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-3.5-turbo": {
        "context": 16385,
        "max_out": 4096
      },
      "gpt-4-turbo": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4-32k": {
        "context": 32768,
        "max_out": 32768
      },
      "gpt-4o": {
        "context": 128e3,
        "max_out": 4096
      },
      "gpt-4": {
        "context": 8192,
        "max_out": 8192
      }
    };
    async function fetch_openai_models(api_key, request_adapter = null) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        let data;
        if (!request_adapter) {
          console.log("Using fetch");
          const response = await fetch("https://api.openai.com/v1/models", {
            headers: {
              "Authorization": `Bearer ${api_key}`
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
        } else {
          console.log("Using request adapter");
          const resp = await request_adapter({
            url: "https://api.openai.com/v1/models",
            headers: {
              "Authorization": `Bearer ${api_key}`
            }
          });
          data = await resp.json;
        }
        return data.data.filter((model) => model.id.startsWith("gpt-") && !model.id.includes("-instruct")).map((model) => {
          const out = {
            model_name: model.id,
            key: model.id,
            multimodal: model.id.includes("vision") || model.id.includes("gpt-4-turbo") || model.id.startsWith("gpt-4o")
          };
          const m = Object.entries(model_context).find((m2) => m2[0] === model.id || model.id.startsWith(m2[0] + "-"));
          if (m) {
            out.max_input_tokens = m[1].context;
            out.description = `context: ${m[1].context}, output: ${m[1].max_out}`;
          }
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_openai_models = fetch_openai_models;
  }
});

// node_modules/smart-chat-model/models/google_gemini.js
var require_google_gemini = __commonJS({
  "node_modules/smart-chat-model/models/google_gemini.js"(exports2) {
    async function fetch_google_gemini_models(api_key, request_adapter = null) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        let data;
        if (!request_adapter) {
          const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + api_key);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
        } else {
          const resp = await request_adapter({
            url: "https://generativelanguage.googleapis.com/v1beta/models?key=" + api_key
          });
          data = await resp.json;
        }
        return data.models.filter((model) => model.name.startsWith("models/gemini")).map((model) => {
          const out = {
            model_name: model.name.split("/").pop(),
            key: model.name.split("/").pop(),
            max_input_tokens: model.inputTokenLimit,
            max_output_tokens: model.maxOutputTokens,
            description: model.description,
            multimodal: model.name.includes("vision") || model.description.includes("multimodal"),
            raw: model
          };
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_google_gemini_models = fetch_google_gemini_models;
  }
});

// node_modules/smart-chat-model/models/cohere.js
var require_cohere2 = __commonJS({
  "node_modules/smart-chat-model/models/cohere.js"(exports2) {
    async function fetch_cohere_models(api_key, request_adapter = null) {
      if (!api_key) {
        console.error("No API key provided");
        return [];
      }
      try {
        let data;
        if (!request_adapter) {
          const response = await fetch("https://api.cohere.ai/v1/models", {
            headers: {
              "Authorization": `Bearer ${api_key}`
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          data = await response.json();
        } else {
          const resp = await request_adapter({
            url: "https://api.cohere.ai/v1/models",
            headers: {
              "Authorization": `Bearer ${api_key}`
            }
          });
          data = await resp.json;
        }
        return data.models.filter((model) => model.name.startsWith("command-")).map((model) => {
          const out = {
            model_name: model.name,
            key: model.name,
            max_input_tokens: model.context_length,
            tokenizer_url: model.tokenizer_url,
            finetuned: model.finetuned,
            description: `Max input tokens: ${model.context_length}, Finetuned: ${model.finetuned}`
          };
          return out;
        });
      } catch (error) {
        console.error("Failed to fetch model data:", error);
        return [];
      }
    }
    exports2.fetch_cohere_models = fetch_cohere_models;
  }
});

// node_modules/smart-chat-model/models/anthropic.js
var require_anthropic2 = __commonJS({
  "node_modules/smart-chat-model/models/anthropic.js"(exports2) {
    async function fetch_anthropic_models() {
      return [
        {
          key: "claude-3-5-sonnet-latest",
          "model_name": "claude-3.5-sonnet-latest",
          "description": "Anthropic's Claude Sonnet (Latest)",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          "key": "claude-3-opus-20240229",
          "model_name": "claude-3-opus-20240229",
          "description": "Anthropic's Claude Opus",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-haiku-20240307",
          "model_name": "claude-3-haiku-20240307",
          "description": "Anthropic's Claude Haiku (2024-03-07)",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-5-sonnet-20241022",
          "model_name": "claude-3.5-sonnet-20241022",
          "description": "Anthropic's Claude Sonnet (2024-10-22)",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-5-sonnet-20240620",
          "model_name": "claude-3.5-sonnet-20240620",
          "description": "Anthropic's Claude Sonnet (2024-06-20)",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        },
        {
          key: "claude-3-sonnet-20240229",
          "model_name": "claude-3-sonnet-20240229",
          "description": "Anthropic's Claude Sonnet",
          "max_input_tokens": 2e5,
          "max_output_tokens": 4e3,
          "multimodal": true
        }
      ];
    }
    exports2.fetch_anthropic_models = fetch_anthropic_models;
  }
});

// node_modules/smart-chat-model/models/fetch.js
var require_fetch = __commonJS({
  "node_modules/smart-chat-model/models/fetch.js"(exports2) {
    var { fetch_open_router_models } = require_open_router2();
    var { fetch_openai_models } = require_openai();
    var { fetch_google_gemini_models } = require_google_gemini();
    var { fetch_cohere_models } = require_cohere2();
    var { fetch_anthropic_models } = require_anthropic2();
    exports2.open_router = fetch_open_router_models;
    exports2.openai = fetch_openai_models;
    exports2.google_gemini = fetch_google_gemini_models;
    exports2.cohere = fetch_cohere_models;
    exports2.anthropic = fetch_anthropic_models;
  }
});

// node_modules/smart-chat-model/smart_chat_model.js
var require_smart_chat_model = __commonJS({
  "node_modules/smart-chat-model/smart_chat_model.js"(exports2) {
    var adapters = require_adapters();
    var platforms = require_platforms();
    var { is_valid_tool_call } = require_is_valid_tool_call();
    var { SmartStreamer } = require_streamer();
    var fetch_models = require_fetch();
    var SmartChatModel2 = class {
      /**
       * Constructs an instance of SmartChatModel with specified environment, model key, and options.
       * @param {Object} main - The main environment context, typically containing configurations and state.
       * @param {string} platform_key - Key to select the specific model configuration from models.json.
       * @param {Object} model_config - Optional parameters to override model configurations.
       */
      constructor(main, platform_key, model_config = {}) {
        this.env = main;
        this.main = this.env;
        this.config = {
          ...platforms[platform_key] || {},
          ...model_config
          // override default platform config
        };
        this.platform_key = platform_key;
        this.active_stream = null;
        this._request_adapter = null;
        this.platforms = platforms;
        if (this.config.adapter) this.adapter = new adapters[this.config.adapter](this);
        if (this.adapter) console.log("has chat model adapter");
      }
      static get models() {
        return platforms;
      }
      // DEPRECATED (confusing name)
      // 
      static get platforms() {
        return Object.keys(platforms).map((key) => ({
          key,
          ...platforms[key]
        }));
      }
      get platform() {
        return platforms[this.platform_key];
      }
      get default_opts() {
        return {
          temperature: 0.3,
          top_p: 1,
          presence_penalty: 0,
          frequency_penalty: 0,
          n: 1,
          model: this.model_name,
          max_tokens: this.max_output_tokens
        };
      }
      async request_middlewares(opts) {
        return opts;
      }
      /**
       * Completes the chat interaction by processing the provided options, making an API request, and handling the response.
       * This method supports both streaming and non-streaming responses, and can handle tool calls if specified in the response.
       *
       * @param {Object} opts - The options for the chat completion which may include settings like temperature, max tokens, etc.
       * @param {boolean} render - Flag to determine if the response should be rendered in the UI.
       * @returns {Promise<string|void>} - Returns the chat response content or handles tool outputs recursively. In case of errors, it may return an error message.
       */
      async complete(opts = {}, render13 = true) {
        const prepared_opts = await this.prepare_options(opts);
        const request2 = this.create_request(prepared_opts);
        try {
          if (prepared_opts.stream) {
            return await this.handle_streaming_request(request2, render13);
          }
          return await this.handle_non_streaming_request(request2, prepared_opts, render13);
        } catch (err) {
          return this.handle_error(err, render13);
        }
      }
      async prepare_options(opts) {
        if (!this.base_model_config) {
          this.base_model_config = await this.get_base_model_config();
          this.config = {
            ...this.base_model_config,
            ...this.config
          };
        }
        const prepared_opts = {
          ...this.default_opts,
          messages: (await this.current?.get_chat_ml())?.messages || [],
          ...opts
        };
        if (prepared_opts.stream !== false && this.config.streaming && !this.current?.tool_choice) {
          prepared_opts.stream = true;
        } else {
          prepared_opts.stream = false;
        }
        return this.request_middlewares(JSON.parse(JSON.stringify(prepared_opts)));
      }
      create_request(opts) {
        const req = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.api_key}`
          },
          method: "POST"
        };
        if (this.config.headers) {
          req.headers = { ...req.headers, ...this.config.headers };
        }
        if (this.config.api_key_header) {
          if (this.config.api_key_header !== "none") {
            req.headers[this.config.api_key_header] = this.api_key;
          }
          delete req.headers.Authorization;
        }
        const body = typeof this.env.actions?.prepare_request_body === "function" ? this.env.actions.prepare_request_body(opts) : { ...opts };
        req.body = JSON.stringify(typeof this.adapter?.prepare_request_body === "function" ? this.adapter.prepare_request_body(body) : body);
        return req;
      }
      async handle_streaming_request(request2, render13) {
        return this.stream(request2);
      }
      async handle_non_streaming_request(request2, opts, render13) {
        const resp_json = await this.request(request2);
        if (resp_json.error) {
          return this.handle_api_error(resp_json.error, render13);
        }
        const tool_call = this.get_tool_call(resp_json);
        if (tool_call) {
          return this.handle_tool_call(tool_call, opts, render13);
        }
        const message_content = this.get_message_content(resp_json);
        if (render13) {
          this.done_handler(message_content);
        }
        return message_content;
      }
      handle_api_error(error, render13) {
        console.error(error);
        if (render13) {
          if (typeof error?.message === "string") this.done_handler("*API Error: " + error.message + "*");
          else this.done_handler("*API Error. See console logs for details.*");
        }
        return "*API Error. See console logs for details.*";
      }
      async handle_tool_call(tool_call, opts, render13) {
        if (this.env.chats?.current?.tool_choice) {
          this.env.chats.current.tool_choice = null;
        }
        const tool_name = this.get_tool_name(tool_call);
        const tool_call_content = this.get_tool_call_content(tool_call);
        const tools = opts.tools || [];
        const tool = tools.find((t) => t.function.name === tool_name);
        const tool_handler = this.get_tool_handler(tool_name);
        if (!tool_handler || !is_valid_tool_call(tool, tool_call_content)) {
          return this.handle_invalid_tool_call(tool_name, tool_call_content);
        }
        await this.add_tool_call_to_chat(tool_name, tool_call_content);
        const tool_output = await tool_handler(this.env, tool_call_content);
        if (tool_output) {
          await this.current.add_tool_output(tool_name, tool_output);
          this.current.tool_choice = "none";
          return this.complete({});
        }
      }
      handle_invalid_tool_call(tool_name, tool_call_content) {
        console.warn(`Tool ${tool_name} not found or invalid, returning tool_call_content`);
        return tool_call_content;
      }
      async add_tool_call_to_chat(tool_name, tool_call_content) {
        if (typeof this.current?.add_message === "function") {
          await this.current.add_message({
            role: "assistant",
            tool_calls: [{
              function: {
                name: tool_name,
                arguments: JSON.stringify(tool_call_content)
              }
            }]
          });
        }
      }
      handle_error(err, render13) {
        console.error(err);
        if (render13) {
          this.done_handler("*An error occurred. See console logs for details.*");
        }
        return "*An error occurred. See console logs for details.*";
      }
      // HANDLE TOOLS
      /**
       * Retrieves the tool handler function based on the tool name from the environment's actions.
       * This method can be overridden to use custom logic for handling tools.
       * 
       * @param {string} tool_name - The name of the tool for which the handler is to be retrieved.
       * @returns {Function} The handler function for the specified tool.
       */
      get_tool_handler(tool_name) {
        return this.env.actions?.actions?.[tool_name]?.handler;
      }
      /**
       * Extracts the tool call information from a JSON response. This method supports adapter-specific logic.
       * If no adapter method is provided, it defaults to the expected OpenAI JSON format.
       * 
       * @param {Object} json - The JSON response from which to extract the tool call.
       * @returns {Object} The first tool call found in the response.
       */
      get_tool_call(json) {
        if (typeof this.adapter?.get_tool_call === "function") return this.adapter.get_tool_call(json);
        return json.choices?.[0].message.tool_calls?.[0];
      }
      /**
       * Determines the tool name from a tool call object. Supports adapter-specific implementations.
       * Defaults to extracting the name directly from the tool call structure.
       * 
       * @param {Object} tool_call - The tool call object from which to extract the tool name.
       * @returns {string} The name of the tool.
       */
      get_tool_name(tool_call) {
        if (typeof this.adapter?.get_tool_name === "function") return this.adapter.get_tool_name(tool_call);
        return tool_call.function.name;
      }
      /**
       * Extracts the tool call content from a tool call object. Supports adapter-specific logic.
       * Defaults to parsing the 'arguments' field of the tool call function as JSON.
       * 
       * @param {Object} tool_call - The tool call object from which to extract the content.
       * @returns {Object} The parsed arguments of the tool call.
       */
      get_tool_call_content(tool_call) {
        if (typeof this.adapter?.get_tool_call_content === "function") return this.adapter.get_tool_call_content(tool_call);
        return JSON.parse(tool_call.function.arguments);
      }
      // HANDLE MESSAGES
      /**
       * Retrieves the message object from a JSON response. Supports adapter-specific implementations.
       * Defaults to handling both OpenAI and Ollama formats by checking for message structures in 'choices'.
       * 
       * @param {Object} json - The JSON response from which to extract the message.
       * @returns {Object} The message object extracted from the response.
       */
      get_message(json) {
        if (typeof this.adapter?.get_message === "function") return this.adapter.get_message(json);
        return json.choices?.[0].message || json.message;
      }
      /**
       * Extracts the content of a message from a JSON response. Supports adapter-specific implementations.
       * This method relies on `get_message` to first retrieve the message object.
       * 
       * @param {Object} json - The JSON response from which to extract the message content.
       * @returns {string} The content of the message.
       */
      get_message_content(json) {
        if (typeof this.adapter?.get_message_content === "function") return this.adapter.get_message_content(json);
        return this.get_message(json).content;
      }
      async request(req) {
        req.url = this.endpoint;
        req.throw = false;
        const resp = this._request_adapter ? await this._request_adapter(req) : await fetch(this.endpoint, req);
        const resp_json = await this.get_resp_json(resp);
        return resp_json;
      }
      async get_resp_json(resp) {
        return typeof resp.json === "function" ? await resp.json() : await resp.json;
      }
      get request_adapter() {
        return this._request_adapter;
      }
      async stream(req) {
        console.log("Streaming Request: ");
        const full_text = await new Promise((resolve, reject) => {
          try {
            this.active_stream = new SmartStreamer(this.endpoint_streaming, req);
            let curr_text = "";
            this.active_stream.addEventListener("message", (e) => {
              if (this.is_end_of_stream(e)) {
                this.stop_stream();
                return resolve(curr_text);
              }
              let text_chunk = this.get_text_chunk_from_stream(e);
              if (!text_chunk) return;
              curr_text += text_chunk;
              this.chunk_handler(text_chunk);
            });
            this.active_stream.addEventListener("readystatechange", (e) => {
              if (e.readyState >= 2) console.log("ReadyState: " + e.readyState);
            });
            this.active_stream.addEventListener("error", (e) => {
              console.error(e);
              this.done_handler("*API Error. See console logs for details.*");
              this.stop_stream();
              reject(e);
            });
            this.active_stream.stream();
          } catch (err) {
            console.error(err);
            this.stop_stream();
            reject(err);
          }
        });
        this.done_handler(full_text);
        return full_text;
      }
      get_text_chunk_from_stream(event) {
        if (typeof this.adapter?.get_text_chunk_from_stream === "function") return this.adapter.get_text_chunk_from_stream(event);
        let resp = null;
        let text_chunk = "";
        try {
          resp = JSON.parse(event.data);
          text_chunk = resp.choices[0].delta.content;
        } catch (err) {
          console.log(err);
          console.log(event.data);
          if (event.data.indexOf("}{") > -1) event.data = event.data.replace(/}{/g, "},{");
          resp = JSON.parse(`[${event.data}]`);
          resp.forEach((r) => {
            if (r.choices) text_chunk += r.choices[0].delta.content;
          });
        }
        return text_chunk;
      }
      is_end_of_stream(event) {
        if (typeof this.adapter?.is_end_of_stream === "function") return this.adapter.is_end_of_stream(event);
        return event.data === "[DONE]";
      }
      stop_stream() {
        if (this.active_stream) {
          this.active_stream.end();
          this.active_stream = null;
        }
      }
      done_handler(full_str) {
        if (typeof this.main.done_handler === "function") this.main.done_handler(full_str);
      }
      chunk_handler(text_chunk) {
        if (typeof this.main.chunk_handler === "function") this.main.chunk_handler(text_chunk);
      }
      async count_tokens(input) {
        if (typeof this.adapter?.count_tokens === "function") return await this.adapter.count_tokens(input);
        return this.estimate_tokens(input);
      }
      estimate_tokens(input) {
        if (typeof this.adapter?.estimate_tokens === "function") return this.adapter.estimate_tokens(input);
        if (typeof input === "object") input = JSON.stringify(input);
        return input.length / 4;
      }
      async test_api_key() {
        try {
          const request2 = {
            messages: [
              { role: "user", content: "Hello" }
            ],
            temperature: 0,
            max_tokens: 100,
            stream: false,
            n: 1
          };
          if (this.config.fetch_models) {
            request2.model = this.config.default_model;
          }
          const resp = await this.complete(request2, false);
          if (!resp) return false;
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
      async get_models() {
        if (!this.api_key) {
          console.warn(`No API key found for ${this.platform_key}. Cannot retrieve models.`);
          return [];
        }
        if (this.platforms[this.platform_key]?.fetch_models && typeof fetch_models[this.platform_key] === "function") {
          const models = await fetch_models[this.platform_key](this.api_key, this._request_adapter);
          if (models) {
            models.sort((a, b) => a.model_name.localeCompare(b.model_name));
            return models;
          } else console.error(`No models found for ${this.platform_key}`, models);
        }
        return [];
      }
      async get_base_model_config() {
        const models = await this.get_models();
        return models.find((m) => m.key === this.model_name);
      }
      // getters
      get api_key() {
        return this.config.api_key;
      }
      get current() {
        return this.env.chats?.current;
      }
      // use endpoint of combine protocol, hostname, port, and path
      get endpoint() {
        if (typeof this.adapter?.endpoint !== "undefined") return this.adapter.endpoint.replace("MODEL_NAME", this.model_name);
        return this.config.endpoint || this.config.protocol + "://" + this.config.hostname + (this.config.port ? ":" + this.config.port : "") + this.endpoint_path;
      }
      get endpoint_streaming() {
        if (typeof this.adapter?.endpoint_streaming !== "undefined") return this.adapter.endpoint_streaming.replace("MODEL_NAME", this.model_name);
        return this.config.endpoint_streaming || this.endpoint;
      }
      get endpoint_path() {
        return this.config.path.startsWith("/") ? this.config.path : "/" + this.config.path;
      }
      get max_input_tokens() {
        return this.config.max_input_tokens;
      }
      get max_output_tokens() {
        return this.config.max_output_tokens;
      }
      get model_name() {
        return this.config.model_name || this.config.default_model;
      }
      get multimodal() {
        return typeof this.adapter?.multimodal !== "undefined" ? this.adapter.multimodal : this.config.multimodal;
      }
    };
    exports2.SmartChatModel = SmartChatModel2;
  }
});

// node_modules/smart-chats/utils/message_content_array_to_markdown.js
var require_message_content_array_to_markdown = __commonJS({
  "node_modules/smart-chats/utils/message_content_array_to_markdown.js"(exports2) {
    function message_content_array_to_markdown(content) {
      let markdown = "";
      content.forEach((c, i) => {
        if (c.type === "text") {
          if (c.text.startsWith("Image caption: ")) {
            if (content[i - 1]?.type === "image_url") {
              markdown = markdown.split("\n").slice(0, -2).join("\n");
              markdown += `
![${c.text.split(":")[1].trim()}](${content[i - 1].image_url.url})`;
            } else {
              markdown += `${c.text}`;
            }
          } else {
            markdown += `${c.text}`;
          }
        } else if (c.type === "image_url") markdown += `![](${c.image_url.url})`;
        markdown += "\n";
      });
      return markdown.trim();
    }
    exports2.message_content_array_to_markdown = message_content_array_to_markdown;
  }
});

// node_modules/smart-chats/smart_chats_ui.js
var require_smart_chats_ui = __commonJS({
  "node_modules/smart-chats/smart_chats_ui.js"(exports2) {
    var { message_content_array_to_markdown } = require_message_content_array_to_markdown();
    var SmartChatsUI2 = class {
      /**
       * Creates an instance of SmartChatsUI.
       * @param {Object} env - The environment object containing configurations and utilities.
       * @param {HTMLElement} container - The HTML container element for the chat UI.
       */
      constructor(env, container) {
        this.env = env;
        this.main = this.env;
        this.container = container;
        this.templates = this.env.opts.templates;
      }
      /**
       * Provides a context for the view rendering. Should be overridden in subclasses.
       * @returns {Object} The context object for the view.
       */
      get view_context() {
        return {
          /* override */
        };
      }
      /**
       * Renders templates using the environment's rendering engine.
       * @param {...any} args - Arguments including template and data to render.
       * @returns {Promise<string>} The rendered HTML string.
       */
      async render(...args) {
        return await this.env.ejs.render(...args);
      }
      /**
       * Displays a notice message in the console.
       * @param {string} message - The message to display.
       */
      show_notice(message) {
        console.log(message);
      }
      /**
       * Initializes the chat UI by clearing the container and rendering the initial chat template.
       */
      async init() {
        console.log("init SmartChatRenderer");
        this.container.innerHTML = "";
        const data = await this.get_view_data();
        this.container.innerHTML = await this.render(this.templates.smart_chat, data, { context: this.view_context, rmWhitespace: true });
        this.post_process();
      }
      /**
       * Handles new user messages, updates the UI, and triggers rendering of typing indicator.
       * @param {string} user_input - The user's input message.
       */
      async new_user_message(user_input) {
        await this.new_message(user_input, "user");
        this.set_streaming_ux();
        await this.render_dotdotdot();
      }
      /**
       * Post-initialization processing, such as adding listeners and processing messages.
       */
      async post_process() {
        this.add_listeners();
        this.messages.forEach(this.message_post_process.bind(this));
      }
      /**
       * Placeholder for adding listeners. Should be overridden in subclasses.
       */
      add_listeners() {
      }
      /**
       * Placeholder for message post-processing. Should be overridden in subclasses.
       * @param {HTMLElement} msg_elm - The message element to process.
       */
      message_post_process(msg_elm) {
      }
      /**
       * Retrieves view data for rendering the chat interface.
       * @returns {Promise<Object>} An object containing data for the view.
       */
      add_message_listeners(msg_elm) {
      }
      // OVERRIDE
      async get_view_data() {
        const data = {
          name: this.env.chats.current?.name || "UNTITLED CHAT",
          messages: await this.env.chats.current.get_messages_html()
        };
        return data;
      }
      /**
       * Adds input listeners to the chat form for handling special keys and sending messages.
       */
      add_chat_input_listeners() {
        const chat_input = this.container.querySelector(".sc-chat-form textarea");
        chat_input.addEventListener("keydown", this.key_down_handler.bind(this));
        const abort_button = this.container.querySelector("#sc-abort-button");
        abort_button.addEventListener("click", () => {
          this.env.chat_model.stop_stream();
          this.clear_streaming_ux();
        });
        const button = this.container.querySelector("#sc-send-button");
        button.addEventListener("click", (e) => {
          const chat_input2 = e.target.closest(".sc-chat-form");
          const textarea = chat_input2.querySelector("textarea");
          this.handle_send();
          textarea.focus();
        });
      }
      key_down_handler(e) {
        if (e.key === "Enter" && e.shiftKey) {
          e.preventDefault();
          this.handle_send();
        }
      }
      key_up_handler(e) {
      }
      handle_send() {
        const chat_input = this.container.querySelector(".sc-chat-form");
        const textarea = chat_input.querySelector("textarea");
        if (this.prevent_input) {
          this.show_notice("Wait until current response is finished.");
          return;
        }
        let user_input = textarea.value;
        textarea.value = "";
        this.env.chats.current.new_user_message(user_input);
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
      // render message
      async new_message(content, role = "assistant", append_last = false) {
        if (this.dotdotdot_interval) {
          if (!this.last_msg) this.message_container.insertAdjacentHTML("beforeend", await this.get_message_html(role, content));
          clearInterval(this.dotdotdot_interval);
          this.dotdotdot_interval = null;
          this.last_msg_content.innerHTML = "";
          this.last_msg.dataset.content = "";
        }
        if (this.last_msg && !this.last_msg.dataset.content) this.last_msg.dataset.content = "";
        if (append_last) {
          this.last_msg_content.innerHTML += content;
          this.last_msg.dataset.content += content;
          if (content.indexOf("\n") > -1) this.render_md_as_html(this.last_msg);
        } else {
          if (this.last_from !== role) {
            const html = await this.get_message_html(role, content);
            this.message_container.insertAdjacentHTML("beforeend", html);
            this.last_from = role;
            this.last_msg.dataset.content = content;
          } else {
            this.last_msg_content.innerHTML = content;
            this.last_msg.dataset.content = content;
          }
          this.message_post_process(this.last_msg);
        }
        this.message_container.scrollTop = this.message_container.scrollHeight;
      }
      /**
       * Generates HTML for a message based on the role and content.
       * @param {string} role - The role of the message sender.
       * @param {string} content - The content of the message.
       * @returns {Promise<string>} The HTML string for the message.
       */
      async get_message_html(role, content) {
        if (Array.isArray(content)) content = message_content_array_to_markdown(content);
        return await this.render(this.templates.smart_chat_msg, { role, content }, { context: this.view_context, rmWhitespace: true });
      }
      async get_system_message_html(msg) {
        let { content, role } = msg;
        if (content.includes("```sc-system")) {
          content = content.replace(/```sc-system|```/g, "").trim();
          content = "system prompts: " + content.split("\n").filter((ln) => ln.trim()).join(", ");
        }
        if (content.includes("```sc-context")) {
          content = content.replace(/```sc-context|```/g, "").trim();
          content = "context: " + content.split("\n").filter((ln) => ln.trim()).join(", ");
          if (content.length > 100) content = content.substring(0, 100) + "...";
        }
        return await this.render(this.templates.smart_chat_system_msg, { content, role }, { context: this.view_context, rmWhitespace: true });
      }
      /**
       * Inserts selected text from a suggestion modal into the chat input.
       * @param {string} insert_text - The text to insert.
       */
      insert_selection(insert_text) {
        const textarea = this.container.querySelector(".sc-chat-form textarea");
        let caret_pos = textarea.selectionStart;
        let text_before = textarea.value.substring(0, caret_pos);
        let text_after = textarea.value.substring(caret_pos, textarea.value.length);
        textarea.value = text_before + insert_text + text_after;
        textarea.selectionStart = caret_pos + insert_text.length;
        textarea.selectionEnd = caret_pos + insert_text.length;
        textarea.focus();
      }
      /**
       * Renders a typing indicator ("...") and sets an interval to animate it.
       */
      async render_dotdotdot() {
        if (this.dotdotdot_interval) clearInterval(this.dotdotdot_interval);
        await this.new_message("...", "assistant");
        let dots = 0;
        const curr_msg = this.last_msg_content;
        curr_msg.innerHTML = "...";
        this.dotdotdot_interval = setInterval(() => {
          dots++;
          if (dots > 3) dots = 1;
          curr_msg.innerHTML = ".".repeat(dots);
        }, 500);
      }
      /**
       * Returns the message container element.
       * @returns {HTMLElement} The message container.
       */
      get message_container() {
        return this.container.querySelector(".sc-message-container");
      }
      /**
       * Returns the last message content element.
       * @returns {HTMLElement} The last message content element.
       */
      get last_msg() {
        return this.container.querySelector(".sc-message-container").lastElementChild.querySelector(".sc-message-content");
      }
      /**
       * Returns the last message content span element.
       * @returns {HTMLElement} The last message content span element.
       */
      get last_msg_content() {
        return this.last_msg.querySelector("span:not(.sc-msg-button)");
      }
      /**
       * Returns all message content elements.
       * @returns {NodeListOf<HTMLElement>} A NodeList of message content elements.
       */
      get messages() {
        return this.container.querySelectorAll(".sc-message-container .sc-message-content");
      }
      /**
       * Sets the user interface to a "streaming" mode, disabling input and showing an abort button.
       */
      set_streaming_ux() {
        this.prevent_input = true;
        if (this.container.querySelector("#sc-send-button"))
          this.container.querySelector("#sc-send-button").style.display = "none";
        if (this.container.querySelector("#sc-abort-button"))
          this.container.querySelector("#sc-abort-button").style.display = "block";
      }
      /**
       * Resets the user interface from "streaming" mode to normal.
       */
      unset_streaming_ux() {
        this.prevent_input = false;
        if (this.container.querySelector("#sc-send-button"))
          this.container.querySelector("#sc-send-button").style.display = "";
        if (this.container.querySelector("#sc-abort-button"))
          this.container.querySelector("#sc-abort-button").style.display = "none";
      }
      /**
       * Clears any streaming user interface effects, such as intervals and temporary elements.
       */
      clear_streaming_ux() {
        this.unset_streaming_ux();
        if (this.dotdotdot_interval) {
          clearInterval(this.dotdotdot_interval);
          this.dotdotdot_interval = null;
          if ([".", "..", "..."].includes(this.last_msg_content.innerHTML.trim())) {
            this.last_msg.parentElement.remove();
          }
        }
      }
      /**
       * Update/set text in chat_input
       */
      set_chat_input_text(text) {
        const textarea = this.container.querySelector(".sc-chat-form textarea");
        textarea.value = text;
      }
      undo_last_message() {
        if (this.dotdotdot_interval) this.clear_streaming_ux();
        this.last_msg.parentElement.remove();
        this.env.chats.current.remove_last_message();
      }
    };
    exports2.SmartChatsUI = SmartChatsUI2;
  }
});

// node_modules/smart-setting/ejs.min.cjs
var require_ejs_min2 = __commonJS({
  "node_modules/smart-setting/ejs.min.cjs"(exports2, module2) {
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.ejs = f();
      }
    })(function() {
      var define2, module3, exports3;
      return (/* @__PURE__ */ function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i2, true);
                if (u) return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
          return o;
        }
        return r;
      }())({ 1: [function(require2, module4, exports4) {
        "use strict";
        var fs = require2("fs");
        var path = require2("path");
        var utils = require2("./utils");
        var scopeOptionWarned = false;
        var _VERSION_STRING = require2("../package.json").version;
        var _DEFAULT_OPEN_DELIMITER = "<";
        var _DEFAULT_CLOSE_DELIMITER = ">";
        var _DEFAULT_DELIMITER = "%";
        var _DEFAULT_LOCALS_NAME = "locals";
        var _NAME = "ejs";
        var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
        var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
        var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
        var _BOM = /^\uFEFF/;
        var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        exports4.cache = utils.cache;
        exports4.fileLoader = fs.readFileSync;
        exports4.localsName = _DEFAULT_LOCALS_NAME;
        exports4.promiseImpl = new Function("return this;")().Promise;
        exports4.resolveInclude = function(name, filename, isDir) {
          var dirname = path.dirname;
          var extname = path.extname;
          var resolve = path.resolve;
          var includePath = resolve(isDir ? filename : dirname(filename), name);
          var ext = extname(name);
          if (!ext) {
            includePath += ".ejs";
          }
          return includePath;
        };
        function resolvePaths(name, paths) {
          var filePath;
          if (paths.some(function(v) {
            filePath = exports4.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })) {
            return filePath;
          }
        }
        function getIncludePath(path2, options) {
          var includePath;
          var filePath;
          var views = options.views;
          var match = /^[A-Za-z]+:\\|^\//.exec(path2);
          if (match && match.length) {
            path2 = path2.replace(/^\/*/, "");
            if (Array.isArray(options.root)) {
              includePath = resolvePaths(path2, options.root);
            } else {
              includePath = exports4.resolveInclude(path2, options.root || "/", true);
            }
          } else {
            if (options.filename) {
              filePath = exports4.resolveInclude(path2, options.filename);
              if (fs.existsSync(filePath)) {
                includePath = filePath;
              }
            }
            if (!includePath && Array.isArray(views)) {
              includePath = resolvePaths(path2, views);
            }
            if (!includePath && typeof options.includer !== "function") {
              throw new Error('Could not find the include file "' + options.escapeFunction(path2) + '"');
            }
          }
          return includePath;
        }
        function handleCache(options, template) {
          var func;
          var filename = options.filename;
          var hasTemplate = arguments.length > 1;
          if (options.cache) {
            if (!filename) {
              throw new Error("cache option requires a filename");
            }
            func = exports4.cache.get(filename);
            if (func) {
              return func;
            }
            if (!hasTemplate) {
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
          } else if (!hasTemplate) {
            if (!filename) {
              throw new Error("Internal EJS error: no file name or template provided");
            }
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
          func = exports4.compile(template, options);
          if (options.cache) {
            exports4.cache.set(filename, func);
          }
          return func;
        }
        function tryHandleCache(options, data, cb) {
          var result;
          if (!cb) {
            if (typeof exports4.promiseImpl == "function") {
              return new exports4.promiseImpl(function(resolve, reject) {
                try {
                  result = handleCache(options)(data);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              throw new Error("Please provide a callback function");
            }
          } else {
            try {
              result = handleCache(options)(data);
            } catch (err) {
              return cb(err);
            }
            cb(null, result);
          }
        }
        function fileLoader(filePath) {
          return exports4.fileLoader(filePath);
        }
        function includeFile(path2, options) {
          var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
          opts.filename = getIncludePath(path2, opts);
          if (typeof options.includer === "function") {
            var includerResult = options.includer(path2, opts.filename);
            if (includerResult) {
              if (includerResult.filename) {
                opts.filename = includerResult.filename;
              }
              if (includerResult.template) {
                return handleCache(opts, includerResult.template);
              }
            }
          }
          return handleCache(opts);
        }
        function rethrow(err, str, flnm, lineno, esc) {
          var lines = str.split("\n");
          var start = Math.max(lineno - 3, 0);
          var end = Math.min(lines.length, lineno + 3);
          var filename = esc(flnm);
          var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
          }).join("\n");
          err.path = filename;
          err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
          throw err;
        }
        function stripSemi(str) {
          return str.replace(/;(\s*$)/, "$1");
        }
        exports4.compile = function compile(template, opts) {
          var templ;
          if (opts && opts.scope) {
            if (!scopeOptionWarned) {
              console.warn("`scope` option is deprecated and will be removed in EJS 3");
              scopeOptionWarned = true;
            }
            if (!opts.context) {
              opts.context = opts.scope;
            }
            delete opts.scope;
          }
          templ = new Template(template, opts);
          return templ.compile();
        };
        exports4.render = function(template, d, o) {
          var data = d || utils.createNullProtoObjWherePossible();
          var opts = o || utils.createNullProtoObjWherePossible();
          if (arguments.length == 2) {
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
          }
          return handleCache(opts, template)(data);
        };
        exports4.renderFile = function() {
          var args = Array.prototype.slice.call(arguments);
          var filename = args.shift();
          var cb;
          var opts = { filename };
          var data;
          var viewOpts;
          if (typeof arguments[arguments.length - 1] == "function") {
            cb = args.pop();
          }
          if (args.length) {
            data = args.shift();
            if (args.length) {
              utils.shallowCopy(opts, args.pop());
            } else {
              if (data.settings) {
                if (data.settings.views) {
                  opts.views = data.settings.views;
                }
                if (data.settings["view cache"]) {
                  opts.cache = true;
                }
                viewOpts = data.settings["view options"];
                if (viewOpts) {
                  utils.shallowCopy(opts, viewOpts);
                }
              }
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }
            opts.filename = filename;
          } else {
            data = utils.createNullProtoObjWherePossible();
          }
          return tryHandleCache(opts, data, cb);
        };
        exports4.Template = Template;
        exports4.clearCache = function() {
          exports4.cache.reset();
        };
        function Template(text, opts) {
          opts = opts || utils.createNullProtoObjWherePossible();
          var options = utils.createNullProtoObjWherePossible();
          this.templateText = text;
          this.mode = null;
          this.truncate = false;
          this.currentLine = 1;
          this.source = "";
          options.client = opts.client || false;
          options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
          options.compileDebug = opts.compileDebug !== false;
          options.debug = !!opts.debug;
          options.filename = opts.filename;
          options.openDelimiter = opts.openDelimiter || exports4.openDelimiter || _DEFAULT_OPEN_DELIMITER;
          options.closeDelimiter = opts.closeDelimiter || exports4.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
          options.delimiter = opts.delimiter || exports4.delimiter || _DEFAULT_DELIMITER;
          options.strict = opts.strict || false;
          options.context = opts.context;
          options.cache = opts.cache || false;
          options.rmWhitespace = opts.rmWhitespace;
          options.root = opts.root;
          options.includer = opts.includer;
          options.outputFunctionName = opts.outputFunctionName;
          options.localsName = opts.localsName || exports4.localsName || _DEFAULT_LOCALS_NAME;
          options.views = opts.views;
          options.async = opts.async;
          options.destructuredLocals = opts.destructuredLocals;
          options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
          if (options.strict) {
            options._with = false;
          } else {
            options._with = typeof opts._with != "undefined" ? opts._with : true;
          }
          this.opts = options;
          this.regex = this.createRegex();
        }
        Template.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" };
        Template.prototype = { createRegex: function() {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
          return new RegExp(str);
        }, compile: function() {
          var src;
          var fn;
          var opts = this.opts;
          var prepended = "";
          var appended = "";
          var escapeFn = opts.escapeFunction;
          var ctor;
          var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
          if (!this.source) {
            this.generateSource();
            prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error("outputFunctionName is not a valid JS identifier.");
              }
              prepended += "  var " + opts.outputFunctionName + " = __append;\n";
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error("localsName is not a valid JS identifier.");
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                }
                if (i > 0) {
                  destructuring += ",\n  ";
                }
                destructuring += name + " = __locals." + name;
              }
              prepended += destructuring + ";\n";
            }
            if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {\n";
              appended += "  }\n";
            }
            appended += "  return __output;\n";
            this.source = prepended + this.source + appended;
          }
          if (opts.compileDebug) {
            src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
          } else {
            src = this.source;
          }
          if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
            if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
            }
          }
          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
          }
          try {
            if (opts.async) {
              try {
                ctor = new Function("return (async function(){}).constructor;")();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error("This environment does not support async/await");
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }
              e.message += " while compiling ejs\n\n";
              e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
              e.message += "https://github.com/RyanZim/EJS-Lint";
              if (!opts.async) {
                e.message += "\n";
                e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
              }
            }
            throw e;
          }
          var returnedFn = opts.client ? fn : function anonymous(data) {
            var include = function(path2, includeData) {
              var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
              if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }
              return includeFile(path2, opts)(d);
            };
            return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
          };
          if (opts.filename && typeof Object.defineProperty === "function") {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, "name", { value: basename, writable: false, enumerable: false, configurable: true });
            } catch (e) {
            }
          }
          return returnedFn;
        }, generateSource: function() {
          var opts = this.opts;
          if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
          }
          this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
          var self2 = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          if (matches && matches.length) {
            matches.forEach(function(line, index) {
              var closing;
              if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                closing = matches[index + 2];
                if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }
              self2.scanLine(line);
            });
          }
        }, parseTemplateText: function() {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;
          while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }
          if (str) {
            arr.push(str);
          }
          return arr;
        }, _addOutput: function(line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");
            this.truncate = false;
          }
          if (!line) {
            return line;
          }
          line = line.replace(/\\/g, "\\\\");
          line = line.replace(/\n/g, "\\n");
          line = line.replace(/\r/g, "\\r");
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")\n';
        }, scanLine: function(line) {
          var self2 = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;
          newLineCount = line.split("\n").length - 1;
          switch (line) {
            case o + d:
            case o + d + "_":
              this.mode = Template.modes.EVAL;
              break;
            case o + d + "=":
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + "-":
              this.mode = Template.modes.RAW;
              break;
            case o + d + "#":
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
              break;
            case d + c:
            case "-" + d + c:
            case "_" + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }
              this.mode = null;
              this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
              break;
            default:
              if (this.mode) {
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }
                }
                switch (this.mode) {
                  case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";
                    break;
                  case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                    break;
                  case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")\n";
                    break;
                  case Template.modes.COMMENT:
                    break;
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              } else {
                this._addOutput(line);
              }
          }
          if (self2.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += "    ; __line = " + this.currentLine + "\n";
          }
        } };
        exports4.escapeXML = utils.escapeXML;
        exports4.__express = exports4.renderFile;
        exports4.VERSION = _VERSION_STRING;
        exports4.name = _NAME;
        if (typeof window != "undefined") {
          window.ejs = exports4;
        }
      }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function(require2, module4, exports4) {
        "use strict";
        var regExpChars = /[|\\{}()[\]^$+*?.]/g;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasOwn = function(obj, key) {
          return hasOwnProperty.apply(obj, [key]);
        };
        exports4.escapeRegExpChars = function(string) {
          if (!string) {
            return "";
          }
          return String(string).replace(regExpChars, "\\$&");
        };
        var _ENCODE_HTML_RULES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" };
        var _MATCH_HTML = /[&<>'"]/g;
        function encode_char(c) {
          return _ENCODE_HTML_RULES[c] || c;
        }
        var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
        exports4.escapeXML = function(markup) {
          return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
        };
        function escapeXMLToString() {
          return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
        }
        try {
          if (typeof Object.defineProperty === "function") {
            Object.defineProperty(exports4.escapeXML, "toString", { value: escapeXMLToString });
          } else {
            exports4.escapeXML.toString = escapeXMLToString;
          }
        } catch (err) {
          console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
        }
        exports4.shallowCopy = function(to, from) {
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var p in from) {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
          return to;
        };
        exports4.shallowCopyFromList = function(to, from, list) {
          list = list || [];
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var i = 0; i < list.length; i++) {
              var p = list[i];
              if (typeof from[p] != "undefined") {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
          }
          return to;
        };
        exports4.cache = { _data: {}, set: function(key, val) {
          this._data[key] = val;
        }, get: function(key) {
          return this._data[key];
        }, remove: function(key) {
          delete this._data[key];
        }, reset: function() {
          this._data = {};
        } };
        exports4.hyphenToCamel = function(str) {
          return str.replace(/-[a-z]/g, function(match) {
            return match[1].toUpperCase();
          });
        };
        exports4.createNullProtoObjWherePossible = function() {
          if (typeof Object.create == "function") {
            return function() {
              return /* @__PURE__ */ Object.create(null);
            };
          }
          if (!({ __proto__: null } instanceof Object)) {
            return function() {
              return { __proto__: null };
            };
          }
          return function() {
            return {};
          };
        }();
      }, {}], 3: [function(require2, module4, exports4) {
      }, {}], 4: [function(require2, module4, exports4) {
        (function(process2) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports4.resolve = function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process2.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports4.normalize = function(path) {
            var isAbsolute = exports4.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports4.isAbsolute = function(path) {
            return path.charAt(0) === "/";
          };
          exports4.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports4.normalize(filter(paths, function(p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports4.relative = function(from, to) {
            from = exports4.resolve(from).substr(1);
            to = exports4.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "") break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "") break;
              }
              if (start > end) return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports4.sep = "/";
          exports4.delimiter = ":";
          exports4.dirname = function(path) {
            if (typeof path !== "string") path = path + "";
            if (path.length === 0) return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1) return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string") path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1) return "";
            return path.slice(start, end);
          }
          exports4.basename = function(path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports4.extname = function(path) {
            if (typeof path !== "string") path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter) return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs)) res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
            return str.substr(start, len);
          } : function(str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require2("_process"));
      }, { _process: 5 }], 5: [function(require2, module4, exports4) {
        var process2 = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
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
          while (len) {
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
        process2.nextTick = function(fun) {
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
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process2.title = "browser";
        process2.browser = true;
        process2.env = {};
        process2.argv = [];
        process2.version = "";
        process2.versions = {};
        function noop() {
        }
        process2.on = noop;
        process2.addListener = noop;
        process2.once = noop;
        process2.off = noop;
        process2.removeListener = noop;
        process2.removeAllListeners = noop;
        process2.emit = noop;
        process2.prependListener = noop;
        process2.prependOnceListener = noop;
        process2.listeners = function(name) {
          return [];
        };
        process2.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process2.cwd = function() {
          return "/";
        };
        process2.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process2.umask = function() {
          return 0;
        };
      }, {}], 6: [function(require2, module4, exports4) {
        module4.exports = { name: "ejs", description: "Embedded JavaScript templates", keywords: ["template", "engine", "ejs"], version: "3.1.9", author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)", license: "Apache-2.0", bin: { ejs: "./bin/cli.js" }, main: "./lib/ejs.js", jsdelivr: "ejs.min.js", unpkg: "ejs.min.js", repository: { type: "git", url: "git://github.com/mde/ejs.git" }, bugs: "https://github.com/mde/ejs/issues", homepage: "https://github.com/mde/ejs", dependencies: { jake: "^10.8.5" }, devDependencies: { browserify: "^16.5.1", eslint: "^6.8.0", "git-directory-deploy": "^1.5.1", jsdoc: "^4.0.2", "lru-cache": "^4.0.1", mocha: "^10.2.0", "uglify-js": "^3.3.16" }, engines: { node: ">=0.10.0" }, scripts: { test: "mocha -u tdd" } };
      }, {}] }, {}, [1])(1);
    });
  }
});

// node_modules/smart-chats/utils/chat_ml_to_markdown.js
var require_chat_ml_to_markdown = __commonJS({
  "node_modules/smart-chats/utils/chat_ml_to_markdown.js"(exports2) {
    var { message_content_array_to_markdown } = require_message_content_array_to_markdown();
    function chat_ml_to_markdown(chat_ml) {
      console.log("chat_ml");
      let markdown = "";
      let has_md = false;
      chat_ml.messages.forEach((msg) => {
        if (msg.role && msg.content) {
          if (markdown.length > 0) markdown += "\n\n";
          markdown += `##### ${msg.role}
`;
          if (msg.role === "tool") {
            console.log(msg);
            markdown += "```";
            if (msg.tool_call_id) markdown += `${msg.tool_call_id}
`;
            if (msg.content) markdown += `${msg.content}
`;
            markdown += "```";
          } else if (Array.isArray(msg.content)) {
            markdown += message_content_array_to_markdown(msg.content);
          } else if (msg.content.indexOf("---BEGIN NOTE") > -1) {
            markdown += "```sc-context";
            const lines = msg.content.split("\n").filter((line) => line.trim().length && line.startsWith("---BEGIN NOTE") && line.indexOf("[[") > -1);
            lines.forEach((line, i) => {
              const link = line.substring(line.indexOf("[[") + 2, line.indexOf("]]"));
              if (i > 0) markdown += "\n";
              if (link) markdown += `${link}`;
            });
            markdown += "\n```";
          } else if (msg.content.indexOf("#") === 0 || msg.content.indexOf("\n#") > -1) {
            markdown += "```md";
            const content = msg.content.replace(/\n[`]{3}/g, "\n\\```");
            markdown += `
${content}`;
            markdown += "\n```";
          } else markdown += `${msg.content}`;
        }
        if (msg.tool_calls) {
          msg.tool_calls.forEach((tool_call) => {
            if (markdown.length > 0) markdown += "\n\n";
            markdown += `##### assistant
`;
            markdown += `\`\`\`${tool_call?.function?.name}`;
            try {
              markdown += `
${JSON.stringify(JSON.parse(tool_call?.function?.arguments))}`;
            } catch (err) {
              markdown += `
${tool_call?.function?.arguments}`;
            }
            markdown += "\n```";
          });
        }
      });
      return markdown.trim();
    }
    exports2.chat_ml_to_markdown = chat_ml_to_markdown;
  }
});

// node_modules/smart-chats/utils/add_content_to_message.js
var require_add_content_to_message = __commonJS({
  "node_modules/smart-chats/utils/add_content_to_message.js"(exports2) {
    function add_content_to_message(curr_msg, content) {
      if (typeof content === "string") content = content.trim();
      else content = content.map((c) => c.type === "text" ? { type: "text", text: c.text.trim() } : c);
      if (Array.isArray(content)) {
        if (typeof curr_msg.content === "string") curr_msg.content = [{ type: "text", text: curr_msg.content }];
        else if (typeof curr_msg.content === "undefined") curr_msg.content = [];
        curr_msg.content.push(...content);
      } else {
        if (Array.isArray(curr_msg.content)) {
          if (curr_msg.content[curr_msg.content.length - 1].type === "text") curr_msg.content[curr_msg.content.length - 1].text += "\n" + content;
          else curr_msg.content.push({ type: "text", text: content });
        } else {
          if (!curr_msg.content) curr_msg.content = "";
          else curr_msg.content += "\n";
          if (content.startsWith("\\```")) content = content.substring(1);
          curr_msg.content += content;
        }
      }
    }
    exports2.add_content_to_message = add_content_to_message;
  }
});

// node_modules/smart-chats/utils/markdown_to_chat_ml.js
var require_markdown_to_chat_ml = __commonJS({
  "node_modules/smart-chats/utils/markdown_to_chat_ml.js"(exports2) {
    var { add_content_to_message } = require_add_content_to_message();
    function markdown_to_chat_ml(markdown) {
      const lines = markdown.split("\n");
      const chat_ml = { messages: [] };
      let current_role = "";
      let tool_name = null;
      let curr_msg = null;
      let is_code_block = false;
      lines.forEach((line) => {
        if (tool_name && curr_msg.role === "tool") curr_msg.tool_call_id = tool_name;
        if (line.startsWith("##### ") && !is_code_block) {
          tool_name = null;
          if (curr_msg) chat_ml.messages.push({ ...curr_msg });
          current_role = line.substring(6).trim();
          curr_msg = {
            role: current_role
          };
        } else if (line.startsWith("```")) {
          is_code_block = !is_code_block;
          if (line.trim().length > 5 && line.trim().indexOf(" ") < 0) {
            tool_name = line.substring(3).trim();
            if (tool_name === "md") return;
            if (["js", "javascript", "dataview", "dataviewjs"].includes(tool_name)) return add_content_to_message(curr_msg, line);
            if (["sc-context", "sc-system"].includes(tool_name)) return add_content_to_message(curr_msg, line);
            if (curr_msg.role === "tool") return;
            if (!curr_msg.tool_calls) curr_msg.tool_calls = [];
            curr_msg.tool_calls.push({
              id: tool_name,
              type: "function",
              function: {
                name: tool_name,
                arguments: ""
              }
            });
          } else if (["sc-context", "sc-system", "md", "javascript", "js", "dataview", "dataviewjs"].includes(tool_name)) {
            add_content_to_message(curr_msg, line);
          }
        } else if (line.trim() !== "" && curr_msg) {
          if (tool_name && curr_msg.tool_calls) curr_msg.tool_calls[curr_msg.tool_calls.length - 1].function.arguments += line;
          else if (line.match(/!\[.*?\]\((.*?)\)/)) {
            const image_matches = line.matchAll(/^!\[(?<caption>[^\]]*?)\]\((?<imageUrl>[^\)]*?)\)/g);
            const content = [];
            for (const match of image_matches) {
              const caption = match.groups.caption || match.groups.obsidianCaption;
              const imageUrl = match.groups.imageUrl || match.groups.obsidianLink;
              content.push({ type: "image_url", image_url: { url: imageUrl } });
              if (caption) content.push({ type: "text", text: `Image caption: ${caption}` });
            }
            add_content_to_message(curr_msg, content);
          } else add_content_to_message(curr_msg, line);
        }
      });
      if (curr_msg) chat_ml.messages.push({ ...curr_msg });
      return chat_ml;
    }
    exports2.markdown_to_chat_ml = markdown_to_chat_ml;
  }
});

// node_modules/smart-chats/adapters/markdown.js
var require_markdown = __commonJS({
  "node_modules/smart-chats/adapters/markdown.js"(exports2) {
    var { chat_ml_to_markdown } = require_chat_ml_to_markdown();
    var { markdown_to_chat_ml } = require_markdown_to_chat_ml();
    var MarkdownAdapter = class {
      constructor(smart_chat) {
        this.smart_chat = smart_chat;
      }
      /**
       * Returns the file type associated with this class.
       * @returns {string} The file type, which is 'md' for markdown.
       */
      get file_type() {
        return "md";
      }
      /**
       * Updates the internal data with the provided ChatML and saves it.
       * @param {Object} chat_ml - The ChatML object to update the data with.
       */
      async update(chat_ml) {
        this.data = this.from_chatml(chat_ml);
        await this.smart_chat.save();
      }
      // file-type specific parsing and formatting overrides
      /**
       * Retrieves the ChatML representation of the current data.
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.smart_chat.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Converts markdown text to a ChatML object.
       * @param {string} markdown - The markdown string to convert.
       * @returns {Object} The converted ChatML object.
       */
      to_chatml(markdown) {
        return markdown_to_chat_ml(markdown);
      }
      /**
       * Converts a ChatML object to markdown text.
       * @param {Object} chatml - The ChatML object to convert.
       * @returns {string} The converted markdown string.
       */
      from_chatml(chatml) {
        return chat_ml_to_markdown(chatml);
      }
    };
    exports2.MarkdownAdapter = MarkdownAdapter;
    exports2.chat_ml_to_markdown = chat_ml_to_markdown;
    exports2.markdown_to_chat_ml = markdown_to_chat_ml;
  }
});

// node_modules/smart-chats/utils/chatml_to_canvas.js
var require_chatml_to_canvas = __commonJS({
  "node_modules/smart-chats/utils/chatml_to_canvas.js"(exports2) {
    function chatml_to_canvas(chat_ml) {
      const canvas = {
        nodes: [],
        edges: []
      };
      let y_position = 30;
      const x_position = 30;
      const width = 600;
      const height = 300;
      const vertical_spacing = 150;
      chat_ml.messages.forEach((message, index) => {
        const node_id = `${message.role}-${index + 1}`;
        let node_text = "";
        if (message.role === "tool" && message.tool_call_id) {
          node_text += `\`\`\`${message.tool_call_id}
${message.content}
\`\`\``;
        } else if (message.role === "assistant" && message.tool_calls) {
          message.tool_calls.forEach((tool_call) => {
            node_text += `\`\`\`${tool_call.function.name}
`;
            try {
              node_text += `${JSON.stringify(JSON.parse(tool_call.function.arguments))}
`;
            } catch (err) {
              node_text += `${tool_call.function.arguments}
`;
            }
            node_text += `\`\`\`
`;
          });
        } else if (Array.isArray(message.content)) {
          message.content.forEach((contentPart) => {
            if (contentPart.type === "image_url") {
              node_text += `![${contentPart.image_url.caption ? contentPart.image_url.caption : ""}](${contentPart.image_url.url})
`;
            } else if (contentPart.type === "text") {
              node_text += `${contentPart.text}
`;
            }
          });
        } else if (typeof message.content === "string") {
          node_text += message.content;
        }
        canvas.nodes.push({
          id: node_id,
          type: "text",
          x: x_position,
          y: y_position,
          width,
          height,
          text: node_text.trim()
        });
        if (index > 0) {
          const from_node_id = `${chat_ml.messages[index - 1].role}-${index}`;
          const to_node_id = node_id;
          canvas.edges.push({
            id: `${from_node_id}-to-${to_node_id}`,
            fromNode: from_node_id,
            fromSide: "bottom",
            toNode: to_node_id,
            toSide: "top"
          });
        }
        y_position += height + vertical_spacing;
      });
      return canvas;
    }
    exports2.chatml_to_canvas = chatml_to_canvas;
  }
});

// node_modules/smart-chats/utils/canvas_to_chatml.js
var require_canvas_to_chatml = __commonJS({
  "node_modules/smart-chats/utils/canvas_to_chatml.js"(exports2) {
    var { add_content_to_message } = require_add_content_to_message();
    function canvas_to_chatml(canvas) {
      if (typeof canvas === "string" && canvas.trim()) canvas = JSON.parse(canvas);
      const chat_ml = { messages: [] };
      canvas.nodes?.forEach((node) => {
        let current_role = node.id.split("-")[0];
        let curr_msg = {
          role: current_role
        };
        const lines = node.text.split("\n");
        let is_code_block = false;
        let tool_name = null;
        lines.forEach((line) => {
          if (line.startsWith("```")) {
            is_code_block = !is_code_block;
            if (is_code_block) {
              tool_name = line.substring(3).trim();
              console.log(tool_name + " " + curr_msg.role);
              if (is_tool_call(curr_msg.role, tool_name)) {
                console.log("tool call");
                if (!curr_msg.tool_calls) {
                  curr_msg.tool_calls = [];
                }
                curr_msg.tool_calls.push({
                  id: tool_name,
                  type: "function",
                  function: {
                    name: tool_name,
                    arguments: ""
                  }
                });
              } else {
                if (curr_msg.role === "tool" && line.trim() !== "") {
                  curr_msg.tool_call_id = tool_name;
                } else {
                  add_content_to_message(curr_msg, line);
                }
              }
            } else {
              if (curr_msg.role !== "tool" && !curr_msg.tool_calls?.length) {
                add_content_to_message(curr_msg, line);
              }
              tool_name = null;
            }
          } else if (is_code_block && is_tool_call(curr_msg.role, tool_name)) {
            console.log(line);
            const last_tool_call = curr_msg.tool_calls[curr_msg.tool_calls.length - 1];
            if (last_tool_call.function.arguments) {
              last_tool_call.function.arguments += "\n";
            }
            last_tool_call.function.arguments += line;
          } else if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
            const content = [];
            const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
            const caption = match[1];
            const imageUrl = match[2];
            content.push({ type: "image_url", image_url: { url: imageUrl } });
            if (caption) {
              content.push({ type: "text", text: `Image caption: ${caption}` });
            }
            add_content_to_message(curr_msg, content);
          } else {
            add_content_to_message(curr_msg, line);
          }
        });
        if (Array.isArray(curr_msg.content) && curr_msg.content.length === 1 && curr_msg.content[0].type === "text") {
          curr_msg.content = curr_msg.content[0].text;
        }
        chat_ml.messages.push(curr_msg);
      });
      return chat_ml;
    }
    exports2.canvas_to_chatml = canvas_to_chatml;
    function is_tool_call(role, tool_name) {
      if (role === "tool") return false;
      if ([
        "sc-context",
        "sc-system",
        "js",
        "javascript",
        "dataview",
        "dataviewjs",
        "html",
        "css",
        "scss",
        "less",
        "md"
      ].includes(tool_name)) return false;
      return true;
    }
  }
});

// node_modules/smart-chats/adapters/canvas.js
var require_canvas = __commonJS({
  "node_modules/smart-chats/adapters/canvas.js"(exports2) {
    var { chatml_to_canvas } = require_chatml_to_canvas();
    var { canvas_to_chatml } = require_canvas_to_chatml();
    var CanvasAdapter = class {
      constructor(smart_chat) {
        this.smart_chat = smart_chat;
      }
      /**
       * Returns the file type associated with this class.
       * @returns {string} The file type, which is 'canvas' for canvas.
       */
      get file_type() {
        return "canvas";
      }
      /**
       * Updates the internal data with the provided ChatML and saves it.
       * @param {Object} chat_ml - The ChatML object to update the data with.
       */
      async update(chat_ml) {
        this.smart_chat.data = this.from_chatml(chat_ml);
        await this.smart_chat.save();
      }
      // file-type specific parsing and formatting overrides
      /**
       * Retrieves the ChatML representation of the current data.
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.smart_chat.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Converts markdown text to a ChatML object.
       * @param {string} markdown - The markdown string to convert.
       * @returns {Object} The converted ChatML object.
       */
      to_chatml(markdown) {
        return canvas_to_chatml(markdown);
      }
      /**
       * Converts a ChatML object to markdown text.
       * @param {Object} chatml - The ChatML object to convert.
       * @returns {string} The converted markdown string.
       */
      from_chatml(chatml) {
        return chatml_to_canvas(chatml);
      }
      async save() {
        return await this.smart_chat.chats.save(this.smart_chat.file_path, JSON.stringify(this.smart_chat.data));
      }
    };
    exports2.CanvasAdapter = CanvasAdapter;
    exports2.chatml_to_canvas = chatml_to_canvas;
    exports2.canvas_to_chatml = canvas_to_chatml;
  }
});

// node_modules/smart-chats/adapters.js
var require_adapters2 = __commonJS({
  "node_modules/smart-chats/adapters.js"(exports2) {
    var { MarkdownAdapter } = require_markdown();
    var { CanvasAdapter } = require_canvas();
    exports2.md = MarkdownAdapter;
    exports2.canvas = CanvasAdapter;
  }
});

// node_modules/smart-chats/smart_chat.js
var require_smart_chat = __commonJS({
  "node_modules/smart-chats/smart_chat.js"(exports2) {
    var SmartChatAdapters = require_adapters2();
    var SmartChat2 = class {
      constructor(env, opts = {}) {
        let {
          key = "UNTITLED CHAT " + get_file_date_string(),
          data = "",
          file_type = null
        } = opts;
        this.env = env;
        this.chats = this.env.chats;
        this.key = key;
        this.data = data;
        this.scope = {};
        if (file_type && SmartChatAdapters[file_type]) this.adapter = new SmartChatAdapters[file_type](this);
        if (this.chats) this.chats.items[this.key] = this;
      }
      /**
       * Factory method to create a new SmartChat instance with a unique key or a default one.
       * 
       * @static
       * @param {SmartEnv} env - The SmartChat environment object.
       * @param {string} [key=null] - Optional key for the chat session. If not provided, a default is generated.
       * @param {string} [data=''] - Initial data for the chat session.
       * @returns {SmartChat} A new instance of SmartChat.
       */
      static create(env, opts = {}) {
        const chat = new this(env, opts);
        return chat;
      }
      /**
       * Computes the file path for the current chat session based on its key and file type.
       * 
       * @returns {string} The file path for the chat session.
       */
      get file_path() {
        return `${this.chats.folder}/${this.key}.${this.file_type}`;
      }
      /**
       * Returns the name (key) of the chat session.
       * 
       * @returns {string} The key of the chat session.
       */
      get name() {
        return this.key;
      }
      /**
       * Renames the current chat session and updates the storage references.
       * 
       * @param {string} new_id - The new identifier for the chat session.
       * @returns {Promise<void>}
       */
      async rename(new_id) {
        if (this.key === new_id) return;
        if (await this.exists()) await this.delete();
        delete this.chats.items[this.key];
        this.key = new_id;
        this.chats.items[this.key] = this;
        await this.save();
      }
      /**
       * Retrieves all messages from the chat session and converts them to HTML format.
       * 
       * @returns {Promise<string>} A string containing all messages in HTML format.
       */
      async get_messages_html() {
        const messages = await this.get_messages();
        const html = await Promise.all(messages.map(async (msg) => {
          if (!msg.content) return "";
          if (msg.role === "system") return await this.env.chat_ui.get_system_message_html(msg);
          return await this.env.chat_ui.get_message_html(msg.role, msg.content);
        }));
        return html.join("");
      }
      /**
       * Adds a new message to the chat session.
       * 
       * @param {Object} [msg={}] - The message object to add.
       * @returns {Promise<void>}
       */
      async add_message(msg = {}) {
        const chat_ml = await this.get_chat_ml();
        chat_ml.messages.push(msg);
        await this.update(chat_ml);
      }
      async remove_last_message() {
        const chat_ml = await this.get_chat_ml();
        chat_ml.messages.pop();
        await this.update(chat_ml);
      }
      /**
       * Adds output from a tool to the chat session as a message.
       * 
       * @param {string} tool_name - The name of the tool.
       * @param {*} tool_output - The output from the tool.
       * @returns {Promise<void>}
       */
      async add_tool_output(tool_name, tool_output) {
        if (typeof this.env.actions.parse_tool_output === "function") {
          const message = await this.env.actions.parse_tool_output(tool_name, tool_output);
          if (message) return await this.add_message(message);
        }
        await this.add_message({ role: "tool", tool_call_id: tool_name, content: JSON.stringify(tool_output) });
      }
      // file-type specific parsing and formatting overrides
      /**
       * Updates the chat session data with the provided ChatML object and saves it.
       * 
       * @param {Object} chat_ml - The ChatML object to update the session with.
       * @returns {Promise<void>}
       */
      async update(chat_ml) {
        this.data = this.from_chatml(chat_ml);
        await this.save();
      }
      /**
       * Saves the current chat session data to the file system.
       * 
       * @returns {Promise<void>}
       */
      async save() {
        if (typeof this.adapter?.save === "function") return await this.adapter.save();
        return await this.chats.save(this.file_path, this.data);
      }
      /**
       * Deletes the chat session file from the file system.
       * 
       * @returns {Promise<void>}
       */
      async delete() {
        return await this.chats.delete(this.file_path);
      }
      /**
       * Checks if the chat session file exists in the file system.
       * 
       * @returns {Promise<boolean>} True if the file exists, false otherwise.
       */
      async exists() {
        return await this.chats.exists(this.file_path);
      }
      /**
       * Loads the chat session data from the file system.
       * 
       * @returns {Promise<string>} The loaded data.
       */
      async load() {
        if (!await this.exists()) {
          return this.data = "";
        }
        return this.data = await this.chats.read(this.file_path);
      }
      /**
       * Retrieves the ChatML object from the current session data.
       * 
       * @returns {Promise<Object>} The ChatML object.
       */
      async get_chat_ml() {
        await this.load();
        const chat_ml = this.to_chatml(this.data);
        return chat_ml;
      }
      /**
       * Retrieves all messages from the ChatML object of the current session.
       * 
       * @returns {Promise<Array>} An array of message objects.
       */
      async get_messages() {
        return (await this.get_chat_ml()).messages;
      }
      /**
       * Processes a new user message, updates UI/UX, and adds it to the chat session.
       * 
       * @param {string} content - The content of the user message.
       * @returns {Promise<void>}
       */
      async new_user_message(content) {
        const og_content = content;
        content = await this.parse_user_message(content);
        if (typeof this.env?.chat_ui?.new_user_message === "function") await this.env.chat_ui.new_user_message(og_content);
        if (typeof this.env?.actions?.new_user_message === "function") await this.env.actions.new_user_message(content);
        if (typeof this.chats?.new_user_message === "function") await this.chats.new_user_message(content);
        await this.add_message({ role: "user", content });
        await this.env.chat_model.complete({});
      }
      // Override these for file-type specific parsing and formatting in subclasses
      /**
       * Returns the file type for the chat session, used in file operations.
       * 
       * @returns {string} The file type, default is 'json'.
       */
      get file_type() {
        if (this.adapter?.file_type) return this.adapter.file_type;
        return "json";
      }
      /**
       * Converts the provided data into a ChatML object. This method should be overridden in subclasses.
       * 
       * @param {string} data - The data to convert.
       * @returns {Object} The ChatML object.
       */
      to_chatml(data) {
        if (typeof this.adapter?.to_chatml === "function") return this.adapter.to_chatml(data);
        return data;
      }
      /**
       * Converts a ChatML object back into a string or suitable format for storage. This method should be overridden in subclasses.
       * 
       * @param {Object} data - The ChatML object to convert.
       * @returns {string} The string or formatted data.
       */
      from_chatml(data) {
        if (typeof this.adapter?.from_chatml === "function") return this.adapter.from_chatml(data);
        return data;
      }
      /**
       * Parses the user message content before adding it to the chat. This method can be overridden to include custom parsing logic.
       * 
       * @param {string} content - The content to parse.
       * @returns {Promise<string>} The parsed content.
       */
      async parse_user_message(content) {
        return content;
      }
    };
    function get_file_date_string() {
      return (/* @__PURE__ */ new Date()).toISOString().replace(/(T|:|\..*)/g, " ").trim();
    }
    exports2.SmartChat = SmartChat2;
  }
});

// node_modules/smart-chats/smart_chats.js
var require_smart_chats = __commonJS({
  "node_modules/smart-chats/smart_chats.js"(exports2) {
    var { SmartChat: SmartChat2 } = require_smart_chat();
    var SmartChats2 = class {
      /**
       * Creates an instance of SmartChats.
       * @param {Object} env - The environment context, used across the chat system.
       * @param {Object} [opts={}] - Optional parameters to configure the SmartChats instance.
       */
      constructor(env, opts = {}) {
        this.env = env;
        this.items = {};
        this.default_file_type = "md";
        this.chat_class = SmartChat2;
        Object.assign(this, opts);
      }
      get folder() {
        return this.env.settings.smart_chats_folder || "smart-chats";
      }
      set folder(folder) {
        this.env.settings.smart_chats_folder = folder;
      }
      /**
       * Creates a new chat instance and initializes the chat UI.
       */
      async new() {
        if (this.current) {
          await this.current.save();
          this.current = null;
        }
        this.current = this.create_chat();
        await this.env.chat_ui.init();
      }
      create_chat(opts = {}) {
        if (!opts.file_type) opts.file_type = this.default_file_type;
        return this.chat_class.create(this.env, opts);
      }
      /**
       * Loads all conversations from the filesystem and initializes them.
       */
      async load_all() {
        if (!await this.exists(this.folder)) await this.create_folder(this.folder);
        const convos = await this.get_conversation_ids_and_file_types();
        convos.forEach(([conversation_id, file_type]) => {
          this.items[conversation_id] = this.create_chat({ key: conversation_id, file_type });
        });
      }
      /**
       * Saves a chat conversation by its key.
       * If the chat does not exist, it creates a new one.
       * @param {string} key - The key identifier for the chat.
       * @param {string} chat_ml - The chat content in markup language.
       */
      async save(key, chat_ml) {
        let chat = this.items[key];
        if (!chat) {
          console.log("Creating new conversation");
          chat = this.create_chat(key, chat_ml);
        }
        await chat.save(chat_ml);
      }
      /**
       * Retrieves conversation IDs and their corresponding file types from the filesystem.
       * @returns {Promise<Array<Array<string>>>} An array of conversation IDs and file types.
       */
      async get_conversation_ids_and_file_types() {
        console.log("get_conversation_ids_and_file_types");
        const folder = await this.list(this.folder);
        const files = folder.files.map((file) => {
          const file_type = file.split(".").pop();
          const conversation_id = file.replace(this.folder + "/", "").replace("." + file_type, "");
          return [conversation_id, file_type];
        });
        return files;
      }
      // Platform-specific methods to be overridden in subclasses or instances
      async open(conversation_id) {
      }
      async load(path) {
      }
      async save(path, file_content) {
      }
      async delete(path) {
      }
      async exists(path) {
      }
      async create_folder(path) {
      }
      async list(path) {
      }
    };
    exports2.SmartChats = SmartChats2;
    exports2.SmartChat = SmartChat2;
  }
});

// src/index.js
var src_exports = {};
__export(src_exports, {
  default: () => SmartConnectionsPlugin
});
module.exports = __toCommonJS(src_exports);
var import_obsidian14 = __toESM(require("obsidian"), 1);

// node_modules/smart-environment/components/settings.js
async function build_html(scope, opts = {}) {
  const env_settings_html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const env_collections_containers_html = Object.entries(scope.collections).map(([collection_key, collection]) => {
    return `<div data-smart-settings="${collection_key}"></div>`;
  }).join("\n");
  const html = `
    <div class="">
      ${env_settings_html}
      ${env_collections_containers_html}
    </div>
  `;
  return html;
}
async function render(scope, opts = {}) {
  const html = await build_html.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process.call(this, scope, frag, opts);
}
async function post_process(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  const env_collections_containers = frag.querySelectorAll("[data-smart-settings]");
  for (const env_collections_container of env_collections_containers) {
    const collection_key = env_collections_container.dataset.smartSettings;
    const collection = scope[collection_key];
    await collection.render_settings(env_collections_container);
  }
  return frag;
}

// node_modules/smart-environment/smart_env.js
var SmartEnv = class _SmartEnv {
  constructor(opts = {}) {
    this.opts = opts;
    this.global_ref = this;
    this.loading_collections = false;
    this.collections_loaded = false;
    this.smart_embed_active_models = {};
    this._excluded_headings = null;
    this.collections = {};
    this.is_init = true;
    this.mains = [];
    this.main_opts = {};
  }
  /**
   * Creates or updates a SmartEnv instance.
   * @param {Object} main - The main object to be added to the SmartEnv instance.
   * @param {Object} [main_env_opts={}] - Options for configuring the SmartEnv instance.
   * @returns {SmartEnv} The SmartEnv instance.
   * @throws {TypeError} If an invalid main object is provided.
   * @throws {Error} If there's an error creating or updating the SmartEnv instance.
   */
  static async create(main, main_env_opts = {}) {
    if (!main || typeof main !== "object") {
      throw new TypeError("SmartEnv: Invalid main object provided");
    }
    main_env_opts = normalize_opts(main_env_opts);
    let existing_env = main_env_opts.global_ref instanceof _SmartEnv ? main_env_opts.global_ref : null;
    let main_key = null;
    if (!existing_env) {
      main.env = new this(main_env_opts);
      main_key = await main.env.init(main, main_env_opts);
    } else {
      main.env = existing_env;
      main_key = main.env.init_main(main, main_env_opts);
      await main.env.load_main(main_key);
    }
    return main.env;
  }
  async init(main, main_env_opts = {}) {
    this.is_init = true;
    const main_key = this.init_main(main, main_env_opts);
    await this.fs.load_files();
    await this.opts.modules.smart_settings.class.create(this);
    await this.load_main(main_key);
    this.is_init = false;
    return main_key;
  }
  get main_env_config() {
    return this.mains.reduce((acc, key) => {
      acc[key] = this[key].smart_env_config;
      return acc;
    }, {});
  }
  /**
   * Adds a new main object to the SmartEnv instance.
   * @param {Object} main - The main object to be added.
   * @param {Object} [main_env_opts={}] - Options to be merged into the SmartEnv instance.
   */
  init_main(main, main_env_opts = {}) {
    const main_key = camel_case_to_snake_case(main.constructor.name);
    this[main_key] = main;
    this.mains.push(main_key);
    this.main_opts[main_key] = main_env_opts;
    this.merge_options(main_env_opts);
    return main_key;
  }
  async load_main(main_key) {
    const main_env_opts = this.main_opts[main_key];
    const main = this[main_key];
    await this.init_collections(main_env_opts);
    await this.ready_to_load_collections(main);
    const main_collections = Object.keys(main_env_opts.collections).reduce((acc, key) => {
      if (!this.collections[key]) return acc;
      acc[key] = this[key];
      return acc;
    }, {});
    await this.load_collections(main_collections);
  }
  async init_collections(config = this.opts) {
    for (const key of Object.keys(config.collections)) {
      const _class = config.collections[key]?.class;
      if (typeof _class?.init !== "function") continue;
      await _class.init(this, { ...config.collections[key] });
    }
  }
  async load_collections(collections = this.collections) {
    this.loading_collections = true;
    for (const key of Object.keys(collections)) {
      if (this.is_init && (this.opts.prevent_load_on_init || collections[key].opts.prevent_load_on_init)) continue;
      if (typeof collections[key]?.process_load_queue === "function") {
        await collections[key].process_load_queue();
      }
    }
    this.loading_collections = false;
    this.collections_loaded = true;
  }
  /**
   * Merges provided options into the SmartEnv instance, performing a deep merge for objects.
   * @param {Object} opts - Options to be merged.
   */
  merge_options(opts) {
    for (const [key, value] of Object.entries(opts)) {
      if (key === "global_ref") continue;
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          this.opts[key] = [...this.opts[key] || [], ...value];
        } else {
          if (!this.opts[key]) this.opts[key] = {};
          deep_merge_no_overwrite(this.opts[key], value);
        }
      } else {
        if (this.opts[key] !== void 0) {
        }
        this.opts[key] = value;
      }
    }
  }
  async ready_to_load_collections(main) {
    if (typeof main?.ready_to_load_collections === "function") await main.ready_to_load_collections();
    return true;
  }
  // override in subclasses with env-specific logic
  unload_main(main_key) {
    this.unload_collections(main_key);
    this.unload_opts(main_key);
    this[main_key] = null;
    this.mains = this.mains.filter((key) => key !== main_key);
    if (this.mains.length === 0) this.global_ref = null;
  }
  unload_collections(main_key) {
    for (const key of Object.keys(this.collections)) {
      if (!this[main_key]?.smart_env_config?.collections[key]) continue;
      this[key]?.unload();
      this[key] = null;
    }
  }
  unload_opts(main_key) {
    for (const opts_key of Object.keys(this.opts)) {
      if (!this[main_key]?.smart_env_config?.[opts_key]) continue;
      if (this.mains.filter((m) => m !== main_key).some((m) => this[m]?.smart_env_config?.[opts_key])) continue;
      this.opts[opts_key] = null;
    }
  }
  save() {
    for (const key of Object.keys(this.collections)) {
      this[key].process_save_queue();
    }
  }
  init_module(module_key, opts = {}) {
    const module_config = this.opts.modules[module_key];
    if (!module_config) return console.warn(`SmartEnv: module ${module_key} not found`);
    opts = {
      ...{ ...module_config, class: null },
      ...opts
    };
    return new module_config.class(opts);
  }
  get settings_template() {
    return this.opts.components?.settings || render;
  }
  async render_settings(container = this.settings_container) {
    if (!this.settings_container || container !== this.settings_container) this.settings_container = container;
    if (!container) throw new Error("Container is required");
    const frag = await this.settings_template.call(this.smart_view, this);
    container.innerHTML = "";
    container.appendChild(frag);
    return frag;
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.init_module("smart_view");
    return this._smart_view;
  }
  get settings_config() {
    return {
      "is_obsidian_vault": {
        name: "Obsidian Vault",
        description: "Toggle on if this is an Obsidian vault.",
        type: "toggle",
        default: false
      },
      "file_exclusions": {
        name: "File Exclusions",
        description: "Comma-separated list of files to exclude.",
        type: "text",
        default: "",
        callback: "update_exclusions"
      },
      "folder_exclusions": {
        name: "Folder Exclusions",
        description: "Comma-separated list of folders to exclude.",
        type: "text",
        default: "",
        callback: "update_exclusions"
      },
      "excluded_headings": {
        name: "Excluded Headings",
        description: "Comma-separated list of headings to exclude.",
        type: "text",
        default: ""
      }
    };
  }
  get global_prop() {
    return this.opts.global_prop ?? "smart_env";
  }
  get global_ref() {
    return this.opts.global_ref ?? (typeof window !== "undefined" ? window : global) ?? {};
  }
  set global_ref(env) {
    this.global_ref[this.global_prop] = env;
  }
  get item_types() {
    return this.opts.item_types;
  }
  /**
   * @deprecated use component pattern instead
   */
  get ejs() {
    return this.opts.ejs;
  }
  /**
   * @deprecated use component pattern instead
   */
  get templates() {
    return this.opts.templates;
  }
  /**
   * @deprecated use component pattern instead
   */
  get views() {
    return this.opts.views;
  }
  get fs_module_config() {
    return this.opts.modules.smart_fs;
  }
  get fs() {
    if (!this.smart_fs) {
      this.smart_fs = new this.fs_module_config.class(this, {
        adapter: this.fs_module_config.adapter,
        fs_path: this.opts.env_path || ""
      });
    }
    return this.smart_fs;
  }
  get env_data_dir() {
    const env_settings_files = this.fs.file_paths?.filter((path) => path.endsWith("smart_env.json")) || [];
    let env_data_dir = ".smart-env";
    if (env_settings_files.length > 0) {
      if (env_settings_files.length > 1) {
        const env_data_dir_counts = env_settings_files.map((path) => {
          const dir = path.split("/").slice(-2, -1)[0];
          return {
            dir,
            count: this.fs.file_paths.filter((path2) => path2.includes(dir)).length
          };
        });
        env_data_dir = env_data_dir_counts.reduce((max, dir) => dir.count > max.count ? dir : max, env_data_dir_counts[0]).dir;
      } else {
        env_data_dir = env_settings_files[0].split("/").slice(-2, -1)[0];
      }
    }
    return env_data_dir;
  }
  get data_fs() {
    if (!this._fs) {
      this._fs = new this.fs_module_config.class(this, {
        adapter: this.fs_module_config.adapter,
        fs_path: this.data_fs_path
      });
    }
    return this._fs;
  }
  get data_fs_path() {
    return this.opts.env_path + (this.opts.env_path ? this.opts.env_path.includes("\\") ? "\\" : "/" : "") + this.env_data_dir;
  }
  /**
   * Saves the current settings to the file system.
   * @param {Object|null} [settings=null] - Optional settings to override the current settings before saving.
   * @returns {Promise<void>} A promise that resolves when the settings have been saved.
   */
  async save_settings(settings) {
    this._saved = false;
    if (!await this.data_fs.exists("")) await this.data_fs.mkdir("");
    await this.data_fs.write(
      "smart_env.json",
      JSON.stringify(settings, null, 2)
    );
    this._saved = true;
  }
  /**
   * Loads the settings from the file system.
   * @returns {Promise<void>} A promise that resolves when the settings have been loaded.
   */
  async load_settings() {
    if (!await this.data_fs.exists("smart_env.json")) await this.save_settings({});
    let settings = JSON.parse(JSON.stringify(this.opts.default_settings || {}));
    deep_merge(settings, JSON.parse(await this.data_fs.read("smart_env.json")));
    deep_merge(settings, this.opts?.smart_env_settings || {});
    this._saved = true;
    return settings;
  }
  async update_exclusions() {
    this.smart_sources._fs = null;
    await this.smart_sources.fs.init();
    this.smart_sources.render_settings();
  }
  // DEPRECATED
  /**
   * @deprecated Use this.main_class_name instead of this.plugin
   */
  get main() {
    return this[this.mains[this.mains.length - 1]];
  }
  /**
   * @deprecated Use this.main_class_name instead of this.plugin
   */
  get plugin() {
    return this.main;
  }
};
function normalize_opts(opts) {
  Object.entries(opts.collections).forEach(([key, value]) => {
    if (typeof value === "function") opts.collections[key] = { class: value };
    if (key[0] === key[0].toUpperCase()) {
      opts.collections[camel_case_to_snake_case(key)] = { ...opts.collections[key] };
      delete opts.collections[key];
    }
  });
  Object.entries(opts.modules).forEach(([key, value]) => {
    if (typeof value === "function") opts.modules[key] = { class: value };
    if (key[0] === key[0].toUpperCase()) {
      opts.modules[camel_case_to_snake_case(key)] = { ...opts.modules[key] };
      delete opts.modules[key];
    }
  });
  return opts;
}
function camel_case_to_snake_case(str) {
  const result = str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`).replace(/^_/, "").replace(/2$/, "");
  return result;
}
function deep_merge_no_overwrite(target, source) {
  for (const key in source) {
    try {
      if (source.hasOwnProperty(key)) {
        if (is_obj(source[key])) {
          if (!target.hasOwnProperty(key) || !is_obj(target[key])) {
            target[key] = {};
          }
          deep_merge_no_overwrite(target[key], source[key]);
        } else if (!target.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    } catch (e) {
      console.warn(`deep_merge_no_overwrite error (${key}): ${e.message}`);
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}
function deep_merge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (is_obj(source[key]) && is_obj(target[key])) deep_merge(target[key], source[key]);
      else target[key] = source[key];
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}

// node_modules/smart-collections/utils/collection_instance_name_from.js
function collection_instance_name_from(class_name) {
  if (class_name.endsWith("Item")) {
    return class_name.replace(/Item$/, "").toLowerCase();
  }
  return class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/y$/, "ie") + "s";
}

// node_modules/smart-collections/helpers.js
function create_uid(data) {
  const str = JSON.stringify(data);
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
    if (hash < 0) hash = hash * -1;
  }
  return hash.toString() + str.length;
}
function deep_merge2(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (is_obj(source[key]) && is_obj(target[key])) deep_merge2(target[key], source[key]);
      else target[key] = source[key];
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}

// node_modules/smart-collections/utils/deep_equal.js
function deep_equal(obj1, obj2, visited = /* @__PURE__ */ new WeakMap()) {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null || obj1 === void 0 || obj2 === void 0) return false;
  if (typeof obj1 !== typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deep_equal(item, obj2[index], visited));
  }
  if (typeof obj1 === "object") {
    if (visited.has(obj1)) return visited.get(obj1) === obj2;
    visited.set(obj1, obj2);
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => deep_equal(obj1[key], obj2[key], visited));
  }
  return obj1 === obj2;
}

// node_modules/smart-collections/collection_item.js
var CollectionItem = class _CollectionItem {
  /**
   * Default properties for an instance of CollectionItem.
   * @returns {Object} Default data configuration.
   */
  static get defaults() {
    return {
      data: {
        // key: null,
      }
    };
  }
  /**
   * Creates an instance of CollectionItem.
   * @param {Object} brain - The central storage or context.
   * @param {Object|null} data - Initial data for the item.
   */
  constructor(env, data = null) {
    this.env = env;
    this.config = this.env?.config;
    this.merge_defaults();
    if (data) deep_merge2(this.data, data);
    if (!this.data.class_name) this.data.class_name = this.constructor.name;
  }
  static load(env, data) {
    const item = new this(env, data);
    item.init();
    return item;
  }
  /**
   * Merges default properties from all classes in the inheritance chain.
   */
  merge_defaults() {
    let current_class = this.constructor;
    while (current_class) {
      for (let key in current_class.defaults) {
        if (typeof current_class.defaults[key] === "object") this[key] = { ...current_class.defaults[key], ...this[key] };
        else this[key] = current_class.defaults[key];
      }
      current_class = Object.getPrototypeOf(current_class);
    }
  }
  /**
   * Generates or retrieves a unique key for the item. Can be overridden in child classes.
   * @returns {string} The unique key.
   */
  get_key() {
    return create_uid(this.data);
  }
  // update_data - for data in this.data
  /**
   * Updates the data of this item with new data.
   * @param {Object} data - The new data for the item.
   * @returns {boolean} True if data was successfully updated.
   */
  update_data(data) {
    const sanitized_data = this.sanitize_data(data);
    const changed = !deep_equal(this.data, sanitized_data);
    if (!changed) return false;
    deep_merge2(this.data, sanitized_data);
    return true;
  }
  /**
   * Sanitizes the data of an item to ensure it can be safely saved.
   * @param {Object} data - The data to sanitize.
   * @returns {Object} The sanitized data.
   */
  sanitize_data(data) {
    if (data instanceof _CollectionItem) return data.ref;
    if (Array.isArray(data)) return data.map((val) => this.sanitize_data(val));
    if (typeof data === "object" && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = this.sanitize_data(data[key]);
        return acc;
      }, {});
    }
    return data;
  }
  // init - for data not in this.data
  /**
   * Initializes the item with input_data, potentially asynchronously.
   * Handles interactions with other collection items.
   */
  init() {
  }
  queue_save() {
    this._queue_save = true;
  }
  async save(ajson = this.ajson) {
    try {
      await this.data_adapter.save(this, ajson);
      this.init();
    } catch (err) {
      this._queue_save = true;
      console.error(err, err.stack);
    }
  }
  queue_load() {
    this._queue_load = true;
  }
  async load() {
    try {
      await this.data_adapter.load(this);
      this.init();
    } catch (err) {
      this._load_error = err;
      this.on_load_error(err);
    }
  }
  on_load_error(err) {
    this.queue_load();
  }
  /**
   * Validates the item's data before saving.
   * @returns {boolean} True if the data is valid for saving.
   */
  validate_save() {
    if (!this.key) return false;
    if (this.key.trim() === "") return false;
    if (this.key === "undefined") return false;
    return true;
  }
  /**
   * Deletes the item from its collection.
   */
  delete() {
    this.deleted = true;
    this.queue_save();
  }
  /**
   * Filters items in the collection based on provided options.
   * functional filter (returns true or false) for filtering items in collection; called by collection class
   * @param {Object} filter_opts - Filtering options.
   * @param {string} [filter_opts.exclude_key] - A single key to exclude.
   * @param {string[]} [filter_opts.exclude_keys] - An array of keys to exclude. If exclude_key is provided, it's added to this array.
   * @param {string} [filter_opts.exclude_key_starts_with] - Exclude keys starting with this string.
   * @param {string[]} [filter_opts.exclude_key_starts_with_any] - Exclude keys starting with any of these strings.
   * @param {string} [filter_opts.exclude_key_includes] - Exclude keys that include this string.
   * @param {string} [filter_opts.key_ends_with] - Include only keys ending with this string.
   * @param {string} [filter_opts.key_starts_with] - Include only keys starting with this string.
   * @param {string[]} [filter_opts.key_starts_with_any] - Include only keys starting with any of these strings.
   * @param {string} [filter_opts.key_includes] - Include only keys that include this string.
   * @returns {boolean} True if the item passes the filter, false otherwise.
   */
  filter(filter_opts = {}) {
    const {
      exclude_key,
      exclude_keys = exclude_key ? [exclude_key] : [],
      exclude_key_starts_with,
      exclude_key_starts_with_any,
      exclude_key_includes,
      key_ends_with,
      key_starts_with,
      key_starts_with_any,
      key_includes
    } = filter_opts;
    if (exclude_keys?.includes(this.key)) return false;
    if (exclude_key_starts_with && this.key.startsWith(exclude_key_starts_with)) return false;
    if (exclude_key_starts_with_any && exclude_key_starts_with_any.some((prefix) => this.key.startsWith(prefix))) return false;
    if (exclude_key_includes && this.key.includes(exclude_key_includes)) return false;
    if (key_ends_with && !this.key.endsWith(key_ends_with)) return false;
    if (key_starts_with && !this.key.startsWith(key_starts_with)) return false;
    if (key_starts_with_any && !key_starts_with_any.some((prefix) => this.key.startsWith(prefix))) return false;
    if (key_includes && !this.key.includes(key_includes)) return false;
    return true;
  }
  /**
   * Parses the item's data for any necessary processing or transformation. Placeholder for override in child classes.
   */
  parse() {
  }
  /**
   * Retrieves the collection name derived from the class name.
   * @returns {string} The collection name.
   */
  static get collection_key() {
    return collection_instance_name_from(this.name);
  }
  /**
   * Retrieves the collection name for the instance, either from data or the class method.
   * @returns {string} The collection name.
   */
  get collection_key() {
    return collection_instance_name_from(this.constructor.name);
  }
  /**
   * Retrieves the collection this item belongs to.
   * @returns {Object} The collection object.
   */
  get collection() {
    return this.env[this.collection_key];
  }
  /**
   * Retrieves or generates the key for this item.
   * @returns {string} The item's key.
   */
  get key() {
    return this.data?.key || this.get_key();
  }
  /**
   * Provides a reference object for this item, containing the collection name and key.
   * @returns {Object} The reference object.
   */
  get ref() {
    return { collection_key: this.collection_key, key: this.key };
  }
  /**
   * Retrieves string representation of the item, including its key and data.
   * @returns {string} A string representing the item.
   */
  get ajson() {
    return `${JSON.stringify(this.ajson_key)}: ${this.deleted ? "null" : JSON.stringify(this.data)}`;
  }
  get ajson_key() {
    return this.constructor.name + ":" + this.key;
  }
  get data_adapter() {
    return this.collection.data_adapter;
  }
  get multi_ajson_file_name() {
    return this.key.replace(/[\s\/\.]/g, "_").replace(".md", "");
  }
  get data_fs() {
    return this.collection.data_fs;
  }
  get data_path() {
    return this.collection.data_dir + (this.data_fs?.sep || "/") + this.multi_ajson_file_name + ".ajson";
  }
  // settings convenience methods
  get settings() {
    return this.env.settings[this.collection_key];
  }
  set settings(settings) {
    this.env.settings[this.collection_key] = settings;
    this.env.smart_settings.save();
  }
  // COMPONENTS
  async render_item(container, opts = {}) {
    const frag = await this.component.call(this.smart_view, this, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return container;
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  /**
   * Override in child classes to set the component for this item
   * @returns {Function} The render function for this component
   */
  get component() {
    return item_component;
  }
};

// node_modules/smart-collections/components/settings.js
async function render2(scope, opts = {}) {
  const html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const frag = this.create_doc_fragment(html);
  return await post_process2.call(this, scope, frag, opts);
}
async function post_process2(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  return frag;
}

// node_modules/smart-collections/collection.js
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var Collection = class {
  /**
   * Constructs a new Collection instance.
   * @param {Object} env - The environment context containing configurations and adapters.
   */
  constructor(env, opts = {}) {
    this.env = env;
    this.opts = opts;
    if (opts.custom_collection_key) this.collection_key = opts.custom_collection_key;
    this.env[this.collection_key] = this;
    this.config = this.env.config;
    this.items = {};
    this.merge_defaults();
    this.loaded = null;
    this._loading = false;
    this.load_time_ms = null;
    this.settings_container = null;
  }
  static async init(env, opts = {}) {
    env[this.collection_key] = new this(env, opts);
    await env[this.collection_key].init();
    env.collections[this.collection_key] = "init";
  }
  /**
   * Gets the collection name derived from the class name.
   * @return {String} The collection name.
   */
  static get collection_key() {
    return this.name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }
  // INSTANCE METHODS
  async init() {
  }
  /**
   * Creates or updates an item in the collection based on the provided data.
   * @param {Object} data - The data to create or update an item.
   * @returns {Promise<CollectionItem>|CollectionItem} The newly created or updated item.
   */
  create_or_update(data = {}) {
    const existing = this.find_by(data);
    const item = existing ? existing : new this.item_type(this.env);
    item._queue_save = !!!existing;
    const changed = item.update_data(data);
    if (!existing) {
      if (item.validate_save()) this.set(item);
      else {
        console.warn("Invalid item, skipping adding to collection: ", item);
        return item;
      }
    }
    if (existing && !changed) return existing;
    if (item.init instanceof AsyncFunction) return new Promise((resolve, reject) => {
      item.init(data).then(() => resolve(item));
    });
    item.init(data);
    return item;
  }
  /**
   * Finds an item in the collection that matches the given data.
   * @param {Object} data - The criteria used to find the item.
   * @returns {CollectionItem|null} The found item or null if not found.
   */
  find_by(data) {
    if (data.key) return this.get(data.key);
    const temp = new this.item_type(this.env);
    const temp_data = JSON.parse(JSON.stringify(data, temp.sanitize_data(data)));
    deep_merge2(temp.data, temp_data);
    return temp.key ? this.get(temp.key) : null;
  }
  // READ
  /**
   * Filters the items in the collection based on the provided options.
   * @param {Object} filter_opts - The options used to filter the items.
   * @return {CollectionItem[]} The filtered items.
   */
  filter(filter_opts = {}) {
    this.filter_opts = this.prepare_filter(filter_opts);
    const results = [];
    const { limit } = this.filter_opts;
    for (const item of Object.values(this.items)) {
      if (limit && results.length >= limit) break;
      if (item.filter(filter_opts)) {
        results.push(item);
      }
    }
    return results;
  }
  // alias for filter
  list(filter_opts) {
    return this.filter(filter_opts);
  }
  /**
   * Prepares filter options for use in the filter implementation.
   * Used by sub-classes to convert simplified filter options into filter_opts compatible with the filter implementation.
   * @param {Object} filter_opts - The original filter options provided.
   * @returns {Object} The prepared filter options compatible with the filter implementation.
   */
  prepare_filter(filter_opts) {
    return filter_opts;
  }
  /**
   * Retrieves a single item from the collection based on the provided strategy and options.
   * @param {String} key - The key of the item to retrieve.
   * @return {CollectionItem} The retrieved item.
   */
  get(key) {
    return this.items[key];
  }
  /**
   * Retrieves multiple items from the collection based on the provided keys.
   * @param {String[]} keys - The keys of the items to retrieve.
   * @return {CollectionItem[]} The retrieved items.
   */
  get_many(keys = []) {
    if (Array.isArray(keys)) return keys.map((key) => this.get(key)).filter(Boolean);
    console.error("get_many called with non-array keys: ", keys);
  }
  /**
   * Retrieves a random item from the collection based on the provided options.
   * @param {Object} opts - The options used to retrieve the item.
   * @return {CollectionItem} The retrieved item.
   */
  get_rand(opts = null) {
    if (opts) {
      const filtered = this.filter(opts);
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    return this.items[this.keys[Math.floor(Math.random() * this.keys.length)]];
  }
  // UPDATE
  /**
   * Adds or updates an item in the collection.
   * @param {CollectionItem} item - The item to add or update.
   */
  set(item) {
    if (!item.key) throw new Error("Item must have key property");
    this.items[item.key] = item;
  }
  /**
   * Updates multiple items in the collection based on the provided keys and data.
   * @param {String[]} keys - The keys of the items to update.
   * @param {Object} data - The data to update the items with.
   */
  update_many(keys = [], data = {}) {
    this.get_many(keys).forEach((item) => item.update_data(data));
  }
  // DESTROY
  /**
   * Clears all items from the collection.
   */
  clear() {
    this.items = {};
  }
  /**
   * Deletes an item from the collection based on its key.
   * Does not trigger save or delete from adapter data.
   * @param {String} key - The key of the item to delete.
   */
  delete_item(key) {
    delete this.items[key];
  }
  /**
   * Deletes multiple items from the collection based on their keys.
   * @param {String[]} keys - The keys of the items to delete.
   */
  delete_many(keys = []) {
    keys.forEach((key) => {
      this.items[key].delete();
    });
  }
  // CONVENIENCE METHODS (namespace getters)
  /**
   * Gets or sets the collection name. If a name is set, it overrides the default name.
   * @param {String} name - The new collection name.
   */
  get collection_key() {
    return this._collection_key ? this._collection_key : this.constructor.collection_key;
  }
  set collection_key(name) {
    this._collection_key = name;
  }
  // DATA ADAPTER
  get data_adapter() {
    if (!this._data_adapter) {
      const config = this.env.opts.collections?.[this.collection_key];
      const data_adapter_class = config?.data_adapter ?? this.env.opts.collections?.smart_collections?.data_adapter;
      if (!data_adapter_class) throw new Error("No data adapter class found for " + this.collection_key + " or smart_collections");
      this._data_adapter = new data_adapter_class(this);
    }
    return this._data_adapter;
  }
  get data_dir() {
    return "multi";
  }
  get data_fs() {
    return this.env.data_fs;
  }
  /**
   * Gets the class name of the item type the collection manages.
   * @return {String} The item class name.
   */
  get item_class_name() {
    const name = this.constructor.name;
    if (name.endsWith("ies")) return name.slice(0, -3) + "y";
    else if (name.endsWith("s")) return name.slice(0, -1);
    else return name + "Item";
  }
  /**
   * Gets the name of the item type the collection manages, derived from the class name.
   * @return {String} The item name.
   */
  get item_name() {
    return this.item_class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }
  /**
   * Gets the constructor of the item type the collection manages.
   * @return {Function} The item type constructor.
   */
  get item_type() {
    return this.env.item_types[this.item_class_name];
  }
  /**
   * Gets the keys of the items in the collection.
   * @return {String[]} The keys of the items.
   */
  get keys() {
    return Object.keys(this.items);
  }
  /**
   * @deprecated use data_adapter instead (2024-09-14)
   */
  get adapter() {
    return this.data_adapter;
  }
  /**
   * Gets the data path from the environment.
   * @deprecated use env.env_data_dir
   * @returns {string} The data path.
   */
  get data_path() {
    return this.env.data_path;
  }
  // DEPRECATED
  // ADAPTER METHODS
  /**
   * Saves the current state of the collection.
   */
  async save() {
    await this.data_adapter.save();
  }
  async save_queue() {
    await this.process_save_queue();
  }
  // UTILITY METHODS
  /**
   * Merges default configurations from all classes in the inheritance chain for Collection types; 
   * e.g. EntityCollection, NoteCollection, etc.
   */
  merge_defaults() {
    let current_class = this.constructor;
    while (current_class) {
      const col_conf = this.config?.collections?.[current_class.collection_key];
      Object.entries(typeof col_conf === "object" ? col_conf : {}).forEach(([key, value]) => this[key] = value);
      current_class = Object.getPrototypeOf(current_class);
    }
  }
  async process_save_queue() {
    this.notices?.show("saving", "Saving " + this.collection_key + "...", { timeout: 0 });
    if (this._saving) return console.log("Already saving");
    this._saving = true;
    setTimeout(() => {
      this._saving = false;
    }, 1e4);
    const save_queue = Object.values(this.items).filter((item) => item._queue_save);
    console.log("Saving " + this.collection_key + ": ", save_queue.length + " items");
    const time_start = Date.now();
    await Promise.all(save_queue.map((item) => item.save()));
    console.log("Saved " + this.collection_key + " in " + (Date.now() - time_start) + "ms");
    this._saving = false;
    this.notices?.remove("saving");
  }
  async process_load_queue() {
    this.notices?.show("loading", "Loading " + this.collection_key + "...", { timeout: 0 });
    if (this._loading) return console.log("Already loading");
    this._loading = true;
    setTimeout(() => {
      this._loading = false;
    }, 1e4);
    const load_queue = Object.values(this.items).filter((item) => item._queue_load);
    console.log("Loading " + this.collection_key + ": ", load_queue.length + " items");
    const time_start = Date.now();
    const batch_size = 100;
    for (let i = 0; i < load_queue.length; i += batch_size) {
      const batch = load_queue.slice(i, i + batch_size);
      await Promise.all(batch.map((item) => item.load()));
    }
    this.env.collections[this.collection_key] = "loaded";
    this.load_time_ms = Date.now() - time_start;
    console.log("Loaded " + this.collection_key + " in " + this.load_time_ms + "ms");
    this._loading = false;
    this.loaded = load_queue.length;
    this.notices?.remove("loading");
  }
  get settings_config() {
    return this.process_settings_config({});
  }
  process_settings_config(_settings_config, prefix = "") {
    const add_prefix = (key) => prefix && !key.includes(`${prefix}.`) ? `${prefix}.${key}` : key;
    return Object.entries(_settings_config).reduce((acc, [key, val]) => {
      let new_val = { ...val };
      if (new_val.conditional) {
        if (!new_val.conditional(this)) return acc;
        delete new_val.conditional;
      }
      if (new_val.callback) {
        new_val.callback = add_prefix(new_val.callback);
      }
      if (new_val.btn_callback) {
        new_val.btn_callback = add_prefix(new_val.btn_callback);
      }
      if (new_val.options_callback) {
        new_val.options_callback = add_prefix(new_val.options_callback);
      }
      const new_key = add_prefix(this.process_setting_key(key));
      acc[new_key] = new_val;
      return acc;
    }, {});
  }
  process_setting_key(key) {
    return key;
  }
  // override in sub-class if needed for prefixes and variable replacements
  get default_settings() {
    return {};
  }
  get settings() {
    if (!this.env.settings[this.collection_key]) {
      this.env.settings[this.collection_key] = this.default_settings;
    }
    return this.env.settings[this.collection_key];
  }
  get render_settings_component() {
    return (typeof this.opts.components?.settings === "function" ? this.opts.components.settings : render2).bind(this.smart_view);
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  /**
   * Renders the settings for the collection.
   * @param {HTMLElement} container - The container element to render the settings into.
   * @param {Object} opts - Additional options for rendering.
   * @param {Object} opts.settings_keys - An array of keys to render.
   */
  async render_settings(container = this.settings_container, opts = {}) {
    if (!this.settings_container || container !== this.settings_container) this.settings_container = container;
    if (!container) throw new Error("Container is required");
    container.innerHTML = "";
    container.innerHTML = '<div class="sc-loading">Loading ' + this.collection_key + " settings...</div>";
    const frag = await this.render_settings_component(this, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    this.smart_view.on_open_overlay(container);
    return container;
  }
  unload() {
    this.clear();
  }
  async run_load() {
    this.loaded = null;
    this.load_time_ms = null;
    Object.values(this.items).forEach((item) => item.queue_load());
    this.notices?.show(`loading ${this.collection_key}`, `Loading ${this.collection_key}...`, { timeout: 0 });
    await this.process_load_queue();
    this.notices?.remove(`loading ${this.collection_key}`);
    this.notices?.show("done loading", `${this.collection_key} loaded`, { timeout: 3e3 });
    this.render_settings();
  }
};

// node_modules/smart-sources/node_modules/smart-entities/utils/sort_by_score.js
function sort_by_score(a, b) {
  const epsilon = 1e-9;
  const score_diff = a.score - b.score;
  if (Math.abs(score_diff) < epsilon) return 0;
  return score_diff > 0 ? -1 : 1;
}

// node_modules/smart-sources/node_modules/smart-entities/adapters/_adapter.js
var EntityAdapter = class {
  constructor(smart_entity) {
    this.smart_entity = smart_entity;
  }
  get data() {
    return this.smart_entity.data;
  }
  get embed_model_key() {
    return this.smart_entity.embed_model_key;
  }
  get vec() {
    return this.data?.embeddings?.[this.embed_model_key]?.vec;
  }
  set vec(vec) {
    if (!this.data.embeddings) {
      this.data.embeddings = {};
    }
    if (!this.data.embeddings[this.embed_model_key]) {
      this.data.embeddings[this.embed_model_key] = {};
    }
    this.data.embeddings[this.embed_model_key].vec = vec;
  }
};

// node_modules/smart-sources/node_modules/smart-entities/components/entity.js
async function render3(scope, opts = {}) {
  const markdown = await get_markdown(scope);
  const frag = await this.render_markdown(markdown, scope);
  return await post_process3.call(this, scope, frag, opts);
}
async function get_markdown(scope) {
  return should_render_embed(scope) ? scope.embed_link : (await scope.get_content())?.replace(/```dataview/g, "```\\dataview");
}
async function post_process3(scope, frag, opts = {}) {
  return frag;
}
function should_render_embed(entity) {
  if (!entity) return false;
  if (entity.is_canvas) return true;
  if (entity.is_excalidraw) return true;
  if (entity.source?.is_canvas) return true;
  if (entity.source?.is_excalidraw) return true;
  return false;
}

// node_modules/smart-sources/node_modules/smart-entities/smart_entity.js
var SmartEntity = class extends CollectionItem {
  constructor(env, opts = {}) {
    super(env, opts);
    this.entity_adapter = new EntityAdapter(this);
  }
  static get defaults() {
    return {
      data: {
        path: null,
        embeddings: {},
        // contains keys per model
        embedding: {}
        // DEPRECATED
      }
    };
  }
  init() {
    super.init();
    if (!this.vec) this.queue_embed();
    Object.entries(this.data.embeddings || {}).forEach(([model, embedding]) => {
      if (model !== this.embed_model_key) {
        this.data.embeddings[model] = null;
        delete this.data.embeddings[model];
      }
    });
  }
  queue_embed() {
    this._queue_embed = true;
  }
  nearest(filter = {}) {
    return this.collection.nearest_to(this, filter);
  }
  async get_as_context(params = {}) {
    return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${await this.get_content()}
---END NOTE${params.i ? " " + params.i : ""}---`;
  }
  async get_embed_input() {
  }
  // override in child class
  // find_connections v2 (smart action)
  prepare_find_connections_filter_opts(params = {}) {
    const opts = {
      ...this.env.settings.smart_view_filter || {},
      ...params,
      entity: this
    };
    if (opts.filter?.limit) delete opts.filter.limit;
    if (opts.limit) delete opts.limit;
    return opts;
  }
  find_connections(params = {}) {
    const filter_opts = this.prepare_find_connections_filter_opts(params);
    const limit = params.filter?.limit || params.limit || this.env.settings.smart_view_filter?.results_limit || 10;
    const cache_key = this.key + JSON.stringify(params);
    if (!this.env.connections_cache) this.env.connections_cache = {};
    if (!this.env.connections_cache[cache_key]) {
      const connections = this.nearest(filter_opts).sort(sort_by_score).slice(0, limit);
      this.connections_to_cache(cache_key, connections);
    }
    return this.connections_from_cache(cache_key);
  }
  connections_from_cache(cache_key) {
    return this.env.connections_cache[cache_key];
  }
  connections_to_cache(cache_key, connections) {
    this.env.connections_cache[cache_key] = connections;
  }
  // getters
  get embed_link() {
    return `![[${this.path}]]`;
  }
  get embed_model_key() {
    return this.collection.embed_model_key;
  }
  get name() {
    return (!this.should_show_full_path ? this.path.split("/").pop() : this.path.split("/").join(" > ")).split("#").join(" > ").replace(".md", "");
  }
  get should_show_full_path() {
    return this.env.settings.show_full_path;
  }
  /**
   * @deprecated Use this.embed_model instead
   */
  get smart_embed() {
    return this.embed_model;
  }
  get embed_model() {
    return this.collection.embed_model;
  }
  get tokens() {
    return this.data.embeddings[this.embed_model_key]?.tokens;
  }
  get is_unembedded() {
    if (this.vec) return false;
    if (this.size < (this.collection.embed_model_settings?.min_chars || 300)) return false;
    return true;
  }
  get should_embed() {
    return true;
  }
  // may override in child class
  // setters
  set error(error) {
    this.data.embeddings[this.embed_model_key].error = error;
  }
  set tokens(tokens) {
    if (!this.data.embeddings) this.data.embeddings = {};
    if (!this.data.embeddings[this.embed_model_key]) this.data.embeddings[this.embed_model_key] = {};
    this.data.embeddings[this.embed_model_key].tokens = tokens;
  }
  // ADAPTER METHODS
  get vec() {
    return this.entity_adapter.vec;
  }
  set vec(vec) {
    this.entity_adapter.vec = vec;
    this._queue_embed = false;
    this._embed_input = null;
    this.queue_save();
  }
  remove_embeddings() {
    this.data.embeddings = null;
    this.queue_save();
  }
  // SmartSources (how might this be better done?)
  get_key() {
    return this.data.key || this.data.path;
  }
  get path() {
    return this.data.path;
  }
  // COMPONENTS
  get component() {
    return render3;
  }
};

// node_modules/smart-sources/node_modules/smart-entities/top_acc.js
function results_acc(_acc, result, ct = 10) {
  if (_acc.results.size < ct) {
    _acc.results.add(result);
  } else if (result.score > _acc.min) {
    _acc.results.add(result);
    _acc.results.delete(_acc.minResult);
    _acc.minResult = Array.from(_acc.results).reduce((min, curr) => curr.score < min.score ? curr : min);
    _acc.min = _acc.minResult.score;
  }
}

// node_modules/smart-sources/node_modules/smart-entities/cos_sim.js
function cos_sim(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error("Vectors must have the same length");
  }
  let dot_product = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  const epsilon = 1e-8;
  for (let i = 0; i < vector1.length; i++) {
    dot_product += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  if (magnitude1 < epsilon || magnitude2 < epsilon) {
    return 0;
  }
  return dot_product / (magnitude1 * magnitude2);
}

// node_modules/smart-sources/node_modules/smart-entities/smart_entities.js
var SmartEntities = class extends Collection {
  constructor(env, opts) {
    super(env, opts);
    this.model_instance_id = null;
    this.is_processing_queue = false;
    this.queue_total = 0;
    this.embedded_total = 0;
    this.is_queue_halted = false;
    this.total_tokens = 0;
    this.total_time = 0;
  }
  async init() {
    await super.init();
    await this.load_smart_embed();
    if (!this.embed_model) {
      console.log(`SmartEmbed not loaded for ${this.collection_key}. Continuing without embedding capabilities.`);
    }
  }
  async load_smart_embed() {
    if (this.embed_model_key === "None") return;
    if (!this.embed_model) return;
    if (this.embed_model.loading) return console.log(`SmartEmbedModel already loading for ${this.embed_model_key}`);
    if (this.embed_model.loaded) return console.log(`SmartEmbedModel already loaded for ${this.embed_model_key}`);
    try {
      await this.embed_model.load();
    } catch (e) {
      console.error(`Error loading SmartEmbedModel for ${this.embed_model_key}`);
      console.error(e);
      if (this.env.smart_connections_plugin?.settings?.legacy_transformers) {
        console.log("Switching to legacy transformers");
        this.settings.embed_model[this.embed_model_key] = this.env.smart_connections_plugin.settings.legacy_transformers;
        this.env.smart_connections_plugin.settings.legacy_transformers = null;
        delete this.env.smart_connections_plugin.settings.legacy_transformers;
        await this.embed_model_changed();
      }
    }
  }
  async unload() {
    if (typeof this.embed_model?.unload === "function") {
      await this.embed_model.unload();
      this._embed_model = null;
    }
    super.unload();
  }
  get embed_model_key() {
    return this.settings?.embed_model?.model_key || "TaylorAI/bge-micro-v2";
  }
  get embed_model_settings() {
    if (!this.settings.embed_model) this.settings.embed_model = {};
    if (!this.settings.embed_model?.[this.embed_model_key]) this.settings.embed_model[this.embed_model_key] = {};
    return this.settings.embed_model[this.embed_model_key];
  }
  get smart_embed_container() {
    if (!this.model_instance_id) return console.log("model_key not set");
    const id = this.model_instance_id.replace(/[^a-zA-Z0-9]/g, "_");
    if (!window.document) return console.log("window.document not available");
    if (window.document.querySelector(`#${id}`)) return window.document.querySelector(`#${id}`);
    const container = window.document.createElement("div");
    container.id = id;
    window.document.body.appendChild(container);
    return container;
  }
  /**
   * @deprecated use embed_model instead
   */
  get smart_embed() {
    return this.embed_model;
  }
  get embed_model() {
    if (this.embed_model_key === "None") return null;
    if (!this._embed_model && this.env.opts.modules.smart_embed_model?.class) this._embed_model = new this.env.opts.modules.smart_embed_model.class(this.env, {
      model_key: this.embed_model_key,
      ...this.settings.embed_model?.[this.embed_model_key] || {},
      settings: this.settings.embed_model
    });
    return this._embed_model;
  }
  nearest_to(entity, filter = {}) {
    return this.nearest(entity.vec, filter);
  }
  /**
   * Finds the nearest entities to a vector.
   * @param {Array<number>} vec 
   * @param {Object} filter 
   * @returns {<Result[]>} Result objects with score and item
   */
  nearest(vec, filter = {}) {
    if (!vec) return console.log("no vec");
    const {
      limit = 50
      // DO: default configured in settings
    } = filter;
    const nearest = this.filter(filter).reduce((acc, item) => {
      if (!item.vec) return acc;
      const result = { item, score: cos_sim(vec, item.vec) };
      results_acc(acc, result, limit);
      return acc;
    }, { min: 0, results: /* @__PURE__ */ new Set() });
    return Array.from(nearest.results);
  }
  get file_name() {
    return this.collection_key + "-" + this.embed_model_key.split("/").pop();
  }
  // get data_dir() { return this.env.env_data_dir + "/" + this.embed_model_key.replace("/", "_"); }
  /**
   * Calculates the relevance of an item based on the search filter.
   * 
   * @param {Object} item - The item to calculate relevance for.
   * @param {Object} search_filter - The search filter containing keywords.
   * @returns {number} The relevance score:
   *                   1 if any keyword is found in the item's path,
   *                   0 otherwise (default relevance for keyword in content).
   */
  calculate_relevance(item, search_filter) {
    if (search_filter.keywords.some((keyword) => item.path?.includes(keyword))) return 1;
    return 0;
  }
  /**
   * Overrides the prepare_filter method to add entity-based filters.
   * This method requires the entity to be set in the options.
   * 
   * @param {Object} opts - The filter options.
   * @param {Object} opts.entity - The entity to base the filters on.
   * @param {string|string[]} opts.exclude_filter - Keys or prefixes to exclude.
   * @param {string|string[]} opts.include_filter - Keys or prefixes to include.
   * @param {boolean} opts.exclude_inlinks - Whether to exclude inlinks of the entity.
   * @param {boolean} opts.exclude_outlinks - Whether to exclude outlinks of the entity.
   * @returns {Object} The modified filter options.
   */
  prepare_filter(opts = {}) {
    const {
      entity,
      exclude_filter,
      include_filter,
      exclude_inlinks,
      exclude_outlinks
    } = opts;
    if (entity) {
      if (typeof opts.exclude_key_starts_with_any === "undefined") opts.exclude_key_starts_with_any = [];
      if (opts.exclude_key_starts_with) {
        opts.exclude_key_starts_with_any = [
          opts.exclude_key_starts_with
        ];
        delete opts.exclude_key_starts_with;
      }
      opts.exclude_key_starts_with_any.push(entity.source_key || entity.key);
      if (exclude_filter) {
        if (typeof exclude_filter === "string") opts.exclude_key_starts_with_any.push(exclude_filter);
        else if (Array.isArray(exclude_filter)) opts.exclude_key_starts_with_any.push(...exclude_filter);
      }
      if (include_filter) {
        if (!Array.isArray(opts.key_starts_with_any)) opts.key_starts_with_any = [];
        if (typeof include_filter === "string") opts.key_starts_with_any.push(include_filter);
        else if (Array.isArray(include_filter)) opts.key_starts_with_any.push(...include_filter);
      }
      if (exclude_inlinks && this.env.links[entity.path]) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...Object.keys(this.env.links[entity.path] || {}));
      }
      if (exclude_outlinks) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...entity.outlink_paths);
      }
    }
    return opts;
  }
  /**
   * Lookup entities based on hypotheticals.
   * @param {Object} params - The parameters for the lookup.
   * @param {Array} params.hypotheticals - The hypotheticals to lookup.
   * @param {Object} params.filter - The filter to use for the lookup.
   * @returns {Promise<Array>} The results of the lookup (Result objects with score and item)
   */
  async lookup(params = {}) {
    const { hypotheticals = [] } = params;
    if (!hypotheticals?.length) return { error: "hypotheticals is required" };
    if (!this.smart_embed) return { error: "Embedding search is not enabled." };
    const hyp_vecs = await this.smart_embed.embed_batch(hypotheticals.map((h) => ({ embed_input: h })));
    const limit = params.filter?.limit || params.k || this.env.settings.lookup_k || 10;
    if (params.filter?.limit) delete params.filter.limit;
    const filter = {
      ...this.env.chats?.current?.scope || {},
      ...params.filter || {}
    };
    const results = hyp_vecs.reduce((acc, embedding, i) => {
      const results2 = this.nearest(embedding.vec, filter);
      results2.forEach((result) => {
        if (!acc[result.item.path] || result.score > acc[result.item.path].score) {
          acc[result.item.path] = {
            key: result.item.key,
            score: result.score,
            item: result.item,
            entity: result.item,
            // DEPRECATED: for temporary backwards compatibility (use item instead)
            hypothetical_i: i
          };
        } else {
          result.score = acc[result.item.path].score;
        }
      });
      return acc;
    }, {});
    const top_k = Object.values(results).sort(sort_by_score).slice(0, limit);
    console.log(`Found and returned ${top_k.length} ${this.collection_key}.`);
    return top_k;
  }
  get settings_config() {
    return {
      ...super.settings_config,
      ...this.embed_model?.settings_config || {},
      ...settings_config
    };
  }
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  get embed_queue() {
    return Object.values(this.items).filter((item) => item._queue_embed && item.should_embed);
  }
  async process_embed_queue() {
    try {
      if (this.embed_model_key === "None") return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (!this.embed_model) return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (this.is_queue_halted || this.is_processing_queue) return console.log(`Smart Connections: Embed queue processing already in progress for ${this.collection_key}`);
      this.is_processing_queue = true;
      const datetime_start = /* @__PURE__ */ new Date();
      const queue = this.embed_queue;
      const datetime_end = /* @__PURE__ */ new Date();
      console.log(`Time spent getting embed queue: ${datetime_end.getTime() - datetime_start.getTime()}ms`);
      this.queue_total = queue.length;
      if (!this.queue_total) {
        this.is_processing_queue = false;
        return console.log(`Smart Connections: No items in ${this.collection_key} embed queue`);
      }
      console.log(`Processing ${this.collection_key} embed queue: ${this.queue_total} items`);
      for (let i = this.embedded_total; i < this.queue_total; i += this.embed_model.batch_size) {
        if (this.is_queue_halted) break;
        const batch = queue.slice(i, i + this.embed_model.batch_size);
        await Promise.all(batch.map((item) => item.get_embed_input()));
        const start_time = Date.now();
        await this.embed_model.embed_batch(batch);
        this.total_time += Date.now() - start_time;
        this.embedded_total += batch.length;
        this.total_tokens += batch.reduce((acc, item) => acc + (item.tokens || 0), 0);
        this._show_embed_progress_notice();
      }
      this.is_processing_queue = false;
      if (!this.is_queue_halted) this._embed_queue_complete();
    } catch (e) {
      this.is_processing_queue = false;
      console.error(`Error processing ${this.collection_key} embed queue: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  _show_embed_progress_notice() {
    if (this.is_queue_halted) return;
    if (this.embedded_total - this.last_notice_embedded_total < 100) return;
    this.last_notice_embedded_total = this.embedded_total;
    const pause_btn = { text: "Pause", callback: this.halt_embed_queue_processing.bind(this), stay_open: true };
    this.notices?.show(
      "embedding_progress",
      [
        `Making Smart Connections...`,
        `Embedding progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.smart_embed.opts.model_key}`
      ],
      {
        timeout: 0,
        button: pause_btn
      }
    );
  }
  _show_embed_completion_notice() {
    this.notices?.remove("embedding_progress");
    this.notices?.show("embedding_complete", [
      `Embedding complete.`,
      `${this.embedded_total} entities embedded.`,
      `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.smart_embed.opts.model_key}`
    ], { timeout: 1e4 });
  }
  _calculate_embed_tokens_per_second() {
    const elapsed_time = this.total_time / 1e3;
    return Math.round(this.total_tokens / elapsed_time);
  }
  _embed_queue_complete() {
    this.is_processing_queue = false;
    if (this.completed_embed_queue_timeout) clearTimeout(this.completed_embed_queue_timeout);
    this.completed_embed_queue_timeout = setTimeout(() => {
      this._show_embed_completion_notice();
      this._reset_embed_queue_stats();
      this.env.save();
    }, 3e3);
  }
  _reset_embed_queue_stats() {
    this.embedded_total = 0;
    this.queue_total = 0;
    this.total_tokens = 0;
    this.total_time = 0;
    this.last_notice_embedded_total = 0;
    this.is_processing_queue = false;
    this.is_queue_halted = false;
  }
  halt_embed_queue_processing() {
    this.is_queue_halted = true;
    console.log("Embed queue processing halted");
    this.notices?.remove("embedding_progress");
    this.notices?.show(
      "embedding_paused",
      [
        `Embedding paused.`,
        `Progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.smart_embed.opts.model_key}`
      ],
      {
        timeout: 0,
        button: { text: "Resume", callback: () => this.resume_embed_queue_processing(0) }
      }
    );
    this.env.save();
  }
  resume_embed_queue_processing(delay = 0) {
    console.log("resume_embed_queue_processing");
    this.is_queue_halted = false;
    setTimeout(() => {
      this.embedded_total = 0;
      this.process_embed_queue();
    }, delay);
  }
  async embed_model_changed() {
    await this.unload();
    await this.init();
    this.render_settings();
    await this.process_load_queue();
  }
};
var settings_config = {
  // TODO
};

// node_modules/smart-sources/components/source.js
async function render4(scope, opts = {}) {
  const markdown = await get_markdown2(scope);
  const frag = await this.render_markdown(markdown, scope);
  return await post_process4.call(this, scope, frag, opts);
}
async function get_markdown2(scope) {
  return should_render_embed2(scope) ? scope.embed_link : (await scope.get_content())?.replace(/```dataview/g, "```\\dataview");
}
async function post_process4(scope, frag, opts = {}) {
  return frag;
}
function should_render_embed2(entity) {
  if (!entity) return false;
  if (entity.is_canvas || entity?.source?.is_canvas) return true;
  if (entity.is_excalidraw || entity?.source?.is_excalidraw) return true;
  if (entity.file_type !== "md") return true;
  return false;
}

// node_modules/smart-sources/smart_source.js
var SmartSource = class extends SmartEntity {
  static get defaults() {
    return {
      data: {
        history: []
        // array of { mtime, hash, length, blocks[] }
      },
      _embed_input: null,
      // stored temporarily
      _queue_load: true
    };
  }
  init() {
    super.init();
    if (!this.data.blocks) this.queue_import();
  }
  // moved logic from SmartSources import() method
  queue_import() {
    this._queue_import = true;
  }
  async import() {
    this._queue_import = false;
    try {
      if (this.file_type === "md" && this.file.stat.size > 1e6) {
        console.log(`Smart Connections: Skipping large file: ${this.path}`);
        return;
      }
      if (await this.data_fs.exists(this.data_path)) {
        if (this.loaded_at && (this.env.fs.files[this.data_path] && this.env.fs.files[this.data_path].mtime > this.loaded_at + 1 * 60 * 1e3)) {
          console.log(`Smart Connections: Re-loading data source for ${this.path} because it has been updated on disk`);
          return await this.load();
        }
      }
      if (this.meta_changed) {
        this.data.blocks = null;
        await this.save(super.ajson);
        this.data.mtime = this.file.stat.mtime;
        this.data.size = this.file.stat.size;
        await this.source_adapter.import();
        this.loaded_at = Date.now();
        this.queue_embed();
      }
    } catch (err) {
      this.queue_import();
      console.error(err, err.stack);
    }
  }
  find_connections(params = {}) {
    let connections;
    if (this.block_collection.settings.embed_blocks && params.exclude_source_connections) connections = [];
    else connections = super.find_connections(params);
    const filter_opts = this.prepare_find_connections_filter_opts(params);
    const limit = params.filter?.limit || params.limit || this.env.settings.smart_view_filter?.results_limit || 20;
    if (params.filter?.limit) delete params.filter.limit;
    if (params.limit) delete params.limit;
    if (!params.exclude_blocks_from_source_connections) {
      const cache_key = this.key + JSON.stringify(params) + "_blocks";
      if (!this.env.connections_cache) this.env.connections_cache = {};
      if (!this.env.connections_cache[cache_key]) {
        const nearest = this.env.smart_blocks.nearest(this.vec, filter_opts).sort(sort_by_score).slice(0, limit);
        this.connections_to_cache(cache_key, nearest);
      }
      connections = [
        ...connections,
        ...this.connections_from_cache(cache_key)
      ].sort(sort_by_score).slice(0, limit);
    }
    return connections;
  }
  async get_embed_input() {
    if (typeof this._embed_input === "string" && this._embed_input.length) return this._embed_input;
    let content = await this.read();
    if (this.excluded_lines.length) {
      const content_lines = content.split("\n");
      this.excluded_lines.forEach((lines) => {
        const { start, end } = lines;
        for (let i = start; i <= end; i++) {
          content_lines[i] = "";
        }
      });
      content = content_lines.filter((line) => line.length).join("\n");
    }
    const breadcrumbs = this.path.split("/").join(" > ").replace(".md", "");
    const max_tokens = this.collection.smart_embed.max_tokens;
    this._embed_input = `${breadcrumbs}:
${content}`.substring(0, max_tokens * 4);
    return this._embed_input;
  }
  open() {
    this.env.smart_connections_plugin.open_note(this.path);
  }
  get_block_by_line(line) {
    return Object.entries(this.data.blocks || {}).reduce((acc, [sub_key, range]) => {
      if (acc) return acc;
      if (range[0] <= line && range[1] >= line) {
        const block = this.block_collection.get(this.key + sub_key);
        if (block?.vec) return block;
      }
      return acc;
    }, null);
  }
  /**
   * Checks if the source file exists in the file system.
   * @returns {Promise<boolean>} A promise that resolves to true if the file exists, false otherwise.
   */
  async has_source_file() {
    return await this.fs.exists(this.path);
  }
  // CRUD
  /**
   * FILTER/SEARCH METHODS
   */
  /**
   * Searches for keywords within the entity's data and content.
   * @param {Object} search_filter - The search filter object.
   * @param {string[]} search_filter.keywords - An array of keywords to search for.
   * @param {string} [search_filter.type='any'] - The type of search to perform. 'any' counts all matching keywords, 'all' counts only if all keywords match.
   * @returns {Promise<number>} A promise that resolves to the number of matching keywords.
   */
  async search(search_filter = {}) {
    const { keywords, type = "any", limit } = search_filter;
    if (!keywords || !Array.isArray(keywords)) {
      console.warn("Entity.search: keywords not set or is not an array");
      return 0;
    }
    if (limit && this.collection.search_results_ct >= limit) return 0;
    const lowercased_keywords = keywords.map((keyword) => keyword.toLowerCase());
    const content = await this.read();
    const lowercased_content = content.toLowerCase();
    const lowercased_path = this.path.toLowerCase();
    const matching_keywords = lowercased_keywords.filter(
      (keyword) => lowercased_path.includes(keyword) || lowercased_content.includes(keyword)
    );
    if (type === "all") {
      return matching_keywords.length === lowercased_keywords.length ? matching_keywords.length : 0;
    } else {
      return matching_keywords.length;
    }
  }
  /**
   * ADAPTER METHODS
   */
  /**
   * Appends content to the end of the source file.
   * @param {string} content - The content to append to the file.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async append(content) {
    await this.source_adapter.append(content);
    await this.import();
  }
  /**
   * Updates the entire content of the source file.
   * @param {string} full_content - The new content to write to the file.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async update(full_content, opts = {}) {
    try {
      await this.source_adapter.update(full_content, opts);
      await this.import();
    } catch (error) {
      console.error("Error during update:", error);
      throw error;
    }
  }
  // Add these underscore methods back
  async _update(content) {
    await this.source_adapter._update(content);
  }
  /**
   * Reads the entire content of the source file.
   * @returns {Promise<string>} A promise that resolves with the content of the file.
   */
  async read(opts = {}) {
    try {
      const content = await this.source_adapter.read(opts);
      return content;
    } catch (error) {
      console.error("Error during read:", error);
      throw error;
    }
  }
  async _read() {
    return await this.source_adapter._read();
  }
  /**
   * Removes the source file from the file system and deletes the entity.
   * This is different from delete() because it also removes the source file.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async remove() {
    try {
      await this.source_adapter.remove();
    } catch (error) {
      console.error("Error during remove:", error);
      throw error;
    }
  }
  async destroy() {
    await this.remove();
  }
  /**
   * Moves the current source to a new location.
   * Handles the destination as a string (new path) or entity (block or source).
   * 
   * @param {string|Object|SmartEntity} entity_ref - The destination path or entity to move to.
   * @throws {Error} If the entity reference is invalid.
   * @returns {Promise<void>} A promise that resolves when the move operation is complete.
   */
  async move_to(entity_ref) {
    try {
      await this.source_adapter.move_to(entity_ref);
    } catch (error) {
      console.error("error_during_move:", error);
      throw error;
    }
  }
  /**
   * Merges the given content into the current source.
   * Parses the content into blocks and either appends to existing blocks, replaces blocks, or replaces all content.
   * 
   * @param {string} content - The content to merge into the current source.
   * @param {Object} opts - Options object.
   * @param {string} opts.mode - The merge mode: 'append', 'replace_blocks', or 'replace_all'. Default is 'append'.
   * @returns {Promise<void>}
   */
  async merge(content, opts = {}) {
    try {
      await this.source_adapter.merge(content, opts);
      await this.import();
    } catch (error) {
      console.error("Error during merge:", error);
      throw error;
    }
  }
  // SUBCLASS OVERRIDES
  async save() {
    if (this.deleted) return await super.save(super.ajson);
    const blocks_to_save = this.blocks.filter((block) => block._queue_save);
    const ajson = [
      super.ajson,
      ...blocks_to_save.map((block) => block.ajson).filter((ajson2) => ajson2)
    ].join("\n");
    await super.save(ajson);
    blocks_to_save.forEach((block) => {
      block._queue_save = false;
      if (block.deleted && this.block_collection.items[block.key]) {
        this.block_collection.delete_item(block.key);
      }
    });
  }
  on_load_error(err) {
    super.on_load_error(err);
    if (err.code === "ENOENT") {
      this._queue_load = false;
      this.queue_import();
    }
  }
  // GETTERS
  get block_collection() {
    return this.env.smart_blocks;
  }
  get block_vecs() {
    return this.blocks.map((block) => block.vec).filter((vec) => vec);
  }
  // filter out blocks without vec
  get blocks() {
    if (this.data.blocks) return this.block_collection.get_many(Object.keys(this.data.blocks).map((key) => this.key + key));
    else if (this.last_history) return this.block_collection.get_many(Object.keys(this.last_history.blocks));
    return [];
  }
  /**
   * @deprecated only for backwards compatibility in this.blocks (2024-09-30)
   */
  get last_history() {
    return this.data.history?.length ? this.data.history[this.data.history.length - 1] : null;
  }
  get data_path() {
    return this.collection.data_dir + "/" + this.multi_ajson_file_name + ".ajson";
  }
  get data_file() {
    return this.data_fs.files[this.data_path];
  }
  get embed_input() {
    return this._embed_input ? this._embed_input : this.get_embed_input();
  }
  get excluded() {
    return this.fs.is_excluded(this.path);
  }
  get excluded_lines() {
    return this.blocks.filter((block) => block.excluded).map((block) => block.lines);
  }
  get file() {
    return this.fs.files[this.path];
  }
  get file_name() {
    return this.path.split("/").pop();
  }
  get file_path() {
    return this.path;
  }
  get file_type() {
    return this.file_path.split(".").pop().toLowerCase();
  }
  get fs() {
    return this.collection.fs;
  }
  get hash() {
    return this.data?.hash;
  }
  get inlinks() {
    return Object.keys(this.env.links?.[this.path] || {});
  }
  get is_canvas() {
    return this.path.endsWith("canvas");
  }
  get is_excalidraw() {
    return this.path.endsWith("excalidraw.md");
  }
  get is_gone() {
    return !this.file;
  }
  get last_read_hash() {
    return this.data?.last_read_hash;
  }
  get meta_changed() {
    try {
      if (!this.file) return true;
      if (this.last_read_hash !== this.hash) return true;
      if (!this.mtime || this.mtime < this.file.stat.mtime) {
        if (!this.size) return true;
        const size_diff = Math.abs(this.size - this.file.stat.size);
        const size_diff_ratio = size_diff / (this.size || 1);
        if (size_diff_ratio > 0.01) return true;
      }
      return false;
    } catch (e) {
      console.warn("error getting meta changed for ", this.path, ": ", e);
      return true;
    }
  }
  get mtime() {
    return this.data.mtime || 0;
  }
  get multi_ajson_file_name() {
    return this.path.split("#").shift().replace(/[\s\/\.]/g, "_").replace(".md", "");
  }
  get name() {
    if (this.should_show_full_path) return this.path.split("/").join(" > ").replace(".md", "");
    return this.path.split("/").pop().replace(".md", "");
  }
  get outlink_paths() {
    return (this.data.outlinks || []).filter((link) => !link.target.startsWith("http")).map((link) => {
      const link_path = this.fs.get_link_target_path(link.target, this.file_path);
      return link_path;
    }).filter((link_path) => link_path);
  }
  get path() {
    return this.data.path;
  }
  get size() {
    return this.data.size || 0;
  }
  get smart_change_adapter() {
    return this.env.settings.is_obsidian_vault ? "obsidian_markdown" : "markdown";
  }
  get source_adapters() {
    return this.collection.source_adapters;
  }
  get source_adapter() {
    if (this._source_adapter) return this._source_adapter;
    if (this.source_adapters[this.file_type]) this._source_adapter = new this.source_adapters[this.file_type](this);
    else this._source_adapter = new this.source_adapters["default"](this);
    return this._source_adapter;
  }
  // COMPONENTS
  get component() {
    return render4;
  }
  // currently unused, but useful for later
  get mean_block_vec() {
    return this._mean_block_vec ? this._mean_block_vec : this._mean_block_vec = this.block_vecs.reduce((acc, vec) => acc.map((val, i) => val + vec[i]), Array(384).fill(0)).map((val) => val / this.block_vecs.length);
  }
  get median_block_vec() {
    if (this._median_block_vec) return this._median_block_vec;
    if (!this.block_vecs.length) return null;
    const vec_length = this.block_vecs[0].length;
    this._median_block_vec = new Array(vec_length);
    const mid = Math.floor(this.block_vecs.length / 2);
    for (let i = 0; i < vec_length; i++) {
      const values = this.block_vecs.map((vec) => vec[i]).sort((a, b) => a - b);
      this._median_block_vec[i] = this.block_vecs.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    }
    return this._median_block_vec;
  }
  // DEPRECATED methods
  /**
   * @deprecated Use this.read() instead
   */
  async get_content() {
    return await this.read();
  }
  /**
   * @deprecated Use this.file instead
   */
  get t_file() {
    return this.fs.files[this.path];
  }
};

// node_modules/smart-sources/smart_sources.js
var SmartSources = class extends SmartEntities {
  constructor(env, opts = {}) {
    super(env, opts);
    this.search_results_ct = 0;
    this._excluded_headings = null;
  }
  async init() {
    await super.init();
    this.notices?.show("initial scan", "Starting initial scan...", { timeout: 0 });
    await this.init_items();
    this.notices?.remove("initial scan");
    this.notices?.show("done initial scan", "Initial scan complete", { timeout: 3e3 });
  }
  async init_items() {
    this._fs = null;
    await this.fs.init();
    Object.values(this.fs.files).filter((file) => this.source_adapters[file.extension]).forEach((file) => this.init_file_path(file.path));
    this.notices?.remove("initial scan");
    this.notices?.show("done initial scan", "Initial scan complete", { timeout: 3e3 });
  }
  init_file_path(file_path) {
    return this.items[file_path] = new this.item_type(this.env, { path: file_path });
  }
  // removes old data files
  async prune() {
    await this.fs.refresh();
    this.notices?.show("pruning sources", "Pruning sources...", { timeout: 0 });
    const remove_sources = Object.values(this.items).filter((item) => item.is_gone || item.excluded || !item.should_embed || !item.data.blocks);
    for (let i = 0; i < remove_sources.length; i++) {
      const source = remove_sources[i];
      await this.data_fs.remove(source.data_path);
      source.delete();
    }
    await this.process_save_queue();
    Object.values(this.items).forEach((item) => {
      if (item.data?.history?.length) item.data.history = null;
      item.queue_save();
    });
    this.notices?.remove("pruning sources");
    this.notices?.show("pruned sources", `Pruned ${remove_sources.length} sources`, { timeout: 5e3 });
    this.notices?.show("pruning blocks", "Pruning blocks...", { timeout: 0 });
    const remove_smart_blocks = Object.values(this.block_collection.items).filter((item) => {
      if (!item.vec) return false;
      if (item.is_gone) {
        item.reason = "is_gone";
        return true;
      }
      if (!item.should_embed) {
        item.reason = "!should_embed";
        return true;
      }
      if (!item.data?.hash) {
        item.reason = "!data.hash";
        return true;
      }
      return false;
    });
    for (let i = 0; i < remove_smart_blocks.length; i++) {
      const item = remove_smart_blocks[i];
      if (item.is_gone) item.delete();
      else item.remove_embeddings();
    }
    this.notices?.remove("pruning blocks");
    this.notices?.show("pruned blocks", `Pruned ${remove_smart_blocks.length} blocks`, { timeout: 5e3 });
    console.log(`Pruned ${remove_smart_blocks.length} blocks:
${remove_smart_blocks.map((item) => `${item.reason} - ${item.key}`).join("\n")}`);
    await this.process_save_queue();
    const items_w_vec = Object.values(this.items).filter((item) => item.vec);
    for (const item of items_w_vec) {
      if (item.meta_changed) item.queue_import();
      else if (item.is_unembedded) item.queue_embed();
    }
  }
  build_links_map() {
    const links_map = {};
    for (const source of Object.values(this.items)) {
      for (const link of source.outlink_paths) {
        if (!links_map[link]) links_map[link] = {};
        links_map[link][source.key] = true;
      }
    }
    return links_map;
  }
  async refresh() {
    await this.prune();
    await this.process_import_queue();
    await this.env.smart_blocks.process_embed_queue();
    await this.process_embed_queue();
  }
  // CRUD
  async create(key, content) {
    await this.fs.write(key, content);
    await this.fs.refresh();
    const source = await this.create_or_update({ path: key });
    await source.import();
    return source;
  }
  // SEARCH
  /**
   * Lexical search for matching SmartSource content.
   * @param {Object} search_filter - The filter criteria for the search.
   * @returns {Promise<Array<Entity>>} A promise that resolves to an array of matching entities.
   */
  async search(search_filter = {}) {
    const {
      keywords,
      limit,
      ...filter_opts
    } = search_filter;
    if (!keywords) {
      console.warn("search_filter.keywords not set");
      return [];
    }
    this.search_results_ct = 0;
    const initial_results = this.filter(filter_opts);
    const search_results = [];
    for (let i = 0; i < initial_results.length; i += 10) {
      const batch = initial_results.slice(i, i + 10);
      const batch_results = await Promise.all(
        batch.map(async (item) => {
          try {
            const matches = await item.search(search_filter);
            if (matches) {
              this.search_results_ct++;
              return { item, score: matches };
            } else return null;
          } catch (error) {
            console.error(`Error searching item ${item.id || "unknown"}:`, error);
            return null;
          }
        })
      );
      search_results.push(...batch_results.filter(Boolean));
    }
    return search_results.sort((a, b) => b.score - a.score).map((result) => result.item);
  }
  async lookup(params = {}) {
    const limit = params.filter?.limit || params.k || this.env.settings.lookup_k || 10;
    if (params.filter?.limit) delete params.filter.limit;
    let results = await super.lookup(params);
    if (this.env.smart_blocks?.settings?.embed_blocks) {
      results = [
        ...results,
        ...await this.block_collection.lookup(params)
      ].sort(sort_by_score);
    }
    return results.slice(0, limit);
  }
  async import_file(file) {
    this.fs.files[file.path] = file;
    this.fs.file_paths.push(file.path);
    const source = await this.create_or_update({ path: file.path });
    await source.import();
    await this.process_embed_queue();
    await this.process_save_queue();
  }
  async process_load_queue() {
    await super.process_load_queue();
    if (this.collection_key === "smart_sources") {
      Object.values(this.env.smart_blocks.items).forEach((item) => item.init());
    }
    this.block_collection.loaded = Object.keys(this.block_collection.items).length;
    if (!this.opts.prevent_import_on_load) {
      await this.process_import_queue();
    }
  }
  async process_import_queue() {
    const import_queue = Object.values(this.items).filter((item) => item._queue_import);
    console.log("import_queue " + import_queue.length);
    if (import_queue.length) {
      const time_start = Date.now();
      for (let i = 0; i < import_queue.length; i += 100) {
        this.notices?.show("import progress", [`Importing...`, `Progress: ${i} / ${import_queue.length} files`], { timeout: 0 });
        await Promise.all(import_queue.slice(i, i + 100).map((item) => item.import()));
      }
      this.notices?.remove("import progress");
      this.notices?.show("done import", [`Processed import queue in ${Date.now() - time_start}ms`], { timeout: 3e3 });
    } else this.notices?.show("no import queue", ["No items in import queue"]);
    const start_time = Date.now();
    this.env.links = this.build_links_map();
    const end_time = Date.now();
    console.log(`Time spent building links: ${end_time - start_time}ms`);
    await this.process_embed_queue();
    await this.process_save_queue();
  }
  get source_adapters() {
    return this.env.opts.collections?.[this.collection_key]?.source_adapters || {};
  }
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  get current_note() {
    return this.get(this.env.smart_connections_plugin.app.workspace.getActiveFile().path);
  }
  get fs() {
    if (!this._fs) {
      this._fs = new this.env.opts.modules.smart_fs.class(this.env, {
        adapter: this.env.opts.modules.smart_fs.adapter,
        fs_path: this.env.opts.env_path || "",
        exclude_patterns: this.excluded_patterns || []
      });
    }
    return this._fs;
  }
  get settings_config() {
    return {
      ...super.settings_config,
      ...this.process_settings_config(settings_config2),
      ...Object.entries(this.source_adapters).reduce((acc, [file_extension, adapter_constructor]) => {
        if (acc[adapter_constructor]) return acc;
        const item = this.items[Object.keys(this.items).find((i) => i.endsWith(file_extension))];
        const adapter_instance = new adapter_constructor(item || new this.item_type(this.env, {}));
        if (adapter_instance.settings_config) {
          acc[adapter_constructor.name] = {
            type: "html",
            value: `<h4>${adapter_constructor.name} adapter</h4>`
          };
          acc = { ...acc, ...adapter_instance.settings_config };
        }
        return acc;
      }, {})
      // ... existing settings ...
    };
  }
  get block_collection() {
    return this.env.smart_blocks;
  }
  /**
   * @deprecated use block_collection instead
   */
  get blocks() {
    return this.env.smart_blocks;
  }
  get embed_queue() {
    try {
      const embed_blocks = this.block_collection.settings.embed_blocks;
      return Object.values(this.items).reduce((acc, item) => {
        if (item._queue_embed) acc.push(item);
        if (embed_blocks) item.blocks.forEach((block) => {
          if (block._queue_embed && block.should_embed) acc.push(block);
        });
        return acc;
      }, []);
    } catch (e) {
      console.error(`Error getting embed queue: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  get smart_change() {
    if (!this.opts.smart_change) return;
    if (typeof this.settings?.smart_change?.active !== "undefined" && !this.settings.smart_change.active) return console.warn("smart_change disabled by settings");
    if (!this._smart_change) {
      this._smart_change = new this.opts.smart_change.class(this.opts.smart_change);
    }
    return this._smart_change;
  }
  async run_load() {
    await super.run_load();
    this.blocks.render_settings();
    this.render_settings();
  }
  async run_import() {
    const start_time = Date.now();
    Object.values(this.items).forEach((item) => {
      if (item.meta_changed) item.queue_import();
    });
    await this.process_import_queue();
    const end_time = Date.now();
    console.log(`Time spent importing: ${end_time - start_time}ms`);
    this.render_settings();
    this.blocks.render_settings();
  }
  async run_prune() {
    await this.prune();
    await this.process_save_queue();
    this.render_settings();
    this.blocks.render_settings();
  }
  async run_clear_all() {
    this.notices?.show("clearing all", "Clearing all data...", { timeout: 0 });
    this.clear();
    this.block_collection.clear();
    this._fs = null;
    await this.fs.init();
    await this.init_items();
    this._excluded_headings = null;
    Object.values(this.items).forEach((item) => {
      item.queue_import();
      item.queue_embed();
      item.loaded_at = Date.now() + 9999999999;
    });
    await this.process_import_queue();
    this.notices?.remove("clearing all");
    this.notices?.show("cleared all", "All data cleared and reimported", { timeout: 3e3 });
  }
  get excluded_patterns() {
    return [
      ...this.file_exclusions?.map((file) => `${file}**`) || [],
      ...(this.folder_exclusions || []).map((folder) => `${folder}**`),
      this.env.env_data_dir + "/**"
    ];
  }
  get file_exclusions() {
    return this.env.settings?.file_exclusions?.length ? this.env.settings.file_exclusions.split(",").map((file) => file.trim()) : [];
  }
  get folder_exclusions() {
    return this.env.settings?.folder_exclusions?.length ? this.env.settings.folder_exclusions.split(",").map((folder) => {
      folder = folder.trim();
      if (folder.slice(-1) !== "/") return folder + "/";
      return folder;
    }) : [];
  }
  get excluded_headings() {
    if (!this._excluded_headings) {
      this._excluded_headings = this.env.settings?.excluded_headings?.length ? this.env.settings.excluded_headings.split(",").map((heading) => heading.trim()) : [];
    }
    return this._excluded_headings;
  }
  get included_files() {
    return this.fs.file_paths.filter((file) => file.endsWith(".md") || file.endsWith(".canvas")).filter((file) => !this.fs.is_excluded(file)).length;
  }
  get total_files() {
    return this.env.fs.file_paths.filter((file) => file.endsWith(".md") || file.endsWith(".canvas")).length;
  }
  async render_settings(container = this.settings_container, opts = {}) {
    const settings_config4 = this.settings_config;
    if (this.pdf_adapter?.chat_model) {
      await this.pdf_adapter.chat_model.get_models();
    }
    if (this.image_adapter?.chat_model) {
      await this.image_adapter.chat_model.get_models();
    }
    await super.render_settings(container, opts);
  }
};
var settings_config2 = {
  "smart_change.active": {
    "name": "Smart Change (change safety)",
    "description": "Enable Smart Changes (prevents accidental deletions/overwrites).",
    "type": "toggle",
    "default": true
  }
};

// node_modules/smart-sources/utils/create_hash.js
async function create_hash(text) {
  if (text.length > 1e5) text = text.substring(0, 1e5);
  const msgUint8 = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// node_modules/smart-sources/smart_block.js
var SmartBlock = class extends SmartEntity {
  static get defaults() {
    return {
      data: {
        text: null,
        length: 0
      },
      _embed_input: ""
      // stored temporarily
    };
  }
  init() {
    if (this.settings.embed_blocks) super.init();
  }
  /**
   * Queues the block for saving via the source.
   */
  queue_save() {
    this._queue_save = true;
    this.source?.queue_save();
  }
  queue_import() {
    this.source?.queue_import();
  }
  update_data(data) {
    if (this.should_clear_embeddings(data)) this.data.embeddings = {};
    if (!this.vec) this._embed_input += data.text;
    delete data.text;
    super.update_data(data);
    return true;
  }
  should_clear_embeddings(data) {
    if (this.is_new) return true;
    if (this.embed_model && this.embed_model_key !== "None" && this.vec?.length !== this.embed_model.dims) return true;
    if (this.data.length !== data.length) return true;
    return false;
  }
  async get_embed_input() {
    if (typeof this._embed_input !== "string" || !this._embed_input.length) {
      this._embed_input = this.breadcrumbs + "\n" + await this.read();
    }
    if (this.vec) {
      const hash = await create_hash(this._embed_input);
      if (hash === this.hash) return false;
    }
    return this._embed_input;
  }
  // CRUD
  async read(opts = {}) {
    return await this.source_adapter.block_read(opts);
  }
  async append(append_content) {
    await this.source_adapter.block_append(append_content);
  }
  async update(new_block_content, opts = {}) {
    await this.source_adapter.block_update(new_block_content, opts);
  }
  async remove() {
    await this.source_adapter.block_remove();
  }
  async move_to(to_key) {
    try {
      await this.source_adapter.block_move_to(to_key);
    } catch (error) {
      console.error("error_during_block_move:", error);
      throw error;
    }
  }
  get breadcrumbs() {
    return this.key.split("/").join(" > ").split("#").slice(0, -1).join(" > ").replace(".md", "");
  }
  get excluded() {
    const block_headings = this.path.split("#").slice(1);
    if (this.source_collection.excluded_headings.some((heading) => block_headings.includes(heading))) return true;
    return this.source.excluded;
  }
  get file_path() {
    return this.source.file_path;
  }
  get file_type() {
    return this.source.file_type;
  }
  get folder() {
    return this.path.split("/").slice(0, -1).join("/");
  }
  get embed_link() {
    return `![[${this.link}]]`;
  }
  get embed_input() {
    return this._embed_input ? this._embed_input : this.get_embed_input();
  }
  get has_lines() {
    return this.lines && this.lines.length === 2;
  }
  get is_block() {
    return this.key.includes("#");
  }
  get is_gone() {
    if (!this.source?.file) return true;
    if (!this.source?.data?.blocks?.[this.sub_key]) return true;
    return false;
  }
  get is_unembedded() {
    if (this.excluded) return false;
    return super.is_unembedded;
  }
  get sub_key() {
    return "#" + this.key.split("#").slice(1).join("#");
  }
  // get lines() { return { start: this.data.lines[0], end: this.data.lines[1] }; };
  get lines() {
    return this.source?.data?.blocks?.[this.sub_key];
  }
  get line_start() {
    return this.lines?.[0];
  }
  get line_end() {
    return this.lines?.[1];
  }
  get link() {
    if (/^.*page\s*(\d+).*$/i.test(this.sub_key)) {
      const number = this.sub_key.match(/^.*page\s*(\d+).*$/i)[1];
      return `${this.source.path}#page=${number}`;
    } else {
      return this.source.path;
    }
  }
  // use text length to detect changes
  get name() {
    const source_name = this.source.name;
    const block_path_parts = this.key.split("#").slice(1);
    if (this.should_show_full_path) return [source_name, ...block_path_parts].join(" > ");
    if (block_path_parts[block_path_parts.length - 1][0] === "{") block_path_parts.pop();
    return [source_name, block_path_parts.pop()].join(" > ");
  }
  // uses data.lines to get next block
  get next_block() {
    if (!this.data.lines) return null;
    const next_line = this.data.lines[1] + 1;
    return this.source.blocks?.find((block) => next_line === block.data?.lines?.[0]);
  }
  get outlink_paths() {
    return this.source.outlink_paths;
  }
  get path() {
    return this.key;
  }
  /**
   * Should embed if block is not completely covered by sub_blocks (and those sub_blocks are large enough to embed)
   * (sub_blocks has line_start+1 and line_end)
   * @returns {boolean}
   */
  get should_embed() {
    try {
      if (this.embed_model && this.size < this.embed_model.min_chars) return false;
      const match_line_start = this.line_start + 1;
      const match_line_end = this.line_end;
      const { has_line_start, has_line_end } = Object.entries(this.source?.data?.blocks || {}).reduce((acc, [key, range]) => {
        if (!key.startsWith(this.sub_key + "#")) return acc;
        if (range[0] === match_line_start) acc.has_line_start = key;
        if (range[1] === match_line_end) acc.has_line_end = key;
        return acc;
      }, { has_line_start: null, has_line_end: null });
      if (has_line_start && has_line_end) {
        const start_block = this.collection.get(this.source_key + has_line_start);
        if (start_block?.should_embed) {
          const end_block = this.collection.get(this.source_key + has_line_end);
          if (end_block?.should_embed) return false;
        }
      }
      return true;
    } catch (e) {
      console.error(e, e.stack);
      console.error(`Error getting should_embed for ${this.key}: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  get size() {
    return this.data.size;
  }
  get source() {
    return this.source_collection.get(this.source_key);
  }
  get source_adapter() {
    if (this._source_adapter) return this._source_adapter;
    if (this.source_adapters[this.file_type]) this._source_adapter = new this.source_adapters[this.file_type](this);
    else this._source_adapter = new this.source_adapters["default"](this);
    return this._source_adapter;
  }
  get source_adapters() {
    return this.source.source_adapters;
  }
  get source_collection() {
    return this.env.smart_sources;
  }
  get source_key() {
    return this.key.split("#")[0];
  }
  get sub_blocks() {
    return this.source?.blocks?.filter((block) => block.key.startsWith(this.key + "#") && block.line_start > this.line_start && block.line_end <= this.line_end) || [];
  }
  // source dependent
  get data_path() {
    return this.source.data_path;
  }
  get data_file() {
    return this.source.data_file;
  }
  get excluded_lines() {
    return this.source.excluded_lines;
  }
  get file() {
    return this.source.file;
  }
  get is_canvas() {
    return this.source.is_canvas;
  }
  get is_excalidraw() {
    return this.source.is_excalidraw;
  }
  get meta_changed() {
    return this.source.meta_changed;
  }
  get mtime() {
    return this.source.mtime;
  }
  get multi_ajson_file_name() {
    return this.source.multi_ajson_file_name;
  }
  get smart_change_adapter() {
    return this.source.smart_change_adapter;
  }
  // COMPONENTS
  get component() {
    return render4;
  }
  // CURRENTLY UNUSED
  async get_next_k_shot(i) {
    if (!this.next_block) return null;
    const current = await this.get_content();
    const next = await this.next_block.get_content();
    return `---BEGIN CURRENT ${i}---
${current}
---END CURRENT ${i}---
---BEGIN NEXT ${i}---
${next}
---END NEXT ${i}---
`;
  }
  // DEPRECATED
  async get_content() {
    return await this.read() || "BLOCK NOT FOUND";
  }
  // DEPRECATED since v2
  get note() {
    return this.source;
  }
  get note_key() {
    return this.key.split("#")[0];
  }
};

// node_modules/smart-sources/smart_blocks.js
var SmartBlocks = class extends SmartEntities {
  init() {
  }
  get embed_model() {
    return this.source_collection?.embed_model;
  }
  get embed_model_key() {
    return this.source_collection?.embed_model_key;
  }
  get expected_blocks_ct() {
    return Object.values(this.source_collection.items).reduce((acc, item) => acc += Object.keys(item.data.blocks || {}).length, 0);
  }
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  get settings_config() {
    return this.process_settings_config({
      "embed_blocks": {
        name: "Embed Blocks",
        type: "toggle",
        description: "Embed blocks using the embedding model.",
        default: true
      }
    });
  }
  get smart_change() {
    return this.env.smart_sources.smart_change;
  }
  get source_collection() {
    return this.env.smart_sources;
  }
  // handled by sources
  async process_save_queue() {
    await this.source_collection.process_save_queue();
  }
  async process_embed_queue() {
  }
  async process_load_queue() {
  }
  // TEMP: methods in sources not implemented in blocks
  async prune() {
    throw "Not implemented: prune";
  }
  build_links_map() {
    throw "Not implemented: build_links_map";
  }
  async refresh() {
    throw "Not implemented: refresh";
  }
  async search() {
    throw "Not implemented: search";
  }
  async import_file() {
    throw "Not implemented: import_file";
  }
  async run_load() {
    throw "Not implemented: run_load";
  }
  async run_import() {
    throw "Not implemented: run_import";
  }
  async run_refresh() {
    throw "Not implemented: run_refresh";
  }
  async run_force_refresh() {
    throw "Not implemented: run_force_refresh";
  }
};

// src/render_dataview_codeblocks.js
async function render_dataview_codeblocks(file_content, note_path, opts = {}) {
  opts = {
    char_limit: null,
    ...opts
  };
  const dataview_api = window?.["DataviewAPI"];
  if (!dataview_api) return file_content;
  if (!file_content) return file_content;
  const dataview_code_blocks = file_content.match(/```dataview(.*?)```/gs);
  if (!dataview_code_blocks) return file_content;
  for (let i = 0; i < dataview_code_blocks.length; i++) {
    if (opts.char_limit && opts.char_limit < file_content.indexOf(dataview_code_blocks[i])) break;
    const dataview_code_block = dataview_code_blocks[i];
    const dataview_code_block_content = dataview_code_block.replace("```dataview", "").replace("```", "");
    const dataview_query_result = await dataview_api.queryMarkdown(dataview_code_block_content, note_path, null);
    if (dataview_query_result.successful) {
      file_content = file_content.replace(dataview_code_block, dataview_query_result.value);
    }
  }
  return file_content;
}

// src/sc_entities.js
SmartSource.prototype.get_as_context = async function(params = {}) {
  const content = await render_dataview_codeblocks(await this.get_content(), this.path);
  return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
};
SmartBlock.prototype.get_as_context = async function(params = {}) {
  const content = await render_dataview_codeblocks(await this.get_content(), this.path);
  return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
};

// node_modules/smart-sources/adapters/_adapter.js
var SourceAdapter = class {
  constructor(item, opts = {}) {
    this.item = item;
    this.opts = opts;
  }
  get collection() {
    return this.item.collection;
  }
  get env() {
    return this.collection.env;
  }
  get smart_change() {
    return this.collection.smart_change;
  }
  get block_collection() {
    return this.env.smart_blocks;
  }
  get source_collection() {
    return this.env.smart_sources;
  }
  // override these methods in the adapter class
  throw_not_implemented(method_name) {
    throw new Error(`Method "${method_name}" is not implemented for file type "${this.item.file_type}" in "${this.constructor.name}".`);
  }
  // source methods
  async import() {
    this.throw_not_implemented("import");
  }
  async append(content) {
    this.throw_not_implemented("append");
  }
  async update(full_content, opts = {}) {
    this.throw_not_implemented("update");
  }
  async _update(content) {
    this.throw_not_implemented("_update");
  }
  async read(opts = {}) {
    this.throw_not_implemented("read");
  }
  async _read() {
    this.throw_not_implemented("_read");
  }
  async remove() {
    this.throw_not_implemented("remove");
  }
  async move_to(entity_ref) {
    this.throw_not_implemented("move_to");
  }
  async merge(content, opts = {}) {
    this.throw_not_implemented("merge");
  }
  // block methods
  async block_append(content) {
    this.throw_not_implemented("block_append");
  }
  async block_update(full_content, opts = {}) {
    this.throw_not_implemented("block_update");
  }
  async _block_update(content) {
    this.throw_not_implemented("_block_update");
  }
  async block_read(opts = {}) {
    this.throw_not_implemented("block_read");
  }
  async _block_read() {
    this.throw_not_implemented("_block_read");
  }
  async block_remove() {
    this.throw_not_implemented("block_remove");
  }
  async block_move_to(entity_ref) {
    this.throw_not_implemented("block_move_to");
  }
  async block_merge(content, opts = {}) {
    this.throw_not_implemented("block_merge");
  }
  // HELPER METHODS
  async create_hash(content) {
    return await create_hash(content);
  }
};

// node_modules/smart-sources/utils/increase_heading_depth.js
function increase_heading_depth(content, depth) {
  return content.replace(/^(#+)/gm, (match) => "#".repeat(match.length + depth));
}

// node_modules/smart-sources/adapters/text.js
var TextSourceAdapter = class extends SourceAdapter {
};

// node_modules/smart-sources/blocks/markdown_to_blocks.js
function markdown_to_blocks(markdown) {
  const lines = markdown.split("\n");
  const result = {};
  const heading_stack = [];
  const heading_lines = {};
  const heading_counts = {};
  const sub_block_counts = {};
  const subheading_counts = {};
  let current_list_item = null;
  let current_content_block = null;
  let in_frontmatter = false;
  let frontmatter_started = false;
  let root_heading_key = "#";
  let in_code_block = false;
  sub_block_counts[root_heading_key] = 0;
  for (let i = 0; i < lines.length; i++) {
    const line_number = i + 1;
    const line = lines[i];
    const trimmed_line = line.trim();
    if (trimmed_line === "---") {
      if (!frontmatter_started) {
        frontmatter_started = true;
        in_frontmatter = true;
        heading_lines["#---frontmatter---"] = [line_number, null];
        continue;
      } else if (in_frontmatter) {
        in_frontmatter = false;
        heading_lines["#---frontmatter---"][1] = line_number;
        continue;
      }
    }
    if (in_frontmatter) {
      continue;
    }
    if (trimmed_line.startsWith("```")) {
      in_code_block = !in_code_block;
      if (!current_content_block) {
        let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
        if (parent_key === "#" && !heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (parent_key === "#") {
          current_content_block = { key: root_heading_key, start_line: line_number };
          if (heading_lines[root_heading_key][1] === null || heading_lines[root_heading_key][1] < line_number) {
            heading_lines[root_heading_key][1] = null;
          }
        } else {
          if (sub_block_counts[parent_key] === void 0) {
            sub_block_counts[parent_key] = 0;
          }
          sub_block_counts[parent_key] += 1;
          const n = sub_block_counts[parent_key];
          const key = `${parent_key}#{${n}}`;
          heading_lines[key] = [line_number, null];
          current_content_block = { key, start_line: line_number };
        }
      }
      continue;
    }
    const heading_match = trimmed_line.match(/^(#{1,6})\s*(.+)$/);
    if (heading_match && !in_code_block) {
      const level = heading_match[1].length;
      let title = heading_match[2].trim();
      while (heading_stack.length > 0 && heading_stack[heading_stack.length - 1].level >= level) {
        const finished_heading = heading_stack.pop();
        if (heading_lines[finished_heading.key][1] === null) {
          heading_lines[finished_heading.key][1] = line_number - 1;
        }
      }
      if (heading_stack.length === 0 && heading_lines[root_heading_key] && heading_lines[root_heading_key][1] === null) {
        heading_lines[root_heading_key][1] = line_number - 1;
      }
      if (current_content_block) {
        if (heading_lines[current_content_block.key][1] === null) {
          heading_lines[current_content_block.key][1] = line_number - 1;
        }
        current_content_block = null;
      }
      if (current_list_item) {
        if (heading_lines[current_list_item.key][1] === null) {
          heading_lines[current_list_item.key][1] = line_number - 1;
        }
        current_list_item = null;
      }
      let parent_key = "";
      let parent_level = 0;
      if (heading_stack.length > 0) {
        parent_key = heading_stack[heading_stack.length - 1].key;
        parent_level = heading_stack[heading_stack.length - 1].level;
      } else {
        parent_key = "";
        parent_level = 0;
      }
      if (heading_stack.length === 0) {
        heading_counts[title] = (heading_counts[title] || 0) + 1;
        if (heading_counts[title] > 1) {
          title += `[${heading_counts[title]}]`;
        }
      } else {
        if (!subheading_counts[parent_key]) {
          subheading_counts[parent_key] = {};
        }
        subheading_counts[parent_key][title] = (subheading_counts[parent_key][title] || 0) + 1;
        const count = subheading_counts[parent_key][title];
        if (count > 1) {
          title += `#{${count}}`;
        }
      }
      const level_diff = level - parent_level;
      const hashes = "#".repeat(level_diff);
      const key = parent_key + hashes + title;
      heading_lines[key] = [line_number, null];
      sub_block_counts[key] = 0;
      heading_stack.push({ level, title, key });
      continue;
    }
    const list_match = line.match(/^(\s*)- (.+)$/);
    if (list_match && !in_code_block) {
      const indentation = list_match[1].length;
      if (indentation === 0) {
        if (current_list_item) {
          if (heading_lines[current_list_item.key][1] === null) {
            heading_lines[current_list_item.key][1] = line_number - 1;
          }
          current_list_item = null;
        }
        if (current_content_block) {
          if (heading_lines[current_content_block.key][1] === null) {
            heading_lines[current_content_block.key][1] = line_number - 1;
          }
          current_content_block = null;
        }
        let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
        if (parent_key === "#" && !heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (sub_block_counts[parent_key] === void 0) {
          sub_block_counts[parent_key] = 0;
        }
        sub_block_counts[parent_key] += 1;
        const n = sub_block_counts[parent_key];
        const key = `${parent_key}#{${n}}`;
        heading_lines[key] = [line_number, null];
        current_list_item = { key, start_line: line_number };
        continue;
      }
      if (current_list_item) {
        continue;
      }
    }
    if (trimmed_line === "") {
      continue;
    }
    if (!current_content_block) {
      if (current_list_item) {
        if (heading_lines[current_list_item.key][1] === null) {
          heading_lines[current_list_item.key][1] = line_number - 1;
        }
        current_list_item = null;
      }
      let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
      if (parent_key === "#") {
        if (!heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (heading_lines[root_heading_key][1] === null || heading_lines[root_heading_key][1] < line_number) {
          heading_lines[root_heading_key][1] = null;
        }
        current_content_block = { key: root_heading_key, start_line: line_number };
      } else {
        if (sub_block_counts[parent_key] === void 0) {
          sub_block_counts[parent_key] = 0;
        }
        sub_block_counts[parent_key] += 1;
        const n = sub_block_counts[parent_key];
        const key = `${parent_key}#{${n}}`;
        heading_lines[key] = [line_number, null];
        current_content_block = { key, start_line: line_number };
      }
    }
    continue;
  }
  const total_lines = lines.length;
  while (heading_stack.length > 0) {
    const finished_heading = heading_stack.pop();
    if (heading_lines[finished_heading.key][1] === null) {
      heading_lines[finished_heading.key][1] = total_lines;
    }
  }
  if (current_list_item) {
    if (heading_lines[current_list_item.key][1] === null) {
      heading_lines[current_list_item.key][1] = total_lines;
    }
    current_list_item = null;
  }
  if (current_content_block) {
    if (heading_lines[current_content_block.key][1] === null) {
      heading_lines[current_content_block.key][1] = total_lines;
    }
    current_content_block = null;
  }
  if (heading_lines[root_heading_key] && heading_lines[root_heading_key][1] === null) {
    heading_lines[root_heading_key][1] = total_lines;
  }
  for (const key in heading_lines) {
    result[key] = heading_lines[key];
  }
  return result;
}

// node_modules/smart-sources/utils/get_markdown_links.js
function get_markdown_links(content) {
  const markdown_link_pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const wikilink_pattern = /\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g;
  const result = [];
  const extract_links_from_pattern = (pattern, type) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const title = type === "markdown" ? match[1] : match[2] || match[1];
      const target = type === "markdown" ? match[2] : match[1];
      const line = content.substring(0, match.index).split("\n").length;
      result.push({ title, target, line });
    }
  };
  extract_links_from_pattern(markdown_link_pattern, "markdown");
  extract_links_from_pattern(wikilink_pattern, "wikilink");
  result.sort((a, b) => a.line - b.line || a.target.localeCompare(b.target));
  return result;
}

// node_modules/smart-sources/utils/get_line_range.js
function get_line_range(content, start_line, end_line) {
  const lines = content.split("\n");
  return lines.slice(start_line - 1, end_line).join("\n");
}

// node_modules/smart-sources/blocks/markdown_crud.js
function block_read(content, block_key) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const selected_lines = lines.slice(block_range[0] - 1, block_range[1]);
  const block_content = selected_lines.join("\n");
  return block_content;
}
function block_update(content, block_key, new_block_content) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const updated_lines = [
    ...lines.slice(0, block_range[0] - 1),
    new_block_content,
    ...lines.slice(block_range[1])
  ];
  const updated_content = updated_lines.join("\n");
  return updated_content;
}
function block_destroy(content, block_key) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const updated_lines = [
    ...lines.slice(0, block_range[0] - 1),
    ...lines.slice(block_range[1])
  ];
  const updated_content = updated_lines.join("\n");
  return updated_content;
}

// node_modules/smart-sources/adapters/markdown.js
var MarkdownSourceAdapter = class extends TextSourceAdapter {
  get fs() {
    return this.source_collection.fs;
  }
  get data() {
    return this.item.data;
  }
  get file_path() {
    return this.item.file_path;
  }
  get source() {
    return this.item.source ? this.item.source : this.item;
  }
  async import() {
    const content = await this._read();
    if (!content) return console.warn("No content to import for " + this.file_path);
    const hash = await this.create_hash(content);
    if (this.data.blocks && this.data.hash === hash) {
      console.log("File stats changed, but content is the same. Skipping import.");
      return;
    }
    this.data.hash = hash;
    this.data.last_read_hash = hash;
    const blocks_obj = markdown_to_blocks(content);
    this.data.blocks = blocks_obj;
    const outlinks = get_markdown_links(content);
    this.data.outlinks = outlinks;
    if (this.item.block_collection) {
      for (const [sub_key, line_range] of Object.entries(blocks_obj)) {
        const block_key = `${this.source.key}${sub_key}`;
        const block_content = get_line_range(content, line_range[0], line_range[1]);
        const block_outlinks = get_markdown_links(block_content);
        const block = await this.item.block_collection.create_or_update({
          key: block_key,
          outlinks: block_outlinks,
          size: block_content.length
        });
        block._embed_input = `${block.breadcrumbs}
${block_content}`;
        block.data.hash = await this.create_hash(block._embed_input);
      }
    }
  }
  async append(content) {
    if (this.smart_change) {
      content = this.smart_change.wrap("content", {
        before: "",
        after: content,
        adapter: this.item.smart_change_adapter
      });
    }
    const current_content = await this.read();
    const new_content = [
      current_content,
      "",
      content
    ].join("\n").trim();
    await this._update(new_content);
  }
  async update(full_content, opts = {}) {
    const { mode = "append_blocks" } = opts;
    if (mode === "replace_all") {
      await this._update(full_content);
    } else if (mode === "replace_blocks") {
      await this.merge(full_content, { mode: "replace_blocks" });
    } else if (mode === "append_blocks") {
      await this.merge(full_content, { mode: "append_blocks" });
    }
  }
  async _update(content) {
    await this.fs.write(this.file_path, content);
  }
  async read(opts = {}) {
    let content = await this._read();
    this.source.data.last_read_hash = await this.create_hash(content);
    if (this.source.last_read_hash !== this.source.hash) {
      this.source.loaded_at = null;
      await this.source.import();
    }
    if (opts.no_changes && this.smart_change) {
      const unwrapped = this.smart_change.unwrap(content, { file_type: this.item.file_type });
      content = unwrapped[opts.no_changes === "after" ? "after" : "before"];
    }
    if (opts.add_depth) {
      content = increase_heading_depth(content, opts.add_depth);
    }
    return content;
  }
  async _read() {
    return await this.fs.read(this.file_path);
  }
  async remove() {
    await this.fs.remove(this.file_path);
    this.item.delete();
  }
  async move_to(entity_ref) {
    const new_path = typeof entity_ref === "string" ? entity_ref : entity_ref.key;
    if (!new_path) {
      throw new Error("Invalid entity reference for move_to operation");
    }
    const current_content = await this.read();
    const [target_source_key, ...headings] = new_path.split("#");
    const target_source = this.env.smart_sources.get(target_source_key);
    if (headings.length > 0) {
      const new_headings_content = this.construct_headings(headings);
      const new_content = `${new_headings_content}
${current_content}`;
      await this._update(new_content);
    }
    if (target_source) {
      await this.merge(current_content, { mode: "append_blocks" });
    } else {
      await this.rename_and_import(target_source_key, current_content);
    }
    if (this.item.key !== target_source_key) await this.remove();
  }
  construct_headings(headings) {
    return headings.map((heading, i) => `${"#".repeat(i + 1)} ${heading}`).join("\n");
  }
  async rename_and_import(target_source_key, content) {
    await this.fs.rename(this.file_path, target_source_key);
    const new_source = await this.item.collection.create_or_update({ path: target_source_key, content });
    await new_source.import();
  }
  /**
   * Merge content into the source
   * @param {string} content - The content to merge into the source
   * @param {Object} opts - Options for the merge operation
   * @param {string} opts.mode - The mode to use for the merge operation. Defaults to 'append_blocks' (may also be 'replace_blocks')
   */
  async merge(content, opts = {}) {
    const { mode = "append_blocks" } = opts;
    const blocks_obj = markdown_to_blocks(content);
    if (typeof blocks_obj !== "object" || Array.isArray(blocks_obj)) {
      console.warn("merge error: Expected an object from markdown_to_blocks, but received:", blocks_obj);
      throw new Error("merge error: markdown_to_blocks did not return an object as expected.");
    }
    const { new_blocks, new_with_parent_blocks, changed_blocks, same_blocks } = await this.get_changes(blocks_obj, content);
    for (const block of new_blocks) {
      await this.append(block.content);
    }
    for (const block of new_with_parent_blocks) {
      const parent_block = this.env.smart_blocks.get(block.parent_key);
      await parent_block.append(block.content);
    }
    for (const block of changed_blocks) {
      const changed_block = this.item.block_collection.get(block.key);
      if (mode === "replace_blocks") {
        await changed_block.update(block.content);
      } else {
        await changed_block.append(block.content);
      }
    }
  }
  async get_changes(blocks_obj, content) {
    const new_blocks = [];
    const new_with_parent_blocks = [];
    const changed_blocks = [];
    const same_blocks = [];
    const existing_blocks = this.source.data.blocks || {};
    for (const [sub_key, line_range] of Object.entries(blocks_obj)) {
      const has_existing = !!existing_blocks[sub_key];
      const block_key = `${this.source.key}${sub_key}`;
      const block_content = get_line_range(content, line_range[0], line_range[1]);
      if (!has_existing) {
        new_blocks.push({
          key: block_key,
          state: "new",
          content: block_content
        });
        continue;
      }
      let has_parent;
      let headings = sub_key.split("#");
      let parent_key;
      while (!has_parent && headings.length > 0) {
        headings.pop();
        parent_key = headings.join("#");
        has_parent = !!existing_blocks[parent_key];
      }
      if (has_parent) {
        new_with_parent_blocks.push({
          key: block_key,
          parent_key: `${this.source.key}${parent_key}`,
          state: "new",
          content: block_content
        });
        continue;
      }
      const block = this.item.env.smart_blocks.get(block_key);
      const content_hash = await this.create_hash(block_content);
      if (content_hash !== block.hash) {
        changed_blocks.push({
          key: block_key,
          state: "changed",
          content: block_content
        });
        continue;
      }
      same_blocks.push({
        key: block_key,
        state: "same",
        content: block_content
      });
    }
    return {
      new_blocks,
      new_with_parent_blocks,
      changed_blocks,
      same_blocks
    };
  }
  async block_read(opts = {}) {
    const source_content = await this.read();
    try {
      const block_content = block_read(source_content, this.item.sub_key);
      const breadcrumbs = this.item.breadcrumbs;
      const embed_input = breadcrumbs + "\n" + block_content;
      const hash = await this.create_hash(embed_input);
      if (hash !== this.item.hash) {
        this.item.source?.queue_import();
        return this._block_read(source_content, this.item.sub_key);
      }
      return block_content;
    } catch (error) {
      console.warn("Error reading block:", error.message);
      return "BLOCK NOT FOUND";
    }
  }
  _block_read(source_content, block_key) {
    return block_read(source_content, block_key);
  }
  async block_append(append_content) {
    let all_lines = (await this.read()).split("\n");
    if (all_lines[this.item.line_start] === append_content.split("\n")[0]) {
      append_content = append_content.split("\n").slice(1).join("\n");
    }
    if (this.smart_change) append_content = this.smart_change.wrap("content", { before: "", after: append_content, adapter: this.item.smart_change_adapter });
    await this._block_append(append_content);
  }
  async _block_append(append_content) {
    let all_lines = (await this.read()).split("\n");
    const content_before = all_lines.slice(0, this.item.line_end + 1);
    const content_after = all_lines.slice(this.item.line_end + 1);
    const new_content = [
      ...content_before,
      "",
      // add a blank line before appending
      append_content,
      ...content_after
    ].join("\n").trim();
    await this.item.source._update(new_content);
    await this.item.source.import();
  }
  async block_update(new_block_content, opts = {}) {
    if (this.smart_change) new_block_content = this.smart_change.wrap("content", {
      before: await this.block_read({ no_changes: "before", headings: "last" }),
      after: new_block_content,
      adapter: this.item.smart_change_adapter
    });
    await this._block_update(new_block_content);
  }
  async _block_update(new_block_content) {
    const full_content = await this.read();
    try {
      const updated_content = block_update(full_content, this.item.sub_key, new_block_content);
      await this.item.source._update(updated_content);
      await this.item.source.import();
    } catch (error) {
      console.warn("Error updating block:", error.message);
    }
  }
  async block_remove() {
    const full_content = await this.read();
    try {
      const updated_content = block_destroy(full_content, this.item.sub_key);
      await this.item.source._update(updated_content);
      await this.item.source.import();
    } catch (error) {
      console.warn("Error removing block:", error.message);
    }
    this.item.delete();
  }
  async block_move_to(to_key) {
    const to_collection_key = to_key.includes("#") ? "smart_blocks" : "smart_sources";
    const to_entity = this.env[to_collection_key].get(to_key);
    let content = await this.block_read({ no_changes: "before", headings: "last" });
    try {
      if (this.smart_change) {
        const smart_change = this.smart_change.wrap("location", {
          to_key,
          before: await this.block_read({ headings: "last", no_change: "before" }),
          adapter: this.item.smart_change_adapter
        });
        this._block_update(smart_change);
      } else {
        this.block_remove();
      }
    } catch (e) {
      console.warn("error removing block: ", e);
    }
    try {
      if (to_entity) {
        if (this.smart_change) {
          content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: content, adapter: this.item.smart_change_adapter });
          await to_entity._append(content);
        } else {
          await to_entity.append(content);
        }
      } else {
        const target_source_key = to_key.split("#")[0];
        const target_source = this.env.smart_sources.get(target_source_key);
        if (to_key.includes("#")) {
          const headings = to_key.split("#").slice(1);
          const new_headings_content = headings.map((heading, i) => `${"#".repeat(i + 1)} ${heading}`).join("\n");
          let new_content = [
            new_headings_content,
            ...content.split("\n").slice(1)
          ].join("\n").trim();
          if (this.smart_change) new_content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: new_content, adapter: this.item.smart_change_adapter });
          if (target_source) await target_source._append(new_content);
          else await this.env.smart_sources.create(target_source_key, new_content);
        } else {
          if (this.smart_change) content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: content, adapter: this.item.smart_change_adapter });
          if (target_source) await target_source._append(content);
          else await this.env.smart_sources.create(target_source_key, content);
        }
      }
    } catch (e) {
      console.warn("error moving block: ", e);
      this.item.deleted = false;
      await this.block_update(content);
    }
    await this.item.source.import();
  }
};

// node_modules/smart-collections/utils/ajson_merge.js
function ajson_merge(existing, new_obj) {
  if (new_obj === null) return null;
  if (new_obj === void 0) return existing;
  if (typeof new_obj !== "object") return new_obj;
  if (typeof existing !== "object" || existing === null) existing = {};
  const keys = Object.keys(new_obj);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    const new_val = new_obj[key];
    const existing_val = existing[key];
    if (Array.isArray(new_val)) {
      existing[key] = new_val.slice();
    } else if (is_object(new_val)) {
      existing[key] = ajson_merge(is_object(existing_val) ? existing_val : {}, new_val);
    } else if (new_val !== void 0) {
      existing[key] = new_val;
    }
  }
  return existing;
}
function is_object(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

// node_modules/smart-collections/adapters/_adapter.js
var SmartCollectionDataAdapter = class {
  constructor(collection) {
    this.collection = collection;
  }
  // REQUIRED METHODS IN SUBCLASSES
  async load() {
    throw new Error("SmartCollectionDataAdapter: load() not implemented");
  }
  async save() {
    throw new Error("SmartCollectionDataAdapter: save() not implemented");
  }
  // END REQUIRED METHODS IN SUBCLASSES
  get env() {
    return this.collection.env;
  }
  get data_path() {
    return "collection.json";
  }
  get collection_key() {
    return this.collection.collection_key;
  }
};

// node_modules/smart-collections/adapters/multi_file.js
var class_to_collection_key = {
  "SmartSource": "smart_sources",
  "SmartNote": "smart_sources",
  // DEPRECATED: added for backward compatibility
  "SmartBlock": "smart_blocks",
  "SmartDirectory": "smart_directories"
};
var SmartCollectionMultiFileDataAdapter = class extends SmartCollectionDataAdapter {
  get fs() {
    return this.collection.data_fs || this.env.data_fs;
  }
  /**
   * @returns {string} The data folder that contains .ajson files.
   */
  get data_folder() {
    return this.collection.data_dir || "multi";
  }
  /**
   * Asynchronously loads collection item data from .ajson file specified by data_path.
   */
  async load(item) {
    if (!await this.fs.exists(this.data_folder)) await this.fs.mkdir(this.data_folder);
    try {
      const data_ajson = (await this.fs.adapter.read(item.data_path, "utf-8", { no_cache: true })).trim();
      if (!data_ajson) {
        console.log(`Data file not found: ${item.data_path}`);
        return item.queue_import();
      }
      const ajson_lines = data_ajson.split("\n");
      const parsed_data = ajson_lines.reduce((acc, line) => {
        try {
          const parsed = JSON.parse(`{${line}}`);
          if (Object.values(parsed)[0] === null) {
            if (acc[Object.keys(parsed)[0]]) delete acc[Object.keys(parsed)[0]];
            return acc;
          }
          return ajson_merge(acc, parsed);
        } catch (err) {
          console.warn("Error parsing line: ", line);
          console.warn(err.stack);
          return acc;
        }
      }, {});
      const rebuilt_ajson = [];
      Object.entries(parsed_data).forEach(([ajson_key, value], index) => {
        if (!value) return;
        rebuilt_ajson.push(`${JSON.stringify(ajson_key)}: ${JSON.stringify(value)}`);
        const [class_name, ...key_parts] = ajson_key.split(":");
        const entity_key = key_parts.join(":");
        if (entity_key === item.key) item.data = value;
        else {
          if (!this.env[class_to_collection_key[class_name]]) return console.warn(`Collection class not found: ${class_name}`);
          this.env[class_to_collection_key[class_name]].items[entity_key] = new this.env.item_types[class_name](this.env, value);
        }
      });
      item._queue_load = false;
      if (ajson_lines.length !== Object.keys(parsed_data).length) this.fs.write(item.data_path, rebuilt_ajson.join("\n"));
      item.loaded_at = Date.now();
    } catch (err) {
      if (err.message.includes("ENOENT")) return item.queue_import();
      console.log("Error loading collection item: " + item.key);
      console.warn(err.stack);
      item.queue_load();
      return;
    }
  }
  async save(item, ajson = null) {
    if (!ajson) ajson = item.ajson;
    if (!await this.fs.exists(this.data_folder)) await this.fs.mkdir(this.data_folder);
    try {
      if (item.deleted) {
        this.collection.delete_item(item.key);
        if (await this.fs.exists(item.data_path)) await this.fs.remove(item.data_path);
      } else {
        await this.fs.append(item.data_path, "\n" + ajson);
      }
      item._queue_save = false;
      return true;
    } catch (err) {
      if (err.message.includes("ENOENT")) return;
      console.warn("Error saving collection item: ", item.key);
      console.warn(err.stack);
      item.queue_save();
      return false;
    }
  }
};

// node_modules/smart-embed-model/node_modules/smart-model/smart_model.js
var SmartModel = class {
  constructor(opts = {}) {
    this.opts = opts;
  }
  get settings_config() {
    return this.process_settings_config({
      // SETTINGS GO HERE
    });
  }
  process_settings_config(_settings_config, prefix = null) {
    return Object.entries(_settings_config).reduce((acc, [key, val]) => {
      if (val.conditional) {
        if (!val.conditional(this)) return acc;
        delete val.conditional;
      }
      const new_key = (prefix ? prefix + "." : "") + this.process_setting_key(key);
      acc[new_key] = val;
      return acc;
    }, {});
  }
  process_setting_key(key) {
    return key;
  }
  // override in sub-class if needed for prefixes and variable replacements
};

// node_modules/smart-embed-model/models.json
var models_default = {
  "TaylorAI/bge-micro-v2": {
    id: "TaylorAI/bge-micro-v2",
    batch_size: 1,
    dims: 384,
    max_tokens: 512,
    name: "BGE-micro-v2",
    description: "Local, 512 tokens, 384 dim",
    adapter: "transformers"
  },
  "andersonbcdefg/bge-small-4096": {
    id: "andersonbcdefg/bge-small-4096",
    batch_size: 1,
    dims: 384,
    max_tokens: 4096,
    name: "BGE-small-4K",
    description: "Local, 4,096 tokens, 384 dim",
    adapter: "transformers"
  },
  "Xenova/jina-embeddings-v2-base-zh": {
    id: "Xenova/jina-embeddings-v2-base-zh",
    batch_size: 1,
    dims: 512,
    max_tokens: 8192,
    name: "Jina-v2-base-zh-8K",
    description: "Local, 8,192 tokens, 512 dim, Chinese/English bilingual",
    adapter: "transformers"
  },
  "text-embedding-3-small": {
    id: "text-embedding-3-small",
    batch_size: 50,
    dims: 1536,
    max_tokens: 8191,
    name: "OpenAI Text-3 Small",
    description: "API, 8,191 tokens, 1,536 dim",
    endpoint: "https://api.openai.com/v1/embeddings",
    adapter: "openai"
  },
  "text-embedding-3-large": {
    id: "text-embedding-3-large",
    batch_size: 50,
    dims: 3072,
    max_tokens: 8191,
    name: "OpenAI Text-3 Large",
    description: "API, 8,191 tokens, 3,072 dim",
    endpoint: "https://api.openai.com/v1/embeddings",
    adapter: "openai"
  },
  "text-embedding-3-small-512": {
    id: "text-embedding-3-small",
    batch_size: 50,
    dims: 512,
    max_tokens: 8191,
    name: "OpenAI Text-3 Small - 512",
    description: "API, 8,191 tokens, 512 dim",
    endpoint: "https://api.openai.com/v1/embeddings",
    adapter: "openai"
  },
  "text-embedding-3-large-256": {
    id: "text-embedding-3-large",
    batch_size: 50,
    dims: 256,
    max_tokens: 8191,
    name: "OpenAI Text-3 Large - 256",
    description: "API, 8,191 tokens, 256 dim",
    endpoint: "https://api.openai.com/v1/embeddings",
    adapter: "openai"
  },
  "text-embedding-ada-002": {
    id: "text-embedding-ada-002",
    batch_size: 50,
    dims: 1536,
    max_tokens: 8191,
    name: "OpenAI Ada",
    description: "API, 8,191 tokens, 1,536 dim",
    endpoint: "https://api.openai.com/v1/embeddings",
    adapter: "openai"
  },
  "Xenova/jina-embeddings-v2-small-en": {
    id: "Xenova/jina-embeddings-v2-small-en",
    batch_size: 1,
    dims: 512,
    max_tokens: 8192,
    name: "Jina-v2-small-en",
    description: "Local, 8,192 tokens, 512 dim",
    adapter: "transformers"
  },
  "nomic-ai/nomic-embed-text-v1.5": {
    id: "nomic-ai/nomic-embed-text-v1.5",
    batch_size: 1,
    dims: 256,
    max_tokens: 8192,
    name: "Nomic-embed-text-v1.5",
    description: "Local, 8,192 tokens, 256 dim",
    adapter: "transformers"
  },
  "Xenova/bge-small-en-v1.5": {
    id: "Xenova/bge-small-en-v1.5",
    batch_size: 1,
    dims: 384,
    max_tokens: 512,
    name: "BGE-small",
    description: "Local, 512 tokens, 384 dim",
    adapter: "transformers"
  },
  "nomic-ai/nomic-embed-text-v1": {
    id: "nomic-ai/nomic-embed-text-v1",
    batch_size: 1,
    dims: 768,
    max_tokens: 2048,
    name: "Nomic-embed-text",
    description: "Local, 2,048 tokens, 768 dim",
    adapter: "transformers"
  }
};

// node_modules/smart-embed-model/smart_embed_model.js
var SmartEmbedModel = class extends SmartModel {
  /**
   * Create a SmartEmbed instance.
   * @param {string} env - The environment to use.
   * @param {object} opts - Full model configuration object or at least a model_key and adapter
   */
  constructor(env, opts = {}) {
    super(opts);
    if (this.opts.model_key === "None") return console.log(`Smart Embed Model: No active embedding model for ${this.collection_key}, skipping embedding`);
    this.env = env;
    this.opts = {
      ...this.env.opts.modules.smart_embed_model?.class ? { ...this.env.opts.modules.smart_embed_model, class: null } : {},
      ...models_default[opts.model_key],
      // ewww gross
      ...opts
    };
    if (!this.opts.adapter) return console.warn("SmartEmbedModel adapter not set");
    if (!this.opts.adapters[this.opts.adapter]) return console.warn(`SmartEmbedModel adapter ${this.opts.adapter} not found`);
    this.opts.use_gpu = typeof navigator !== "undefined" && !!navigator?.gpu && this.opts.gpu_batch_size !== 0;
    if (this.opts.adapter === "transformers" && this.opts.use_gpu) this.opts.batch_size = this.opts.gpu_batch_size || 10;
  }
  get adapters() {
    return this.opts.adapters || this.env.opts.modules.smart_embed_model.adapters;
  }
  get adapter() {
    if (!this._adapter) this._adapter = new this.adapters[this.opts.adapter](this);
    return this._adapter;
  }
  async load() {
    this.loading = true;
    await this.adapter.load();
    this.loading = false;
    this.loaded = true;
  }
  async unload() {
    await this.adapter.unload();
  }
  /**
   * Count the number of tokens in the input string.
   * @param {string} input - The input string to process.
   * @returns {Promise<number>} A promise that resolves with the number of tokens.
   */
  async count_tokens(input) {
    return this.adapter.count_tokens(input);
  }
  /**
   * Embed the input into a numerical array.
   * @param {string|Object} input - The input to embed. Can be a string or an object with an "embed_input" property.
   * @returns {Promise<Object>} A promise that resolves with an object containing the embedding vector at `vec` and the number of tokens at `tokens`.
   */
  async embed(input) {
    if (typeof input === "string") input = { embed_input: input };
    return (await this.embed_batch([input]))[0];
  }
  /**
   * Embed a batch of inputs into arrays of numerical arrays.
   * @param {Array<string|Object>} inputs - The array of inputs to embed. Each input can be a string or an object with an "embed_input" property.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of objects containing `vec` and `tokens` properties.
   */
  async embed_batch(inputs) {
    return await this.adapter.embed_batch(inputs);
  }
  get model_config() {
    return models_default[this.opts.model_key];
  }
  get batch_size() {
    return this.opts.batch_size || 1;
  }
  get max_tokens() {
    return this.opts.max_tokens || 512;
  }
  get dims() {
    return this.opts.dims;
  }
  get min_chars() {
    return this.settings?.[this.opts.model_key]?.min_chars || 300;
  }
  // TODO: replace static opts with dynamic reference to canonical settings via opts.settings (like smart-chat-model-v2)
  get settings() {
    return this.opts.settings;
  }
  // ref to canonical settings
  get settings_config() {
    return this.process_settings_config(settings_config3, "embed_model");
  }
  process_setting_key(key) {
    return key.replace(/\[EMBED_MODEL\]/g, this.opts.model_key);
  }
  get_embedding_model_options() {
    return Object.entries(models_default).map(([key, model]) => ({ value: key, name: key }));
  }
  get_block_embedding_model_options() {
    const options = this.get_embedding_model_options();
    options.unshift({ value: "None", name: "None" });
    return options;
  }
};
var settings_config3 = {
  model_key: {
    name: "Embedding Model",
    type: "dropdown",
    description: "Select an embedding model.",
    options_callback: "embed_model.get_embedding_model_options",
    callback: "embed_model_changed",
    default: "TaylorAI/bge-micro-v2"
    // required: true
  },
  "[EMBED_MODEL].min_chars": {
    name: "Minimum Embedding Length",
    type: "number",
    description: "Minimum length of note to embed.",
    placeholder: "Enter number ex. 300"
    // callback: 'refresh_embeddings',
    // required: true,
  },
  "[EMBED_MODEL].api_key": {
    name: "OpenAI API Key for embeddings",
    type: "password",
    description: "Required for OpenAI embedding models",
    placeholder: "Enter OpenAI API Key",
    // callback: 'test_api_key_openai_embeddings',
    // callback: 'restart', // TODO: should be replaced with better unload/reload of smart_embed
    conditional: (_this) => !_this.settings.model_key?.includes("/")
  },
  "[EMBED_MODEL].gpu_batch_size": {
    name: "GPU Batch Size",
    type: "number",
    description: "Number of embeddings to process per batch on GPU. Use 0 to disable GPU.",
    placeholder: "Enter number ex. 10"
    // callback: 'restart',
  },
  "legacy_transformers": {
    name: "Legacy Transformers (no GPU)",
    type: "toggle",
    description: "Use legacy transformers (v2) instead of v3.",
    callback: "embed_model_changed",
    default: true
  }
};

// node_modules/smart-embed-model/adapters/_adapter.js
var SmartEmbedAdapter = class {
  constructor(smart_embed) {
    this.smart_embed = smart_embed;
  }
  async load() {
    throw new Error("Not implemented");
  }
  async count_tokens(input) {
    throw new Error("Not implemented");
  }
  async embed(input) {
    throw new Error("Not implemented");
  }
  async embed_batch(input) {
    throw new Error("Not implemented");
  }
  unload() {
  }
};

// node_modules/smart-embed-model/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js
var import_base64_js = __toESM(require_base64_js(), 1);
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
  /** @internal */
  specialTokens;
  /** @internal */
  inverseSpecialTokens;
  /** @internal */
  patStr;
  /** @internal */
  textEncoder = new TextEncoder();
  /** @internal */
  textDecoder = new TextDecoder("utf-8");
  /** @internal */
  rankMap = /* @__PURE__ */ new Map();
  /** @internal */
  textMap = /* @__PURE__ */ new Map();
  constructor(ranks, extendedSpecialTokens) {
    this.patStr = ranks.pat_str;
    const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
      const [_, offsetStr, ...tokens] = x.split(" ");
      const offset = Number.parseInt(offsetStr, 10);
      tokens.forEach((token, i) => memo[token] = offset + i);
      return memo;
    }, {});
    for (const [token, rank] of Object.entries(uncompressed)) {
      const bytes = import_base64_js.default.toByteArray(token);
      this.rankMap.set(bytes.join(","), rank);
      this.textMap.set(rank, bytes);
    }
    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
      memo[rank] = this.textEncoder.encode(text);
      return memo;
    }, {});
  }
  encode(text, allowedSpecial = [], disallowedSpecial = "all") {
    const regexes = new RegExp(this.patStr, "ug");
    const specialRegex = _Tiktoken.specialTokenRegex(
      Object.keys(this.specialTokens)
    );
    const ret = [];
    const allowedSpecialSet = new Set(
      allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
    );
    const disallowedSpecialSet = new Set(
      disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
        (x) => !allowedSpecialSet.has(x)
      ) : disallowedSpecial
    );
    if (disallowedSpecialSet.size > 0) {
      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
        ...disallowedSpecialSet
      ]);
      const specialMatch = text.match(disallowedSpecialRegex);
      if (specialMatch != null) {
        throw new Error(
          `The text contains a special token that is not allowed: ${specialMatch[0]}`
        );
      }
    }
    let start = 0;
    while (true) {
      let nextSpecial = null;
      let startFind = start;
      while (true) {
        specialRegex.lastIndex = startFind;
        nextSpecial = specialRegex.exec(text);
        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
          break;
        startFind = nextSpecial.index + 1;
      }
      const end = nextSpecial?.index ?? text.length;
      for (const match of text.substring(start, end).matchAll(regexes)) {
        const piece = this.textEncoder.encode(match[0]);
        const token2 = this.rankMap.get(piece.join(","));
        if (token2 != null) {
          ret.push(token2);
          continue;
        }
        ret.push(...bytePairEncode(piece, this.rankMap));
      }
      if (nextSpecial == null)
        break;
      let token = this.specialTokens[nextSpecial[0]];
      ret.push(token);
      start = nextSpecial.index + nextSpecial[0].length;
    }
    return ret;
  }
  decode(tokens) {
    const res = [];
    let length = 0;
    for (let i2 = 0; i2 < tokens.length; ++i2) {
      const token = tokens[i2];
      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
      if (bytes != null) {
        res.push(bytes);
        length += bytes.length;
      }
    }
    const mergedArray = new Uint8Array(length);
    let i = 0;
    for (const bytes of res) {
      mergedArray.set(bytes, i);
      i += bytes.length;
    }
    return this.textDecoder.decode(mergedArray);
  }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens) => {
  return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
});

// node_modules/smart-embed-model/cl100k_base.json

// node_modules/smart-embed-model/adapters/openai.js
var SmartEmbedOpenAIAdapter = class extends SmartEmbedAdapter {
  constructor(smart_embed) {
    super(smart_embed);
    this.model_key = smart_embed.opts.model_key || "text-embedding-ada-002";
    this.endpoint = "https://api.openai.com/v1/embeddings";
    this.max_tokens = 8191;
    this.enc = null;
    this.request_adapter = smart_embed.env.opts.request_adapter;
  }
  get api_key() {
    return this.smart_embed.opts.api_key || this.smart_embed.env.smart_connections_plugin?.settings?.api_key;
  }
  async load() {
    this.enc = new Tiktoken(cl100k_base_default);
  }
  async count_tokens(input) {
    if (!this.enc) await this.load();
    return this.enc.encode(input).length;
  }
  estimate_tokens(input) {
    if (typeof input === "object") input = JSON.stringify(input);
    return Math.ceil(input.length / 3.7);
  }
  async embed_batch(inputs) {
    console.log(`Original inputs length: ${inputs.length}`);
    inputs = inputs.filter((item) => item.embed_input?.length > 0);
    console.log(`Filtered inputs length: ${inputs.length}`);
    if (inputs.length === 0) {
      console.log("empty batch (or all items have empty embed_input)");
      return [];
    }
    const embed_inputs = await Promise.all(inputs.map((item) => this.prepare_embed_input(item.embed_input)));
    console.log(`Prepared embed_inputs length: ${embed_inputs.length}`);
    const embeddings = await this.request_embedding(embed_inputs);
    if (!embeddings) return console.error(inputs);
    return inputs.map((item, i) => {
      item.vec = embeddings[i].vec;
      item.tokens = embeddings[i].tokens;
      return item;
    });
  }
  async prepare_embed_input(embed_input) {
    if (typeof embed_input !== "string") {
      throw new TypeError("embed_input must be a string");
    }
    if (embed_input.length === 0) {
      console.log("Warning: prepare_embed_input received an empty string");
      return null;
    }
    const tokens_ct = await this.count_tokens(embed_input);
    if (tokens_ct <= this.max_tokens) {
      return embed_input;
    }
    const reduce_ratio = (tokens_ct - this.max_tokens) / tokens_ct;
    const new_length = Math.floor(embed_input.length * (1 - reduce_ratio));
    let trimmed_input = embed_input.slice(0, new_length);
    const last_space_index = trimmed_input.lastIndexOf(" ");
    if (last_space_index > 0) {
      trimmed_input = trimmed_input.slice(0, last_space_index);
    }
    const prepared_input = await this.prepare_embed_input(trimmed_input);
    if (prepared_input === null) {
      console.log("Warning: prepare_embed_input resulted in an empty string after trimming");
      return null;
    }
    return prepared_input;
  }
  prepare_batch_input(items) {
    return items.map((item) => this.prepare_embed_input(item.embed_input));
  }
  get model_config() {
    return this.smart_embed.model_config;
  }
  get model() {
    return this.model_config.id;
  }
  get dims() {
    return this.model_config.dims || 1536;
  }
  prepare_request_body(embed_input) {
    const body = {
      model: this.model,
      input: embed_input
    };
    if (this.model.startsWith("text-embedding-3")) {
      body.dimensions = this.dims;
    }
    return body;
  }
  prepare_request_headers() {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.api_key}`
    };
    if (this.smart_embed.opts.headers) {
      headers = { ...headers, ...this.smart_embed.opts.headers };
    }
    return headers;
  }
  async request_embedding(embed_input) {
    embed_input = embed_input.filter((input) => input !== null && input.length > 0);
    if (embed_input.length === 0) {
      console.log("embed_input is empty after filtering null and empty strings");
      return null;
    }
    const request2 = {
      url: this.endpoint,
      method: "POST",
      body: JSON.stringify(this.prepare_request_body(embed_input)),
      headers: this.prepare_request_headers()
    };
    const resp = await this.request(request2);
    return this.parse_response(resp);
  }
  parse_response(resp) {
    return resp.data.map((item) => ({
      vec: item.embedding,
      tokens: resp.usage.total_tokens
    }));
  }
  is_error(resp_json) {
    return !resp_json.data || !resp_json.usage;
  }
  async get_resp_json(resp) {
    return typeof resp.json === "function" ? await resp.json() : await resp.json;
  }
  async request(req, retries = 0) {
    try {
      req.throw = false;
      const resp = this.request_adapter ? await this.request_adapter({ url: this.endpoint, ...req }) : await fetch(this.endpoint, req);
      const resp_json = await this.get_resp_json(resp);
      if (this.is_error(resp_json)) {
        return await this.handle_request_err(resp_json, req, retries);
      }
      return resp_json;
    } catch (error) {
      return await this.handle_request_err(error, req, retries);
    }
  }
  async handle_request_err(error, req, retries) {
    if (error.status === 429 && retries < 3) {
      const backoff = Math.pow(retries + 1, 2);
      console.log(`Retrying request (429) in ${backoff} seconds...`);
      await new Promise((r) => setTimeout(r, 1e3 * backoff));
      return await this.request(req, retries + 1);
    }
    console.error(error);
    return null;
  }
};

// node_modules/smart-embed-model/adapters/iframe.js
var SmartEmbedIframeAdapter = class extends SmartEmbedAdapter {
  constructor(smart_embed) {
    super(smart_embed);
    this.iframe = null;
    this.message_queue = {};
    this.message_id = 0;
    this.connector = null;
    this.origin = window.location.origin;
    this.iframe_id = `smart_embed_iframe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  async load() {
    this.iframe = document.createElement("iframe");
    this.iframe.style.display = "none";
    this.iframe.id = this.iframe_id;
    document.body.appendChild(this.iframe);
    window.addEventListener("message", this._handle_message.bind(this));
    this.iframe.srcdoc = `
          <html>
            <body>
              <script type="module">
                ${this.connector}
                // Set up a message listener in the iframe
                window.addEventListener('message', async (event) => {
                    if (event.origin !== '${this.origin}' || event.data.iframe_id !== '${this.iframe_id}') return console.log('message ignored (listener)', event);
                    // Process the message and send the response back
                    const response = await processMessage(event.data);
                    window.parent.postMessage({ ...response, iframe_id: '${this.iframe_id}' }, '${this.origin}');
                });
              </script>
            </body>
          </html>
        `;
    await new Promise((resolve) => this.iframe.onload = resolve);
    await this._send_message("load", {
      ...this.smart_embed.opts,
      adapters: null,
      // cannot clone classes
      settings: null
      // cannot clone Proxy objects
    });
    return new Promise((resolve) => {
      const check_model_loaded = () => {
        if (this.smart_embed.model_loaded) {
          resolve();
        } else {
          setTimeout(check_model_loaded, 100);
        }
      };
      check_model_loaded();
    });
  }
  async _send_message(method, params) {
    return new Promise((resolve, reject) => {
      const id = this.message_id++;
      this.message_queue[id] = { resolve, reject };
      this.iframe.contentWindow.postMessage({ method, params, id, iframe_id: this.iframe_id }, this.origin);
    });
  }
  _handle_message(event) {
    if (event.origin !== this.origin || event.data.iframe_id !== this.iframe_id) return;
    const { id, result, error } = event.data;
    if (result?.model_loaded) {
      console.log("model loaded");
      this.smart_embed.model_loaded = true;
    }
    if (this.message_queue[id]) {
      if (error) {
        this.message_queue[id].reject(new Error(error));
      } else {
        this.message_queue[id].resolve(result);
      }
      delete this.message_queue[id];
    }
  }
  async count_tokens(input) {
    return this._send_message("count_tokens", { input });
  }
  async embed_batch(inputs) {
    const filtered_inputs = inputs.filter((item) => item.embed_input?.length > 0);
    if (!filtered_inputs.length) return [];
    const embed_inputs = filtered_inputs.map((item) => ({ embed_input: item.embed_input }));
    const result = await this._send_message("embed_batch", { inputs: embed_inputs });
    return filtered_inputs.map((item, i) => {
      item.vec = result[i].vec;
      item.tokens = result[i].tokens;
      return item;
    });
  }
  async unload() {
    await this._send_message("unload");
    document.body.removeChild(this.iframe);
    this.iframe = null;
    window.removeEventListener("message", this._handle_message.bind(this));
  }
};

// node_modules/smart-embed-model/connectors/transformers_iframe.js
var transformers_connector = '// ../smart-model/smart_model.js\nvar SmartModel = class {\n  constructor(opts = {}) {\n    this.opts = opts;\n  }\n  get settings_config() {\n    return this.process_settings_config({\n      // SETTINGS GO HERE\n    });\n  }\n  process_settings_config(_settings_config, prefix = null) {\n    return Object.entries(_settings_config).reduce((acc, [key, val]) => {\n      if (val.conditional) {\n        if (!val.conditional(this)) return acc;\n        delete val.conditional;\n      }\n      const new_key = (prefix ? prefix + "." : "") + this.process_setting_key(key);\n      acc[new_key] = val;\n      return acc;\n    }, {});\n  }\n  process_setting_key(key) {\n    return key;\n  }\n  // override in sub-class if needed for prefixes and variable replacements\n};\n\n// models.json\nvar models_default = {\n  "TaylorAI/bge-micro-v2": {\n    id: "TaylorAI/bge-micro-v2",\n    batch_size: 1,\n    dims: 384,\n    max_tokens: 512,\n    name: "BGE-micro-v2",\n    description: "Local, 512 tokens, 384 dim",\n    adapter: "transformers"\n  },\n  "andersonbcdefg/bge-small-4096": {\n    id: "andersonbcdefg/bge-small-4096",\n    batch_size: 1,\n    dims: 384,\n    max_tokens: 4096,\n    name: "BGE-small-4K",\n    description: "Local, 4,096 tokens, 384 dim",\n    adapter: "transformers"\n  },\n  "Xenova/jina-embeddings-v2-base-zh": {\n    id: "Xenova/jina-embeddings-v2-base-zh",\n    batch_size: 1,\n    dims: 512,\n    max_tokens: 8192,\n    name: "Jina-v2-base-zh-8K",\n    description: "Local, 8,192 tokens, 512 dim, Chinese/English bilingual",\n    adapter: "transformers"\n  },\n  "text-embedding-3-small": {\n    id: "text-embedding-3-small",\n    batch_size: 50,\n    dims: 1536,\n    max_tokens: 8191,\n    name: "OpenAI Text-3 Small",\n    description: "API, 8,191 tokens, 1,536 dim",\n    endpoint: "https://api.openai.com/v1/embeddings",\n    adapter: "openai"\n  },\n  "text-embedding-3-large": {\n    id: "text-embedding-3-large",\n    batch_size: 50,\n    dims: 3072,\n    max_tokens: 8191,\n    name: "OpenAI Text-3 Large",\n    description: "API, 8,191 tokens, 3,072 dim",\n    endpoint: "https://api.openai.com/v1/embeddings",\n    adapter: "openai"\n  },\n  "text-embedding-3-small-512": {\n    id: "text-embedding-3-small",\n    batch_size: 50,\n    dims: 512,\n    max_tokens: 8191,\n    name: "OpenAI Text-3 Small - 512",\n    description: "API, 8,191 tokens, 512 dim",\n    endpoint: "https://api.openai.com/v1/embeddings",\n    adapter: "openai"\n  },\n  "text-embedding-3-large-256": {\n    id: "text-embedding-3-large",\n    batch_size: 50,\n    dims: 256,\n    max_tokens: 8191,\n    name: "OpenAI Text-3 Large - 256",\n    description: "API, 8,191 tokens, 256 dim",\n    endpoint: "https://api.openai.com/v1/embeddings",\n    adapter: "openai"\n  },\n  "text-embedding-ada-002": {\n    id: "text-embedding-ada-002",\n    batch_size: 50,\n    dims: 1536,\n    max_tokens: 8191,\n    name: "OpenAI Ada",\n    description: "API, 8,191 tokens, 1,536 dim",\n    endpoint: "https://api.openai.com/v1/embeddings",\n    adapter: "openai"\n  },\n  "Xenova/jina-embeddings-v2-small-en": {\n    id: "Xenova/jina-embeddings-v2-small-en",\n    batch_size: 1,\n    dims: 512,\n    max_tokens: 8192,\n    name: "Jina-v2-small-en",\n    description: "Local, 8,192 tokens, 512 dim",\n    adapter: "transformers"\n  },\n  "nomic-ai/nomic-embed-text-v1.5": {\n    id: "nomic-ai/nomic-embed-text-v1.5",\n    batch_size: 1,\n    dims: 256,\n    max_tokens: 8192,\n    name: "Nomic-embed-text-v1.5",\n    description: "Local, 8,192 tokens, 256 dim",\n    adapter: "transformers"\n  },\n  "Xenova/bge-small-en-v1.5": {\n    id: "Xenova/bge-small-en-v1.5",\n    batch_size: 1,\n    dims: 384,\n    max_tokens: 512,\n    name: "BGE-small",\n    description: "Local, 512 tokens, 384 dim",\n    adapter: "transformers"\n  },\n  "nomic-ai/nomic-embed-text-v1": {\n    id: "nomic-ai/nomic-embed-text-v1",\n    batch_size: 1,\n    dims: 768,\n    max_tokens: 2048,\n    name: "Nomic-embed-text",\n    description: "Local, 2,048 tokens, 768 dim",\n    adapter: "transformers"\n  }\n};\n\n// smart_embed_model.js\nvar SmartEmbedModel = class extends SmartModel {\n  /**\n   * Create a SmartEmbed instance.\n   * @param {string} env - The environment to use.\n   * @param {object} opts - Full model configuration object or at least a model_key and adapter\n   */\n  constructor(env, opts = {}) {\n    super(opts);\n    if (this.opts.model_key === "None") return console.log(`Smart Embed Model: No active embedding model for ${this.collection_key}, skipping embedding`);\n    this.env = env;\n    this.opts = {\n      ...this.env.opts.modules.smart_embed_model?.class ? { ...this.env.opts.modules.smart_embed_model, class: null } : {},\n      ...models_default[opts.model_key],\n      // ewww gross\n      ...opts\n    };\n    if (!this.opts.adapter) return console.warn("SmartEmbedModel adapter not set");\n    if (!this.opts.adapters[this.opts.adapter]) return console.warn(`SmartEmbedModel adapter ${this.opts.adapter} not found`);\n    this.opts.use_gpu = typeof navigator !== "undefined" && !!navigator?.gpu && this.opts.gpu_batch_size !== 0;\n    if (this.opts.adapter === "transformers" && this.opts.use_gpu) this.opts.batch_size = this.opts.gpu_batch_size || 10;\n  }\n  get adapters() {\n    return this.opts.adapters || this.env.opts.modules.smart_embed_model.adapters;\n  }\n  get adapter() {\n    if (!this._adapter) this._adapter = new this.adapters[this.opts.adapter](this);\n    return this._adapter;\n  }\n  async load() {\n    this.loading = true;\n    await this.adapter.load();\n    this.loading = false;\n    this.loaded = true;\n  }\n  async unload() {\n    await this.adapter.unload();\n  }\n  /**\n   * Count the number of tokens in the input string.\n   * @param {string} input - The input string to process.\n   * @returns {Promise<number>} A promise that resolves with the number of tokens.\n   */\n  async count_tokens(input) {\n    return this.adapter.count_tokens(input);\n  }\n  /**\n   * Embed the input into a numerical array.\n   * @param {string|Object} input - The input to embed. Can be a string or an object with an "embed_input" property.\n   * @returns {Promise<Object>} A promise that resolves with an object containing the embedding vector at `vec` and the number of tokens at `tokens`.\n   */\n  async embed(input) {\n    if (typeof input === "string") input = { embed_input: input };\n    return (await this.embed_batch([input]))[0];\n  }\n  /**\n   * Embed a batch of inputs into arrays of numerical arrays.\n   * @param {Array<string|Object>} inputs - The array of inputs to embed. Each input can be a string or an object with an "embed_input" property.\n   * @returns {Promise<Array<Object>>} A promise that resolves with an array of objects containing `vec` and `tokens` properties.\n   */\n  async embed_batch(inputs) {\n    return await this.adapter.embed_batch(inputs);\n  }\n  get model_config() {\n    return models_default[this.opts.model_key];\n  }\n  get batch_size() {\n    return this.opts.batch_size || 1;\n  }\n  get max_tokens() {\n    return this.opts.max_tokens || 512;\n  }\n  get dims() {\n    return this.opts.dims;\n  }\n  get min_chars() {\n    return this.settings?.[this.opts.model_key]?.min_chars || 300;\n  }\n  // TODO: replace static opts with dynamic reference to canonical settings via opts.settings (like smart-chat-model-v2)\n  get settings() {\n    return this.opts.settings;\n  }\n  // ref to canonical settings\n  get settings_config() {\n    return this.process_settings_config(settings_config, "embed_model");\n  }\n  process_setting_key(key) {\n    return key.replace(/\\[EMBED_MODEL\\]/g, this.opts.model_key);\n  }\n  get_embedding_model_options() {\n    return Object.entries(models_default).map(([key, model2]) => ({ value: key, name: key }));\n  }\n  get_block_embedding_model_options() {\n    const options = this.get_embedding_model_options();\n    options.unshift({ value: "None", name: "None" });\n    return options;\n  }\n};\nvar settings_config = {\n  model_key: {\n    name: "Embedding Model",\n    type: "dropdown",\n    description: "Select an embedding model.",\n    options_callback: "embed_model.get_embedding_model_options",\n    callback: "embed_model_changed",\n    default: "TaylorAI/bge-micro-v2"\n    // required: true\n  },\n  "[EMBED_MODEL].min_chars": {\n    name: "Minimum Embedding Length",\n    type: "number",\n    description: "Minimum length of note to embed.",\n    placeholder: "Enter number ex. 300"\n    // callback: \'refresh_embeddings\',\n    // required: true,\n  },\n  "[EMBED_MODEL].api_key": {\n    name: "OpenAI API Key for embeddings",\n    type: "password",\n    description: "Required for OpenAI embedding models",\n    placeholder: "Enter OpenAI API Key",\n    // callback: \'test_api_key_openai_embeddings\',\n    // callback: \'restart\', // TODO: should be replaced with better unload/reload of smart_embed\n    conditional: (_this) => !_this.settings.model_key?.includes("/")\n  },\n  "[EMBED_MODEL].gpu_batch_size": {\n    name: "GPU Batch Size",\n    type: "number",\n    description: "Number of embeddings to process per batch on GPU. Use 0 to disable GPU.",\n    placeholder: "Enter number ex. 10"\n    // callback: \'restart\',\n  },\n  "legacy_transformers": {\n    name: "Legacy Transformers (no GPU)",\n    type: "toggle",\n    description: "Use legacy transformers (v2) instead of v3.",\n    callback: "embed_model_changed",\n    default: true\n  }\n};\n\n// adapters/_adapter.js\nvar SmartEmbedAdapter = class {\n  constructor(smart_embed) {\n    this.smart_embed = smart_embed;\n  }\n  async load() {\n    throw new Error("Not implemented");\n  }\n  async count_tokens(input) {\n    throw new Error("Not implemented");\n  }\n  async embed(input) {\n    throw new Error("Not implemented");\n  }\n  async embed_batch(input) {\n    throw new Error("Not implemented");\n  }\n  unload() {\n  }\n};\n\n// adapters/transformers.js\nvar SmartEmbedTransformersAdapter = class extends SmartEmbedAdapter {\n  constructor(smart_embed) {\n    super(smart_embed);\n    this.model = null;\n    this.tokenizer = null;\n  }\n  get batch_size() {\n    if (this.use_gpu && this.smart_embed.opts.gpu_batch_size) return this.smart_embed.opts.gpu_batch_size;\n    return this.smart_embed.opts.batch_size || 1;\n  }\n  get max_tokens() {\n    return this.smart_embed.opts.max_tokens || 512;\n  }\n  get use_gpu() {\n    return this.smart_embed.opts.use_gpu || false;\n  }\n  async load() {\n    const { pipeline, env, AutoTokenizer } = await import("@xenova/transformers");\n    env.allowLocalModels = false;\n    const pipeline_opts = {\n      quantized: true\n    };\n    if (this.use_gpu) {\n      console.log("[Transformers] Using GPU");\n      pipeline_opts.device = "webgpu";\n      pipeline_opts.dtype = "fp32";\n    } else {\n      console.log("[Transformers] Using CPU");\n      env.backends.onnx.wasm.numThreads = 8;\n    }\n    this.model = await pipeline("feature-extraction", this.smart_embed.opts.model_key, pipeline_opts);\n    this.tokenizer = await AutoTokenizer.from_pretrained(this.smart_embed.opts.model_key);\n  }\n  async count_tokens(input) {\n    if (!this.tokenizer) await this.load();\n    const { input_ids } = await this.tokenizer(input);\n    return { tokens: input_ids.data.length };\n  }\n  async embed_batch(inputs) {\n    if (!this.model) await this.load();\n    const filtered_inputs = inputs.filter((item) => item.embed_input?.length > 0);\n    if (!filtered_inputs.length) return [];\n    if (filtered_inputs.length > this.batch_size) {\n      throw new Error(`Input size (${filtered_inputs.length}) exceeds maximum batch size (${this.batch_size})`);\n    }\n    const tokens = await Promise.all(filtered_inputs.map((item) => this.count_tokens(item.embed_input)));\n    const embed_inputs = await Promise.all(filtered_inputs.map(async (item, i) => {\n      if (tokens[i].tokens < this.max_tokens) return item.embed_input;\n      let token_ct = tokens[i].tokens;\n      let truncated_input = item.embed_input;\n      while (token_ct > this.max_tokens) {\n        const pct = this.max_tokens / token_ct;\n        const max_chars = Math.floor(truncated_input.length * pct * 0.9);\n        truncated_input = truncated_input.substring(0, max_chars) + "...";\n        token_ct = (await this.count_tokens(truncated_input)).tokens;\n      }\n      tokens[i].tokens = token_ct;\n      return truncated_input;\n    }));\n    try {\n      const resp = await this.model(embed_inputs, { pooling: "mean", normalize: true });\n      return filtered_inputs.map((item, i) => {\n        item.vec = Array.from(resp[i].data).map((val) => Math.round(val * 1e8) / 1e8);\n        item.tokens = tokens[i].tokens;\n        return item;\n      });\n    } catch (err) {\n      console.error("error_embedding_batch", err);\n      return Promise.all(filtered_inputs.map((item) => this.embed(item.embed_input)));\n    }\n  }\n  async unload() {\n    await this.model.dispose();\n  }\n};\n\n// build/transformers_iframe_script.js\nvar model = null;\nvar smart_env = {\n  smart_embed_active_models: {},\n  opts: {\n    modules: {\n      smart_embed_model: {\n        adapters: {\n          transformers: SmartEmbedTransformersAdapter\n        }\n      }\n    }\n  }\n};\nasync function processMessage(data) {\n  const { method, params, id, iframe_id } = data;\n  try {\n    let result;\n    switch (method) {\n      case "init":\n        console.log("init");\n        break;\n      case "load":\n        console.log("load", params);\n        model = new SmartEmbedModel(smart_env, { ...params, adapters: { transformers: SmartEmbedTransformersAdapter }, adapter: "transformers" });\n        await model.load();\n        result = { model_loaded: true };\n        break;\n      case "embed_batch":\n        if (!model) throw new Error("Model not loaded");\n        result = await model.embed_batch(params.inputs);\n        break;\n      case "count_tokens":\n        if (!model) throw new Error("Model not loaded");\n        result = await model.count_tokens(params);\n        break;\n      case "unload":\n        await model.unload();\n        result = { unloaded: true };\n        break;\n      default:\n        throw new Error(`Unknown method: ${method}`);\n    }\n    return { id, result, iframe_id };\n  } catch (error) {\n    console.error("Error processing message:", error);\n    return { id, error: error.message, iframe_id };\n  }\n}\nprocessMessage({ method: "init" });\n';

// node_modules/smart-embed-model/adapters/transformers_iframe.js
var SmartEmbedTransformersIframeAdapter = class extends SmartEmbedIframeAdapter {
  constructor(smart_embed) {
    super(smart_embed);
    this.connector = transformers_connector;
    if (this.smart_embed.settings.legacy_transformers) {
      this.connector = this.connector.replace("@xenova/transformers", "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2");
      this.smart_embed.opts.use_gpu = false;
    } else this.connector = this.connector.replace("@xenova/transformers", "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.1");
  }
};

// node_modules/smart-file-system/utils/match_glob.js
var glob_to_regex_pattern = (pattern, extended_glob) => {
  let in_class = false;
  let in_brace = 0;
  let result = "";
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    switch (char) {
      case "\\":
        result += "\\" + (i + 1 < pattern.length ? pattern[++i] : "\\");
        break;
      case "/":
        result += "\\/";
        break;
      case "[":
        if (!in_class) {
          in_class = true;
          if (pattern[i + 1] === "!") {
            result += "[^";
            i++;
          } else {
            result += "[";
          }
        } else {
          result += "\\[";
        }
        break;
      case "]":
        if (in_class) {
          in_class = false;
          result += "]";
        } else {
          result += "\\]";
        }
        break;
      case "{":
        if (!in_class) {
          in_brace++;
          result += "(";
        } else {
          result += "{";
        }
        break;
      case "}":
        if (!in_class && in_brace > 0) {
          in_brace--;
          result += ")";
        } else {
          result += "}";
        }
        break;
      case ",":
        if (!in_class && in_brace > 0) {
          result += "|";
        } else {
          result += ",";
        }
        break;
      case "*":
        if (!in_class) {
          if (pattern[i + 1] === "*") {
            result += ".*";
            i++;
          } else {
            result += "[^/]*";
          }
        } else {
          result += "\\*";
        }
        break;
      case "?":
        result += in_class ? "\\?" : "[^/]";
        break;
      case ".":
      case "(":
      case ")":
      case "+":
      case "|":
      case "^":
      case "$":
        result += "\\" + char;
        break;
      default:
        result += char;
    }
  }
  if (extended_glob) {
    result = result.replace(/\\\+\\\((.*?)\\\)/g, "($1)+").replace(/\\\@\\\((.*?)\\\)/g, "($1)").replace(/\\\!\\\((.*?)\\\)/g, "(?!$1).*").replace(/\\\?\\\((.*?)\\\)/g, "($1)?").replace(/\\\*\\\((.*?)\\\)/g, "($1)*");
  }
  return result;
};
var adjust_for_windows_paths = (pattern, windows_paths) => windows_paths ? pattern.replace(/\\\//g, "[\\\\/]") : pattern;
var create_regex = (pattern, { case_sensitive, extended_glob, windows_paths }) => {
  const regex_pattern = glob_to_regex_pattern(pattern, extended_glob);
  const adjusted_pattern = adjust_for_windows_paths(regex_pattern, windows_paths);
  const flags = case_sensitive ? "" : "i";
  return new RegExp(`^${adjusted_pattern}$`, flags);
};
function glob_to_regex(pattern, options = {}) {
  const default_options = { case_sensitive: true, extended_glob: false, windows_paths: false };
  const merged_options = { ...default_options, ...options };
  if (pattern === "") {
    return /^$/;
  }
  if (pattern === "*" && !merged_options.windows_paths) {
    return /^[^/]+$/;
  }
  if (pattern === "**" && !merged_options.windows_paths) {
    return /^.+$/;
  }
  return create_regex(pattern, merged_options);
}

// node_modules/smart-file-system/utils/fuzzy_search.js
function fuzzy_search(arr, search_term) {
  let matches = [];
  for (let i = 0; i < arr.length; i++) {
    const search_chars = search_term.toLowerCase().split("");
    let match = true;
    let distance = 0;
    const name = arr[i];
    const label_name = name.toLowerCase();
    for (let j = 0; j < search_chars.length; j++) {
      const search_index = label_name.substring(distance).indexOf(search_chars[j]);
      if (search_index >= 0) {
        distance += search_index + 1;
      } else {
        match = false;
        break;
      }
    }
    if (match) matches.push({ name, distance });
  }
  matches.sort((a, b) => a.distance - b.distance);
  return matches.map((match) => match.name);
}

// node_modules/smart-file-system/smart_fs.js
var SmartFs = class {
  /**
   * Create a new SmartFs instance
   * 
   * @param {Object} env - The Smart Environment instance
   * @param {Object} [opts={}] - Optional configuration
   * @param {string} [opts.fs_path] - Custom environment path
   */
  constructor(env, opts = {}) {
    this.env = env;
    this.opts = opts;
    this.fs_path = opts.fs_path || opts.env_path || "";
    if (!opts.adapter) throw new Error("SmartFs requires an adapter");
    this.adapter = new opts.adapter(this);
    this.excluded_patterns = [];
    if (Array.isArray(opts.exclude_patterns)) {
      opts.exclude_patterns.forEach((pattern) => this.add_ignore_pattern(pattern));
    }
    this.folders = {};
    this.files = {};
    this.file_paths = [];
    this.folder_paths = [];
  }
  async refresh() {
    this.files = {};
    this.file_paths = [];
    this.folders = {};
    this.folder_paths = [];
    await this.init();
  }
  async init() {
    await this.load_gitignore();
    await this.load_files();
  }
  async load_files() {
    const all = await this.list_recursive();
    this.file_paths = [];
    this.folder_paths = [];
    all.forEach((file) => {
      if (file.type === "file") {
        this.files[file.path] = file;
        this.file_paths.push(file.path);
      }
      if (file.type === "folder") {
        this.folders[file.path] = file;
        this.folder_paths.push(file.path);
      }
    });
  }
  include_file(file_path) {
    const file = this.adapter.get_file(file_path);
    this.files[file.path] = file;
    this.file_paths.push(file.path);
    return file;
  }
  /**
   * Load .gitignore patterns
   * 
   * @returns {Promise<RegExp[]>} Array of RegExp patterns
   */
  async load_gitignore() {
    const gitignore_path = ".gitignore";
    const gitignore_exists = await this.adapter.exists(gitignore_path);
    if (gitignore_exists) {
      const gitignore_content = await this.adapter.read(gitignore_path, "utf-8");
      gitignore_content.split("\n").filter((line) => !line.startsWith("#")).filter(Boolean).forEach((pattern) => this.add_ignore_pattern(pattern));
    }
    this.add_ignore_pattern(".**");
    this.add_ignore_pattern("**/.**");
    this.add_ignore_pattern("**/.*/**");
    this.add_ignore_pattern("**/*.ajson");
    this.add_ignore_pattern("**/*.excalidraw.md");
  }
  /**
   * Add a new ignore pattern
   * 
   * @param {string} pattern - The pattern to add
   */
  add_ignore_pattern(pattern, opts = {}) {
    this.excluded_patterns.push(glob_to_regex(pattern.trim(), opts));
  }
  /**
   * Check if a path is ignored based on gitignore patterns
   * 
   * @param {string} _path - The path to check
   * @returns {boolean} True if the path is ignored, false otherwise
   */
  is_excluded(_path) {
    try {
      if (_path.includes("#")) return true;
      if (!this.excluded_patterns.length) return false;
      return this.excluded_patterns.some((pattern) => pattern.test(_path));
    } catch (e) {
      console.error(`Error checking if path is excluded: ${e.message}`);
      console.error(`Path: `, _path);
      throw e;
    }
  }
  /**
   * Check if any path in an array of paths is excluded
   * 
   * @param {string[]} paths - Array of paths to check
   * @returns {boolean} True if any path is excluded, false otherwise
   */
  has_excluded_patterns(paths) {
    return paths.some((p) => this.is_excluded(p));
  }
  /**
   * Pre-process an array of paths, throwing an error if any path is excluded
   * 
   * @param {string[]} paths - Array of paths to pre-process
   * @throws {Error} If any path in the array is excluded
   * @returns {string[]} The array of paths
   */
  pre_process(paths) {
    if (this.has_excluded_patterns(paths)) {
      throw new Error(`Path is excluded: ${paths.find((p) => this.is_excluded(p))}`);
    }
    return paths;
  }
  /**
   * Post-process the result of an operation
   * 
   * @param {any} returned_value - The value returned by the operation
   * @returns {any} The post-processed value
   */
  post_process(returned_value) {
    if (this.adapter.post_process) return this.adapter.post_process(returned_value);
    if (Array.isArray(returned_value)) {
      returned_value = returned_value.filter((r) => {
        if (typeof r === "string") return !this.is_excluded(r);
        if (typeof r === "object" && r.path) return !this.is_excluded(r.path);
        return true;
      });
    }
    return returned_value;
  }
  // v2
  /**
   * Use the adapter for a method
   * runs pre_process and post_process (checks exclusions)
   * @param {string} method - The method to use
   * @param {string[]} paths - The paths to use
   * @param {...any} args - Additional arguments for the method
   * @returns {Promise<any>} The result of the method
   */
  async use_adapter(method, paths, ...args) {
    if (!this.adapter[method]) throw new Error(`Method ${method} not found in adapter`);
    paths = this.pre_process(paths);
    let resp = await this.adapter[method](...paths, ...args);
    return this.post_process(resp);
  }
  /**
   * Append content to a file
   * 
   * @param {string} rel_path - The relative path of the file to append to
   * @param {string|Buffer} content - The content to append
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async append(rel_path2, content) {
    return await this.use_adapter("append", [rel_path2], content);
  }
  /**
   * Create a new directory
   * 
   * @param {string} rel_path - The relative path of the directory to create
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async mkdir(rel_path2, opts = { recursive: true }) {
    return await this.use_adapter("mkdir", [rel_path2], opts);
  }
  /**
   * Check if a file or directory exists
   * 
   * @param {string} rel_path - The relative path to check
   * @returns {Promise<boolean>} True if the path exists, false otherwise
   */
  async exists(rel_path2) {
    return await this.use_adapter("exists", [rel_path2]);
  }
  /**
   * List files in a directory
   * 
   * @param {string} rel_path - The relative path to list
   * @returns {Promise<string[]>} Array of file paths
   */
  async list(rel_path2 = "/") {
    return await this.use_adapter("list", [rel_path2]);
  }
  async list_recursive(rel_path2 = "/") {
    return await this.use_adapter("list_recursive", [rel_path2]);
  }
  async list_files(rel_path2 = "/") {
    return await this.use_adapter("list_files", [rel_path2]);
  }
  async list_files_recursive(rel_path2 = "/") {
    return await this.use_adapter("list_files_recursive", [rel_path2]);
  }
  async list_folders(rel_path2 = "/") {
    return await this.use_adapter("list_folders", [rel_path2]);
  }
  async list_folders_recursive(rel_path2 = "/") {
    return await this.use_adapter("list_folders_recursive", [rel_path2]);
  }
  /**
   * Read the contents of a file
   * 
   * @param {string} rel_path - The relative path of the file to read
   * @returns {Promise<string|Buffer>} The contents of the file
   */
  async read(rel_path2, encoding = "utf-8") {
    try {
      const content = await this.adapter.read(rel_path2, encoding);
      return content;
    } catch (error) {
      console.warn("Error during read: " + error.message);
      if (error.code === "ENOENT") return null;
      return { error: error.message };
    }
  }
  /**
   * Remove a file
   * 
   * @param {string} rel_path - The relative path of the file to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove(rel_path2) {
    return await this.use_adapter("remove", [rel_path2]);
  }
  /**
   * Remove a directory
   * 
   * @param {string} rel_path - The relative path of the directory to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove_dir(rel_path2, recursive = false) {
    return await this.use_adapter("remove_dir", [rel_path2], recursive);
  }
  /**
   * Rename a file or directory
   * 
   * @param {string} rel_path - The current relative path
   * @param {string} new_rel_path - The new relative path
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async rename(rel_path2, new_rel_path) {
    await this.use_adapter("rename", [rel_path2, new_rel_path]);
    await this.refresh();
  }
  /**
   * Get file or directory statistics
   * 
   * @param {string} rel_path - The relative path to get statistics for
   * @returns {Promise<Object>} An object containing file or directory statistics
   */
  async stat(rel_path2) {
    return await this.use_adapter("stat", [rel_path2]);
  }
  /**
   * Write content to a file
   * Should handle when target path is within a folder that doesn't exist
   * 
   * @param {string} rel_path - The relative path of the file to write to
   * @param {string|Buffer} content - The content to write
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async write(rel_path2, content) {
    try {
      await this.adapter.write(rel_path2, content);
    } catch (error) {
      console.error("Error during write:", error);
      throw error;
    }
  }
  // // aliases
  // async create(rel_path, content) { return await this.use_adapter('write', [rel_path], content); }
  // async update(rel_path, content) { return await this.use_adapter('write', [rel_path], content); }
  get_link_target_path(link_target, source_path) {
    if (this.adapter.get_link_target_path) return this.adapter.get_link_target_path(link_target, source_path);
    if (!this.file_paths) return console.warn("get_link_target_path: file_paths not found");
    const matching_file_paths = this.file_paths.filter((path) => path.includes(link_target));
    return fuzzy_search(matching_file_paths, link_target)[0];
  }
  get sep() {
    return this.adapter.sep || "/";
  }
};

// node_modules/smart-file-system/adapters/obsidian.js
var SmartFsObsidianAdapter = class {
  /**
   * Create an SmartFsObsidianAdapter instance
   * 
   * @param {Object} smart_fs - The SmartFs instance
   */
  constructor(smart_fs) {
    this.smart_fs = smart_fs;
    this.obsidian = smart_fs.env.main.obsidian;
    this.obsidian_app = smart_fs.env.main.app;
    this.obsidian_adapter = smart_fs.env.main.app.vault.adapter;
  }
  get fs_path() {
    return this.smart_fs.fs_path;
  }
  get_file(file_path) {
    const file = {};
    file.path = file_path.replace(/\\/g, "/").replace(this.smart_fs.fs_path, "").replace(/^\//, "");
    file.type = "file";
    file.extension = file.path.split(".").pop().toLowerCase();
    file.name = file.path.split("/").pop();
    file.basename = file.name.split(".").shift();
    Object.defineProperty(file, "stat", {
      get: () => {
        const tfile = this.obsidian_app.vault.getAbstractFileByPath(file_path);
        if (tfile) {
          return {
            ctime: tfile.stat.ctime,
            mtime: tfile.stat.mtime,
            size: tfile.stat.size
          };
        }
        return null;
      }
    });
    return file;
  }
  /**
   * Append content to a file
   * 
   * @param {string} rel_path - The relative path of the file to append to
   * @param {string} data - The content to append
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async append(rel_path2, data) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.append(rel_path2, data);
  }
  /**
   * Create a new directory
   * 
   * @param {string} rel_path - The relative path of the directory to create
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async mkdir(rel_path2) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.mkdir(rel_path2);
  }
  /**
   * Check if a file or directory exists
   * 
   * @param {string} rel_path - The relative path to check
   * @returns {Promise<boolean>} True if the path exists, false otherwise
   */
  async exists(rel_path2) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.exists(rel_path2);
  }
  /**
   * List files in a directory (NOT up-to-date with list_recursive)
   * 
   * @param {string} rel_path - The relative path to list
   * @returns {Promise<string[]>} Array of file paths
   */
  async list(rel_path2, opts = {}) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    if (rel_path2.startsWith("/")) rel_path2 = rel_path2.slice(1);
    if (rel_path2.endsWith("/")) rel_path2 = rel_path2.slice(0, -1);
    if (rel_path2.includes(".")) {
      const { files: file_paths } = await this.obsidian_adapter.list(rel_path2);
      const files2 = file_paths.map((file_path) => {
        if (this.smart_fs.fs_path) file_path = file_path.replace(this.smart_fs.fs_path, "").slice(1);
        const file_name = file_path.split("/").pop();
        const file = {
          basename: file_name.split(".")[0],
          extension: file_name.split(".").pop().toLowerCase(),
          name: file_name,
          path: file_path
        };
        return file;
      });
      return files2;
    }
    const files = this.obsidian_app.vault.getAllLoadedFiles().filter((file) => {
      const last_slash = file.path.lastIndexOf("/");
      if (last_slash === -1 && rel_path2 !== "") return false;
      const folder_path = file.path.slice(0, last_slash);
      if (folder_path !== rel_path2) return false;
      return true;
    });
    return files;
  }
  // NOTE: currently does not handle hidden files and folders
  async list_recursive(rel_path2, opts = {}) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    if (rel_path2.startsWith("/")) rel_path2 = rel_path2.slice(1);
    if (rel_path2.endsWith("/")) rel_path2 = rel_path2.slice(0, -1);
    const files = this.obsidian_app.vault.getAllLoadedFiles().filter((file) => {
      if (rel_path2 !== "" && !file.path.startsWith(rel_path2)) return false;
      if (file instanceof this.obsidian.TFile) {
        if (opts.type === "folder") return false;
        file.type = "file";
      } else if (file instanceof this.obsidian.TFolder) {
        if (opts.type === "file") return false;
        delete file.basename;
        delete file.extension;
        file.type = "folder";
      }
      if (this.smart_fs.fs_path) file.path = file.path.replace(this.smart_fs.fs_path, "").slice(1);
      return true;
    });
    return files;
  }
  async list_files(rel_path2) {
    return await this.list(rel_path2, { type: "file" });
  }
  async list_files_recursive(rel_path2) {
    return await this.list_recursive(rel_path2, { type: "file" });
  }
  async list_folders(rel_path2) {
    return await this.list(rel_path2, { type: "folder" });
  }
  async list_folders_recursive(rel_path2) {
    return await this.list_recursive(rel_path2, { type: "folder" });
  }
  /**
   * Read the contents of a file
   * 
   * @param {string} rel_path - The relative path of the file to read
   * @returns {Promise<string>} The contents of the file
   */
  async read(rel_path2, encoding, opts = {}) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    if (encoding === "utf-8") {
      if (!opts.no_cache) {
        const tfile = this.obsidian_app.vault.getFileByPath(rel_path2);
        if (tfile) return await this.obsidian_app.vault.cachedRead(tfile);
      }
      return await this.obsidian_adapter.read(rel_path2);
    }
    if (encoding === "base64") {
      const array_buffer2 = await this.obsidian_adapter.readBinary(rel_path2, "base64");
      const base642 = this.obsidian.arrayBufferToBase64(array_buffer2);
      return base642;
    }
    const array_buffer = await this.obsidian_adapter.readBinary(rel_path2);
    return array_buffer;
  }
  /**
   * Rename a file or directory
   * 
   * @param {string} old_path - The current path of the file or directory
   * @param {string} new_path - The new path for the file or directory
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async rename(old_path, new_path) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.rename(old_path, new_path);
  }
  /**
   * Remove a file
   * 
   * @param {string} rel_path - The relative path of the file to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove(rel_path2) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    try {
      return await this.obsidian_adapter.remove(rel_path2);
    } catch (error) {
      console.warn(`Error removing file: ${rel_path2}`, error);
    }
  }
  /**
   * Remove a directory
   * 
   * @param {string} rel_path - The relative path of the directory to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove_dir(rel_path2, recursive = false) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.rmdir(rel_path2, { recursive });
  }
  /**
   * Get file or directory information
   * 
   * @param {string} rel_path - The relative path of the file or directory
   * @returns {Promise<Object>} An object containing file or directory information
   */
  async stat(rel_path2) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.stat(rel_path2);
  }
  /**
   * Write content to a file
   * 
   * @param {string} rel_path - The relative path of the file to write to
   * @param {string} data - The content to write
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async write(rel_path2, data) {
    if (!rel_path2.startsWith(this.fs_path)) rel_path2 = this.fs_path + "/" + rel_path2;
    return await this.obsidian_adapter.write(rel_path2, data);
  }
  get_link_target_path(link_path, file_path) {
    return this.obsidian_app.metadataCache.getFirstLinkpathDest(link_path, file_path)?.path;
  }
};

// node_modules/smart-view/smart_view.js
var SmartView = class {
  constructor(opts = {}) {
    this.opts = opts;
    this._adapter = null;
  }
  /**
   * Renders all setting components within a container.
   * @param {HTMLElement} container - The container element.
   * @param {Object} opts - Additional options for rendering.
   * @returns {Promise<void>}
   */
  async render_setting_components(container, opts = {}) {
    const components = container.querySelectorAll(".setting-component");
    for (const component of components) {
      await this.render_setting_component(component, opts);
    }
  }
  /**
   * Creates a document fragment from HTML string.
   * @param {string} html - The HTML string.
   * @returns {DocumentFragment}
   */
  create_doc_fragment(html) {
    return document.createRange().createContextualFragment(html);
  }
  /**
   * Gets the adapter instance.
   * @returns {Object} The adapter instance.
   */
  get adapter() {
    if (!this._adapter) {
      this._adapter = new this.opts.adapter(this);
    }
    return this._adapter;
  }
  /**
   * Gets an icon (implemented in adapter).
   * @param {string} icon_name - The name of the icon.
   * @returns {string} The icon HTML.
   */
  get_icon_html(icon_name) {
    return this.adapter.get_icon_html(icon_name);
  }
  /**
   * Renders a single setting component (implemented in adapter).
   * @param {HTMLElement} setting_elm - The setting element.
   * @param {Object} opts - Additional options for rendering.
   * @returns {Promise<*>}
   */
  async render_setting_component(setting_elm, opts = {}) {
    return await this.adapter.render_setting_component(setting_elm, opts);
  }
  /**
   * Renders markdown content (implemented in adapter).
   * @param {string} markdown - The markdown content.
   * @returns {Promise<*>}
   */
  async render_markdown(markdown, scope = null) {
    return await this.adapter.render_markdown(markdown, scope);
  }
  /**
   * Gets a value from an object by path.
   * @param {Object} obj - The object to search in.
   * @param {string} path - The path to the value.
   * @returns {*}
   */
  get_by_path(obj, path) {
    return get_by_path(obj, path);
  }
  /**
   * Sets a value in an object by path.
   * @param {Object} obj - The object to modify.
   * @param {string} path - The path to set the value.
   * @param {*} value - The value to set.
   */
  set_by_path(obj, path, value) {
    set_by_path(obj, path, value);
  }
  /**
   * Deletes a value from an object by path.
   * @param {Object} obj - The object to modify.
   * @param {string} path - The path to delete.
   */
  delete_by_path(obj, path) {
    delete_by_path(obj, path);
  }
  /**
   * Escapes HTML special characters in a string.
   * @param {string} str - The string to escape.
   * @returns {string} The escaped string.
   */
  escape_html(str) {
    if (typeof str !== "string") return str;
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  /**
   * Adds toggle listeners to elements with data-toggle attribute.
   * @param {DocumentFragment} frag - The document fragment containing toggle elements.
   * @param {Function|null} callback - Optional callback for custom toggle behavior.
   */
  add_toggle_listeners(frag, callback = null) {
    frag.querySelectorAll("[data-toggle]").forEach((toggle_elm) => {
      toggle_elm.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const group = toggle_elm.dataset.toggle;
        const targets = document.querySelectorAll(`[data-group="${group}"]`);
        if (callback) callback(group, targets, toggle_elm);
        else targets.forEach((elm) => elm.classList.toggle("collapsed"));
      });
    });
  }
  /**
   * Renders HTML for a setting component based on its configuration.
   * @param {Object} setting_config - The configuration object for the setting.
   * @returns {string} The rendered HTML string.
   */
  render_setting_html(setting_config) {
    if (setting_config.type === "html") return setting_config.value;
    const attributes = Object.entries(setting_config).map(([attr, value]) => {
      if (attr.includes("class")) return "";
      if (typeof value === "number") return `data-${attr.replace(/_/g, "-")}=${value}`;
      return `data-${attr.replace(/_/g, "-")}="${value}"`;
    }).join("\n");
    return `<div class="setting-component${setting_config.scope_class ? ` ${setting_config.scope_class}` : ""}"
data-setting="${setting_config.setting}"
${attributes}
></div>`;
  }
  /**
   * Validates the setting config and determines if the setting should be rendered.
   * @param {Object} scope - The scope object.
   * @param {Object} opts - The options object.
   * @param {string} setting_key - The key of the setting.
   * @param {Object} setting_config - The config of the setting.
   * @returns {boolean} True if the setting should be rendered, false otherwise.
   */
  validate_setting(scope, opts, setting_key, setting_config) {
    if (opts.settings_keys && !opts.settings_keys.includes(setting_key)) return false;
    if (typeof setting_config.conditional === "function" && !setting_config.conditional(scope)) return false;
    return true;
  }
  /**
   * Handles the smooth transition effect when opening overlays.
   * @param {HTMLElement} overlay_container - The overlay container element.
   */
  on_open_overlay(overlay_container) {
    overlay_container.style.transition = "background-color 0.5s ease-in-out";
    overlay_container.style.backgroundColor = "var(--bold-color)";
    setTimeout(() => {
      overlay_container.style.backgroundColor = "";
    }, 500);
  }
};
function get_by_path(obj, path) {
  if (!path) return "";
  const keys = path.split(".");
  const finalKey = keys.pop();
  const instance = keys.reduce((acc, key) => acc && acc[key], obj);
  if (instance && typeof instance[finalKey] === "function") {
    return instance[finalKey].bind(instance);
  }
  return instance ? instance[finalKey] : void 0;
}
function set_by_path(obj, path, value) {
  const keys = path.split(".");
  const final_key = keys.pop();
  const target = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== "object") {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
  target[final_key] = value;
}
function delete_by_path(obj, path) {
  const keys = path.split(".");
  const finalKey = keys.pop();
  const instance = keys.reduce((acc, key) => acc && acc[key], obj);
  delete instance[finalKey];
}

// node_modules/smart-view/adapters/_adapter.js
var SmartViewAdapter = class {
  constructor(main) {
    this.main = main;
  }
  // NECESSARY OVERRIDES
  /**
   * Retrieves the class used for settings.
   * Must be overridden by subclasses to return the appropriate setting class.
   * @abstract
   * @returns {Function} The setting class constructor.
   * @throws Will throw an error if not implemented in the subclass.
   */
  get setting_class() {
    throw new Error("setting_class() not implemented");
  }
  /**
   * Generates the HTML for a specified icon.
   * Must be overridden by subclasses to provide the correct icon HTML.
   * @abstract
   * @param {string} icon_name - The name of the icon to generate HTML for.
   * @returns {string} The HTML string representing the icon.
   * @throws Will throw an error if not implemented in the subclass.
   */
  get_icon_html(icon_name) {
    throw new Error("get_icon_html() not implemented");
  }
  /**
   * Renders Markdown content within a specific scope.
   * Must be overridden by subclasses to handle Markdown rendering appropriately.
   * @abstract
   * @param {string} markdown - The Markdown content to render.
   * @param {object|null} [scope=null] - The scope within which to render the Markdown.
   * @returns {Promise<void>} A promise that resolves when rendering is complete.
   * @throws Will throw an error if not implemented in the subclass.
   */
  async render_markdown(markdown, scope = null) {
    throw new Error("render_markdown() not implemented");
  }
  /**
   * Opens a specified URL.
   * Should be overridden by subclasses to define how URLs are opened.
   * @abstract
   * @param {string} url - The URL to open.
   */
  open_url(url2) {
    throw new Error("open_url() not implemented");
  }
  /**
   * Handles the selection of a folder by invoking the folder selection dialog and updating the setting.
   * @abstract
   * @param {string} setting - The path of the setting being modified.
   * @param {string} value - The current value of the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  handle_folder_select(path, value, elm, scope) {
    throw new Error("handle_folder_select not implemented");
  }
  /**
   * Handles the selection of a file by invoking the file selection dialog and updating the setting.
   * @abstract
   * @param {string} setting - The path of the setting being modified.
   * @param {string} value - The current value of the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  handle_file_select(path, value, elm, scope) {
    throw new Error("handle_file_select not implemented");
  }
  /**
   * Performs actions before a setting is changed, such as clearing notices and updating the UI.
   * @abstract
   * @param {string} setting - The path of the setting being changed.
   * @param {*} value - The new value for the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  pre_change(path, value, elm) {
    console.warn("pre_change() not implemented");
  }
  /**
   * Performs actions after a setting is changed, such as updating UI elements.
   * @abstract
   * @param {string} setting - The path of the setting that was changed.
   * @param {*} value - The new value for the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} changed - Additional information about the change.
   */
  post_change(path, value, elm) {
    console.warn("post_change() not implemented");
  }
  /**
   * Reverts a setting to its previous value in case of validation failure or error.
   * @abstract
   * @param {string} setting - The path of the setting to revert.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings.
   */
  revert_setting(path, elm, scope) {
    console.warn("revert_setting() not implemented");
  }
  // DEFAULT IMPLEMENTATIONS (may be overridden)
  get setting_renderers() {
    return {
      text: this.render_text_component,
      string: this.render_text_component,
      password: this.render_password_component,
      number: this.render_number_component,
      dropdown: this.render_dropdown_component,
      toggle: this.render_toggle_component,
      textarea: this.render_textarea_component,
      button: this.render_button_component,
      remove: this.render_remove_component,
      folder: this.render_folder_select_component,
      "text-file": this.render_file_select_component,
      file: this.render_file_select_component,
      html: this.render_html_component
    };
  }
  async render_setting_component(elm, opts = {}) {
    elm.innerHTML = "";
    const path = elm.dataset.setting;
    const scope = opts.scope || this.main.main;
    try {
      let value = elm.dataset.value ?? this.main.get_by_path(scope.settings, path);
      if (typeof value === "undefined" && typeof elm.dataset.default !== "undefined") {
        value = elm.dataset.default;
        if (typeof value === "string") value = value.toLowerCase() === "true" ? true : value === "false" ? false : value;
        this.main.set_by_path(scope.settings, path, value);
      }
      const renderer = this.setting_renderers[elm.dataset.type];
      if (!renderer) {
        console.warn(`Unsupported setting type: ${elm.dataset.type}`);
        return elm;
      }
      const setting = renderer.call(this, elm, path, value, scope);
      if (elm.dataset.name) setting.setName(elm.dataset.name);
      if (elm.dataset.description) {
        const frag = this.main.create_doc_fragment(`<span>${elm.dataset.description}</span>`);
        setting.setDesc(frag);
      }
      if (elm.dataset.tooltip) setting.setTooltip(elm.dataset.tooltip);
      this.add_button_if_needed(setting, elm, path, scope);
      this.handle_disabled_and_hidden(elm);
      return elm;
    } catch (e) {
      console.error({ path, elm });
      console.error(e);
    }
  }
  render_dropdown_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    let options;
    if (elm.dataset.optionsCallback) {
      const opts_callback = this.main.get_by_path(scope, elm.dataset.optionsCallback);
      if (typeof opts_callback === "function") options = opts_callback();
    }
    if (!options || !options.length) {
      options = this.get_dropdown_options(elm);
    }
    smart_setting.addDropdown((dropdown) => {
      if (elm.dataset.required) dropdown.inputEl.setAttribute("required", true);
      options.forEach((option) => {
        const opt = dropdown.addOption(option.value, option.name ?? option.value);
        opt.selected = option.value === value;
      });
      dropdown.onChange((value2) => {
        this.handle_on_change(path, value2, elm, scope);
      });
      dropdown.setValue(value);
    });
    return smart_setting;
  }
  render_text_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((text) => {
      text.setPlaceholder(elm.dataset.placeholder || "");
      if (value) text.setValue(value);
      let debounceTimer;
      if (elm.dataset.button) {
        smart_setting.addButton((button) => {
          button.setButtonText(elm.dataset.button);
          button.onClick(async () => this.handle_on_change(path, text.getValue(), elm, scope));
        });
      } else {
        text.onChange(async (value2) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => this.handle_on_change(path, value2.trim(), elm, scope), 2e3);
        });
      }
    });
    return smart_setting;
  }
  render_password_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((text) => {
      text.inputEl.type = "password";
      text.setPlaceholder(elm.dataset.placeholder || "");
      if (value) text.setValue(value);
      let debounceTimer;
      text.onChange(async (value2) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, value2, elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_number_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((number) => {
      number.inputEl.type = "number";
      number.setPlaceholder(elm.dataset.placeholder || "");
      if (typeof value !== "undefined") number.inputEl.value = parseInt(value);
      number.inputEl.min = elm.dataset.min || 0;
      if (elm.dataset.max) number.inputEl.max = elm.dataset.max;
      let debounceTimer;
      number.onChange(async (value2) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, parseInt(value2), elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_toggle_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addToggle((toggle) => {
      let checkbox_val = value ?? true;
      if (typeof checkbox_val === "string") {
        checkbox_val = checkbox_val.toLowerCase() === "true";
      }
      toggle.setValue(checkbox_val);
      toggle.onChange(async (value2) => this.handle_on_change(path, value2, elm, scope));
    });
    return smart_setting;
  }
  render_textarea_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addTextArea((textarea) => {
      textarea.setPlaceholder(elm.dataset.placeholder || "");
      textarea.setValue(value || "");
      let debounceTimer;
      textarea.onChange(async (value2) => {
        value2 = value2.split("\n").map((v) => v.trim()).filter((v) => v);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, value2, elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_button_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addButton((button) => {
      button.setButtonText(elm.dataset.btnText || elm.dataset.name);
      button.onClick(async () => {
        if (elm.dataset.confirm && !confirm(elm.dataset.confirm)) return;
        if (elm.dataset.href) this.open_url(elm.dataset.href);
        if (elm.dataset.callback) {
          const callback = this.main.get_by_path(scope, elm.dataset.callback);
          if (callback) callback(path, value, elm, scope);
        }
      });
    });
    return smart_setting;
  }
  render_remove_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addButton((button) => {
      button.setButtonText(elm.dataset.btnText || elm.dataset.name || "Remove");
      button.onClick(async () => {
        this.main.delete_by_path(scope.settings, path);
        if (elm.dataset.callback) {
          const callback = this.main.get_by_path(scope, elm.dataset.callback);
          if (callback) callback(path, value, elm, scope);
        }
      });
    });
    return smart_setting;
  }
  render_folder_select_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addFolderSelect((folder_select) => {
      folder_select.setPlaceholder(elm.dataset.placeholder || "");
      if (value) folder_select.setValue(value);
      folder_select.inputEl.closest("div").addEventListener("click", () => {
        this.handle_folder_select(path, value, elm, scope);
      });
    });
    return smart_setting;
  }
  render_file_select_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addFileSelect((file_select) => {
      file_select.setPlaceholder(elm.dataset.placeholder || "");
      if (value) file_select.setValue(value);
      file_select.inputEl.closest("div").addEventListener("click", () => {
        this.handle_file_select(path, value, elm, scope);
      });
    });
    return smart_setting;
  }
  render_html_component(elm, path, value, scope) {
    elm.innerHTML = value;
    return elm;
  }
  add_button_if_needed(smart_setting, elm, path, scope) {
    if (elm.dataset.btn) {
      smart_setting.addButton((button) => {
        button.setButtonText(elm.dataset.btn);
        button.inputEl.addEventListener("click", (e) => {
          if (elm.dataset.btnCallback && typeof this[elm.dataset.btnCallback] === "function") {
            this[elm.dataset.btnCallback](path, null, smart_setting, scope);
          } else if (elm.dataset.btnHref) {
            this.open_url(elm.dataset.btnHref);
          } else if (elm.dataset.callback && typeof this.main.get_by_path(scope, elm.dataset.callback) === "function") {
            this.main.get_by_path(scope, elm.dataset.callback)(path, null, smart_setting, scope);
          } else if (elm.dataset.href) {
            this.open_url(elm.dataset.href);
          } else {
            console.error("No callback or href found for button.");
          }
        });
        if (elm.dataset.btnDisabled || elm.dataset.disabled && elm.dataset.btnDisabled !== "false") {
          button.inputEl.disabled = true;
        }
      });
    }
  }
  handle_disabled_and_hidden(elm) {
    if (elm.dataset.disabled && elm.dataset.disabled !== "false") {
      elm.classList.add("disabled");
      elm.querySelector("input, select, textarea, button").disabled = true;
    }
    if (elm.dataset.hidden && elm.dataset.hidden !== "false") {
      elm.style.display = "none";
    }
  }
  get_dropdown_options(elm) {
    return Object.entries(elm.dataset).reduce((acc, [k, v]) => {
      if (!k.startsWith("option")) return acc;
      const [value, name] = v.split("|");
      acc.push({ value, name: name || value });
      return acc;
    }, []);
  }
  handle_on_change(path, value, elm, scope) {
    this.pre_change(path, value, elm, scope);
    if (elm.dataset.validate) {
      const valid = this[elm.dataset.validate](path, value, elm, scope);
      if (!valid) {
        elm.querySelector(".setting-item").style.border = "2px solid red";
        this.revert_setting(path, elm, scope);
        return;
      }
    }
    this.main.set_by_path(scope.settings, path, value);
    if (elm.dataset.callback) {
      const callback = this.main.get_by_path(scope, elm.dataset.callback);
      if (callback) callback(path, value, elm, scope);
    }
    this.post_change(path, value, elm, scope);
  }
};

// node_modules/smart-view/adapters/obsidian.js
var import_obsidian = require("obsidian");
var SmartViewObsidianAdapter = class extends SmartViewAdapter {
  get setting_class() {
    return import_obsidian.Setting;
  }
  open_url(url2) {
    window.open(url2);
  }
  async render_file_select_component(elm, path, value) {
    return super.render_text_component(elm, path, value);
  }
  async render_folder_select_component(elm, path, value) {
    return super.render_text_component(elm, path, value);
  }
  async render_markdown(markdown, scope) {
    const component = scope.env.smart_connections_plugin.view;
    if (!scope) return console.warn("Scope required for rendering markdown in Obsidian adapter");
    const frag = this.main.create_doc_fragment("<div><div class='inner'></div></div>");
    const container = frag.querySelector(".inner");
    try {
      await import_obsidian.MarkdownRenderer.render(
        scope.env.plugin.app,
        markdown,
        container,
        scope?.file_path || "",
        component || new import_obsidian.Component()
      );
    } catch (e) {
      console.warn("Error rendering markdown in Obsidian adapter", e);
    }
    return frag;
  }
  get_icon_html(name) {
    return (0, import_obsidian.getIcon)(name).outerHTML;
  }
  // Obsidian Specific
  is_mod_event(event) {
    return import_obsidian.Keymap.isModEvent(event);
  }
};

// src/smart_notices.js
var import_obsidian2 = require("obsidian");
var SmartNotices = class {
  constructor(main) {
    this.main = main;
    this.active = {};
  }
  get settings() {
    return this.main.settings.smart_notices;
  }
  get adapter() {
    return this.main.smart_env_config.modules.smart_notices.adapter;
  }
  show(id, message, opts = {}) {
    id = this.normalize(id);
    if (typeof opts.timeout === "undefined") opts.timeout = 5e3;
    if (this.settings?.muted?.[id]) {
      if (opts.confirm && typeof opts.confirm.callback === "function") opts.confirm.callback.call();
      return;
    }
    const content = this.build(id, message, opts);
    if (this.active[id] && this.active[id].noticeEl?.parentElement) {
      return this.active[id].setMessage(content, opts.timeout);
    }
    return this.render(id, content, opts);
  }
  normalize(id) {
    id = id.replace(/[^a-zA-Z0-9_-]/g, "_");
    return id;
  }
  render(id, content, opts) {
    id = this.normalize(id);
    this.active[id] = new this.adapter(content, opts.timeout);
    return this.active[id];
  }
  build(id, message, opts = {}) {
    id = this.normalize(id);
    const frag = document.createDocumentFragment();
    const head = frag.createEl("p", { cls: "sc-notice-head", text: `[Smart Connections v${this.main.manifest.version}]` });
    const content = frag.createEl("p", { cls: "sc-notice-content" });
    const actions = frag.createEl("div", { cls: "sc-notice-actions" });
    if (typeof message === "string") content.innerText = message;
    else if (Array.isArray(message)) content.innerHTML = message.join("<br>");
    if (opts.confirm) this.add_btn(opts.confirm, actions);
    if (opts.button) this.add_btn(opts.button, actions);
    if (!opts.immutable) this.add_mute_btn(id, actions);
    return frag;
  }
  add_btn(button, container) {
    const btn = document.createElement("button");
    btn.innerHTML = button.text;
    btn.addEventListener("click", (e) => {
      if (button.stay_open) {
        e.preventDefault();
        e.stopPropagation();
      }
      button.callback();
    });
    container.appendChild(btn);
  }
  add_mute_btn(id, container) {
    id = this.normalize(id);
    const btn = document.createElement("button");
    (0, import_obsidian2.setIcon)(btn, "bell-off");
    btn.addEventListener("click", () => {
      if (!this.settings.muted) this.settings.muted = {};
      this.settings.muted[id] = true;
      this.show("Notice muted", "Notice muted", { timeout: 2e3 });
    });
    container.appendChild(btn);
  }
  unload() {
    for (let id in this.active) {
      this.remove(id);
    }
  }
  remove(id) {
    id = this.normalize(id);
    this.active[id]?.hide();
    delete this.active[id];
  }
  // begin plugin specific methods
  show_requires_smart_view() {
    const btn = { text: "Open Smart View", callback: () => {
      this.main.open_view(false);
    } };
    const msg = 'Smart View must be open to utilize all Smart Chat features. For example, asking things like "Based on my notes..." requires Smart View to be open.';
    this.show("requires smart view", msg, { button: btn, timeout: 0 });
  }
};

// src/smart_env.config.js
var import_obsidian5 = require("obsidian");

// node_modules/smart-settings/smart_settings.js
var SmartSettings = class {
  /**
   * Creates an instance of SmartEnvSettings.
   * @param {Object} main - The main object to contain the instance (smart_settings) and getter (settings)
   * @param {Object} [opts={}] - Configuration options.
   */
  constructor(main, opts = {}) {
    this.main = main;
    this.opts = opts;
    this._fs = null;
    this._settings = {};
    this._saved = false;
    this.save_timeout = null;
  }
  static async create(main, opts = {}) {
    const smart_settings = new this(main, opts);
    await smart_settings.load();
    main.smart_settings = smart_settings;
    Object.defineProperty(main, "settings", {
      get() {
        return smart_settings.settings;
      },
      set(settings) {
        smart_settings.settings = settings;
      }
    });
    return smart_settings;
  }
  static create_sync(main, opts = {}) {
    const smart_settings = new this(main, opts);
    smart_settings.load_sync();
    main.smart_settings = smart_settings;
    Object.defineProperty(main, "settings", {
      get() {
        return smart_settings.settings;
      },
      set(settings) {
        smart_settings.settings = settings;
      }
    });
    return smart_settings;
  }
  /**
   * Gets the current settings, wrapped with an observer to handle changes.
   * @returns {Proxy} A proxy object that observes changes to the settings.
   */
  get settings() {
    return observe_object(this._settings, (property, value, target) => {
      if (this.save_timeout) clearTimeout(this.save_timeout);
      this.save_timeout = setTimeout(() => {
        this.save(this._settings);
        this.save_timeout = null;
      }, 1e3);
    });
  }
  /**
   * Sets the current settings.
   * @param {Object} settings - The new settings to apply.
   */
  set settings(settings) {
    this._settings = settings;
  }
  async save(settings = this._settings) {
    if (typeof this.opts.save === "function") await this.opts.save(settings);
    else await this.main.save_settings(settings);
  }
  async load() {
    if (typeof this.opts.load === "function") this._settings = await this.opts.load();
    else this._settings = await this.main.load_settings();
  }
  load_sync() {
    if (typeof this.opts.load === "function") this._settings = this.opts.load();
    else this._settings = this.main.load_settings();
  }
};
function observe_object(obj, on_change) {
  function create_proxy(target) {
    return new Proxy(target, {
      set(target2, property, value) {
        if (target2[property] !== value) {
          target2[property] = value;
          on_change(property, value, target2);
        }
        if (typeof value === "object" && value !== null) {
          target2[property] = create_proxy(value);
        }
        return true;
      },
      get(target2, property) {
        const result = target2[property];
        if (typeof result === "object" && result !== null) {
          return create_proxy(result);
        }
        return result;
      },
      deleteProperty(target2, property) {
        if (property in target2) {
          delete target2[property];
          on_change(property, void 0, target2);
        }
        return true;
      }
    });
  }
  return create_proxy(obj);
}

// node_modules/smart-sources/components/settings.js
async function render5(scope, opts = {}) {
  const settings_html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const html = `<div class="source-settings">
    ${settings_header_html(scope, opts)}
    ${settings_html}
  </div>`;
  const frag = this.create_doc_fragment(html);
  return await post_process5.call(this, scope, frag, opts);
}
async function post_process5(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  frag.querySelector(".sources-load-btn")?.addEventListener("click", () => {
    scope.run_load();
  });
  if (scope.loaded) {
    frag.querySelector(".sources-import-btn")?.addEventListener("click", () => {
      scope.run_import();
    });
    frag.querySelector(".sources-prune-btn")?.addEventListener("click", () => {
      scope.run_prune();
    });
    frag.querySelector(".sources-clear-all-btn")?.addEventListener("click", async () => {
      if (confirm("Are you sure you want to clear all data and re-import? This action cannot be undone.")) {
        await scope.run_clear_all();
        scope.render_settings();
        scope.blocks.render_settings();
      }
    });
  }
  return frag;
}
function settings_header_html(scope, opts = {}) {
  const heading_text = scope.collection_key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const heading_html = scope.collection_key === "smart_sources" ? get_source_heading_html(scope) : get_block_heading_html(scope);
  const button_html = get_button_html(scope);
  return `<div class="group-header">
    <h3>${heading_text}</h3>
    ${heading_html}
    ${button_html}
  </div>`;
}
function get_source_heading_html(scope) {
  const item_count = Object.keys(scope.items).length;
  if (!scope.loaded) {
    return `<span>${item_count} sources (embeddings not currently loaded)</span>`;
  }
  const total_count = scope.total_files;
  const included_count = scope.included_files;
  if (scope.loaded !== included_count) {
    return `<span>${scope.loaded}/${included_count} sources (partially loaded, should refresh/reload)</span>`;
  }
  const embedded_items = Object.values(scope.items).filter((item) => item.vec);
  const embedded_percentage = Math.round(embedded_items.length / item_count * 100);
  const load_time_html = scope.load_time_ms ? `<span>Load time: ${scope.load_time_ms}ms</span>` : "";
  return `
    <span>${embedded_percentage}% embedded</span>
    <span>${included_count} sources included (${total_count} total)</span>
    ${load_time_html}
  `;
}
function get_block_heading_html(scope) {
  const item_count = Object.keys(scope.items).length;
  if (!scope.loaded) {
    return `<span>${item_count} blocks (embeddings not currently loaded)</span>`;
  }
  if (scope.loaded !== item_count) {
    return `<span>${scope.loaded}/${item_count} blocks (partially loaded, should refresh/reload)</span>`;
  }
  const items_w_vec = Object.values(scope.items).filter((item) => item.vec).length;
  const embedded_percentage = Math.round(items_w_vec / item_count * 100);
  const load_time_html = scope.load_time_ms ? `<span>Load time: ${scope.load_time_ms}ms</span>` : "";
  return `
    <span>${embedded_percentage}% embedded (${items_w_vec})</span>
    <span>Loaded: ${item_count} blocks (expected ${scope.expected_blocks_ct})</span>
    ${load_time_html}
  `;
}
function get_button_html(scope) {
  if (scope.collection_key !== "smart_sources") return "";
  const load_btn_html = `<button class="sources-load-btn">${scope.loaded ? "Re-load" : "Load"} Sources</button>`;
  let additional_buttons = "";
  if (scope.loaded) {
    additional_buttons = `
      <button class="sources-import-btn">Import</button>
      <button class="sources-prune-btn">Prune</button>
      <button class="sources-clear-all-btn">Clear All &amp; Re-import</button>
    `;
  }
  return `
    ${load_btn_html}
    ${additional_buttons}
  `;
}

// src/components/env_settings.js
async function render6(scope, opts = {}) {
  let html = await build_html.call(this, scope, opts);
  html += `
    <h3>Smart Chat</h3>
    <p>
      <i>Additional settings available in the Smart Chat settings tab (ex. chat model and api key).</i>
    </p>
    <div class="setting-component"
      data-name="Smart Chat History Folder"
      data-description="Folder to store Smart Chat history. Use a preceeding <code>.</code> to hide it (ex. <code>.smart-chats</code>)."
      data-type="text"
      data-setting="smart_chats.fs_path"
      data-placeholder="Enter a folder name"
    ></div>
    <h3>System Prompts</h3>
    <div class="setting-component"
      data-name="System Prompts Folder"
      data-description="Folder to store system prompts. Available in chat by typing '@'"
      data-type="text"
      data-setting="smart_chats.prompts_path"
      data-placeholder="Enter a folder name"
    ></div>
  `;
  const frag = this.create_doc_fragment(html);
  return await post_process.call(this, scope, frag, opts);
}

// src/components/result.js
async function build_html2(scope, opts = {}) {
  const item = scope.item;
  const score = scope.score;
  const expanded_view = item.env.settings.expanded_view;
  return `<div class="temp-container">
    <div
      class="search-result${expanded_view ? "" : " sc-collapsed"}"
      data-path="${item.path.replace(/"/g, "&quot;")}"
      data-link="${item.link?.replace(/"/g, "&quot;") || ""}"
      data-collection="${item.collection_key}"
      data-score="${score}"
      draggable="true"
    >
      <span class="header">
        ${this.get_icon_html("right-triangle")}
        <a class="search-result-file-title" href="#" title="${item.path.replace(/"/g, "&quot;")}" draggable="true">
          <small>${[score?.toFixed(2), item.name].join(" | ")}</small>
        </a>
      </span>
      <ul draggable="true">
        <li class="search-result-file-title" title="${item.path.replace(/"/g, "&quot;")}" data-collection="${item.collection_key}" data-key="${item.key}"></li>
      </ul>
    </div>
  </div>`;
}
async function render7(scope, opts = {}) {
  let html = await build_html2.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process6.call(this, scope, frag, opts);
}
async function post_process6(scope, frag, opts = {}) {
  const search_result = frag.querySelector(".search-result");
  if (typeof opts.add_result_listeners === "function") opts.add_result_listeners(search_result);
  if (!scope.item.env.settings.expanded_view) return search_result;
  const li = search_result.querySelector("li");
  const collection_key = li.dataset.collection;
  const entity_key = li.dataset.key;
  const entity = scope.item.env[collection_key].get(entity_key);
  if (entity) {
    await entity.render_item(li, opts);
  } else {
    li.innerHTML = "<p>Entity not found.</p>";
  }
  return search_result;
}

// src/components/results.js
async function build_html3(scope, opts = {}) {
  return ``;
}
async function render8(scope, opts = {}) {
  const html = await build_html3.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  const results = opts.results || [];
  const result_frags = await Promise.all(results.map((result) => {
    return render7.call(this, result, { ...opts });
  }));
  result_frags.forEach((result_frag) => frag.appendChild(result_frag));
  return frag;
}

// src/components/smart_view_filter.js
async function render9(scope) {
  const cohere_api_key_html = `
    <div class="setting-component"
      data-name="Cohere API Key"
      data-type="text"
      data-setting="smart_view_filter.cohere_api_key"
      data-description="API Key required to use Cohere re-ranker."
      data-placeholder="Enter an API Key"
      data-button="Save"
    ></div>
  `;
  const early_access_html = !scope.EARLY_ACCESS ? "" : `
    <div class="setting-component"
      data-name="Toggle Re-Ranker"
      data-setting="smart_view_filter.re_rank"
      data-description="Toggle the re-ranker"
      data-type="toggle"
      data-default="false"
      data-value="false"
      data-callback="refresh_smart_view_filter"
    ></div>
    ${scope.settings.smart_view_filter?.re_rank ? cohere_api_key_html : ""}
  `;
  const html = `
    <!-- toggle re-ranker -->
    ${early_access_html}
    <div class="setting-component"
      data-name="Show Full Path"
      data-description="Show full path in view."
      data-type="toggle"
      data-setting="show_full_path"
      data-callback="refresh_smart_view"
    ></div>
    <div class="setting-component"
      data-name="Results Limit"
      data-setting="smart_view_filter.results_limit"
      data-description="Limit the number of results."
      data-type="number"
      data-default="20"
      data-callback="refresh_smart_view"
    ></div>
    <!-- toggle exclude_inlinks -->
    <div class="setting-component"
      data-name="Exclude Inlinks"
      data-setting="smart_view_filter.exclude_inlinks"
      data-description="Exclude inlinks"
      data-type="toggle"
      data-default="false"
      data-callback="refresh_smart_view_filter"
    ></div>
    <!-- toggle exclude_outlinks -->
    <div class="setting-component"
      data-name="Exclude Outlinks"
      data-setting="smart_view_filter.exclude_outlinks"
      data-description="Exclude outlinks"
      data-type="toggle"
      data-default="false"
      data-callback="refresh_smart_view_filter"
    ></div>
    <!-- include filter -->
    <div class="setting-component"
      data-name="Include Filter"
      data-setting="smart_view_filter.include_filter"
      data-description="Require that results match this value."
      data-type="text"
      data-callback="refresh_smart_view"
    ></div>
    <!-- exclude filter -->
    <div class="setting-component"
      data-name="Exclude Filter"
      data-setting="smart_view_filter.exclude_filter"
      data-description="Exclude results that match this value."
      data-type="text"
      data-callback="refresh_smart_view"
    ></div>
  `;
  const frag = this.create_doc_fragment(html);
  return await post_process7.call(this, scope, frag);
}
async function post_process7(scope, frag) {
  await this.render_setting_components(frag, { scope });
  return frag;
}

// src/components/connections.js
async function build_html4(scope, opts = {}) {
  const context_name = scope.path.split("/").pop();
  const html = `<div class="sc-connections-view">
    <div class="sc-top-bar">
      <p class="sc-context" data-key="${scope.path}">
        ${scope.env.smart_sources.keys.length} (${scope.env.smart_blocks.keys.length})
      </p>
      <button class="sc-refresh">${this.get_icon_html("refresh-cw")}</button>
      <button class="sc-fold-toggle">${this.get_icon_html(scope.env.settings.expanded_view ? "fold-vertical" : "unfold-vertical")}</button>
      <button class="sc-filter">${this.get_icon_html("sliders-horizontal")}</button>
      <button class="sc-search">${this.get_icon_html("search")}</button>
      <button class="sc-help" 
              aria-label="Open help documentation"
              title="Open help documentation">
        ${this.get_icon_html("help-circle")}
      </button>
    </div>
    <div id="settings" class="sc-overlay"></div>
    <div class="sc-list">
    </div>
    <div class="sc-bottom-bar">
      <span class="sc-context" data-key="${scope.path}" title="${scope.path}">
        ${context_name}${opts.re_ranked ? " (re-ranked)" : ""}
      </span>
      ${opts.attribution || ""}
    </div>
  </div>`;
  return html;
}
async function render10(scope, opts = {}) {
  let html = await build_html4.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  const results = scope.find_connections({ ...opts, exclude_source_connections: scope.env.smart_blocks.settings.embed_blocks });
  const sc_list = frag.querySelector(".sc-list");
  const results_frag = await render8.call(this, scope, { ...opts, results });
  Array.from(results_frag.children).forEach((elm) => sc_list.appendChild(elm));
  return await post_process8.call(this, scope, frag, opts);
}
async function post_process8(scope, frag, opts = {}) {
  const container = frag.querySelector(".sc-list");
  const overlay_container = frag.querySelector(".sc-overlay");
  const render_filter_settings = async () => {
    if (!overlay_container) throw new Error("Container is required");
    overlay_container.innerHTML = "";
    const filter_frag = await render9.call(this, {
      settings: scope.env.settings,
      refresh_smart_view: opts.refresh_smart_view,
      refresh_smart_view_filter: render_filter_settings.bind(this)
    });
    overlay_container.innerHTML = "";
    overlay_container.appendChild(filter_frag);
    this.on_open_overlay(overlay_container);
  };
  const toggle_button = frag.querySelector(".sc-fold-toggle");
  toggle_button.addEventListener("click", () => {
    const expanded = scope.env.settings.expanded_view;
    container.querySelectorAll(".search-result").forEach((elm) => {
      if (expanded) {
        elm.classList.add("sc-collapsed");
      } else {
        elm.classList.remove("sc-collapsed");
        const collection_key = elm.dataset.collection;
        const entity = scope.env[collection_key].get(elm.dataset.path);
        entity.render_item(elm.querySelector("li"));
      }
    });
    scope.env.settings.expanded_view = !expanded;
    toggle_button.innerHTML = this.get_icon_html(scope.env.settings.expanded_view ? "fold-vertical" : "unfold-vertical");
    toggle_button.setAttribute("aria-label", scope.env.settings.expanded_view ? "Fold all" : "Unfold all");
  });
  const filter_button = frag.querySelector(".sc-filter");
  filter_button.addEventListener("click", () => {
    render_filter_settings();
  });
  const refresh_button = frag.querySelector(".sc-refresh");
  refresh_button.addEventListener("click", () => {
    opts.refresh_smart_view();
  });
  const search_button = frag.querySelector(".sc-search");
  search_button.addEventListener("click", () => {
    opts.open_search_view();
  });
  const help_button = frag.querySelector(".sc-help");
  help_button.addEventListener("click", () => {
    window.open("https://docs.smartconnections.app/connections-pane", "_blank");
  });
  return frag;
}

// src/components/search.js
async function build_html5(scope, opts = {}) {
  return `<div id="sc-search-view">
    <div class="sc-top-bar">
      <button class="sc-fold-toggle">${this.get_icon_html(scope.settings.expanded_view ? "fold-vertical" : "unfold-vertical")}</button>
      <button class="sc-search">${this.get_icon_html("search")}</button>
    </div>
    <div class="sc-search-container">
      <h2>Search Smart Connections</h2>
      <div class="sc-search-input">
        <textarea
          id="query"
          name="query"
          placeholder="Describe what you're looking for (e.g., 'PKM strategies', 'story elements', 'personal AI alignment')"
        ></textarea>
        <button id="search">${this.get_icon_html("search")}</button>
      </div>
      <p>Use semantic (embeddings) search to surface relevant notes. Results are sorted by similarity to your query. Note: returns different results than lexical (keyword) search.</p>
    </div>
    <div class="sc-list">
    </div>
    <div class="sc-bottom-bar">
      ${opts.attribution || ""}
    </div>
  </div>`;
}
async function render11(scope, opts = {}) {
  let html = await build_html5.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process9.call(this, scope, frag, opts);
}
async function post_process9(scope, frag, opts = {}) {
  const query_input = frag.querySelector("#query");
  const results_container = frag.querySelector(".sc-list");
  const render_search = async (search_text, results_container2) => {
    const results = await scope[opts.collection_key].lookup({ hypotheticals: [search_text] });
    results_container2.innerHTML = "";
    const results_frag = await render8.call(this, scope, { ...opts, results });
    Array.from(results_frag.children).forEach((elm) => results_container2.appendChild(elm));
  };
  if (opts.search_text) {
    query_input.value = opts.search_text;
    await render_search(opts.search_text, results_container);
  }
  const search_button = frag.querySelector("#search");
  search_button.addEventListener("click", async (event) => {
    const container = event.target.closest("#sc-search-view");
    const search_text = query_input.value.trim();
    if (search_text) {
      await render_search(search_text, results_container);
    }
  });
  const fold_toggle = frag.querySelector(".sc-fold-toggle");
  fold_toggle.addEventListener("click", (event) => {
    const container = event.target.closest("#sc-search-view");
    const expanded = scope.settings.expanded_view;
    container.querySelectorAll(".search-result").forEach((elm) => {
      if (expanded) {
        elm.classList.add("sc-collapsed");
      } else {
        elm.classList.remove("sc-collapsed");
        const collection_key = elm.dataset.collection;
        const entity = scope[collection_key].get(elm.dataset.path);
        entity.render_item(elm.querySelector("li"));
      }
    });
    scope.settings.expanded_view = !expanded;
    fold_toggle.innerHTML = this.get_icon_html(scope.settings.expanded_view ? "fold-vertical" : "unfold-vertical");
  });
  return frag;
}

// src/smart_env.config.js
var smart_env_config = {
  global_ref: window,
  env_path: "",
  // env_data_dir: '.smart-env', // added in Plugin class
  collections: {
    smart_collections: {
      data_adapter: SmartCollectionMultiFileDataAdapter
    },
    smart_sources: {
      class: SmartSources,
      data_adapter: SmartCollectionMultiFileDataAdapter,
      source_adapters: {
        "md": MarkdownSourceAdapter,
        "txt": MarkdownSourceAdapter,
        // temp
        "canvas": MarkdownSourceAdapter,
        // temp
        "default": SourceAdapter
      },
      components: {
        settings: render5
      }
    },
    smart_blocks: {
      class: SmartBlocks,
      components: {
        settings: render5
      }
    }
  },
  item_types: {
    SmartSource,
    SmartBlock
  },
  modules: {
    // smart_chat_model: SmartChatModel, // TODO: migrate to v2 chat model
    smart_embed_model: {
      class: SmartEmbedModel,
      adapters: {
        transformers: SmartEmbedTransformersIframeAdapter,
        openai: SmartEmbedOpenAIAdapter
      }
    },
    smart_fs: {
      class: SmartFs,
      adapter: SmartFsObsidianAdapter
    },
    smart_view: {
      class: SmartView,
      adapter: SmartViewObsidianAdapter
    },
    smart_notices: {
      class: SmartNotices,
      adapter: import_obsidian5.Notice
    },
    smart_settings: {
      class: SmartSettings
    }
  },
  components: {
    settings: render6,
    connections: render10,
    search: render11
  },
  default_settings: {
    is_obsidian_vault: true,
    smart_blocks: {
      embed_blocks: true
    },
    smart_sources: {
      embed_model: {
        model_key: "TaylorAI/bge-micro-v2",
        legacy_transformers: true
      }
    },
    file_exclusions: "Untitled",
    folder_exclusions: "smart-chats"
  }
};

// src/default_settings.js
function default_settings() {
  return {
    settings: {
      new_user: true,
      // v2.2
      legacy_transformers: false,
      enable_mobile: true,
      actions: {
        "lookup": true
      },
      smart_notices: {},
      // v2.1
      system_prompts_folder: "smart prompts",
      smart_chat_folder: "smart-chats",
      smart_chat_folder_last: "smart-chats",
      chat_model_platform_key: "open_router",
      open_router: {},
      // V1
      api_key: "",
      excluded_headings: "",
      folder_exclusions: "smart-chats",
      show_full_path: false,
      expanded_view: true,
      language: "en",
      version: ""
    }
  };
}

// src/index.js
var import_ejs_min4 = __toESM(require_ejs_min(), 1);

// build/views.json
var views_default = {
  attribution: '<div class="sc-brand">\n  <svg viewBox="0 0 100 100" class="svg-icon smart-connections">\n    <path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"></path>\n    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"></path>\n    <circle cx="50" cy="20" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="40" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="70" r="9" fill="currentColor"></circle>\n    <circle cx="50" cy="100" r="9" fill="currentColor"></circle>\n    <circle cx="30" cy="50" r="9" fill="currentColor"></circle>\n  </svg>\n  <p><a style="font-weight: 700;" href="https://smartconnections.app/">Smart Connections</a></p>\n</div>',
  sc_change: '<div class="sc-change">\n  <div class="sc-variation">\n    <div class="new-content"></div>\n    <button>Accept</button>\n  </div>\n  <div class="sc-variation">\n    <div class="old-content"></div>\n    <button>Reject</button>\n  </div>\n  <div class="sc-change-footer">\n    <i>Time saved: <%= time_saved %></i>\n    <%- this.attribution %>\n  </div>\n</div>\n\n',
  smart_chat: `<div class="sc-chat-container">
  <div class="sc-top-bar-container">
    <input class="sc-chat-name-input" type="text" value="<%= name %>" placeholder="Chat Name">
    <button title="Open Conversation Note"><%- this.get_icon('external-link') %></button>
    <button title="Chat History"><%- this.get_icon('history') %></button>
    <button title="Chat Options" style="display: none;"><%- this.get_icon('sliders-horizontal') %></button>
    <button title="Chat Settings"><%- this.get_icon('gear') %></button>
    <button title="New Chat"><%- this.get_icon('plus') %></button>
  </div>
  <div id="settings" class="sc-overlay"></div>
  <div class="sc-chat-box">
    <div class="sc-message-container">
      <div class="sc-message assistant">
        <div class="sc-message-content">
          <span>
            Hi there, welcome to the Smart Chat.&nbsp;Ask me a question about your notes and I'll try to answer it.
          </span>
        </div>
      </div>
      <%- messages %>
    </div>
  </div>
  <div class="sc-chat-form">
    <textarea class="sc-chat-input" placeholder="Try &quot;Based on my notes&quot; or &quot;Summarize [[this note]]&quot; or &quot;Important tasks in /folder/&quot;"></textarea>
    <div class="sc-btn-container">
      <span id="sc-abort-button" style="display: none;"><%- this.get_icon('square') %></span>
      <button class="send-button" id="sc-send-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="currentColor" />
          <path fill="currentColor" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd" fill="#727272"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
<%- this.attribution %>
  `,
  smart_chat_msg: `<div class="sc-message <%= role %>">
  <div class="sc-message-content" data-content="<%= content %>">
    <span><%= content %></span>
    <span class="sc-msg-button" title="Copy message to clipboard"><%- this.get_icon('copy') %></span>
    <!-- TODO: Copy context to clipboard (icon: eye) -->
    <!-- TODO: Copy prompt to clipboard (icon: files) -->
  </div>
</div>`,
  smart_chat_settings: `<div class="setting-component"
  data-name="Default Language"
  data-setting="language"
  data-type="dropdown"
  data-description="Default language to use for Smart Chat. Changes which self-referential pronouns will trigger lookup of your notes. <b id='self-referential-pronouns'>Current: my, I, me, mine, our, ours, us, we</b>"
  data-option-1="en|English"
  data-option-2="es|Spanish"
  data-option-3="fr|French"
  data-option-4="de|German"
  data-option-5="it|Italian"
  data-callback="update_language"
></div>
<div class="setting-component"
  data-name="Model Platform"
  data-setting="chat_model_platform_key"
  data-type="dropdown"
  data-description="Select a model platform to use with Smart Chat."
  <%- chat_platforms.map((platform, i) => \`data-option-\${i + 1}="\${platform.key}|\${platform.description}"\`).join('\\n') %>
  data-callback="changed_smart_chat_model"
></div>
<% if(chat_platform?.fetch_models) { %>
  <% if(settings[settings.chat_model_platform_key]?.api_key) { %>
    <div class="setting-component"
      data-name="Model Name"
      data-type="dropdown"
      data-setting="<%= settings.chat_model_platform_key %>.model_name"
      data-callback="changed_smart_chat_model"
      <%- platform_chat_models.map((model, i) => \`data-option-\${i}="\${model.key}|\${model.model_name} (\${model.description})"\`).join('\\n') %>
    ></div>
  <% } %>
  <% if(!platform_chat_models.length) { %>
    <div class="setting-component"
      data-name="Refresh Models List"
      data-type="button"
      data-callback="changed_smart_chat_model"
    ></div>
  <% } %>
  <div class="setting-component"
    data-name="<%= chat_platform.description %> API Key"
    data-type="password"
    data-setting="<%= settings.chat_model_platform_key %>.api_key"
    <% if(chat_platform.signup_url) { %>
      data-description="<a href='<%= chat_platform.signup_url %>'>Get API Key</a> for <%= chat_platform.description %>."
    <% } else { %>
      data-description="API Key for <%= chat_platform.description %>."
    <% } %>
    data-placeholder="Enter an API Key"
    data-button="Save"
    data-callback="test_chat_api_key"
  ></div>
<% } %>
<% if (settings.chat_model_platform_key.startsWith('custom_local')) { %>
  <h3>Custom Local Model</h3>
  <div class="setting-component"
    data-name="Model Name"
    data-type="text"
    data-setting="custom_local.model_name"
    data-description="Name of the custom model."
    data-placeholder="Enter a model name"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="protocol"
    data-type="text"
    data-setting="custom_local.protocol"
    data-description="Protocol for chat server (http or https)."
    data-placeholder="Enter a protocol"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="hostname"
    data-type="text"
    data-setting="custom_local.hostname"
    data-description="Host for local chat server."
    data-placeholder="Enter a host"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="port"
    data-type="number"
    data-setting="custom_local.port"
    data-description="Port for local chat server."
    data-placeholder="Enter a port number"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="path"
    data-type="text"
    data-setting="custom_local.path"
    data-description="Path for local chat server."
    data-placeholder="Enter a path"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="streaming"
    data-type="toggle"
    data-setting="custom_local.streaming"
    data-description="Enable streaming for local chat server. Disable if you are getting CORS errors."
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="Max input tokens"
    data-description="Maximum number of tokens for input to the model."
    data-type="number"
    data-setting="custom_local.max_input_tokens"
    data-placeholder="Enter a number"
    data-callback="changed_smart_chat_model"
  ></div>
<% } else if(settings.chat_model_platform_key.startsWith('custom_api')) { %>
  <h3>Custom Server</h3>
  <div class="setting-component"
    data-name="Model Name"
    data-type="text"
    data-setting="custom_api.model_name"
    data-description="Name of the custom model."
    data-placeholder="Enter a model name"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="protocol"
    data-type="text"
    data-setting="custom_api.protocol"
    data-description="Protocol for chat server (http or https)."
    data-placeholder="Enter a protocol"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="hostname"
    data-type="text"
    data-setting="custom_api.hostname"
    data-description="Host for chat server."
    data-placeholder="Enter a host"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="path"
    data-type="text"
    data-setting="custom_api.path"
    data-description="Path for chat server."
    data-placeholder="Enter a path"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="streaming"
    data-type="toggle"
    data-setting="custom_api.streaming"
    data-description="Enable streaming for chat server. Disable if you are getting CORS errors."
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="Max input tokens"
    data-description="Maximum number of tokens for input to the model."
    data-type="number"
    data-setting="custom_api.max_input_tokens"
    data-placeholder="Enter a number"
    data-callback="changed_smart_chat_model"
  ></div>
  <div class="setting-component"
    data-name="API Key"
    data-type="text"
    data-setting="custom_api.api_key"
    data-description="API Key for the custom server sent as a header (bearer token)."
    data-placeholder="Enter an API Key"
    data-button="Save"
    data-callback="test_chat_api_key"
  ></div>
<% } %>`,
  smart_chat_system_msg: '<div class="sc-<%= role %>">\n  <div class="" data-content="<%= content %>">\n    <span><%= content %></span>\n  </div>\n</div>',
  smart_note_inspect: `<h2>Blocks</h2>
<% if(note.blocks.length === 0) { %>
  <p>No blocks</p>
<% } %>
<% for(let block of note.blocks.sort((a, b) => a.line_start - b.line_start)) { %>
<p>
  <%- block.sub_key.split("#").join(" > ") + " (" + block.size + " chars; lines: " + block.line_start + "-" + block.line_end + ")" %>
  <br>
  <%- block.should_embed ? "<span style='color: green;'>should embed</span>" : "<span style='color: orange;'>embedding skipped</span>" %>
</p>
<blockquote>
  <%- (await block.read())
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\n/g, "<br>")
    .replace(/\\t/g, "&nbsp;&nbsp;")
  %>
</blockquote>
<hr>
<% } %>

`
};

// src/smart_obsidian_view2.js
var import_obsidian6 = require("obsidian");
var SmartObsidianView2 = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.app = plugin.app;
    this.plugin = plugin;
  }
  // static
  static get view_type() {
    throw new Error("view_type must be implemented in subclass");
  }
  static get display_text() {
    throw new Error("display_text must be implemented in subclass");
  }
  static get icon_name() {
    return "smart-connections";
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static get_view(workspace) {
    return this.get_leaf(workspace)?.view;
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  static is_open(workspace) {
    return this.get_leaf(workspace)?.view instanceof this;
  }
  // instance
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  async onOpen() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  async initialize() {
    await this.wait_for_env_to_load();
    this.container.empty();
    this.plugin[this.constructor.view_type.replace(/-/g, "_")] = this;
    this.register_plugin_events();
    this.app.workspace.registerHoverLinkSource(this.constructor.view_type, { display: this.getDisplayText(), defaultMod: true });
    this.render_view();
  }
  async wait_for_env_to_load() {
    if (!this.env?.collections_loaded) {
      while (!this.env?.collections_loaded) {
        const loading_msg = this.env?.smart_connections_plugin?.obsidian_is_syncing ? "Waiting for Obsidian Sync to finish..." : "Loading Smart Connections...";
        if (this.containerEl.children[1].innerHTML !== loading_msg) {
          this.containerEl.children[1].innerHTML = loading_msg;
        }
        await new Promise((r) => setTimeout(r, 2e3));
      }
    }
  }
  register_plugin_events() {
  }
  render_view() {
    throw new Error("render_view must be implemented in subclass");
  }
  get container() {
    return this.containerEl.children[1];
  }
  get env() {
    return this.plugin.env;
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  get attribution() {
    return `
      <div class="sc-brand">
        <svg viewBox="0 0 100 100" class="svg-icon smart-connections">
          <path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"></path>
          <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"></path>
          <circle cx="50" cy="20" r="9" fill="currentColor"></circle>
          <circle cx="80" cy="40" r="9" fill="currentColor"></circle>
          <circle cx="80" cy="70" r="9" fill="currentColor"></circle>
          <circle cx="50" cy="100" r="9" fill="currentColor"></circle>
          <circle cx="30" cy="50" r="9" fill="currentColor"></circle>
        </svg>
        <p><a style="font-weight: 700;" href="https://smartconnections.app/">Smart Connections</a></p>
      </div>
    `;
  }
};

// src/smart_entities_view.js
var SmartEntitiesView = class extends SmartObsidianView2 {
  add_result_listeners(elm) {
    this.plugin.add_result_listeners(elm, this.constructor.view_type);
  }
};

// src/sc_connections_view.js
var import_obsidian7 = require("obsidian");
var ScConnectionsView = class extends SmartEntitiesView {
  static get view_type() {
    return "smart-connections-view";
  }
  static get display_text() {
    return "Smart Connections";
  }
  static get icon_name() {
    return "smart-connections";
  }
  register_plugin_events() {
    this.plugin.registerEvent(this.app.workspace.on("file-open", (file) => {
      if (!file) return;
      this.render_view(file?.path);
    }));
    this.plugin.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => {
      if (leaf.view instanceof this.constructor) {
        this.render_view();
      }
    }));
  }
  async render_view(entity = null, container = this.container) {
    if (container.checkVisibility() === false) return console.log("View inactive, skipping render nearest");
    if (!entity) {
      const current_file = this.app.workspace.getActiveFile();
      if (current_file) entity = current_file?.path;
    }
    let key = null;
    if (typeof entity === "string") {
      const collection = entity.includes("#") ? this.env.smart_blocks : this.env.smart_sources;
      key = entity;
      entity = collection.get(key);
    }
    if (!entity) return this.plugin.notices.show("no entity", "No entity found for key: " + key);
    if (entity.collection_key === "smart_sources" && entity?.path?.endsWith(".pdf")) {
      const page_number = this.app.workspace.getActiveFileView().contentEl.firstChild.firstChild.children[8].value;
      if (!["1", 1].includes(page_number)) {
        const page_block = entity.blocks?.find((b) => b.sub_key.includes(`age ${page_number}`));
        if (page_block) {
          return await this.render_view(page_block);
        }
      }
    }
    if (this.current_context === entity?.key) return;
    this.current_context = entity?.key;
    const frag = await this.env.opts.components.connections.call(this.smart_view, entity, {
      add_result_listeners: this.add_result_listeners.bind(this),
      attribution: this.attribution,
      refresh_smart_view: this.refresh_smart_view.bind(this),
      open_search_view: this.plugin.open_search_view.bind(this.plugin)
    });
    container.innerHTML = "";
    container.appendChild(frag);
    this.add_top_bar_listeners();
  }
  refresh_smart_view() {
    console.log("refresh_smart_view");
    this.env.connections_cache = {};
    this.current_context = null;
    this.render_view();
  }
  add_top_bar_listeners() {
    const container = this.container;
    container.querySelectorAll(".sc-context").forEach((el) => {
      const entity = this.env.smart_sources.get(el.dataset.key);
      if (entity) {
        el.addEventListener("click", () => {
          new SmartNoteInspectModal(this.env, entity).open();
        });
      }
    });
  }
};
var SmartNoteInspectModal = class extends import_obsidian7.Modal {
  constructor(env, entity) {
    super(env.smart_connections_plugin.app);
    this.entity = entity;
    this.env = env;
    this.template = this.env.opts.templates["smart_note_inspect"];
    this.ejs = this.env.ejs;
  }
  onOpen() {
    this.titleEl.innerText = this.entity.key;
    this.render();
  }
  async render() {
    const html = await this.ejs.render(this.template, { note: this.entity }, { async: true });
    this.contentEl.innerHTML = html;
  }
};

// src/sc_search_view.js
var ScSearchView = class extends SmartEntitiesView {
  static get view_type() {
    return "smart-search-view";
  }
  static get display_text() {
    return "Smart Search";
  }
  static get icon_name() {
    return "search";
  }
  async render_view(search_text = "", container = this.container) {
    container.innerHTML = "Loading search...";
    const frag = await this.env.opts.components.search.call(this.smart_view, this.env, {
      collection_key: "smart_sources",
      // TODO: make it configurable which collection to search
      add_result_listeners: this.add_result_listeners.bind(this),
      attribution: this.attribution,
      search_text
    });
    container.innerHTML = "";
    container.appendChild(frag);
  }
};

// src/smart_search.js
var SmartSearch = class {
  constructor(plugin) {
    this.main = plugin;
    this.plugin = plugin;
  }
  async search(search_text, filter = {}) {
    try {
      if (!this.plugin.env?.smart_blocks?.smart_embed && !this.plugin.env?.smart_sources?.smart_embed) {
        this.plugin.notices.show("embed model not loaded", "Embed model not loaded. Please wait for the model to load and try again.");
        return [];
      }
      const collection = this.plugin.env?.smart_blocks?.smart_embed ? this.plugin.env.smart_blocks : this.plugin.env.smart_sources;
      const embedding = await collection.smart_embed.embed(search_text);
      if (!embedding?.vec) {
        this.main.notices.show("embed search text failed", "Failed to embed search text.");
        return [];
      }
      return collection.nearest(embedding.vec, filter).sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      });
    } catch (e) {
      this.main.notices.show("error in embedding search", "Error in embedding search. See console for details.", { timeout: 0 });
      console.error(e);
      return [];
    }
  }
};

// src/smart_obsidian_view.js
var import_obsidian8 = require("obsidian");
var import_ejs_min = __toESM(require_ejs_min(), 1);
var SmartObsidianView = class extends import_obsidian8.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.app = plugin.app;
    this.plugin = plugin;
    this.templates = views_default;
    this.ejs = import_ejs_min.default;
  }
  // static
  static get view_type() {
    throw new Error("view_type must be implemented in subclass");
  }
  static get display_text() {
    throw new Error("display_text must be implemented in subclass");
  }
  static get icon_name() {
    return "smart-connections";
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static get_view(workspace) {
    return this.get_leaf(workspace)?.view;
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  static is_open(workspace) {
    return this.get_leaf(workspace)?.view instanceof this;
  }
  // instance
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  render_template(template_name, data) {
    if (!this.templates[template_name]) throw new Error(`Template '${template_name}' not found.`);
    return import_ejs_min.default.render(this.templates[template_name], data, { context: this.view_context });
  }
  async wait_for_env_to_load() {
    if (!this.env?.collections_loaded) {
      while (!this.env?.collections_loaded) {
        const loading_msg = this.env?.smart_connections_plugin?.obsidian_is_syncing ? "Waiting for Obsidian Sync to finish..." : "Loading Smart Connections...";
        if (this.containerEl.children[1].innerHTML !== loading_msg) {
          this.containerEl.children[1].innerHTML = loading_msg;
        }
        await new Promise((r) => setTimeout(r, 2e3));
      }
    }
  }
  get_icon(name) {
    return this.plugin.obsidian.getIcon(name).outerHTML;
  }
  get container() {
    return this.containerEl.children[1];
  }
  get env() {
    return this.plugin.env;
  }
  get config() {
    return this.plugin.settings;
  }
  get settings() {
    return this.plugin.settings;
  }
  get view_context() {
    return {
      attribution: this.templates.attribution,
      get_icon: this.get_icon.bind(this),
      settings: this.plugin.settings
    };
  }
};

// src/chat/sc_chat_view.js
var ScChatView = class _ScChatView extends SmartObsidianView {
  static get view_type() {
    return "smart-connections-chat-view";
  }
  static get display_text() {
    return "Smart Chat Conversation View";
  }
  static get icon_name() {
    return "message-square";
  }
  async onOpen() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  async initialize() {
    await this.wait_for_env_to_load();
    if (this.env.chat_ui) this.env.chat_ui.container = this.container;
    while (!this.env.chats) await new Promise((r) => setTimeout(r, 300));
    await this.env.chats.new();
    this.app.workspace.registerHoverLinkSource(_ScChatView.view_type, {
      display: "Smart Chat Links",
      defaultMod: true
    });
  }
  onClose() {
    this.app.workspace.unregisterHoverLinkSource(_ScChatView.view_type);
  }
};

// src/sc_settings_tab.js
var import_obsidian9 = require("obsidian");

// src/components/main_settings.js
async function render12(scope) {
  const html = `
    <div id="smart-connections-settings">
      ${render_mobile_warning(scope)}
      ${render_info_callout()}
      ${render_supporters_section(scope)}
      <h2>Smart Environment</h2>
      <div data-smart-settings="env"></div>
      <p>Notes about embedding models:</p>
      <ul>
        <li>IMPORTANT: make sure local <code>BGE-micro-v2</code> embedding model works before trying other local models.</li>
        <li>Local model compatibility depends on available CPU and RAM. Try reducing the max tokens (context) if a local model if failing.</li>
        <li>API models are not dependent on local compute, but they require an API key and send your notes to third-party servers for processing.</li>
      </ul>
      <!-- OLD -->
      ${render_muted_notices_section(scope)}
      ${render_mobile_toggle(scope)}
      ${render_version_revert_button(scope)}
    </div>
  `;
  const frag = this.create_doc_fragment(html);
  return await post_process10.call(this, scope, frag);
}
async function post_process10(scope, frag) {
  await this.render_setting_components(frag, { scope });
  const smart_settings_containers = frag.querySelectorAll("[data-smart-settings]");
  for (const container of smart_settings_containers) {
    const sub_scope = container.dataset.smartSettings.split(".").reduce((acc, key) => acc[key], scope);
    await sub_scope.render_settings(container);
  }
  return frag;
}
function render_mobile_warning(scope) {
  if (scope.obsidian.Platform.isMobile && !scope.settings.enable_mobile) {
    return `
      <div data-callout-metadata="" data-callout-fold="" data-callout="warning" class="callout">
        <div class="callout-title">
          <div class="callout-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="svg-icon lucide-alert-triangle">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div class="callout-title-inner">Mobile is DISABLED.</div>
        </div>
        <div class="callout-content">
          <p>Toggle "Enable mobile" setting to activate mobile.</p>
        </div>
      </div>
    `;
  }
  return "";
}
function render_info_callout() {
  return `
    <div data-callout-metadata="" data-callout-fold="" data-callout="info" class="callout" style="mix-blend-mode: unset;">
      <div class="callout-title">
        <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-info">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg></div>
        <div class="callout-title-inner"><p><strong>User Agreement:</strong> By using Smart Connections you agree to share how it helps you with at least one other person \u{1F60A}\u{1F334}</p></div>
      </div>
    </div>
  `;
}
function render_supporters_section(scope) {
  const stable_release_html = scope.EARLY_ACCESS ? "" : `<p>The success of Smart Connections is a direct result of our community of supporters who generously fund and evaluate new features. Their unwavering commitment to our privacy-focused, open-source software benefits all. Together, we can continue to innovate and make a positive impact on the world.</p>` + render_supporter_benefits_html();
  const become_supporter_html = scope.EARLY_ACCESS ? "" : `<div class="setting-component"
      data-name="Upgrade to Early Access Version (v2.2)"
      data-description="Upgrade to v2.2 (Early Access) to access new features and improvements."
      data-type="button"
      data-btn-text="Upgrade to v2.2"
      data-callback="update_early_access"
    ></div>
    <div class="setting-component"
      data-name="Become a Supporter"
      data-description="Become a Supporter"
      data-type="button"
      data-href="https://buy.stripe.com/9AQ7sWemT48u1LGcN4"
    ></div>`;
  return `<div class="sc-supporters">
    <h1>Smart Connections Supporter Community</h1>
    <i>Join the next <a href="https://lu.ma/calendar/cal-ZJtdnzAdURyouM7">Lean Coffee session</a> to discuss future features & improvements.</i>
    <hr>
    ${stable_release_html}
    <div class="setting-component"
      data-name="Supporter License Key"
      data-type="text"
      data-setting="license_key"
      data-description="Note: this is not required to use Smart Connections."
      data-placeholder="Enter your license_key"
    ></div>
    <div class="setting-component"
      data-name="Smart Connect - Obsidian GPT"
      data-btn-text="Open GPT"
      data-description='Chat with your notes in ChatGPT without uploading your notes to the cloud!'
      data-type="button"
      data-href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connections-2"
    ></div>
    <div class="setting-component"
      data-name="Supporter Community Chat"
      data-btn-text="Join us"
      data-description='Join the supporter community chat.'
      data-type="button"
      data-href="https://chat.smartconnections.app"
    ></div>
    ${become_supporter_html}
  </div>`;
}
function render_supporter_benefits_html() {
  return `<p><b>Supporter benefits include:</b></p>
    <ul>
      <li>Early access to new &amp; experimental features:
        <ul>
          <li>Early access to new versions enables supporters to help ensure new features are ready for the broader community.</li>
          <li><i>Current Early Access Features:</i><ul>
            <li>\u{1F5BC}\uFE0F Add images to Smart Chat (multimodal chat)</li>
            <li>Re-ranking model in the Smart Connections View</li>
            <li>Smart Chat History in canvas format</li>
          </ul></li>
          <li><i>Coming soon to Early Access:</i><ul>
            <li>PDF Support in Smart Connections view</li>
            <li>Edit notes in Smart Chat</li>
            <li>New retrieval methods in Smart Chat</li>
            <li>Review retrieved context before sending in Smart Chat</li>
            <li>Audio files in Smart Connections view</li>
          </ul></li>
          <li><i>Past Early Access Features:</i><ul>
            <li>ChatGPT integration with your Obsidian Vault</li>
            <li>Mobile support for Smart Connections</li>
          </ul></li>
        </ul>
      </li>
      <li>Access to the supporter-only <a href="https://chat.smartconnections.app">private chat</a>:
        <ul>
          <li><i>Community:</i>
            <ul>
              <li>Ask questions and share insights with other supporters.</li>
            </ul>
          </li>
          <li><i>Help &amp; Support (priority):</i>
            <ul>
              <li>Swift, top-priority support in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
            </ul>
          </li>
          <li><i>Feature Requests (priority):</i>
            <ul>
              <li>Influence the future of Smart Connections with priority feature requests in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
            </ul>
          </li>
          <li><i>Insider Updates:</i>
            <ul>
              <li>Learn about the latest features &amp; improvements before they are announced.</li>
            </ul>
          </li>
        </ul>
      </li>
      <li><b>For a very limited time:</b> Early access to Smart Connect: Use ChatGPT with your notes <i>without</i> uploading your notes to the cloud using <a href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connect-obsidian">Smart Connect - Obsidian</a> GPT.</li>
    </ul>
  `;
}
function render_muted_notices_section(scope) {
  let html = `
    <h1>Muted Notices</h1>
  `;
  if (Object.keys(scope.notices.settings?.muted || {}).length) {
    for (const notice in scope.notices.settings?.muted) {
      html += `
        <div class="setting-component"
          data-name="${notice}"
          data-setting="smart_notices.muted.${notice}"
          data-type="remove"
          data-btn-text="Unmute"
          data-callback="remove_setting_elm"
        ></div>
      `;
    }
  } else {
    html += `<p>No muted notices.</p>`;
  }
  return html;
}
function render_mobile_toggle(scope) {
  return `
    <hr>
    <div class="setting-component"
      data-name="Enable Mobile (EXPERIMENTAL)"
      data-description="Enable mobile support for Smart Connections."
      data-type="toggle"
      data-setting="enable_mobile"
      data-callback="toggle_mobile"
    ></div>
  `;
}
function render_version_revert_button(scope) {
  if (scope.EARLY_ACCESS) {
    return `
      <hr>
      <div class="setting-component"
        data-name="Revert to Stable Release"
        data-btn-text="Revert"
        data-description='Revert to the stable release of Smart Connections. Requires "Check for Updates" and then "Update Plugin" to complete the process.'
        data-type="button"
        data-callback="revert_to_stable_release"
      ></div>
    `;
  }
  return "";
}

// src/sc_settings_tab.js
var ScSettingsTab = class extends import_obsidian9.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.main_settings_container = null;
  }
  /**
   * @method display
   * @description Called by Obsidian to display the settings tab
   */
  display() {
    console.log("displaying settings tab");
    this.render_settings(this.containerEl);
  }
  get smart_view() {
    if (!this._smart_view) {
      this._smart_view = new this.plugin.smart_env_config.modules.smart_view.class({ adapter: this.plugin.smart_env_config.modules.smart_view.adapter });
    }
    return this._smart_view;
  }
  async render_settings(container = this.main_settings_container, opts = {}) {
    if (!this.main_settings_container || container !== this.main_settings_container) this.main_settings_container = container;
    if (!container) throw new Error("Container is required");
    container.innerHTML = "";
    container.innerHTML = '<div class="sc-loading">Loading main settings...</div>';
    const frag = await render12.call(this.smart_view, this.plugin, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return container;
  }
};

// src/sc_actions_ux.js
var import_ejs_min2 = __toESM(require_ejs_min(), 1);
var ScActionsUx = class {
  constructor(plugin, container, codeblock_type) {
    this.plugin = plugin;
    this.container = container;
    this.codeblock_type = codeblock_type;
  }
  change_code_block(code) {
    const active_file = this.plugin.app.workspace.getActiveFile();
    const note_path = active_file.path;
    const old_content = code.substring(code.indexOf("<<<<<<< ORIGINAL\n") + "<<<<<<< ORIGINAL\n".length, code.indexOf("======="));
    const new_content = code.substring(code.indexOf("=======\n") + "=======\n".length, code.indexOf(">>>>>>>"));
    const time_saved = (Math.round(new_content.split(" ").length / 50) || 1) + " min";
    this.container.innerHTML = this.render_template("sc_change", { new_content, old_content, time_saved });
    const new_content_container = this.container.querySelector(".new-content");
    const old_content_container = this.container.querySelector(".old-content");
    this.plugin.obsidian.MarkdownRenderer.renderMarkdown(new_content, new_content_container, note_path, new this.plugin.obsidian.Component());
    this.plugin.obsidian.MarkdownRenderer.renderMarkdown(old_content, old_content_container, note_path, new this.plugin.obsidian.Component());
    const approve_button = this.get_button_by_text("Accept");
    approve_button.onclick = async () => {
      console.log("Accepted");
      const content = await this.plugin.app.vault.cachedRead(active_file);
      const updated_content = content.replace("```" + this.codeblock_type + "\n" + code + "\n```", new_content.trim());
      await this.plugin.app.vault.modify(active_file, updated_content);
      await this.append_accepted_changes({ note_path, old_content, new_content, time_saved });
    };
    const reject_button = this.get_button_by_text("Reject");
    reject_button.onclick = async () => {
      const content = await this.plugin.app.vault.cachedRead(active_file);
      const updated_content = content.replace("```" + this.codeblock_type + "\n" + code + "\n```", old_content.trim());
      await this.plugin.app.vault.modify(active_file, updated_content);
    };
  }
  async append_accepted_changes(change) {
    const file_path = this.plugin.env.env_data_dir + "/accepted_changes.ndjson";
    if (!await this.plugin.app.vault.exists(file_path)) {
      console.log("File does not exist, creating it");
      await this.plugin.app.vault.create(file_path, "");
    }
    await this.plugin.app.vault.adapter.append(file_path, JSON.stringify(change) + "\n");
  }
  render_template(template_name, data) {
    if (!views_default[template_name]) throw new Error(`Template '${template_name}' not found.`);
    return import_ejs_min2.default.render(views_default[template_name], data, { context: this });
  }
  get_button_by_text(text) {
    return get_button_by_text(this.container, text);
  }
  get_icon(name) {
    return this.plugin.obsidian.getIcon(name).outerHTML;
  }
  get attribution() {
    return views_default.attribution;
  }
};
function get_button_by_text(container, text) {
  return Array.from(container.querySelectorAll("button")).find((button) => button.textContent === text);
}

// src/open_note.js
async function open_note(plugin, target_path, event = null) {
  const env = plugin.env;
  let targetFile;
  let block;
  if (target_path.includes(".pdf#page=")) {
    return plugin.app.workspace.openLinkText(target_path, "/");
  }
  if (target_path.endsWith("#")) target_path = target_path.slice(0, -1);
  if (target_path.includes("#")) {
    targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path.split("#")[0], "");
    block = env.smart_blocks.get(target_path);
  } else {
    targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path, "");
  }
  let leaf;
  if (event) {
    const mod = plugin.obsidian.Keymap.isModEvent(event);
    leaf = plugin.app.workspace.getLeaf(mod);
  } else {
    leaf = plugin.app.workspace.getMostRecentLeaf();
  }
  await leaf.openFile(targetFile);
  if (block?.line_start) {
    let { editor } = leaf.view;
    const pos = { line: block.line_start, ch: 0 };
    editor.setCursor(pos);
    editor.scrollIntoView({ to: pos, from: pos }, true);
  }
}

// src/sc_chatgpt_view.js
var import_obsidian10 = require("obsidian");
var SmartChatGPTView = class extends import_obsidian10.ItemView {
  static get view_type() {
    return "smart_chatgpt";
  }
  static get display_text() {
    return "Smart ChatGPT";
  }
  static get icon_name() {
    return "bot";
  }
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  onload() {
    console.log("loading view");
    this.initialize();
  }
  initialize() {
    this.containerEl.empty();
    const refreshButton = this.containerEl.createEl("button", {
      text: "Refresh"
    });
    refreshButton.addEventListener("click", () => {
      this.initialize();
    });
    this.containerEl.appendChild(this.create());
  }
  create() {
    this.frame = document.createElement("webview");
    this.frame.setAttribute("nodeintegration", "");
    this.frame.setAttribute("contextisolation", "");
    this.frame.setAttribute("allowpopups", "");
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";
    this.frame.setAttribute("src", "https://chatgpt.com");
    return this.frame;
  }
};

// src/sc_private_chat_view.js
var import_obsidian11 = require("obsidian");
var SmartPrivateChatView = class extends import_obsidian11.ItemView {
  static get view_type() {
    return "smart_private_chat";
  }
  static get display_text() {
    return "Smart Connections Supporter Private Chat";
  }
  static get icon_name() {
    return "users";
  }
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  onload() {
    console.log("loading view");
    this.initialize();
  }
  initialize() {
    this.containerEl.empty();
    const refreshButton = this.containerEl.createEl("button", {
      text: "Refresh"
    });
    refreshButton.addEventListener("click", () => {
      this.initialize();
    });
    this.containerEl.appendChild(this.create());
  }
  create() {
    this.frame = document.createElement("webview");
    this.frame.setAttribute("nodeintegration", "");
    this.frame.setAttribute("contextisolation", "");
    this.frame.setAttribute("allowpopups", "");
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";
    this.frame.setAttribute("src", "https://chat.smartconnections.app");
    return this.frame;
  }
};

// src/chat/ScTranslations.json
var ScTranslations_default = {
  en: {
    pronouns: ["my", "I", "me", "mine", "our", "ours", "us", "we"],
    prompt: "Based on your notes",
    initial_message: "Hi, I'm ChatGPT with access to your notes via Smart Connections. Ask me a question about your notes and I'll try to answer it."
  },
  es: {
    pronouns: ["mi", "yo", "m\xED", "t\xFA", "mis"],
    prompt: "Bas\xE1ndose en sus notas",
    initial_message: "Hola, soy ChatGPT con acceso a tus apuntes a trav\xE9s de Smart Connections. Hazme una pregunta sobre tus apuntes e intentar\xE9 responderte."
  },
  fr: {
    pronouns: ["me", "mon", "ma", "mes", "moi", "nous", "notre", "nos", "je", "j'", "m'"],
    prompt: "D'apr\xE8s vos notes",
    initial_message: "Bonjour, je suis ChatGPT et j'ai acc\xE8s \xE0 vos notes via Smart Connections. Posez-moi une question sur vos notes et j'essaierai d'y r\xE9pondre."
  },
  de: {
    pronouns: ["mein", "meine", "meinen", "meiner", "meines", "mir", "uns", "unser", "unseren", "unserer", "unseres"],
    prompt: "Basierend auf Ihren Notizen",
    initial_message: "Hallo, ich bin ChatGPT und habe \xFCber Smart Connections Zugang zu Ihren Notizen. Stellen Sie mir eine Frage zu Ihren Notizen und ich werde versuchen, sie zu beantworten."
  },
  it: {
    pronouns: ["mio", "mia", "miei", "mie", "noi", "nostro", "nostri", "nostra", "nostre"],
    prompt: "Sulla base degli appunti",
    initial_message: "Ciao, sono ChatGPT e ho accesso ai tuoi appunti tramite Smart Connections. Fatemi una domanda sui vostri appunti e cercher\xF2 di rispondervi."
  }
};

// src/chat/sc_chat_model.js
var import_smart_chat_model = __toESM(require_smart_chat_model(), 1);
var ScChatModel = class extends import_smart_chat_model.SmartChatModel {
  async done_handler(full_str) {
    await this.env.chat_ui.new_message(full_str, "assistant");
    this.env.chats.current.add_message({ role: "assistant", content: full_str });
    this.env.chat_ui.clear_streaming_ux();
  }
  async chunk_handler(text_chunk) {
    await this.env.chat_ui.new_message(text_chunk, "assistant", true);
  }
  async request_middlewares(opts) {
    await Promise.all(opts.messages.map(async (msg, i) => {
      const context_start = "```sc-context";
      if (msg.role === "tool" && msg.tool_call_id === "lookup") {
        msg.role = "system";
        msg.content = context_start + "\n" + JSON.parse(msg.content).map((c) => c.path).join("\n") + "\n```";
      }
      if (msg.role === "system" && msg.content.includes(context_start)) {
        const context_start_i = msg.content.indexOf(context_start) + context_start.length;
        const context_end_i = msg.content.substring(context_start_i).indexOf("```");
        const raw_contents = msg.content.substring(context_start_i, context_start_i + context_end_i);
        const entities = this.env.smart_connections_plugin.get_entities_from_context_codeblock(raw_contents);
        let context = [];
        let tokens = [];
        await Promise.all(entities.map(async (entity, i2) => {
          if (!entity?.get_as_context) return;
          context[i2] = await entity.get_as_context({ i: i2 });
          tokens[i2] = await this.count_tokens(context[i2]);
        }));
        let total_tokens = 0;
        let ct = 0;
        context = context.reduce((acc, c, i2) => {
          if (!c) return acc;
          if (total_tokens + tokens[i2] > this.max_input_tokens) return acc;
          total_tokens += tokens[i2];
          ct++;
          if (acc) acc += "\n";
          return acc + c;
        }, "");
        msg.content = this.get_prompt_context_prefix({ ct }) + "\n" + context;
      }
      const sys_start = "```sc-system";
      if (msg.role === "system" && msg.content.includes(sys_start)) {
        const sys_start_i = msg.content.indexOf(sys_start) + sys_start.length;
        const sys_end_i = msg.content.substring(sys_start_i).indexOf("```");
        const sys_prompts = msg.content.substring(sys_start_i, sys_start_i + sys_end_i).split("\n").filter((ln) => ln.trim());
        msg.content = "";
        for (const sys_prompt of sys_prompts) {
          const tfile = this.env.smart_connections_plugin.system_prompts.find((file) => file.basename === sys_prompt);
          const note_content = await this.env.smart_connections_plugin.read_file(tfile);
          if (msg.content) msg.content += "\n";
          msg.content += note_content;
        }
      }
      return msg;
    }));
    opts.messages = opts.messages.filter((msg) => msg.role !== "assistant" || msg.content || !msg.tool_calls?.find((call) => call.id === "lookup"));
    return opts;
  }
  get_prompt_context_prefix(params = {}) {
    return `Anticipate the type of answer desired by the user. Imagine the following${params.ct ? " " + params.ct : ""} notes were written by the user and contain all the necessary information to answer the user's question. Begin responses with "${ScTranslations_default[this.env.smart_connections_plugin.settings.language].prompt}..."`;
  }
};

// src/chat/sc_chats_ui.js
var import_smart_chats_ui = __toESM(require_smart_chats_ui(), 1);
var import_obsidian12 = require("obsidian");

// node_modules/smart-setting/smart_settings.js
var import_ejs_min3 = __toESM(require_ejs_min2(), 1);
var SmartSettings2 = class {
  constructor(env, container, opts = { template_name: "smart_settings" }) {
    this.env = env;
    this.main = opts.main || this.env.plugin;
    this.plugin = this.main;
    this.container = container;
    if (typeof opts === "string") opts = { template_name: opts };
    this.template_name = opts.template_name;
    this.ejs = this.env.ejs || import_ejs_min3.default;
    this.templates = this.env.opts.templates;
    this.views = this.templates;
  }
  // get settings() { return this.main.settings; }
  // set settings(settings) { this.main.settings = settings; }
  get settings() {
    return this.env.settings;
  }
  set settings(settings) {
    this.env.settings = settings;
  }
  async render() {
    const view_data = typeof this.get_view_data === "function" ? await this.get_view_data() : this.view_data;
    this.render_template(view_data);
    await this.render_components();
  }
  render_template(view_data = null) {
    if (!this.template) throw new Error(`Settings template not found.`);
    this.container.empty();
    this.container.innerHTML = this.ejs.render(this.template, view_data || this.view_data, { context: this });
  }
  async update(setting, value) {
    let settings = { ...this.settings };
    if (setting.includes(".")) {
      let parts = setting.split(".");
      let obj = settings;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = typeof value === "string" ? value.trim() : value;
    } else {
      settings[setting] = typeof value === "string" ? value.trim() : value;
    }
    await this.env.smart_settings.save(settings);
  }
  async render_components() {
    if (!this.main.obsidian.Setting) console.warn("missing Obsidian Setting component");
    this.container.querySelectorAll(".setting-component").forEach(async (elm) => {
      const setting_elm = new this.main.obsidian.Setting(elm);
      if (elm.dataset.name) setting_elm.setName(elm.dataset.name);
      if (elm.dataset.description) setting_elm.descEl.innerHTML = elm.dataset.description;
      const setting = elm.dataset.setting;
      if (elm.dataset.type === "text") {
        setting_elm.addText((text) => {
          text.setPlaceholder(elm.dataset.placeholder || "");
          text.setValue(this.get_setting(setting));
          let debounceTimer;
          if (elm.dataset.button) {
            setting_elm.addButton((button) => {
              button.setButtonText(elm.dataset.button);
              button.onClick(async () => this.handle_on_change(setting, text.getValue(), elm));
            });
          } else {
            text.onChange(async (value) => {
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(() => this.handle_on_change(setting, value, elm), 2e3);
            });
          }
        });
      } else if (elm.dataset.type === "password") {
        setting_elm.addText((text) => {
          text.inputEl.type = "password";
          text.setPlaceholder(elm.dataset.placeholder || "");
          const setting_value = this.get_setting(setting);
          if (setting_value) text.setValue(setting_value);
          text.onChange(async (value) => this.handle_on_change(setting, value, elm));
        });
      } else if (elm.dataset.type === "number") {
        setting_elm.addText((number) => {
          number.inputEl.type = "number";
          number.setPlaceholder(elm.dataset.placeholder || "");
          number.inputEl.value = parseInt(this.get_setting(setting));
          number.inputEl.min = elm.dataset.min || 0;
          if (elm.dataset.max) number.inputEl.max = elm.dataset.max;
          let debounceTimer;
          number.onChange(async (value) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.handle_on_change(setting, parseInt(value), elm), 2e3);
          });
        });
      } else if (elm.dataset.type === "dropdown") {
        const setting_value = this.get_setting(setting) || elm.dataset.value;
        let options;
        if (elm.dataset.optionsCallback) {
          if (typeof this[elm.dataset.optionsCallback] !== "function") {
            console.error(`Options callback ${elm.dataset.optionsCallback} is not a function.`);
            options = [];
          } else {
            options = await this[elm.dataset.optionsCallback]();
          }
        } else {
          options = Object.entries(elm.dataset).filter(([k, v]) => k.startsWith("option")).map(([k, v]) => {
            const [value, name] = v.split("|");
            return { value, name: name || value };
          });
        }
        setting_elm.addDropdown((dropdown) => {
          options.forEach((option) => dropdown.addOption(option.value, option.name));
          dropdown.onChange(async (value) => this.handle_on_change(setting, value, elm));
          dropdown.setValue(setting_value);
        });
      } else if (elm.dataset.type === "button") {
        setting_elm.addButton((button) => {
          button.setButtonText(elm.dataset.btnText || elm.dataset.name);
          button.onClick(async () => {
            if (elm.dataset.confirm) {
              const confirmation_message = elm.dataset.confirm;
              if (!confirm(confirmation_message)) return;
            }
            if (elm.dataset.href) window.open(elm.dataset.href);
            if (elm.dataset.callback) this[elm.dataset.callback](setting, null, elm);
          });
        });
      } else if (elm.dataset.type === "toggle") {
        setting_elm.addToggle((toggle) => {
          toggle.setValue(this.get_setting(setting));
          toggle.onChange(async (value) => this.handle_on_change(setting, value, elm));
        });
      } else if (elm.dataset.type === "textarea") {
        setting_elm.addTextArea((textarea) => {
          textarea.setValue(this.get_setting(setting));
          textarea.onChange(async (value) => this.handle_on_change(setting, value, elm));
          if (elm.dataset.maxLength) textarea.inputEl.maxLength = elm.dataset.maxLength;
        });
      }
      if (elm.dataset.disabled) setting_elm.setDisabled(true);
    });
  }
  async handle_on_change(setting, value, elm) {
    await this.update(setting, value);
    if (elm.dataset.callback) this[elm.dataset.callback](setting, value, elm);
  }
  get_setting(setting) {
    if (setting.includes(".")) {
      let parts = setting.split(".");
      let obj = this.settings;
      for (let part of parts.slice(0, -1)) {
        if (obj[part] === void 0) return this.plugin.constructor.defaults[setting];
        obj = obj[part];
      }
      return obj[parts[parts.length - 1]] ?? this.plugin.constructor.defaults[setting];
    } else {
      return this.settings[setting] ?? this.plugin.constructor.defaults[setting];
    }
  }
  // override in subclass (required)
  get template() {
    return "";
  }
  // ejs template string
  get view_data() {
    return {};
  }
  // object properties available in template
};

// src/chat/smart_chat_settings.js
var SmartChatSettings = class extends SmartSettings2 {
  get settings() {
    return this.main.settings;
  }
  set settings(settings) {
    this.main.settings = settings;
  }
  update_smart_chat_folder() {
    this.plugin.update_smart_chat_folder();
  }
  async changed_smart_chat_model(render13 = true) {
    this.env.chat_model = null;
    this.env.smart_connections_plugin.init_chat_model(this.settings.chat_model_platform_key);
    const platform_config = this.env.chat_model.platforms[this.settings.chat_model_platform_key];
    let smart_chat_model_config = this.settings[this.settings.chat_model_platform_key] || {};
    if (smart_chat_model_config.model_name) {
      const platform_models = await this.env.chat_model.get_models();
      const model_config = platform_models.find((m) => m.model_name === smart_chat_model_config.model_name);
      smart_chat_model_config = {
        ...smart_chat_model_config || {},
        ...platform_config || {},
        ...model_config || {}
      };
      this.settings[this.settings.chat_model_platform_key] = smart_chat_model_config;
    }
    if (render13) this.render();
  }
  async test_chat_api_key() {
    await this.changed_smart_chat_model();
    const resp = await this.env.chat_model.test_api_key();
    if (resp) return this.plugin.notices.show("api key test pass", "Success! API key is valid");
    this.plugin.notices.show("api key test fail", "Error: API key is invalid!");
  }
  get self_ref_list() {
    return "Current: " + ScTranslations_default[this.settings.language].pronouns.join(", ");
  }
  get template() {
    return this.templates["smart_chat_settings"];
  }
  async get_view_data() {
    const view_data = {
      settings: this.settings,
      chat_platform: this.env.chat_model?.platforms[this.settings.chat_model_platform_key],
      chat_platforms: this.env.chat_model?.platforms ? Object.keys(this.env.chat_model.platforms).map((platform_key) => ({ key: platform_key, ...this.env.chat_model?.platforms[platform_key] || {} })) : []
    };
    view_data.platform_chat_models = await this.env.chat_model?.get_models();
    view_data.smart_chat_settings = this.ejs.render(this.template, view_data);
    return view_data;
  }
  async update(setting, value) {
    let settings = { ...this.settings };
    if (setting.includes(".")) {
      let parts = setting.split(".");
      let obj = settings;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = typeof value === "string" ? value.trim() : value;
    } else {
      settings[setting] = typeof value === "string" ? value.trim() : value;
    }
    this.settings = settings;
    await this.main.save_settings();
  }
  update_language(setting, value, elm) {
    const self_ref_pronouns_list = this.container.querySelector("#self-referential-pronouns");
    self_ref_pronouns_list?.setText(this.self_ref_list);
  }
};

// src/on_open_overlay.js
function on_open_overlay(container) {
  container.style.transition = "background-color 0.5s ease-in-out";
  container.style.backgroundColor = "var(--bold-color)";
  setTimeout(() => {
    container.style.backgroundColor = "";
  }, 500);
}

// src/chat/sc_chats_ui.js
var ScChatsUI = class extends import_smart_chats_ui.SmartChatsUI {
  constructor(env, container) {
    super(env, container);
    this.plugin = this.env.smart_connections_plugin;
  }
  get view_context() {
    return {
      attribution: this.templates.attribution,
      get_icon: this.plugin.chat_view.get_icon.bind(this.plugin.chat_view)
    };
  }
  get obsidian() {
    return this.plugin.obsidian;
  }
  show_notice(message) {
    this.plugin.show_notice(message);
  }
  get overlay_container() {
    return this.container.querySelector(".sc-overlay");
  }
  add_listeners() {
    const chat_name_input = this.container.querySelector(".sc-chat-name-input");
    chat_name_input.addEventListener("change", (event) => {
      this.env.chats.current.rename(event.target.value);
    });
    const open_in_note_btn = this.container.querySelector("button[title='Open Conversation Note']");
    open_in_note_btn.addEventListener("click", () => {
      const link_path = this.env.chats.current.file_path;
      const link_tfile = this.plugin.app.metadataCache.getFirstLinkpathDest(link_path, "/");
      let leaf = this.plugin.app.workspace.getLeaf(true);
      leaf.openFile(link_tfile);
    });
    const settings_btn = this.container.querySelector("button[title='Chat Settings']");
    settings_btn.addEventListener("click", async () => {
      if (this.overlay_container.innerHTML) return this.overlay_container.innerHTML = "";
      if (!this.chat_settings) this.chat_settings = new SmartChatSettings(this.env, this.overlay_container);
      else this.chat_settings.container = this.overlay_container;
      this.chat_settings.render();
      this.on_open_overlay();
      setTimeout(() => {
        this.chat_settings.update_language();
      }, 700);
    });
    const history_btn = this.container.querySelector("button[title='Chat History']");
    history_btn.addEventListener("click", () => {
      this.env.chats.open_modal();
    });
    const new_chat_btn = this.container.querySelector("button[title='New Chat']");
    new_chat_btn.addEventListener("click", () => {
      this.env.chats.new();
    });
    this.add_chat_input_listeners();
  }
  on_open_overlay() {
    on_open_overlay(this.overlay_container);
  }
  async message_post_process(msg_elm) {
    await this.render_md_as_html(msg_elm);
    this.handle_links_in_message(msg_elm);
    this.add_message_listeners(msg_elm);
  }
  async render_md_as_html(msg_elm) {
    const text_elm = msg_elm.querySelector("span:not(.sc-msg-button)");
    const text = msg_elm.getAttribute("data-content") || text_elm.textContent;
    text_elm.innerHTML = "";
    await this.obsidian.MarkdownRenderer.render(this.plugin.app, text, text_elm, "?no-dataview", new this.obsidian.Component());
  }
  handle_links_in_message(msg_elm) {
    const links = msg_elm.querySelectorAll("a");
    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const link_text = link.getAttribute("data-href");
        link.addEventListener("mouseover", (event) => {
          this.plugin.app.workspace.trigger("hover-link", {
            event,
            source: ScChatView.view_type,
            hoverParent: link.parentElement,
            targetEl: link,
            // extract link text from a.data-href
            linktext: link_text
          });
        });
        link.addEventListener("click", (event) => {
          const link_tfile = this.plugin.app.metadataCache.getFirstLinkpathDest(link_text, "/");
          const mod = this.obsidian.Keymap.isModEvent(event);
          let leaf = this.plugin.app.workspace.getLeaf(mod);
          leaf.openFile(link_tfile);
        });
      }
    }
  }
  add_message_listeners(msg_elm) {
    const copy_button = msg_elm.querySelector("span.sc-msg-button[title='Copy message to clipboard']");
    copy_button?.addEventListener("click", (e) => {
      console.log("copy message to clipboard");
      const msg_content_elm = e.target.closest(".sc-message-content");
      const msg_content = msg_content_elm.getAttribute("data-content") || msg_content_elm.querySelector("span:not(.sc-msg-button)").textContent;
      navigator.clipboard.writeText(msg_content);
      this.plugin.show_notice("Message copied to clipboard");
    });
  }
  // open file suggestion modal
  open_file_suggestion_modal() {
    if (!this.file_selector) this.file_selector = new ScFileSelectModal(this.plugin.app, this.env);
    this.file_selector.open();
  }
  // open folder suggestion modal
  async open_folder_suggestion_modal() {
    if (!this.folder_selector) {
      const folders = await this.plugin.get_folders();
      this.folder_selector = new ScFolderSelectModal(this.plugin.app, this.env, folders);
    }
    this.folder_selector.open();
  }
  async open_system_prompt_modal() {
    if (!this.system_prompt_selector) this.system_prompt_selector = new ScSystemPromptSelectModal(this.plugin.app, this.env);
    this.system_prompt_selector.open();
  }
  add_chat_input_listeners() {
    super.add_chat_input_listeners();
    const chat_input = this.container.querySelector(".sc-chat-form");
    this.brackets_ct = 0;
    this.prevent_input = false;
    chat_input.addEventListener("keyup", this.key_up_handler.bind(this));
  }
  key_down_handler(e) {
    const mod = this.obsidian.Keymap.isModEvent(e);
    if (e.key === "Enter" && mod) {
      e.preventDefault();
      return this.handle_send();
    }
    if (!["/", "@", "["].includes(e.key)) return;
    const textarea = this.container.querySelector(".sc-chat-form textarea");
    const pos = textarea.selectionStart;
    if (e.key === "[") {
      if (textarea.value[pos - 1] === "[") {
        setTimeout(() => {
          this.open_file_suggestion_modal();
        }, 10);
        return;
      }
    } else {
      this.brackets_ct = 0;
    }
    if (e.key === "/") {
      if (textarea.value.length === 0 || [" ", "\n"].includes(textarea.value[pos - 1])) {
        setTimeout(() => {
          this.open_folder_suggestion_modal();
        }, 10);
        return;
      }
    }
    if (e.key === "@") {
      if (textarea.value.length === 0 || [" ", "\n"].includes(textarea.value[pos - 1])) {
        setTimeout(() => {
          this.open_system_prompt_modal();
        }, 10);
        return;
      }
    }
  }
  handle_send() {
    const chat_input = this.container.querySelector(".sc-chat-form");
    const textarea = chat_input.querySelector("textarea");
    if (this.prevent_input) {
      this.show_notice("Wait until current response is finished.");
      return;
    }
    let user_input = textarea.value;
    if (!user_input.trim()) return this.plugin.notices.show("empty chat input", "Chat input is empty.");
    textarea.value = "";
    this.env.chats.current.new_user_message(user_input);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
  key_up_handler(e) {
    this.resize_chat_input();
  }
  resize_chat_input() {
    clearTimeout(this.resize_debounce);
    this.resize_debounce = setTimeout(() => {
      const textarea = this.container.querySelector(".sc-chat-form textarea");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, 200);
  }
};
var ScFileSelectModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, env) {
    super(app);
    this.app = app;
    this.env = env;
    this.setPlaceholder("Type the name of a file...");
  }
  // get all markdown files
  getItems() {
    return this.app.vault.getMarkdownFiles().sort((a, b) => a.basename.localeCompare(b.basename));
  }
  getItemText(item) {
    return item.basename;
  }
  onChooseItem(file) {
    this.env.chat_ui.insert_selection(file.basename + "]] ");
  }
};
var ScFolderSelectModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, env, folders) {
    super(app);
    this.app = app;
    this.env = env;
    this.folders = folders;
    this.setPlaceholder("Type the name of a folder...");
  }
  getItems() {
    return this.folders;
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(folder) {
    this.env.chat_ui.insert_selection(folder + "/ ");
  }
};
var ScSystemPromptSelectModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, env) {
    super(app);
    this.app = app;
    this.env = env;
    this.setPlaceholder("Type the name of a system prompt...");
  }
  getItems() {
    return this.env.smart_connections_plugin.system_prompts;
  }
  getItemText(item) {
    return item.basename;
  }
  onChooseItem(prompt) {
    this.env.chat_ui.insert_selection('"' + prompt.basename + '"');
  }
};

// src/chat/sc_chats.js
var import_smart_chats = __toESM(require_smart_chats(), 1);

// src/chat/sc_chat.js
var import_smart_chat = __toESM(require_smart_chat(), 1);

// src/chat/extract_folder_references.js
function extract_folder_references(folders, user_input) {
  folders = folders.slice();
  const matches = folders.sort((a, b) => b.length - a.length).map((folder) => {
    if (user_input.indexOf(folder) !== -1) {
      user_input = user_input.replace(folder, "");
      return folder;
    }
    return false;
  }).filter((folder) => folder);
  if (matches) return matches;
  return false;
}

// src/chat/contains_internal_link.js
function contains_internal_link(user_input) {
  if (user_input.indexOf("[[") === -1) return false;
  if (user_input.indexOf("]]") === -1) return false;
  return true;
}

// src/chat/contains_folder_reference.js
function contains_folder_reference(user_input) {
  const first_slash = user_input.indexOf("/");
  if (first_slash === -1) return false;
  const last_slash = user_input.lastIndexOf("/");
  if (last_slash - first_slash <= 1) return false;
  const first_open_parentheses = user_input.indexOf("(");
  const first_close_parentheses = user_input.indexOf(")");
  if (first_open_parentheses > first_slash && first_close_parentheses < last_slash) return true;
  if (first_open_parentheses !== -1 && first_close_parentheses !== -1) {
    const start = user_input.indexOf("(");
    const end = user_input.indexOf(")");
    const without_content_in_parentheses = user_input.slice(0, start) + user_input.slice(end + 1);
    if (without_content_in_parentheses.indexOf("/") !== -1) return false;
    if (without_content_in_parentheses.indexOf("/") === without_content_in_parentheses.lastIndexOf("/")) return false;
  }
  return true;
}

// src/chat/extract_internal_links.js
function extract_internal_links(env, user_input) {
  const matches = user_input.match(/\[\[(.*?)\]\]/g);
  if (matches && env.smart_connections_plugin) return matches.map((match) => {
    const tfile = env.smart_connections_plugin.app.metadataCache.getFirstLinkpathDest(match.replace("[[", "").replace("]]", ""), "/");
    return tfile;
  });
  if (matches) return matches;
  return [];
}

// src/chat/contains_system_prompt_ref.js
function contains_system_prompt_ref(content) {
  return content.includes('@"');
}
function extract_system_prompt_ref(content) {
  const mention_pattern = /@\"([^"]+)\"/;
  const mention = content.match(mention_pattern)[1];
  return { mention, mention_pattern };
}

// src/chat/sc_chat.js
var ScChat = class extends import_smart_chat.SmartChat {
  async new_user_message(content) {
    const og_content = content;
    try {
      await super.new_user_message(content);
    } catch (e) {
      this.env.smart_connections_plugin.notices.show(e.message, e.message);
      console.warn(e);
      this.env.chat_ui.undo_last_message();
      this.env.chat_ui.set_chat_input_text(og_content);
    }
  }
  /**
   * Parses a user message to handle special syntax like mentions and converts them into system messages.
   * @param {string} content - The user message content.
   * @returns {Promise<string>} The processed content with mentions handled.
   */
  async parse_user_message(content) {
    this.env.chats.current.scope = {};
    if (contains_system_prompt_ref(content)) {
      const { mention, mention_pattern } = extract_system_prompt_ref(content);
      const sys_msg = {
        role: "system",
        content: "```sc-system\n" + mention + "\n```"
      };
      await this.add_message(sys_msg);
      const sys_msg_html = await this.env.chat_ui.get_system_message_html(sys_msg);
      await this.env.chat_ui.message_container.insertAdjacentHTML("beforeend", sys_msg_html);
      content = content.replace(mention_pattern, "").trim();
    }
    if (contains_internal_link(content)) {
      const notes = extract_internal_links(this.env, content);
      if (notes.length) {
        const context = "```sc-context\n" + notes.map((n) => `${n.path}`).join("\n") + "\n```";
        const context_msg = { role: "system", content: context };
        await this.add_message(context_msg);
        const context_msg_html = await this.env.chat_ui.get_system_message_html(context_msg);
        await this.env.chat_ui.message_container.insertAdjacentHTML("beforeend", context_msg_html);
      }
    }
    if (contains_folder_reference(content)) {
      const folders = await this.env.smart_connections_plugin.get_folders();
      const folder_refs = extract_folder_references(folders, content);
      if (folder_refs) this.env.chats.current.scope.key_starts_with_any = folder_refs;
    }
    return content;
  }
  async add_tool_output(tool_name, tool_output) {
    await super.add_tool_output(tool_name, tool_output);
    await this.env.chat_ui.init();
    await this.env.chat_ui.render_dotdotdot();
  }
};

// src/chat/sc_chats.js
var import_obsidian13 = require("obsidian");
var ScChats = class extends import_smart_chats.SmartChats {
  constructor(env, opts = {}) {
    super(env, opts);
    this.plugin = this.env.smart_connections_plugin;
    this.folder = this.env.settings?.smart_chats?.fs_path || this.plugin.settings.smart_chat_folder || this.folder;
    this.chat_class = ScChat;
  }
  async new_user_message(message) {
    if (this.env.settings.chat_model_platform_key === "open_router" && !this.env.settings.open_router?.api_key) {
      const free_chat_uses = this.plugin.settings.free_chat_uses ? this.plugin.settings.free_chat_uses + 1 : 1;
      this.plugin.settings.free_chat_uses = free_chat_uses;
      await this.plugin.save_settings();
      if (free_chat_uses > 20) throw new Error("You have used up your free chat limit! Please add your own API key in the Smart Chat settings to enable unlimited personal usage and prevent exhausting the shared community account limit.");
      else if (free_chat_uses > 2) {
        this.plugin.notices.show("shared usage", "Your chats are currently using a community account with very limited usage. Please add your own API key in the Smart Chat settings to enable unlimited personal usage and prevent exhausting the shared account limit.", { immutable: true, timeout: 2e4 });
      }
    }
    return message;
  }
  // platform specific overrides
  open(key) {
    this.current = this.items[key];
    this.env.chat_ui.init();
  }
  async read(path) {
    return await this.plugin.app.vault.adapter.read(path);
  }
  normalize_path(path) {
    return this.plugin.obsidian.normalizePath(path);
  }
  async save(path, file_content) {
    await this.plugin.app.vault.adapter.write(this.normalize_path(path), file_content);
  }
  async delete(path) {
    await this.plugin.app.vault.adapter.remove(path);
  }
  async exists(path) {
    return await this.plugin.app.vault.adapter.exists(path);
  }
  async create_folder(path) {
    return await this.plugin.app.vault.adapter.mkdir(path);
  }
  async list(path) {
    return await this.plugin.app.vault.adapter.list(path);
  }
  // CUSTOM
  open_modal() {
    if (!this.modal) this.modal = new ScChatHistoryModal(this.plugin.app, this.env);
    this.modal.open();
  }
};
var ScChatHistoryModal = class extends import_obsidian13.FuzzySuggestModal {
  constructor(app, env) {
    super(app);
    this.app = app;
    this.env = env;
    this.setPlaceholder("Type the name of a chat session...");
  }
  // getItems() { return (this.view.files) ? this.view.files : []; }
  // sort alphabetically & then by startsWith UNITITLED
  getItems() {
    return Object.keys(this.env.chats.items).sort((a, b) => a.localeCompare(b)).sort((a, b) => b.startsWith("UNTITLED") ? -1 : 1);
  }
  // if not UNTITLED, remove date after last em dash
  getItemText(item) {
    return item.indexOf("UNTITLED") === -1 ? item.replace(/—[^—]*$/, "") : item;
  }
  // onChooseItem(session) { this.view.open_chat(session); }
  onChooseItem(conversation_id) {
    this.env.chats.open(conversation_id);
  }
};

// build/actions_openapi.json
var actions_openapi_default = {
  openapi: "3.0.0",
  paths: {
    "/lookup": {
      post: {
        operationId: "lookup",
        summary: "Semantic search",
        description: "Performs a semantic search of the user's data. Required: hypothetical_1 and hypothetical_2. Optional: hypothetical_3.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  hypothetical_1: {
                    type: "string",
                    description: "Short hypothetical notes predicted to be semantically similar to the notes necessary to fulfill the user's request. At least three hypotheticals per request. The hypothetical notes may contain paragraphs, lists, or checklists in markdown format. Hypothetical notes always begin with breadcrumbs containing the anticipated folder(s), file name, and relevant headings separated by ' > ' (no slashes). Format: PARENT FOLDER NAME > CHILD FOLDER NAME > FILE NAME > HEADING 1 > HEADING 2 > HEADING 3: HYPOTHETICAL NOTE CONTENTS."
                  },
                  hypothetical_2: {
                    type: "string",
                    description: "Must be distinct from and not share any breadcrumbs with hypothetical_1."
                  },
                  hypothetical_3: {
                    type: "string",
                    description: "Must be distinct from hypothetical_1 and hypothetical_2."
                  }
                },
                required: [
                  "hypothetical_1",
                  "hypothetical_2"
                ]
              }
            }
          }
        }
      }
    }
  },
  components: {},
  tags: []
};

// src/actions/_actions.js
var actions_exports = {};
__export(actions_exports, {
  lookup: () => lookup
});

// src/actions/lookup.js
async function lookup(env, params = {}) {
  const { hypotheticals = [], hypothetical_1, hypothetical_2, hypothetical_3, ...other_params } = params;
  if (hypothetical_1) hypotheticals.push(hypothetical_1);
  if (hypothetical_2) hypotheticals.push(hypothetical_2);
  if (hypothetical_3) hypotheticals.push(hypothetical_3);
  if (!hypotheticals) return { error: "hypotheticals is required" };
  const collection = env.smart_blocks?.smart_embed ? env.smart_blocks : env.smart_sources;
  return await collection.lookup({ ...other_params || {}, hypotheticals });
}

// src/json_ref_resolve.js
function json_ref_resolve(schema, rootSchema = null) {
  rootSchema = rootSchema || schema;
  if (typeof schema === "object" && !Array.isArray(schema) && schema !== null) {
    if (schema.hasOwnProperty("$ref")) {
      const refPath = schema["$ref"];
      try {
        const resolvedSchema = get_schema_by_path(rootSchema, refPath);
        return json_ref_resolve(resolvedSchema, rootSchema);
      } catch (e) {
        console.log(`Error resolving ref: ${refPath}`, e);
        return schema;
      }
    } else {
      Object.keys(schema).forEach((key) => {
        schema[key] = json_ref_resolve(schema[key], rootSchema);
      });
    }
  }
  return schema;
}
function get_schema_by_path(rootSchema, path) {
  const parts = path.split("/").slice(1);
  let currentSchema = rootSchema;
  for (let part of parts) {
    currentSchema = currentSchema[part];
    if (!currentSchema) {
      throw new Error(`Reference not found: ${path}`);
    }
  }
  return currentSchema;
}

// src/chat/contains_self_referential_keywords.js
async function contains_self_referential_keywords(env, user_input, language) {
  const language_settings = ScTranslations_default[language];
  if (!language_settings) return false;
  let check_str = `${user_input}`;
  if (contains_internal_link(check_str)) {
    const extracted_links = extract_internal_links({}, check_str);
    for (const link of extracted_links) {
      check_str = check_str.replace(link, "");
    }
  }
  if (contains_folder_reference(check_str)) {
    const folders = await env.smart_connections_plugin.get_folders();
    const extracted_folder_references = extract_folder_references(folders, check_str);
    for (const folder_reference of extracted_folder_references) {
      check_str = check_str.replace(folder_reference, "");
    }
  }
  if (contains_system_prompt_ref(check_str)) {
    const { mention, mention_pattern } = extract_system_prompt_ref(check_str);
    check_str = check_str.replace(mention_pattern, "");
  }
  if (check_str.match(new RegExp(`\\b(${language_settings.pronouns.join("|")})\\b`, "gi"))) return true;
  return false;
}

// src/sc_actions.js
var ScActions = class {
  constructor(env, opts = {}) {
    this.env = env;
    this.plugin = this.env.smart_connections_plugin;
    this.app = this.plugin.app;
    this.config = this.plugin.settings;
    this.actions = {};
  }
  init() {
    this.parse_actions_from_openapi(actions_openapi_default);
  }
  prepare_request_body(body) {
    if (this.env.chats?.current?.tool_choice) {
      const tool_choice = this.env.chats.current.tool_choice;
      if (body.tool_choice !== "auto") {
        const tool_json = this.actions[tool_choice]?.json;
        if (tool_json) {
          body.tool_choice = {
            type: "function",
            function: { name: tool_choice }
          };
          body.tools = [tool_json];
        }
      } else {
        body.tool_choice = "auto";
        body.tools = this.env.actions.actions.map((t) => t.json);
      }
    }
    return body;
  }
  // v2.1
  // DO: decided: rename to parse_user_message?
  async new_user_message(user_input) {
    if (Array.isArray(user_input)) {
      for (let i = 0; i < user_input.length; i++) {
        if (user_input[i].type === "text") {
          await this.new_user_message(user_input[i].text);
        }
      }
      return;
    }
    const should_trigger_lookup = await this.should_trigger_retrieval(user_input);
    if (should_trigger_lookup) {
      console.log("should trigger retrieval");
      if (this.actions.lookup && this.env.chat_model.config.actions) {
        this.env.chats.current.tool_choice = "lookup";
      } else {
        await this.get_context_hyde(user_input);
      }
    }
  }
  async should_trigger_retrieval(user_input) {
    if (await contains_self_referential_keywords(this.env, user_input, this.config.language)) return true;
    if (this.env.chats.current.scope.key_starts_with_any) return true;
    return false;
  }
  // BACKWARD COMPATIBILITY for non-function-calling models (DEPRECATED)
  async get_context_hyde(user_input) {
    console.log("get_context_hyde");
    const hyd_input = `Anticipate what the user is seeking. Respond in the form of a hypothetical note written by the user. The note may contain statements as paragraphs, lists, or checklists in markdown format with no headings. Please respond with one hypothetical note and abstain from any other commentary. Use the format: PARENT FOLDER NAME > CHILD FOLDER NAME > FILE NAME > HEADING 1 > HEADING 2 > HEADING 3: HYPOTHETICAL NOTE CONTENTS.`;
    const chatml = [
      { role: "system", content: hyd_input },
      { role: "user", content: user_input }
    ];
    const hyd = await this.env.chat_model.complete(
      {
        messages: chatml,
        stream: false,
        temperature: 0,
        max_tokens: 420
        // n: 3, // DO: multiple completions (unavailable in Anthropic Claude)
      },
      false
      // skip render
    );
    this.env.chats.current.add_message({
      role: "assistant",
      tool_calls: [{
        function: {
          name: "lookup",
          arguments: JSON.stringify({ hypotheticals: [hyd] })
        }
      }]
    });
    const results = await lookup(this.env, { hypotheticals: [hyd] });
    await this.env.chats.current.add_tool_output("lookup", results);
    return;
  }
  parse_tool_output(tool_name, tool_output) {
    if (tool_name === "lookup") return parse_lookup_tool_output(tool_output);
  }
  parse_actions_from_openapi(openapi_spec) {
    openapi_spec = json_ref_resolve(openapi_spec);
    Object.entries(openapi_spec.paths).flatMap(
      ([path, methods]) => Object.entries(methods).forEach(([method, spec]) => {
        const { operationId, requestBody, description } = spec;
        const server_url = openapi_spec.servers?.[0]?.url;
        this.actions[operationId] = {
          json: {
            type: "function",
            function: {
              name: operationId,
              description,
              parameters: {
                type: "object",
                properties: requestBody?.content["application/json"]?.schema?.properties
              }
            }
          },
          server: server_url,
          handler: this.get_handler(operationId, path, method, server_url),
          enabled: operationId === "lookup" || !!this.actions?.[operationId]
        };
      })
    );
  }
  get_handler(operationId, path, method, server_url) {
    return actions_exports[operationId];
  }
};
function parse_lookup_tool_output(tool_output) {
  let content = "```sc-context\n";
  tool_output.forEach((result, i) => {
    content += `${result.entity.path}
`;
  });
  content += "```";
  return { role: "system", content };
}

// src/sc_app_connector.js
var import_http = __toESM(require("http"), 1);
var import_url = __toESM(require("url"), 1);
var ScAppConnector = class _ScAppConnector {
  constructor(env, port = 37042) {
    this.env = env;
    this.sc_plugin = this.env.smart_connections_plugin;
    this.port = port;
    this.server = null;
    this.dataview_api = null;
    this.check_env_interval = null;
  }
  static async create(env, port) {
    const connector = new _ScAppConnector(env, port);
    env.sc_app_connector = connector;
    await connector.init();
    return connector;
  }
  async init() {
    await this.get_dataview_api();
    await this.create_server();
    console.log(`ScAppConnector initialized on port ${this.port}`);
    this.start_env_check();
  }
  create_server() {
    return new Promise((resolve, reject) => {
      this.server = import_http.default.createServer((req, res) => {
        const parsed_url = import_url.default.parse(req.url, true);
        if (parsed_url.pathname === "/message") {
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", async () => {
              try {
                const data = JSON.parse(body);
                const response = await this.handle_message(data);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(response));
              } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ status: "error", message: error.message }));
              }
            });
          } else if (req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "ok", message: "Obsidian HTTP server is running" }));
          } else {
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end("Method Not Allowed");
          }
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      });
      this.server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          console.log(`Port ${this.port} is already in use. Attempting to retry once.`);
          if (window.sc_app_connector_server) {
            window.sc_app_connector_server.close();
          }
          this.retry_count = (this.retry_count || 0) + 1;
          if (this.retry_count <= 1) {
            this.create_server().then(resolve).catch(reject);
          } else {
            console.error(`Failed to create server after retry. Port ${this.port} is still in use.`);
            reject(new Error(`Unable to start server on port ${this.port} after retry.`));
          }
        } else {
          reject(error);
        }
      });
      this.server.listen(this.port, () => {
        console.log(`Server running at http://localhost:${this.port}/`);
        window.sc_app_connector_server = this.server;
        resolve();
      });
    });
  }
  async get_dataview_api(retries = 0) {
    this.dataview_api = window["DataviewAPI"];
    if (!this.dataview_api) {
      if (retries < 10) {
        await new Promise((resolve) => setTimeout(resolve, retries * 1e3));
        return this.get_dataview_api(retries + 1);
      } else {
        console.log("Dataview API not found. No dataview connection for Smart Connect.");
      }
    }
  }
  async handle_message(data) {
    if (data.fx === "full_render") {
      const rendered = await this.full_render(data.markdown, data.rel_path);
      return { status: "ok", rendered };
    }
    if (data.fx === "current_note") {
      return await this.current_note();
    }
    if (data.fx === "current_notes") {
      return await this.current_notes();
    }
    try {
      const resp = await this.dataview_api.queryMarkdown(data.query, data.rel_path, null);
      return resp;
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async current_note() {
    const curr_file = this.sc_plugin.app.workspace.getActiveFile();
    if (!curr_file) return { path: null, content: null };
    let content = await this.sc_plugin.read_file(curr_file);
    return {
      path: curr_file.path,
      content
    };
  }
  async current_notes() {
    const cfiles = [];
    await this.sc_plugin.app.workspace.iterateRootLeaves((leave) => {
      cfiles.push(leave.view.file.path);
    });
    return cfiles;
  }
  async full_render(markdown, rel_path2) {
    const html_elm = document.createElement("div");
    const { MarkdownRenderer: MarkdownRenderer3, htmlToMarkdown, Component: Component2 } = this.sc_plugin.obsidian;
    await MarkdownRenderer3.render(this.sc_plugin.app, markdown, html_elm, rel_path2, new Component2());
    let html = html_elm.innerHTML;
    await new Promise((resolve) => setTimeout(resolve, 200));
    while (html !== html_elm.innerHTML) {
      html = html_elm.innerHTML;
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log("waiting for changes");
    }
    return htmlToMarkdown(html_elm.innerHTML);
  }
  close_server() {
    if (this.server) {
      this.server.close(() => {
        console.log("Server closed");
      });
    }
    if (window.sc_app_connector_server) {
      window.sc_app_connector_server.close(() => {
        console.log("Window server reference closed");
      });
      delete window.sc_app_connector_server;
    }
    if (this.check_env_interval) {
      clearInterval(this.check_env_interval);
    }
  }
  start_env_check() {
    this.check_env_interval = setInterval(() => {
      if (!this.env) {
        console.log("Environment no longer available. Closing server.");
        this.close_server();
      }
    }, 5e3);
  }
};

// src/index.js
var {
  addIcon,
  Keymap: Keymap2,
  MarkdownRenderer: MarkdownRenderer2,
  Notice: Notice2,
  Plugin,
  request,
  requestUrl,
  TAbstractFile,
  TFile
} = import_obsidian14.default;
var SmartConnectionsPlugin = class extends Plugin {
  static get defaults() {
    return default_settings();
  }
  get item_views() {
    return {
      ScConnectionsView,
      ScSearchView,
      ScChatView,
      SmartChatGPTView,
      SmartPrivateChatView
    };
  }
  // GETTERS for overrides in subclasses without overriding the constructor or init method
  get smart_env_class() {
    return SmartEnv;
  }
  get smart_env_config() {
    const config = {
      ...smart_env_config,
      env_path: "",
      // scope handled by Obsidian FS methods
      // DEPRECATED schema
      smart_env_settings: {
        // careful: overrides saved settings
        is_obsidian_vault: true
        // redundant with default_settings.is_obsidian_vault
      },
      // DEPRECATED usage
      ejs: import_ejs_min4.default,
      templates: views_default,
      request_adapter: this.obsidian.requestUrl,
      // NEEDS BETTER HANDLING
      chat_classes: this.chat_classes
    };
    if (this.obsidian.Platform.isMobile && !this.settings.enable_mobile) config.prevent_load_on_init = true;
    return config;
  }
  get chat_classes() {
    return { ScActions, ScChatsUI, ScChats, ScChatModel };
  }
  get_tfile(file_path) {
    return this.app.vault.getAbstractFileByPath(file_path);
  }
  async read_file(tfile_or_path) {
    const t_file = typeof tfile_or_path === "string" ? this.get_tfile(tfile_or_path) : tfile_or_path;
    if (!(t_file instanceof this.obsidian.TFile)) return null;
    return await this.app.vault.cachedRead(t_file);
  }
  get api() {
    return this._api;
  }
  async onload() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  // initialize when layout is ready
  onunload() {
    console.log("unloading plugin");
    this.env?.unload_main("smart_connections_plugin");
    this.env = null;
    this.notices?.unload();
  }
  async initialize() {
    this.obsidian = import_obsidian14.default;
    await smart_env_config.modules.smart_settings.class.create(this);
    this.notices = new this.smart_env_config.modules.smart_notices.class(this);
    this.smart_connections_view = null;
    this.add_commands();
    this.register_views();
    this.addSettingTab(new ScSettingsTab(this.app, this));
    await this.check_for_updates();
    this._api = new SmartSearch(this);
    (window["SmartSearch"] = this._api) && this.register(() => delete window["SmartSearch"]);
    this.addRibbonIcon("smart-connections", "Open: View Smart Connections", () => {
      this.open_view();
    });
    this.addRibbonIcon("message-square", "Open: Smart Chat Conversation", () => {
      this.open_chat();
    });
    this.register_code_blocks();
    this.new_user();
    console.log("loading env");
    await this.load_env();
    console.log("Smart Connections v2 loaded");
    this.init_chat_model();
    await this.init_chat();
  }
  register_code_blocks() {
    this.register_code_block("smart-connections", "render_code_block");
    this.register_code_block("sc-context", "render_code_block_context");
    this.register_code_block("sc-change", "change_code_block");
    this.register_code_block("smart-change", "change_code_block");
  }
  register_code_block(name, callback_name) {
    try {
      this.registerMarkdownCodeBlockProcessor(name, this[callback_name].bind(this));
    } catch (error) {
      console.warn(`Error registering code block: ${name}`, error);
    }
  }
  async load_env() {
    await this.smart_env_class.create(this, this.smart_env_config);
    console.log("env loaded");
    if (!this.obsidian.Platform.isMobile) ScAppConnector.create(this.env, 37042);
    Object.defineProperty(this.env, "entities_loaded", { get: () => this.env.collections_loaded });
    Object.defineProperty(this.env, "smart_notes", { get: () => this.env.smart_sources });
  }
  async ready_to_load_collections() {
    await new Promise((r) => setTimeout(r, 5e3));
    await this.wait_for_obsidian_sync();
  }
  init_chat_model(chat_model_platform_key = null) {
    let chat_model_config = {};
    chat_model_platform_key = chat_model_platform_key ?? this.settings.chat_model_platform_key;
    if (chat_model_platform_key === "open_router" && !this.settings[chat_model_platform_key]?.api_key) chat_model_config.api_key = "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";
    else chat_model_config = this.settings[chat_model_platform_key] ?? {};
    this.env.chat_model = new this.chat_classes.ScChatModel(this.env, chat_model_platform_key, { ...chat_model_config });
    this.env.chat_model._request_adapter = this.obsidian.requestUrl;
  }
  async init_chat() {
    this.env.actions = new this.chat_classes.ScActions(this.env);
    this.env.actions.init();
    while (!this.chat_view?.containerEl) await new Promise((r) => setTimeout(r, 300));
    this.env.chat_ui = new this.chat_classes.ScChatsUI(this.env, this.chat_view.container);
    this.env.chats = new this.chat_classes.ScChats(this.env);
    await this.env.chats.load_all();
  }
  new_user() {
    if (!this.settings.new_user) return;
    this.settings.new_user = false;
    this.settings.version = this.manifest.version;
    setTimeout(() => {
      this.open_view();
      this.open_chat();
    }, 1e3);
    if (this.app.workspace.rightSplit.collapsed) this.app.workspace.rightSplit.toggle();
    this.add_to_gitignore("\n\n# Ignore Smart Environment folder\n.smart-env");
    this.save_settings();
  }
  register_views() {
    this.obsidian.addIcon("smart-connections", `<path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"/>
    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"/>
    <circle cx="50" cy="20" r="9" fill="currentColor"/>
    <circle cx="80" cy="40" r="9" fill="currentColor"/>
    <circle cx="80" cy="70" r="9" fill="currentColor"/>
    <circle cx="50" cy="100" r="9" fill="currentColor"/>
    <circle cx="30" cy="50" r="9" fill="currentColor"/>`);
    Object.values(this.item_views).forEach((View) => {
      this.registerView(View.view_type, (leaf) => new View(leaf, this));
      this.addCommand({
        id: View.view_type,
        name: "Open: " + View.display_text + " view",
        callback: () => {
          View.open(this.app.workspace);
        }
      });
    });
  }
  async check_for_updates() {
    if (this.settings.version !== this.manifest.version) {
      this.settings.version = this.manifest.version;
      await this.save_settings();
    }
    setTimeout(this.check_for_update.bind(this), 3e3);
    setInterval(this.check_for_update.bind(this), 108e5);
  }
  // check for update
  async check_for_update() {
    try {
      const { json: response } = await requestUrl({
        url: "https://api.github.com/repos/brianpetro/obsidian-smart-connections/releases/latest",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        contentType: "application/json"
      });
      const latest_release = response.tag_name;
      if (latest_release !== this.manifest.version) {
        new Notice2(`[Smart Connections] A new version is available! (v${latest_release})`);
        this.update_available = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async restart_plugin() {
    await this.saveData(this.settings);
    await new Promise((r) => setTimeout(r, 3e3));
    window.restart_plugin = async (id) => {
      await window.app.plugins.disablePlugin(id);
      await window.app.plugins.enablePlugin(id);
    };
    await window.restart_plugin(this.manifest.id);
  }
  add_commands() {
    this.addCommand({
      id: "sc-find-notes",
      name: "Find: Make Smart Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: (editor) => {
        if (editor.getCursor()?.line) {
          const line = editor.getCursor().line;
          const source = this.env.smart_sources.current_note;
          let item = source.get_block_by_line(line);
          if (item?.vec) return this.view.render_view(item);
          else this.view.render_view(source);
        } else this.view.render_view();
      }
    });
    this.addCommand({
      id: "sc-refresh-connections",
      name: "Refresh & Make Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: async (editor) => {
        const curr_file = this.app.workspace.getActiveFile();
        if (!curr_file?.path) return console.warn("No active file", curr_file);
        let source = this.env.smart_sources.get(curr_file.path);
        if (source) {
          source.data = { path: curr_file.path };
          await this.env.data_fs.remove(source.data_path);
        } else {
          this.env.smart_sources.fs.include_file(curr_file.path);
          source = this.env.smart_sources.init_file_path(curr_file.path);
        }
        await source.import();
        await this.env.smart_sources.process_embed_queue();
        setTimeout(() => {
          this.view.render_view();
        }, 1e3);
      }
    });
    this.addCommand({
      id: "smart-connections-view",
      name: "Open: View Smart Connections",
      callback: () => {
        this.open_view();
      }
    });
    this.addCommand({
      id: "smart-connections-chat",
      name: "Open: Smart Chat Conversation",
      callback: () => {
        this.open_chat();
      }
    });
    this.addCommand({
      id: "smart-connections-random",
      name: "Random Note",
      callback: () => {
        const curr_file = this.app.workspace.getActiveFile();
        const entity = this.env.smart_sources.get(curr_file.path);
        const connections = entity.find_connections({
          filter: { limit: 20 }
        });
        const rand = Math.floor(Math.random() * connections.length / 2);
        const rand_entity = connections[rand];
        this.open_note(rand_entity.item.path);
      }
    });
    this.addCommand({
      id: "smart-connections-chatgpt",
      name: "Open: Smart ChatGPT",
      callback: () => {
        this.open_chatgpt();
      }
    });
    this.addCommand({
      id: "smart-connections-private-chat",
      name: "Open: Smart Connections Supporter Private Chat",
      callback: () => {
        this.open_private_chat();
      }
    });
  }
  async make_connections(selected_text = null) {
    if (!this.view) await this.open_view();
    await this.view.render_nearest(selected_text);
  }
  // utils
  async add_to_gitignore(ignore, message = null) {
    if (!await this.app.vault.adapter.exists(".gitignore")) return;
    let gitignore_file = await this.app.vault.adapter.read(".gitignore");
    if (gitignore_file.indexOf(ignore) < 0) {
      await this.app.vault.adapter.append(".gitignore", `

${message ? "# " + message + "\n" : ""}${ignore}`);
      console.log("Added to .gitignore: " + ignore);
    }
  }
  show_notice(message, opts = {}) {
    console.log("old showing notice");
    const notice_id = typeof message === "string" ? message : message[0];
    return this.notices.show(notice_id, message, opts);
  }
  get chat_view() {
    return ScChatView.get_view(this.app.workspace);
  }
  open_chat() {
    ScChatView.open(this.app.workspace);
  }
  get view() {
    return ScConnectionsView.get_view(this.app.workspace);
  }
  open_view(active = true) {
    ScConnectionsView.open(this.app.workspace, active);
  }
  open_search_view() {
    ScSearchView.open(this.app.workspace);
  }
  get search_view() {
    return ScSearchView.get_view(this.app.workspace);
  }
  open_chatgpt() {
    SmartChatGPTView.open(this.app.workspace);
  }
  open_private_chat() {
    SmartPrivateChatView.open(this.app.workspace);
  }
  async open_note(target_path, event = null) {
    await open_note(this, target_path, event);
  }
  // get folders, traverse non-hidden sub-folders
  async get_folders(path = "/") {
    try {
      const folders = (await this.app.vault.adapter.list(path)).folders;
      let folder_list = [];
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].startsWith(".")) continue;
        folder_list.push(folders[i]);
        folder_list = folder_list.concat(await this.get_folders(folders[i] + "/"));
      }
      return folder_list;
    } catch (error) {
      console.warn("Error getting folders", error);
      return [];
    }
  }
  get_link_target_path(link_path, file_path) {
    return this.app.metadataCache.getFirstLinkpathDest(link_path, file_path)?.path;
  }
  // SUPPORTERS
  async render_code_block(contents, container, ctx) {
    let frag;
    if (contents.trim().length) {
      frag = await this.env.opts.components.search.call(
        this.env.smart_view,
        this.env,
        {
          collection_key: "smart_sources",
          // TODO: make it configurable which collection to search
          add_result_listeners: this.add_result_listeners.bind(this),
          attribution: this.attribution,
          search_text: contents
        }
      );
    } else {
      const entity = this.env.smart_sources.get(ctx.sourcePath);
      if (!entity) return container.innerHTML = "Entity not found: " + ctx.sourcePath;
      frag = await this.env.opts.components.connections.call(
        this.env.smart_view,
        entity,
        {
          add_result_listeners: this.add_result_listeners.bind(this),
          attribution: this.attribution,
          refresh_smart_view: () => {
            this.render_code_block(contents, container, ctx);
          },
          open_search_view: this.open_search_view.bind(this)
        }
      );
    }
    container.innerHTML = "";
    container.appendChild(frag);
  }
  async render_code_block_context(results, container, ctx) {
    results = this.get_entities_from_context_codeblock(results);
    container.innerHTML = this.view.render_template("smart_connections", { current_path: "context", results });
    container.querySelectorAll(".search-result").forEach((elm, i) => this.view.add_link_listeners(elm, results[i]));
    container.querySelectorAll(".search-result:not(.sc-collapsed) ul li").forEach(this.view.render_result.bind(this.view));
  }
  get_entities_from_context_codeblock(results) {
    return results.split("\n").map((key) => {
      const entity = key.includes("#") ? this.env.smart_blocks.get(key) : this.env.smart_sources.get(key);
      return entity ? entity : { name: "Not found: " + key };
    });
  }
  // change code block
  async change_code_block(source, el, ctx) {
    const el_class = el.classList[0];
    const codeblock_type = el_class.replace("block-language-", "");
    const renderer = new ScActionsUx(this, el, codeblock_type);
    renderer.change_code_block(source);
  }
  async update_early_access() {
    if (!this.settings.license_key) return this.show_notice("Supporter license key required for early access update");
    const v2 = await this.obsidian.requestUrl({
      url: "https://sync.smartconnections.app/download_v2",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key: this.settings.license_key
      })
    });
    if (v2.status !== 200) return console.error("Error downloading early access update", v2);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/main.js", v2.json.main);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/manifest.json", v2.json.manifest);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/styles.css", v2.json.styles);
    await window.app.plugins.loadManifests();
    await this.restart_plugin();
  }
  get plugin_is_enabled() {
    return this.app?.plugins?.enabledPlugins?.has("smart-connections");
  }
  // WAIT FOR OBSIDIAN SYNC
  async wait_for_obsidian_sync() {
    while (this.obsidian_is_syncing) {
      if (!this.plugin_is_enabled) throw new Error("Smart Connections: plugin disabled while waiting for obsidian sync");
      console.log("Smart Connections: Waiting for Obsidian Sync to finish");
      await new Promise((r) => setTimeout(r, 1e3));
    }
  }
  get obsidian_is_syncing() {
    const obsidian_sync_instance = this.app?.internalPlugins?.plugins?.sync?.instance;
    if (!obsidian_sync_instance) return false;
    if (obsidian_sync_instance?.syncStatus.startsWith("Uploading")) return false;
    if (obsidian_sync_instance?.syncStatus.startsWith("Fully synced")) return false;
    return obsidian_sync_instance?.syncing;
  }
  // main settings
  async load_settings() {
    const settings = default_settings().settings;
    const saved_settings = await this.loadData();
    Object.assign(settings, saved_settings || {});
    return settings;
  }
  async save_settings(settings = this.smart_settings._settings) {
    await this.saveData(settings);
  }
  get system_prompts() {
    const folder = this.env.settings?.smart_chats?.prompts_path || this.settings.system_prompts_folder;
    return this.app.vault.getMarkdownFiles().filter((file) => file.path.includes(folder) || file.path.includes(".prompt") || file.path.includes(".sp"));
  }
  // FROM ScSettings
  async force_refresh() {
    this.env.smart_blocks.clear();
    this.env.smart_sources.clear();
    await this.env.smart_sources.init();
    Object.values(this.env.smart_sources.items).forEach((item) => item.queue_import());
    await this.env.smart_sources.process_import_queue();
  }
  async exclude_all_top_level_folders() {
    const folders = (await this.app.vault.adapter.list("/")).folders;
    const input = document.querySelector("#smart-connections-settings div[data-setting='folder_exclusions'] input");
    input.value = folders.join(", ");
    input.dispatchEvent(new Event("input"));
    this.update_exclusions();
  }
  async update_exclusions() {
    this.env.smart_sources.smart_fs = null;
    console.log("render_file_counts");
    const elm = document.querySelector("#smart-connections-settings #file-counts");
    elm.setText(`Included files: ${this.included_files} / Total files: ${this.total_files}`);
  }
  async toggle_mobile(setting, value, elm) {
    const manifest = JSON.parse(await this.app.vault.adapter.read(".obsidian/plugins/smart-connections/manifest.json"));
    manifest.isDesktopOnly = !value;
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/manifest.json", JSON.stringify(manifest, null, 2));
    console.log("Manifest written");
    this.restart_plugin();
  }
  // // TODO: re-implement in plugin initialization
  // /**
  //  * Loads settings specific to Obsidian for backwards compatibility.
  //  * @returns {Promise<void>} A promise that resolves when Obsidian settings have been loaded.
  //  */
  // async load_obsidian_settings() {
  //   if (this._settings.is_obsidian_vault && this.env.smart_connections_plugin) {
  //     const obsidian_settings = this._settings.smart_connections_plugin;
  //     console.log("obsidian_settings", obsidian_settings, this._settings);
  //     if(obsidian_settings){
  //       this.transform_backwards_compatible_settings(obsidian_settings);
  //       await this.save_settings();
  //       this.env.smart_connections_plugin.save_settings(obsidian_settings);
  //     }
  //   }
  // }
  // /**
  //  * Transforms settings to maintain backwards compatibility with older configurations.
  //  * @param {Object} os - The old settings object to transform.
  //  */
  // transform_backwards_compatible_settings(os) {
  //   // move muted notices to main 2024-09-27
  //   if(this.env._settings.smart_notices){
  //     if(!os.smart_notices) os.smart_notices = {};
  //     os.smart_notices.muted = {...this.env._settings.smart_notices.muted};
  //     delete this.env._settings.smart_notices;
  //   }
  //   // rename to model_key
  //   if(this.env._settings.smart_sources?.embed_model_key){
  //     if(!this.env._settings.smart_sources.embed_model) this.env._settings.smart_sources.embed_model = {};
  //     this.env._settings.smart_sources.embed_model.model_key = this.env._settings.smart_sources.embed_model_key;
  //     delete this.env._settings.smart_sources.embed_model_key;
  //   }
  //   // rename to embed_model
  //   if (os.smart_sources_embed_model) {
  //     if (!this.env._settings.smart_sources) this.env._settings.smart_sources = {};
  //     if (!this.env._settings.smart_sources.embed_model) this.env._settings.smart_sources.embed_model = {};
  //     if (!this.env._settings.smart_sources.embed_model.model_key) this.env._settings.smart_sources.embed_model.model_key = os.smart_sources_embed_model;
  //     if (!this.env._settings.smart_sources.embed_model[os.smart_sources_embed_model]) this.env._settings.smart_sources.embed_model[os.smart_sources_embed_model] = {};
  //     delete os.smart_sources_embed_model;
  //   }
  //   // move from main to embed_model in env
  //   if (os.smart_blocks_embed_model) {
  //     if (!this.env._settings.smart_blocks) this.env._settings.smart_blocks = {};
  //     if (!this.env._settings.smart_blocks.embed_model) this.env._settings.smart_blocks.embed_model = {};
  //     if (!this.env._settings.smart_blocks.embed_model.model_key) this.env._settings.smart_blocks.embed_model.model_key = os.smart_blocks_embed_model;
  //     if (!this.env._settings.smart_blocks.embed_model[os.smart_blocks_embed_model]) this.env._settings.smart_blocks.embed_model[os.smart_blocks_embed_model] = {};
  //     delete os.smart_blocks_embed_model;
  //   }
  //   if (os.api_key) {
  //     Object.entries(this.env._settings.smart_sources?.embed_model || {}).forEach(([key, value]) => {
  //       if (key.startsWith('text')) value.api_key = os.api_key;
  //       if (os.embed_input_min_chars && typeof value === 'object' && !value.min_chars) value.min_chars = os.embed_input_min_chars;
  //     });
  //     Object.entries(this.env._settings.smart_blocks?.embed_model || {}).forEach(([key, value]) => {
  //       if (key.startsWith('text')) value.api_key = os.api_key;
  //       if (os.embed_input_min_chars && typeof value === 'object' && !value.min_chars) value.min_chars = os.embed_input_min_chars;
  //     });
  //     delete os.api_key;
  //     delete os.embed_input_min_chars;
  //   }
  //   if(os.muted_notices) {
  //     if(!this.env._settings.smart_notices) this.env._settings.smart_notices = {};
  //     this.env._settings.smart_notices.muted = {...os.muted_notices};
  //     delete os.muted_notices;
  //   }
  //   if(os.smart_connections_folder){
  //     if(!os.env_data_dir) os.env_data_dir = os.smart_connections_folder;
  //     delete os.smart_connections_folder;
  //   }
  //   if(os.smart_connections_folder_last){
  //     os.env_data_dir_last = os.smart_connections_folder_last;
  //     delete os.smart_connections_folder_last;
  //   }
  //   if(os.file_exclusions){
  //     if(!this.env._settings.file_exclusions || this.env._settings.file_exclusions === 'Untitled') this.env._settings.file_exclusions = os.file_exclusions;
  //     delete os.file_exclusions;
  //   }
  //   if(os.folder_exclusions){
  //     if(!this.env._settings.folder_exclusions || this.env._settings.folder_exclusions === 'smart-chats') this.env._settings.folder_exclusions = os.folder_exclusions;
  //     delete os.folder_exclusions;
  //   }
  //   if(os.system_prompts_folder){
  //     if(!this.env._settings.smart_chats) this.env._settings.smart_chats = {};
  //     if(!this.env._settings.smart_chats?.prompts_path) this.env._settings.smart_chats.prompts_path = os.system_prompts_folder;
  //     delete os.system_prompts_folder;
  //   }
  //   if(os.smart_chat_folder){
  //     if(!this.env._settings.smart_chats) this.env._settings.smart_chats = {};
  //     if(!this.env._settings.smart_chats?.fs_path) this.env._settings.smart_chats.fs_path = os.smart_chat_folder;
  //     delete os.smart_chat_folder;
  //   }
  // }
  remove_setting_elm(path, value, elm) {
    elm.remove();
  }
  // ENTITIES VIEW
  add_result_listeners(elm, source) {
    const toggle_result = async (result) => {
      result.classList.toggle("sc-collapsed");
      if (!result.querySelector("li").innerHTML) {
        const collection_key = result.dataset.collection;
        const entity = this.env[collection_key].get(result.dataset.path);
        await entity.render_item(result.querySelector("li"));
      }
    };
    const handle_result_click = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      const result = target.closest(".search-result");
      if (target.classList.contains("svg-icon")) {
        toggle_result(result);
        return;
      }
      const link = result.dataset.link || result.dataset.path;
      if (result.classList.contains("sc-collapsed")) {
        if (this.obsidian.Keymap.isModEvent(event)) {
          console.log("open_note", link);
          this.open_note(link, event);
        } else {
          toggle_result(result);
        }
      } else {
        console.log("open_note", link);
        this.open_note(link, event);
      }
    };
    elm.addEventListener("click", handle_result_click.bind(this));
    const path = elm.querySelector("li").dataset.key;
    elm.addEventListener("dragstart", (event) => {
      const drag_manager = this.app.dragManager;
      const file_path = path.split("#")[0];
      const file = this.app.metadataCache.getFirstLinkpathDest(file_path, "");
      const drag_data = drag_manager.dragFile(event, file);
      drag_manager.onDragStart(event, drag_data);
    });
    if (path.indexOf("{") === -1) {
      elm.addEventListener("mouseover", (event) => {
        this.app.workspace.trigger("hover-link", {
          event,
          // source: this.constructor.view_type,
          source,
          hoverParent: elm.parentElement,
          targetEl: elm,
          linktext: path
        });
      });
    }
  }
};


/* nosourcemap */