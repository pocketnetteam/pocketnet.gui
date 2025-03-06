/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if(typeof globalThis == 'undefined') globalThis = window

 var runtime = (function (exports) {
    "use strict";
  
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    exports.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
  
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }
  
    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
  
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };
  
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };
  
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
  
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }
  
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
  
        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
  
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
  
      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        context.method = method;
        context.arg = arg;
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
  
          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
  
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
  
            context.dispatchException(context.arg);
  
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;
  
            if (record.arg === ContinueSentinel) {
              continue;
            }
  
            return {
              value: record.arg,
              done: context.done
            };
  
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
  
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;
  
        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);
  
            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }
  
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }
  
        return ContinueSentinel;
      }
  
      var record = tryCatch(method, delegate.iterator, context.arg);
  
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
  
      var info = record.arg;
  
      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
  
      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;
  
        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;
  
        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
  
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }
  
      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    define(Gp, toStringTagSymbol, "Generator");
  
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });
  
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.method = "next";
        this.arg = undefined;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
  
          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }
  
          return !! caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
  
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
  
        return this.complete(record);
      },
  
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
  
        return ContinueSentinel;
      },
  
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }
  
        return ContinueSentinel;
      }
    };
  
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
  
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    typeof module === "object" ? module.exports : {}
  ));
  
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  ///////////////FETCH

  var isIE = !!window.MSInputMethodContext && !!document.documentMode;

    if (isIE) {
       
      // Create Fetch polyfill script tag
        var fetchScript = document.createElement("script");
        fetchScript.type = "text/javascript";
        fetchScript.src =
            "./js/vendor/fetch.js";

      // Add polyfills to head element
        document.head.appendChild(fetchScript);
    }

  //////////////PROMISE


  !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}function t(e){return new this(function(t,n){function o(e,n){if(n&&("object"==typeof n||"function"==typeof n)){var f=n.then;if("function"==typeof f)return void f.call(n,function(t){o(e,t)},function(n){r[e]={status:"rejected",reason:n},0==--i&&t(r)})}r[e]={status:"fulfilled",value:n},0==--i&&t(r)}if(!e||"undefined"==typeof e.length)return n(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})}function n(e){return!(!e||"undefined"==typeof e.length)}function o(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],l(e,this)}function i(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(r){return void u(t.promise,r)}f(t.promise,o)}else(1===e._state?f:u)(t.promise,e._value)})):e._deferreds.push(t)}function f(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void l(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(o){u(e,o)}}function u(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)i(e,e._deferreds[t]);e._deferreds=null}function l(e,t){var n=!1;try{e(function(e){n||(n=!0,f(t,e))},function(e){n||(n=!0,u(t,e))})}catch(o){if(n)return;n=!0,u(t,o)}}var a=setTimeout;r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(o);return i(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},r.prototype["finally"]=e,r.all=function(e){return new r(function(t,o){function r(e,n){try{if(n&&("object"==typeof n||"function"==typeof n)){var u=n.then;if("function"==typeof u)return void u.call(n,function(t){r(e,t)},o)}i[e]=n,0==--f&&t(i)}catch(c){o(c)}}if(!n(e))return o(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},r.allSettled=t,r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,o){if(!n(e))return o(new TypeError("Promise.race accepts an array"));for(var i=0,f=e.length;f>i;i++)r.resolve(e[i]).then(t,o)})},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},r._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var s=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"function"!=typeof s.Promise?s.Promise=r:(s.Promise.prototype["finally"]||(s.Promise.prototype["finally"]=e),s.Promise.allSettled||(s.Promise.allSettled=t))});


  /////ARRAYS

  _pffill = {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var finalValue = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < finalValue) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  }

  if (!Array.prototype.fill) {
    Array.prototype.fill = _pffill.value
  }
  
  if (!Uint8Array.prototype.fill) {
    Uint8Array.prototype.fill = _pffill.value
  }

  'use strict';

  Array.prototype.findIndex = Array.prototype.findIndex || function(callback) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      if ( callback.call(thisArg, list[i], i, list) ) {
        return i;
      }
    }
    return -1;
  };

  Array.prototype.find = Array.prototype.find || function(callback) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var element = list[i];
      if ( callback.call(thisArg, element, i, list) ) {
        return element;
      }
    }
  };


  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
  
      if (search instanceof RegExp) {
        throw TypeError('first argument must not be a RegExp');
      }
      if (start === undefined) { start = 0; }
      return this.indexOf(search, start) !== -1;
    };
  }
  

  !function r(e,t,n){function o(u,f){if(!t[u]){if(!e[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[u]={exports:{}};e[u][0].call(l.exports,function(r){var t=e[u][1][r];return o(t?t:r)},l,l.exports,r,e,t,n)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}({1:[function(r,e,t){"use strict";r("./index").polyfill()},{"./index":2}],2:[function(r,e,t){"use strict";function n(r,e){if(void 0===r||null===r)throw new TypeError("Cannot convert first argument to object");for(var t=Object(r),n=1;n<arguments.length;n++){var o=arguments[n];if(void 0!==o&&null!==o)for(var i=Object.keys(Object(o)),u=0,f=i.length;u<f;u++){var c=i[u],a=Object.getOwnPropertyDescriptor(o,c);void 0!==a&&a.enumerable&&(t[c]=o[c])}}return t}function o(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:n})}e.exports={assign:n,polyfill:o}},{}]},{},[1]);

  (function(){function m(){function u(){return null}function l(a){return a?"object"===typeof a||"function"===typeof a:!1}function n(a){if(null!==a&&!l(a))throw new TypeError("Object prototype may only be an Object or null: "+a);}function v(a,c,A){function k(){}if(!l(a)||!l(c))throw new TypeError("Cannot create proxy with a non-object as target or handler");var g=c;c={get:null,set:null,apply:null,construct:null};for(var h in g){if(!(h in c))throw new TypeError("Proxy polyfill does not support trap '"+h+"'");c[h]=
g[h]}"function"===typeof g&&(c.apply=g.apply.bind(g));g=B(a);var p=!1,q=!1;if("function"===typeof a){var e=function(){var b=this&&this.constructor===e,d=Array.prototype.slice.call(arguments);k(b?"construct":"apply");return b&&c.construct?c.construct.call(this,a,d):!b&&c.apply?c.apply(a,this,d):b?(d.unshift(a),new (a.bind.apply(a,d))):a.apply(this,d)};p=!0}else a instanceof Array?(e=[],q=!0):e=w||null!==g?C(g):{};var x=c.get?function(b){k("get");return c.get(this,b,e)}:function(b){k("get");return this[b]},
D=c.set?function(b,d){k("set");c.set(this,b,d,e)}:function(b,d){k("set");this[b]=d},y={};f.getOwnPropertyNames(a).forEach(function(b){if(!((p||q)&&b in e)){var d=f.getOwnPropertyDescriptor(a,b);f.defineProperty(e,b,{enumerable:!!d.enumerable,get:x.bind(a,b),set:D.bind(a,b)});y[b]=!0}});h=!0;if(p||q){var E=f.setPrototypeOf||([].__proto__===Array.prototype?function(b,d){n(d);b.__proto__=d;return b}:u);g&&E(e,g)||(h=!1)}if(c.get||!h)for(var r in a)y[r]||f.defineProperty(e,r,{get:x.bind(a,r)});f.seal(a);
f.seal(e);return A?{proxy:e,revoke:function(){a=null;k=function(b){throw new TypeError("Cannot perform '"+b+"' on a proxy that has been revoked");}}}:e}var f=Object,w=!!f.create||!({__proto__:null}instanceof f),C=f.create||(w?function(a){n(a);return{__proto__:a}}:function(a){function c(){}n(a);if(null===a)throw new SyntaxError("Native Object.create is required to create objects with null prototype");c.prototype=a;return new c}),B=f.getPrototypeOf||([].__proto__===Array.prototype?function(a){a=a.__proto__;
return l(a)?a:null}:u);var t=function(a,c){if(void 0===(this&&this instanceof t?this.constructor:void 0))throw new TypeError("Constructor Proxy requires 'new'");return v(a,c)};t.revocable=function(a,c){return v(a,c,!0)};return t};var z="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)||"undefined"!==typeof navigator&&"ReactNative"===navigator.product?global:self;z.Proxy||(z.Proxy=m(),z.Proxy.revocable=z.Proxy.revocable);})();

if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}


(function() {
	if (typeof globalThis === 'object') return;
	Object.defineProperty(Object.prototype, '__magic__', {
		get: function() {
			return this;
		},
		configurable: true // This makes it possible to `delete` the getter later.
	});
	__magic__.globalThis = __magic__; // lolwat
	delete Object.prototype.__magic__;
}());

if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null)
      throw new TypeError('can\'t convert ' + this + ' to object');

    var str = '' + this;
    // To convert string to integer.
    count = +count;
    // Check NaN
    if (count != count)
      count = 0;

    if (count < 0)
      throw new RangeError('repeat count must be non-negative');

    if (count == Infinity)
      throw new RangeError('repeat count must be less than infinity');

    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return '';

    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28)
      throw new RangeError('repeat count must not overflow maximum string size');

    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
       str += str;
       count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
}

// Your code can use `globalThis` now.

/**
 * TextEncoder and TextDecoder polyfills
 * connector. Checking if needed.
 */
const hasTextEncoder = !!window.TextEncoder;
const hasTextDecoder = !!window.TextDecoder;

if (!hasTextEncoder || !hasTextDecoder) {
  const polyfillConnector = document.createElement('script');
  polyfillConnector.type = 'text/javascript';
  polyfillConnector.src = './js/vendor/polyfills/textencoder.js';

  document.head.appendChild(polyfillConnector);
}

/*! (c) Andrea Giammarchi - ISC */
var self=this||{};try{self.WeakSet=WeakSet}catch(t){!function(e){var s=new e,t=n.prototype;function n(t){"use strict";s.set(this,new e),t&&t.forEach(this.add,this)}t.add=function(t){return s.get(this).set(t,1),this},t.delete=function(t){return s.get(this).delete(t)},t.has=function(t){return s.get(this).has(t)},self.WeakSet=n}(WeakMap)}



///?/ABORTCONTROLLER

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }

    return _get.apply(this, arguments);
  }

  var Emitter = /*#__PURE__*/function () {
    function Emitter() {
      _classCallCheck(this, Emitter);

      Object.defineProperty(this, 'listeners', {
        value: {},
        writable: true,
        configurable: true
      });
    }

    _createClass(Emitter, [{
      key: "addEventListener",
      value: function addEventListener(type, callback, options) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }

        this.listeners[type].push({
          callback: callback,
          options: options
        });
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
          return;
        }

        var stack = this.listeners[type];

        for (var i = 0, l = stack.length; i < l; i++) {
          if (stack[i].callback === callback) {
            stack.splice(i, 1);
            return;
          }
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
          return;
        }

        var stack = this.listeners[event.type];
        var stackToCall = stack.slice();

        for (var i = 0, l = stackToCall.length; i < l; i++) {
          var listener = stackToCall[i];

          try {
            listener.callback.call(this, event);
          } catch (e) {
            Promise.resolve().then(function () {
              throw e;
            });
          }

          if (listener.options && listener.options.once) {
            this.removeEventListener(event.type, listener.callback);
          }
        }

        return !event.defaultPrevented;
      }
    }]);

    return Emitter;
  }();

  var AbortSignal = /*#__PURE__*/function (_Emitter) {
    _inherits(AbortSignal, _Emitter);

    var _super = _createSuper(AbortSignal);

    function AbortSignal() {
      var _this;

      _classCallCheck(this, AbortSignal);

      _this = _super.call(this); // Some versions of babel does not transpile super() correctly for IE <= 10, if the parent
      // constructor has failed to run, then "this.listeners" will still be undefined and then we call
      // the parent constructor directly instead as a workaround. For general details, see babel bug:
      // https://github.com/babel/babel/issues/3041
      // This hack was added as a fix for the issue described here:
      // https://github.com/Financial-Times/polyfill-library/pull/59#issuecomment-477558042

      if (!_this.listeners) {
        Emitter.call(_assertThisInitialized(_this));
      } // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
      // we want Object.keys(new AbortController().signal) to be [] for compat with the native impl


      Object.defineProperty(_assertThisInitialized(_this), 'aborted', {
        value: false,
        writable: true,
        configurable: true
      });
      Object.defineProperty(_assertThisInitialized(_this), 'onabort', {
        value: null,
        writable: true,
        configurable: true
      });
      Object.defineProperty(_assertThisInitialized(_this), 'reason', {
        value: undefined,
        writable: true,
        configurable: true
      });
      return _this;
    }

    _createClass(AbortSignal, [{
      key: "toString",
      value: function toString() {
        return '[object AbortSignal]';
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (event.type === 'abort') {
          this.aborted = true;

          if (typeof this.onabort === 'function') {
            this.onabort.call(this, event);
          }
        }

        _get(_getPrototypeOf(AbortSignal.prototype), "dispatchEvent", this).call(this, event);
      }
    }]);

    return AbortSignal;
  }(Emitter);
  var AbortController = /*#__PURE__*/function () {
    function AbortController() {
      _classCallCheck(this, AbortController);

      // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
      // we want Object.keys(new AbortController()) to be [] for compat with the native impl
      Object.defineProperty(this, 'signal', {
        value: new AbortSignal(),
        writable: true,
        configurable: true
      });
    }

    _createClass(AbortController, [{
      key: "abort",
      value: function abort(reason) {
        var event;

        try {
          event = new Event('abort');
        } catch (e) {
          if (typeof document !== 'undefined') {
            if (!document.createEvent) {
              // For Internet Explorer 8:
              event = document.createEventObject();
              event.type = 'abort';
            } else {
              // For Internet Explorer 11:
              event = document.createEvent('Event');
              event.initEvent('abort', false, false);
            }
          } else {
            // Fallback where document isn't available:
            event = {
              type: 'abort',
              bubbles: false,
              cancelable: false
            };
          }
        }

        var signalReason = reason;

        if (signalReason === undefined) {
          if (typeof document === 'undefined') {
            signalReason = new Error('This operation was aborted');
            signalReason.name = 'AbortError';
          } else {
            try {
              signalReason = new DOMException('signal is aborted without reason');
            } catch (err) {
              // IE 11 does not support calling the DOMException constructor, use a
              // regular error object on it instead.
              signalReason = new Error('This operation was aborted');
              signalReason.name = 'AbortError';
            }
          }
        }

        this.signal.reason = signalReason;
        this.signal.dispatchEvent(event);
      }
    }, {
      key: "toString",
      value: function toString() {
        return '[object AbortController]';
      }
    }]);

    return AbortController;
  }();

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // These are necessary to make sure that we get correct output for:
    // Object.prototype.toString.call(new AbortController())
    AbortController.prototype[Symbol.toStringTag] = 'AbortController';
    AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
  }

  function polyfillNeeded(self) {
    if (self.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      console.log('__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill');
      return true;
    } // Note that the "unfetch" minimal fetch polyfill defines fetch() without
    // defining window.Request, and this polyfill need to work on top of unfetch
    // so the below feature detection needs the !self.AbortController part.
    // The Request.prototype check is also needed because Safari versions 11.1.2
    // up to and including 12.1.x has a window.AbortController present but still
    // does NOT correctly implement abortable fetch:
    // https://bugs.webkit.org/show_bug.cgi?id=174980#c2


    return typeof self.Request === 'function' && !self.Request.prototype.hasOwnProperty('signal') || !self.AbortController;
  }

  /**
   * Note: the "fetch.Request" default value is available for fetch imported from
   * the "node-fetch" package and not in browsers. This is OK since browsers
   * will be importing umd-polyfill.js from that path "self" is passed the
   * decorator so the default value will not be used (because browsers that define
   * fetch also has Request). One quirky setup where self.fetch exists but
   * self.Request does not is when the "unfetch" minimal fetch polyfill is used
   * on top of IE11; for this case the browser will try to use the fetch.Request
   * default value which in turn will be undefined but then then "if (Request)"
   * will ensure that you get a patched fetch but still no Request (as expected).
   * @param {fetch, Request = fetch.Request}
   * @returns {fetch: abortableFetch, Request: AbortableRequest}
   */

  function abortableFetchDecorator(patchTargets) {
    if ('function' === typeof patchTargets) {
      patchTargets = {
        fetch: patchTargets
      };
    }

    var _patchTargets = patchTargets,
        fetch = _patchTargets.fetch,
        _patchTargets$Request = _patchTargets.Request,
        NativeRequest = _patchTargets$Request === void 0 ? fetch.Request : _patchTargets$Request,
        NativeAbortController = _patchTargets.AbortController,
        _patchTargets$__FORCE = _patchTargets.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,
        __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL = _patchTargets$__FORCE === void 0 ? false : _patchTargets$__FORCE;

    if (!polyfillNeeded({
      fetch: fetch,
      Request: NativeRequest,
      AbortController: NativeAbortController,
      __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL: __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
    })) {
      return {
        fetch: fetch,
        Request: Request
      };
    }

    var Request = NativeRequest; // Note that the "unfetch" minimal fetch polyfill defines fetch() without
    // defining window.Request, and this polyfill need to work on top of unfetch
    // hence we only patch it if it's available. Also we don't patch it if signal
    // is already available on the Request prototype because in this case support
    // is present and the patching below can cause a crash since it assigns to
    // request.signal which is technically a read-only property. This latter error
    // happens when you run the main5.js node-fetch example in the repo
    // "abortcontroller-polyfill-examples". The exact error is:
    //   request.signal = init.signal;
    //   ^
    // TypeError: Cannot set property signal of #<Request> which has only a getter

    if (Request && !Request.prototype.hasOwnProperty('signal') || __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      Request = function Request(input, init) {
        var signal;

        if (init && init.signal) {
          signal = init.signal; // Never pass init.signal to the native Request implementation when the polyfill has
          // been installed because if we're running on top of a browser with a
          // working native AbortController (i.e. the polyfill was installed due to
          // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
          // fake AbortSignal to the native fetch will trigger:
          // TypeError: Failed to construct 'Request': member signal is not of type AbortSignal.

          delete init.signal;
        }

        var request = new NativeRequest(input, init);

        if (signal) {
          Object.defineProperty(request, 'signal', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: signal
          });
        }

        return request;
      };

      Request.prototype = NativeRequest.prototype;
    }

    var realFetch = fetch;

    var abortableFetch = function abortableFetch(input, init) {
      var signal = Request && Request.prototype.isPrototypeOf(input) ? input.signal : init ? init.signal : undefined;

      if (signal) {
        var abortError;

        try {
          abortError = new DOMException('Aborted', 'AbortError');
        } catch (err) {
          // IE 11 does not support calling the DOMException constructor, use a
          // regular error object on it instead.
          abortError = new Error('Aborted');
          abortError.name = 'AbortError';
        } // Return early if already aborted, thus avoiding making an HTTP request


        if (signal.aborted) {
          return Promise.reject(abortError);
        } // Turn an event into a promise, reject it once `abort` is dispatched


        var cancellation = new Promise(function (_, reject) {
          signal.addEventListener('abort', function () {
            return reject(abortError);
          }, {
            once: true
          });
        });

        if (init && init.signal) {
          // Never pass .signal to the native implementation when the polyfill has
          // been installed because if we're running on top of a browser with a
          // working native AbortController (i.e. the polyfill was installed due to
          // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
          // fake AbortSignal to the native fetch will trigger:
          // TypeError: Failed to execute 'fetch' on 'Window': member signal is not of type AbortSignal.
          delete init.signal;
        } // Return the fastest promise (don't need to wait for request to finish)


        return Promise.race([cancellation, realFetch(input, init)]);
      }

      return realFetch(input, init);
    };

    return {
      fetch: abortableFetch,
      Request: Request
    };
  }

  (function (self) {

    if (!polyfillNeeded(self)) {
      return;
    }

    if (!self.fetch) {
      console.warn('fetch() is not available, cannot install abortcontroller-polyfill');
      return;
    }

    var _abortableFetch = abortableFetchDecorator(self),
        fetch = _abortableFetch.fetch,
        Request = _abortableFetch.Request;

    self.fetch = fetch;
    self.Request = Request;
    Object.defineProperty(self, 'AbortController', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortController
    });
    Object.defineProperty(self, 'AbortSignal', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortSignal
    });
  })(typeof self !== 'undefined' ? self : global);

}));


////

if (typeof FileReader != 'undefined' && FileReader.prototype.readAsBinaryString === undefined) {
  FileReader.prototype.readAsBinaryString = function (fileData) {
    var binary = "";
    var pt = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      var bytes = new Uint8Array(reader.result);
      var length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      //pt.result  - readonly so assign content to another property
      pt.content = binary;
      $(pt).trigger('onload');
    }
    reader.readAsArrayBuffer(fileData);
  }
}

/* Blob.js
 * A Blob, File, FileReader & URL implementation.
 * 2020-02-01
 *
 * By Eli Grey, https://eligrey.com
 * By Jimmy Wärting, https://github.com/jimmywarting
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

(function(global) {
  (function (factory) {
    if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(["exports"], factory);
    } else if (typeof exports === "object" && typeof exports.nodeName !== "string") {
      // CommonJS
      factory(exports);
    } else {
      // Browser globals
      factory(global);
    }
  })(function (exports) {
    "use strict";

    var BlobBuilder = global.BlobBuilder
        || global.WebKitBlobBuilder
        || global.MSBlobBuilder
        || global.MozBlobBuilder;

    var URL = global.URL || global.webkitURL || function (href, a) {
      a = document.createElement("a");
      a.href = href;
      return a;
    };

    var origBlob = global.Blob;
    var createObjectURL = URL.createObjectURL;
    var revokeObjectURL = URL.revokeObjectURL;
    var strTag = global.Symbol && global.Symbol.toStringTag;
    var blobSupported = false;
    var blobSupportsArrayBufferView = false;
    var blobBuilderSupported = BlobBuilder
        && BlobBuilder.prototype.append
        && BlobBuilder.prototype.getBlob;

    try {
      // Check if Blob constructor is supported
      blobSupported = new Blob(["ä"]).size === 2;

      // Check if Blob constructor supports ArrayBufferViews
      // Fails in Safari 6, so we need to map to ArrayBuffers there.
      blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
    } catch (e) {/**/}


    // Helper function that maps ArrayBufferViews to ArrayBuffers
    // Used by BlobBuilder constructor and old browsers that didn't
    // support it in the Blob constructor.
    function mapArrayBufferViews (ary) {
      return ary.map(function (chunk) {
        if (chunk.buffer instanceof ArrayBuffer) {
          var buf = chunk.buffer;

          // if this is a subarray, make a copy so we only
          // include the subarray region from the underlying buffer
          if (chunk.byteLength !== buf.byteLength) {
            var copy = new Uint8Array(chunk.byteLength);
            copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
            buf = copy.buffer;
          }

          return buf;
        }

        return chunk;
      });
    }

    function BlobBuilderConstructor (ary, options) {
      options = options || {};

      var bb = new BlobBuilder();
      mapArrayBufferViews(ary).forEach(function (part) {
        bb.append(part);
      });

      return options.type ? bb.getBlob(options.type) : bb.getBlob();
    }

    function BlobConstructor (ary, options) {
      return new origBlob(mapArrayBufferViews(ary), options || {});
    }

    if (global.Blob) {
      BlobBuilderConstructor.prototype = Blob.prototype;
      BlobConstructor.prototype = Blob.prototype;
    }

    /********************************************************/
    /*               String Encoder fallback                */
    /********************************************************/
    function stringEncode (string) {
      var pos = 0;
      var len = string.length;
      var Arr = global.Uint8Array || Array; // Use byte array when possible

      var at = 0; // output position
      var tlen = Math.max(32, len + (len >> 1) + 7); // 1.5x size
      var target = new Arr((tlen >> 3) << 3); // ... but at 8 byte offset

      while (pos < len) {
        var value = string.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff) {
          // high surrogate
          if (pos < len) {
            var extra = string.charCodeAt(pos);
            if ((extra & 0xfc00) === 0xdc00) {
              ++pos;
              value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
            }
          }
          if (value >= 0xd800 && value <= 0xdbff) {
            continue; // drop lone surrogate
          }
        }

        // expand the buffer if we couldn't write 4 bytes
        if (at + 4 > target.length) {
          tlen += 8; // minimum extra
          tlen *= (1.0 + (pos / string.length) * 2); // take 2x the remaining
          tlen = (tlen >> 3) << 3; // 8 byte offset

          var update = new Uint8Array(tlen);
          update.set(target);
          target = update;
        }

        if ((value & 0xffffff80) === 0) { // 1-byte
          target[at++] = value; // ASCII
          continue;
        } else if ((value & 0xfffff800) === 0) { // 2-byte
          target[at++] = ((value >> 6) & 0x1f) | 0xc0;
        } else if ((value & 0xffff0000) === 0) { // 3-byte
          target[at++] = ((value >> 12) & 0x0f) | 0xe0;
          target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else if ((value & 0xffe00000) === 0) { // 4-byte
          target[at++] = ((value >> 18) & 0x07) | 0xf0;
          target[at++] = ((value >> 12) & 0x3f) | 0x80;
          target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else {
          // FIXME: do we care
          continue;
        }

        target[at++] = (value & 0x3f) | 0x80;
      }

      return target.slice(0, at);
    }

    /********************************************************/
    /*               String Decoder fallback                */
    /********************************************************/
    function stringDecode (buf) {
      var end = buf.length;
      var res = [];

      var i = 0;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = (firstByte > 0xEF) ? 4
            : (firstByte > 0xDF) ? 3
                : (firstByte > 0xBF) ? 2
                    : 1;

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        res.push(codePoint);
        i += bytesPerSequence;
      }

      var len = res.length;
      var str = "";
      var j = 0;

      while (j < len) {
        str += String.fromCharCode.apply(String, res.slice(j, j += 0x1000));
      }

      return str;
    }

    // string -> buffer
    var textEncode = typeof TextEncoder === "function"
        ? TextEncoder.prototype.encode.bind(new TextEncoder())
        : stringEncode;

    // buffer -> string
    var textDecode = typeof TextDecoder === "function"
        ? TextDecoder.prototype.decode.bind(new TextDecoder())
        : stringDecode;

    function FakeBlobBuilder () {
      function bufferClone (buf) {
        var view = new Array(buf.byteLength);
        var array = new Uint8Array(buf);
        var i = view.length;
        while (i--) {
          view[i] = array[i];
        }
        return view;
      }
      function array2base64 (input) {
        var byteToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var output = [];

        for (var i = 0; i < input.length; i += 3) {
          var byte1 = input[i];
          var haveByte2 = i + 1 < input.length;
          var byte2 = haveByte2 ? input[i + 1] : 0;
          var haveByte3 = i + 2 < input.length;
          var byte3 = haveByte3 ? input[i + 2] : 0;

          var outByte1 = byte1 >> 2;
          var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
          var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
          var outByte4 = byte3 & 0x3F;

          if (!haveByte3) {
            outByte4 = 64;

            if (!haveByte2) {
              outByte3 = 64;
            }
          }

          output.push(
              byteToCharMap[outByte1], byteToCharMap[outByte2],
              byteToCharMap[outByte3], byteToCharMap[outByte4]
          );
        }

        return output.join("");
      }

      var create = Object.create || function (a) {
        function c () {}
        c.prototype = a;
        return new c();
      };

      function getObjectTypeName (o) {
        return Object.prototype.toString.call(o).slice(8, -1);
      }

      function isPrototypeOf(c, o) {
        return typeof c === "object" && Object.prototype.isPrototypeOf.call(c.prototype, o);
      }

      function isDataView (o) {
        return getObjectTypeName(o) === "DataView" || isPrototypeOf(global.DataView, o);
      }

      var arrayBufferClassNames = [
        "Int8Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Int16Array",
        "Uint16Array",
        "Int32Array",
        "Uint32Array",
        "Float32Array",
        "Float64Array",
        "ArrayBuffer"
      ];

      function includes(a, v) {
        return a.indexOf(v) !== -1;
      }

      function isArrayBuffer(o) {
        return includes(arrayBufferClassNames, getObjectTypeName(o)) || isPrototypeOf(global.ArrayBuffer, o);
      }

      function concatTypedarrays (chunks) {
        var size = 0;
        var j = chunks.length;
        while (j--) { size += chunks[j].length; }
        var b = new Uint8Array(size);
        var offset = 0;
        for (var i = 0; i < chunks.length; i++) {
          var chunk = chunks[i];
          b.set(chunk, offset);
          offset += chunk.byteLength || chunk.length;
        }

        return b;
      }

      /********************************************************/
      /*                   Blob constructor                   */
      /********************************************************/
      function Blob (chunks, opts) {
        chunks = chunks ? chunks.slice() : [];
        opts = opts == null ? {} : opts;
        for (var i = 0, len = chunks.length; i < len; i++) {
          var chunk = chunks[i];
          if (chunk instanceof Blob) {
            chunks[i] = chunk._buffer;
          } else if (typeof chunk === "string") {
            chunks[i] = textEncode(chunk);
          } else if (isDataView(chunk)) {
            chunks[i] = bufferClone(chunk.buffer);
          } else if (isArrayBuffer(chunk)) {
            chunks[i] = bufferClone(chunk);
          } else {
            chunks[i] = textEncode(String(chunk));
          }
        }

        this._buffer = global.Uint8Array
            ? concatTypedarrays(chunks)
            : [].concat.apply([], chunks);
        this.size = this._buffer.length;

        this.type = opts.type || "";
        if (/[^\u0020-\u007E]/.test(this.type)) {
          this.type = "";
        } else {
          this.type = this.type.toLowerCase();
        }
      }

      Blob.prototype.arrayBuffer = function () {
        return Promise.resolve(this._buffer.buffer || this._buffer);
      };

      Blob.prototype.text = function () {
        return Promise.resolve(textDecode(this._buffer));
      };

      Blob.prototype.slice = function (start, end, type) {
        var slice = this._buffer.slice(start || 0, end || this._buffer.length);
        return new Blob([slice], {type: type});
      };

      Blob.prototype.toString = function () {
        return "[object Blob]";
      };

      /********************************************************/
      /*                   File constructor                   */
      /********************************************************/
      function File (chunks, name, opts) {
        opts = opts || {};
        var a = Blob.call(this, chunks, opts) || this;
        a.name = name.replace(/\//g, ":");
        a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
        a.lastModified = +a.lastModifiedDate;

        return a;
      }

      File.prototype = create(Blob.prototype);
      File.prototype.constructor = File;

      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(File, Blob);
      } else {
        try {
          File.__proto__ = Blob;
        } catch (e) {/**/}
      }

      File.prototype.toString = function () {
        return "[object File]";
      };

      /********************************************************/
      /*                FileReader constructor                */
      /********************************************************/
      function FileReader () {
        if (!(this instanceof FileReader)) {
          throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
        }

        var delegate = document.createDocumentFragment();
        this.addEventListener = delegate.addEventListener;
        this.dispatchEvent = function (evt) {
          var local = this["on" + evt.type];
          if (typeof local === "function") local(evt);
          delegate.dispatchEvent(evt);
        };
        this.removeEventListener = delegate.removeEventListener;
      }

      function _read (fr, blob, kind) {
        if (!(blob instanceof Blob)) {
          throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
        }

        fr.result = "";

        setTimeout(function () {
          this.readyState = FileReader.LOADING;
          fr.dispatchEvent(new Event("load"));
          fr.dispatchEvent(new Event("loadend"));
        });
      }

      FileReader.EMPTY = 0;
      FileReader.LOADING = 1;
      FileReader.DONE = 2;
      FileReader.prototype.error = null;
      FileReader.prototype.onabort = null;
      FileReader.prototype.onerror = null;
      FileReader.prototype.onload = null;
      FileReader.prototype.onloadend = null;
      FileReader.prototype.onloadstart = null;
      FileReader.prototype.onprogress = null;

      FileReader.prototype.readAsDataURL = function (blob) {
        _read(this, blob, "readAsDataURL");
        this.result = "data:" + blob.type + ";base64," + array2base64(blob._buffer);
      };

      FileReader.prototype.readAsText = function (blob) {
        _read(this, blob, "readAsText");
        this.result = textDecode(blob._buffer);
      };

      FileReader.prototype.readAsArrayBuffer = function (blob) {
        _read(this, blob, "readAsText");
        // return ArrayBuffer when possible
        this.result = (blob._buffer.buffer || blob._buffer).slice();
      };

      FileReader.prototype.abort = function () {};

      /********************************************************/
      /*                         URL                          */
      /********************************************************/
      URL.createObjectURL = function (blob) {
        return blob instanceof Blob
            ? "data:" + blob.type + ";base64," + array2base64(blob._buffer)
            : createObjectURL.call(URL, blob);
      };

      URL.revokeObjectURL = function (url) {
        revokeObjectURL && revokeObjectURL.call(URL, url);
      };

      /********************************************************/
      /*                         XHR                          */
      /********************************************************/
      var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
      if (_send) {
        XMLHttpRequest.prototype.send = function (data) {
          if (data instanceof Blob) {
            this.setRequestHeader("Content-Type", data.type);
            _send.call(this, textDecode(data._buffer));
          } else {
            _send.call(this, data);
          }
        };
      }

      exports.Blob = Blob;
      exports.File = File;
      exports.FileReader = FileReader;
      exports.URL = URL;
    }

    function fixFileAndXHR () {
      var isIE = !!global.ActiveXObject || (
          "-ms-scroll-limit" in document.documentElement.style &&
          "-ms-ime-align" in document.documentElement.style
      );

      // Monkey patched
      // IE doesn't set Content-Type header on XHR whose body is a typed Blob
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6047383
      var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;
      if (isIE && _send) {
        XMLHttpRequest.prototype.send = function (data) {
          if (data instanceof Blob) {
            this.setRequestHeader("Content-Type", data.type);
            _send.call(this, data);
          } else {
            _send.call(this, data);
          }
        };
      }

      try {
        new File([], "");
        exports.File = global.File;
        exports.FileReader = global.FileReader;
      } catch (e) {
        try {
          exports.File = new Function("class File extends Blob {" +
              "constructor(chunks, name, opts) {" +
              "opts = opts || {};" +
              "super(chunks, opts || {});" +
              "this.name = name.replace(/\\//g, \":\");" +
              "this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();" +
              "this.lastModified = +this.lastModifiedDate;" +
              "}};" +
              "return new File([], \"\"), File"
          )();
        } catch (e) {
          exports.File = function (b, d, c) {
            var blob = new Blob(b, c);
            var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();

            blob.name = d.replace(/\//g, ":");
            blob.lastModifiedDate = t;
            blob.lastModified = +t;
            blob.toString = function () {
              return "[object File]";
            };

            if (strTag) {
              blob[strTag] = "File";
            }

            return blob;
          };
        }
      }
    }

    if (blobSupported) {
      fixFileAndXHR();
      exports.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
    } else if (blobBuilderSupported) {
      fixFileAndXHR();
      exports.Blob = BlobBuilderConstructor;
    } else {
      FakeBlobBuilder();
    }

    if (strTag) {
      if (!exports.File.prototype[strTag]) exports.File.prototype[strTag] = "File";
      if (!exports.Blob.prototype[strTag]) exports.Blob.prototype[strTag] = "Blob";
      if (!exports.FileReader.prototype[strTag]) exports.FileReader.prototype[strTag] = "FileReader";
    }

    var blob = exports.Blob.prototype;
    var stream;

    try {
      new ReadableStream({ type: "bytes" });
      stream = function stream() {
        var position = 0;
        var blob = this;

        return new ReadableStream({
          type: "bytes",
          autoAllocateChunkSize: 524288,

          pull: function (controller) {
            var v = controller.byobRequest.view;
            var chunk = blob.slice(position, position + v.byteLength);
            return chunk.arrayBuffer()
                .then(function (buffer) {
                  var uint8array = new Uint8Array(buffer);
                  var bytesRead = uint8array.byteLength;

                  position += bytesRead;
                  v.set(uint8array);
                  controller.byobRequest.respond(bytesRead);

                  if(position >= blob.size)
                    controller.close();
                });
          }
        });
      };
    } catch (e) {
      try {
        new ReadableStream({});
        stream = function stream(blob){
          var position = 0;

          return new ReadableStream({
            pull: function (controller) {
              var chunk = blob.slice(position, position + 524288);

              return chunk.arrayBuffer().then(function (buffer) {
                position += buffer.byteLength;
                var uint8array = new Uint8Array(buffer);
                controller.enqueue(uint8array);

                if (position == blob.size)
                  controller.close();
              });
            }
          });
        };
      } catch (e) {
        try {
          new Response("").body.getReader().read();
          stream = function stream() {
            return (new Response(this)).body;
          };
        } catch (e) {
          stream = function stream() {
            throw new Error("Include https://github.com/MattiasBuelens/web-streams-polyfill");
          };
        }
      }
    }

    function promisify(obj) {
      return new Promise(function(resolve, reject) {
        obj.onload = obj.onerror = function(evt) {
          obj.onload = obj.onerror = null;

          evt.type === "load" ?
              resolve(obj.result || obj) :
              reject(new Error("Failed to read the blob/file"));
        };
      });
    }

    if (!blob.arrayBuffer) {
      blob.arrayBuffer = function arrayBuffer() {
        var fr = new FileReader();
        fr.readAsArrayBuffer(this);
        return promisify(fr);
      };
    }

    if (!blob.text) {
      blob.text = function text() {
        var fr = new FileReader();
        fr.readAsText(this);
        return promisify(fr);
      };
    }

    if (!blob.stream) {
      blob.stream = stream;
    }
  });
})(
    typeof self !== "undefined" && self ||
    typeof window !== "undefined" && window ||
    typeof global !== "undefined" && global ||
    this
);
