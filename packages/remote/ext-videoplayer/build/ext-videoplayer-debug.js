/*
   Enovision GmbH
 @author      Johan van de Merwe
 @licence     MIT-Styled License
 @date        31 July 2017
 @class       VideoPlayer.singleton.Loader

   Enovision GmbH
 @author      Johan van de Merwe
 @licence     MIT-Styled License
 @date        31 July 2017
 @class       VideoPlayer.singleton.Config

*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function' ? Object.defineProperty : function(target, property, descriptor) {
  descriptor = descriptor;
  if (target == Array.prototype || target == Object.prototype) {
    return;
  }
  target[property] = descriptor.value;
};
$jscomp.getGlobal = function(maybeGlobal) {
  return typeof window != 'undefined' && window === maybeGlobal ? maybeGlobal : typeof global != 'undefined' && global != null ? global : maybeGlobal;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  if (!polyfill) {
    return;
  }
  var obj = $jscomp.global;
  var split = target.split('.');
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  var property = split[split.length - 1];
  var orig = obj[property];
  var impl = polyfill(orig);
  if (impl == orig || impl == null) {
    return;
  }
  $jscomp.defineProperty(obj, property, {configurable:true, writable:true, value:impl});
};
$jscomp.polyfill('Array.prototype.copyWithin', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, start, opt_end) {
    var len = this.length;
    target = Number(target);
    start = Number(start);
    opt_end = Number(opt_end != null ? opt_end : len);
    if (target < start) {
      opt_end = Math.min(opt_end, len);
      while (start < opt_end) {
        if (start in this) {
          this[target++] = this[start++];
        } else {
          delete this[target++];
          start++;
        }
      }
    } else {
      opt_end = Math.min(opt_end, len + start - target);
      target += opt_end - start;
      while (opt_end > start) {
        if (--opt_end in this) {
          this[--target] = this[opt_end];
        } else {
          delete this[target];
        }
      }
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  if (!$jscomp.global['Symbol']) {
    $jscomp.global['Symbol'] = $jscomp.Symbol;
  }
};
$jscomp.Symbol = function() {
  var counter = 0;
  function Symbol(opt_description) {
    return $jscomp.SYMBOL_PREFIX + (opt_description || '') + counter++;
  }
  return Symbol;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var symbolIterator = $jscomp.global['Symbol'].iterator;
  if (!symbolIterator) {
    symbolIterator = $jscomp.global['Symbol'].iterator = $jscomp.global['Symbol']('iterator');
  }
  if (typeof Array.prototype[symbolIterator] != 'function') {
    $jscomp.defineProperty(Array.prototype, symbolIterator, {configurable:true, writable:true, value:function() {
      return $jscomp.arrayIterator(this);
    }});
  }
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(array) {
  var index = 0;
  return $jscomp.iteratorPrototype(function() {
    if (index < array.length) {
      return {done:false, value:array[index++]};
    } else {
      return {done:true};
    }
  });
};
$jscomp.iteratorPrototype = function(next) {
  $jscomp.initSymbolIterator();
  var iterator = {next:next};
  iterator[$jscomp.global['Symbol'].iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.iteratorFromArray = function(array, transform) {
  $jscomp.initSymbolIterator();
  if (array instanceof String) {
    array = array + '';
  }
  var i = 0;
  var iter = {next:function() {
    if (i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:false};
    }
    iter.next = function() {
      return {done:true, value:void 0};
    };
    return iter.next();
  }};
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill('Array.prototype.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(value, opt_start, opt_end) {
    var length = this.length || 0;
    if (opt_start < 0) {
      opt_start = Math.max(0, length + opt_start);
    }
    if (opt_end == null || opt_end > length) {
      opt_end = length;
    }
    opt_end = Number(opt_end);
    if (opt_end < 0) {
      opt_end = Math.max(0, length + opt_end);
    }
    for (var i = Number(opt_start || 0); i < opt_end; i++) {
      this[i] = value;
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.findInternal = function(array, callback, thisArg) {
  if (array instanceof String) {
    array = String(array);
  }
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill('Array.prototype.find', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.findIndex', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).i;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.from', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    $jscomp.initSymbolIterator();
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [];
    var iteratorFunction = arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == 'function') {
      arrayLike = iteratorFunction.call(arrayLike);
      var next;
      while (!(next = arrayLike.next()).done) {
        result.push(opt_mapFn.call(opt_thisArg, next.value));
      }
    } else {
      var len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i]));
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.is', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(left, right) {
    if (left === right) {
      return left !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var includes = function(searchElement, opt_fromIndex) {
    var array = this;
    if (array instanceof String) {
      array = String(array);
    }
    var len = array.length;
    for (var i = opt_fromIndex || 0; i < len; i++) {
      if (array[i] == searchElement || Object.is(array[i], searchElement)) {
        return true;
      }
    }
    return false;
  };
  return includes;
}, 'es7', 'es3');
$jscomp.polyfill('Array.prototype.keys', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.of', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    return Array.from(arguments);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.values', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.makeIterator = function(iterable) {
  $jscomp.initSymbolIterator();
  var iteratorFunction = iterable[Symbol.iterator];
  return iteratorFunction ? iteratorFunction.call(iterable) : $jscomp.arrayIterator(iterable);
};
$jscomp.FORCE_POLYFILL_PROMISE = false;
$jscomp.polyfill('Promise', function(NativePromise) {
  if (NativePromise && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return NativePromise;
  }
  function AsyncExecutor() {
    this.batch_ = null;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      this.asyncExecuteBatch_();
    }
    this.batch_.push(f);
    return this;
  };
  AsyncExecutor.prototype.asyncExecuteBatch_ = function() {
    var self = this;
    this.asyncExecuteFunction(function() {
      self.executeBatch_();
    });
  };
  var nativeSetTimeout = $jscomp.global['setTimeout'];
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    while (this.batch_ && this.batch_.length) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        delete executingBatch[i];
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2};
  var PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = undefined;
    this.onSettledCallbacks_ = [];
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    var thisPromise = this;
    var alreadyCalled = false;
    function firstCallWins(method) {
      return function(x) {
        if (!alreadyCalled) {
          alreadyCalled = true;
          method.call(thisPromise, x);
        }
      };
    }
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError('A Promise cannot resolve to itself'));
    } else {
      if (value instanceof PolyfillPromise) {
        this.settleSameAsPromise_(value);
      } else {
        if (isObject(value)) {
          this.resolveToNonPromiseObj_(value);
        } else {
          this.fulfill_(value);
        }
      }
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = undefined;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    if (typeof thenMethod == 'function') {
      this.settleSameAsThenable_(thenMethod, obj);
    } else {
      this.fulfill_(obj);
    }
  };
  function isObject(value) {
    switch(typeof value) {
      case 'object':
        return value != null;
      case 'function':
        return true;
      default:
        return false;
    }
  }
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw new Error('Cannot settle(' + settledState + ', ' + valueOrReason | '): Promise already settled in state' + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      var callbacks = this.onSettledCallbacks_;
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call();
        callbacks[i] = null;
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor;
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    var resolveChild;
    var rejectChild;
    var childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    function createCallback(paramF, defaultF) {
      if (typeof paramF == 'function') {
        return function(x) {
          try {
            resolveChild(paramF(x));
          } catch (error) {
            rejectChild(error);
          }
        };
      } else {
        return defaultF;
      }
    }
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype['catch'] = function(onRejected) {
    return this.then(undefined, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    var thisPromise = this;
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw new Error('Unexpected state: ' + thisPromise.state_);
      }
    }
    if (this.onSettledCallbacks_ == null) {
      asyncExecutor.asyncExecute(callback);
    } else {
      this.onSettledCallbacks_.push(function() {
        asyncExecutor.asyncExecute(callback);
      });
    }
  };
  function resolvingPromise(opt_value) {
    if (opt_value instanceof PolyfillPromise) {
      return opt_value;
    } else {
      return new PolyfillPromise(function(resolve, reject) {
        resolve(opt_value);
      });
    }
  }
  PolyfillPromise['resolve'] = resolvingPromise;
  PolyfillPromise['reject'] = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise['race'] = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      var iterator = $jscomp.makeIterator(thenablesOrValues);
      for (var iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise['all'] = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues);
    var iterRec = iterator.next();
    if (iterRec.done) {
      return resolvingPromise([]);
    } else {
      return new PolyfillPromise(function(resolveAll, rejectAll) {
        var resultsArray = [];
        var unresolvedCount = 0;
        function onFulfilled(i) {
          return function(ithResult) {
            resultsArray[i] = ithResult;
            unresolvedCount--;
            if (unresolvedCount == 0) {
              resolveAll(resultsArray);
            }
          };
        }
        do {
          resultsArray.push(undefined);
          unresolvedCount++;
          resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll);
          iterRec = iterator.next();
        } while (!iterRec.done);
      });
    }
  };
  return PolyfillPromise;
}, 'es6', 'es3');
$jscomp.executeAsyncGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator['throw'](error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      if (genRec.done) {
        resolve(genRec.value);
      } else {
        Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
      }
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.polyfill('WeakMap', function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return false;
      }
      map['delete'](x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return false;
    }
  }
  if (isConformant()) {
    return NativeWeakMap;
  }
  var prop = '$jscomp_hidden_' + Math.random().toString().substring(2);
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = {};
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    var prev = Object[name];
    if (prev) {
      Object[name] = function(target) {
        insert(target);
        return prev(target);
      };
    }
  }
  patch('freeze');
  patch('preventExtensions');
  patch('seal');
  var index = 0;
  var PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw new Error('WeakMap key fail: ' + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return $jscomp.owns(key, prop) ? key[prop][this.id_] : undefined;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype['delete'] = function(key) {
    if (!$jscomp.owns(key, prop) || !$jscomp.owns(key[prop], this.id_)) {
      return false;
    }
    return delete key[prop][this.id_];
  };
  return PolyfillWeakMap;
}, 'es6', 'es3');
$jscomp.MapEntry = function() {
  this.previous;
  this.next;
  this.head;
  this.key;
  this.value;
};
$jscomp.polyfill('Map', function(NativeMap) {
  var isConformant = !$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!NativeMap || !NativeMap.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeMap = NativeMap;
      var key = Object.seal({x:4});
      var map = new NativeMap($jscomp.makeIterator([[key, 's']]));
      if (map.get(key) != 's' || map.size != 1 || map.get({x:4}) || map.set({x:4}, 't') != map || map.size != 2) {
        return false;
      }
      var iter = map.entries();
      var item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != 's') {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0].x != 4 || item.value[1] != 't' || !iter.next().done) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }();
  if (isConformant) {
    return NativeMap;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var idMap = new WeakMap;
  var PolyfillMap = function(opt_iterable) {
    this.data_ = {};
    this.head_ = createHead();
    this.size = 0;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    var r = maybeGetEntry(this, key);
    if (!r.list) {
      r.list = this.data_[r.id] = [];
    }
    if (!r.entry) {
      r.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:key, value:value};
      r.list.push(r.entry);
      this.head_.previous.next = r.entry;
      this.head_.previous = r.entry;
      this.size++;
    } else {
      r.entry.value = value;
    }
    return this;
  };
  PolyfillMap.prototype['delete'] = function(key) {
    var r = maybeGetEntry(this, key);
    if (r.entry && r.list) {
      r.list.splice(r.index, 1);
      if (!r.list.length) {
        delete this.data_[r.id];
      }
      r.entry.previous.next = r.entry.next;
      r.entry.next.previous = r.entry.previous;
      r.entry.head = null;
      this.size--;
      return true;
    }
    return false;
  };
  PolyfillMap.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    var iter = this.entries();
    var item;
    while (!(item = iter.next()).done) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var id = getId(key);
    var list = map.data_[id];
    if (list && $jscomp.owns(map.data_, id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:undefined};
  };
  var makeIterator = function(map, func) {
    var entry = map.head_;
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        while (entry.head != map.head_) {
          entry = entry.previous;
        }
        while (entry.next != entry.head) {
          entry = entry.next;
          return {done:false, value:func(entry)};
        }
        entry = null;
      }
      return {done:true, value:void 0};
    });
  };
  var createHead = function() {
    var head = {};
    head.previous = head.next = head.head = head;
    return head;
  };
  var mapIndex = 0;
  var getId = function(obj) {
    var type = obj && typeof obj;
    if (type == 'object' || type == 'function') {
      obj = obj;
      if (!idMap.has(obj)) {
        var id = '' + ++mapIndex;
        idMap.set(obj, id);
        return id;
      }
      return idMap.get(obj);
    }
    return 'p_' + obj;
  };
  return PolyfillMap;
}, 'es6', 'es3');
$jscomp.polyfill('Math.acosh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return Math.log(x + Math.sqrt(x * x - 1));
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.asinh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.log(Math.abs(x) + Math.sqrt(x * x + 1));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log1p', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < 0.25 && x > -0.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      var s = 1;
      while (zPrev != z) {
        y *= x;
        s *= -1;
        z = (zPrev = z) + s * y / ++d;
      }
      return z;
    }
    return Math.log(1 + x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.atanh', function(orig) {
  if (orig) {
    return orig;
  }
  var log1p = Math.log1p;
  var polyfill = function(x) {
    x = Number(x);
    return (log1p(x) - log1p(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cbrt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (x === 0) {
      return x;
    }
    x = Number(x);
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.clz32', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x) >>> 0;
    if (x === 0) {
      return 32;
    }
    var result = 0;
    if ((x & 4294901760) === 0) {
      x <<= 16;
      result += 16;
    }
    if ((x & 4278190080) === 0) {
      x <<= 8;
      result += 8;
    }
    if ((x & 4026531840) === 0) {
      x <<= 4;
      result += 4;
    }
    if ((x & 3221225472) === 0) {
      x <<= 2;
      result += 2;
    }
    if ((x & 2147483648) === 0) {
      result++;
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cosh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    return (exp(x) + exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.expm1', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < .25 && x > -.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      while (zPrev != z) {
        y *= x / ++d;
        z = (zPrev = z) + y;
      }
      return z;
    }
    return Math.exp(x) - 1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.hypot', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x, y, var_args) {
    x = Number(x);
    y = Number(y);
    var i, z, sum;
    var max = Math.max(Math.abs(x), Math.abs(y));
    for (i = 2; i < arguments.length; i++) {
      max = Math.max(max, Math.abs(arguments[i]));
    }
    if (max > 1e100 || max < 1e-100) {
      x = x / max;
      y = y / max;
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]) / max;
        sum += z * z;
      }
      return Math.sqrt(sum) * max;
    } else {
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]);
        sum += z * z;
      }
      return Math.sqrt(sum);
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.imul', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(a, b) {
    a = Number(a);
    b = Number(b);
    var ah = a >>> 16 & 65535;
    var al = a & 65535;
    var bh = b >>> 16 & 65535;
    var bl = b & 65535;
    var lh = ah * bl + al * bh << 16 >>> 0;
    return al * bl + lh | 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log10', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN10;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log2', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return x === 0 || isNaN(x) ? x : x > 0 ? 1 : -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sinh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.tanh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.exp(-2 * Math.abs(x));
    var z = (1 - y) / (1 + y);
    return x < 0 ? -z : z;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.trunc', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (isNaN(x) || x === Infinity || x === -Infinity || x === 0) {
      return x;
    }
    var y = Math.floor(Math.abs(x));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.EPSILON', function(orig) {
  return Math.pow(2, -52);
}, 'es6', 'es3');
$jscomp.polyfill('Number.MAX_SAFE_INTEGER', function() {
  return 9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.MIN_SAFE_INTEGER', function() {
  return -9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isFinite', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (typeof x !== 'number') {
      return false;
    }
    return !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (!Number.isFinite(x)) {
      return false;
    }
    return x === Math.floor(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isNaN', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x === 'number' && isNaN(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isSafeInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Number.isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.assign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, var_args) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      if (!source) {
        continue;
      }
      for (var key in source) {
        if ($jscomp.owns(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push([key, obj[key]]);
      }
    }
    return result;
  };
  return entries;
}, 'es8', 'es3');
$jscomp.polyfill('Object.getOwnPropertySymbols', function(orig) {
  if (orig) {
    return orig;
  }
  return function() {
    return [];
  };
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.ownKeys', function(orig) {
  if (orig) {
    return orig;
  }
  var symbolPrefix = 'jscomp_symbol_';
  function isSymbol(key) {
    return key.substring(0, symbolPrefix.length) == symbolPrefix;
  }
  var polyfill = function(target) {
    var keys = [];
    var names = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < names.length; i++) {
      (isSymbol(names[i]) ? symbols : keys).push(names[i]);
    }
    return keys.concat(symbols);
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Object.getOwnPropertyDescriptors', function(orig) {
  if (orig) {
    return orig;
  }
  var getOwnPropertyDescriptors = function(obj) {
    var result = {};
    var keys = Reflect.ownKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return result;
  };
  return getOwnPropertyDescriptors;
}, 'es8', 'es5');
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:true};
  var y = {};
  try {
    y.__proto__ = x;
    return y.a;
  } catch (e) {
  }
  return false;
};
$jscomp.setPrototypeOf = typeof Object.setPrototypeOf == 'function' ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + ' is not extensible');
  }
  return target;
} : null;
$jscomp.polyfill('Object.setPrototypeOf', function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, 'es6', 'es5');
$jscomp.polyfill('Object.values', function(orig) {
  if (orig) {
    return orig;
  }
  var values = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  };
  return values;
}, 'es8', 'es3');
$jscomp.polyfill('Reflect.apply', function(orig) {
  if (orig) {
    return orig;
  }
  var apply = Function.prototype.apply;
  var polyfill = function(target, thisArg, argList) {
    return apply.call(target, thisArg, argList);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == 'function' ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor;
};
$jscomp.construct = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base;
    Reflect.construct(Base, [], Derived);
    return new Base instanceof Base;
  }
  if (typeof Reflect != 'undefined' && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct;
    var patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      if (opt_newTarget) {
        Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      }
      return out;
    };
    return patchedConstruct;
  }
  function construct(target, argList, opt_newTarget) {
    if (opt_newTarget === undefined) {
      opt_newTarget = target;
    }
    var proto = opt_newTarget.prototype || Object.prototype;
    var obj = $jscomp.objectCreate(proto);
    var apply = Function.prototype.apply;
    var out = apply.call(target, obj, argList);
    return out || obj;
  }
  return construct;
}();
$jscomp.polyfill('Reflect.construct', function(orig) {
  return $jscomp.construct;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.defineProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, attributes) {
    try {
      Object.defineProperty(target, propertyKey, attributes);
      var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
      if (!desc) {
        return false;
      }
      return desc.configurable === (attributes.configurable || false) && desc.enumerable === (attributes.enumerable || false) && ('value' in desc ? desc.value === attributes.value && desc.writable === (attributes.writable || false) : desc.get === attributes.get && desc.set === attributes.set);
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.deleteProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    if (!$jscomp.owns(target, propertyKey)) {
      return true;
    }
    try {
      return delete target[propertyKey];
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.getOwnPropertyDescriptor', function(orig) {
  return orig || Object.getOwnPropertyDescriptor;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.getPrototypeOf', function(orig) {
  return orig || Object.getPrototypeOf;
}, 'es6', 'es5');
$jscomp.findDescriptor = function(target, propertyKey) {
  var obj = target;
  while (obj) {
    var property = Reflect.getOwnPropertyDescriptor(obj, propertyKey);
    if (property) {
      return property;
    }
    obj = Reflect.getPrototypeOf(obj);
  }
  return undefined;
};
$jscomp.polyfill('Reflect.get', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, opt_receiver) {
    if (arguments.length <= 2) {
      return target[propertyKey];
    }
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (property) {
      return property.get ? property.get.call(opt_receiver) : property.value;
    }
    return undefined;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.has', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    return propertyKey in target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.isExtensible', function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.ASSUME_ES5 || typeof Object.isExtensible == 'function') {
    return Object.isExtensible;
  }
  return function() {
    return true;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.preventExtensions', function(orig) {
  if (orig) {
    return orig;
  }
  if (!($jscomp.ASSUME_ES5 || typeof Object.preventExtensions == 'function')) {
    return function() {
      return false;
    };
  }
  var polyfill = function(target) {
    Object.preventExtensions(target);
    return !Object.isExtensible(target);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.set', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, value, opt_receiver) {
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (!property) {
      if (Reflect.isExtensible(target)) {
        target[propertyKey] = value;
        return true;
      }
      return false;
    }
    if (property.set) {
      property.set.call(arguments.length > 3 ? opt_receiver : target, value);
      return true;
    } else {
      if (property.writable && !Object.isFrozen(target)) {
        target[propertyKey] = value;
        return true;
      }
    }
    return false;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.setPrototypeOf', function(orig) {
  if (orig) {
    return orig;
  } else {
    if ($jscomp.setPrototypeOf) {
      var setPrototypeOf = $jscomp.setPrototypeOf;
      var polyfill = function(target, proto) {
        try {
          setPrototypeOf(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      };
      return polyfill;
    } else {
      return null;
    }
  }
}, 'es6', 'es5');
$jscomp.polyfill('Set', function(NativeSet) {
  var isConformant = !$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!NativeSet || !NativeSet.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeSet = NativeSet;
      var value = Object.seal({x:4});
      var set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return false;
      }
      var iter = set.entries();
      var item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0]) {
        return false;
      }
      return iter.next().done;
    } catch (err) {
      return false;
    }
  }();
  if (isConformant) {
    return NativeSet;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype['delete'] = function(value) {
    var result = this.map_['delete'](value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, 'es6', 'es3');
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + ' must not be null or undefined');
  }
  if (arg instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + func + ' must not be a regular expression');
  }
  return thisArg + '';
};
$jscomp.polyfill('String.prototype.codePointAt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, 'codePointAt');
    var size = string.length;
    position = Number(position) || 0;
    if (!(position >= 0 && position < size)) {
      return void 0;
    }
    position = position | 0;
    var first = string.charCodeAt(position);
    if (first < 55296 || first > 56319 || position + 1 === size) {
      return first;
    }
    var second = string.charCodeAt(position + 1);
    if (second < 56320 || second > 57343) {
      return first;
    }
    return (first - 55296) * 1024 + second + 9216;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.endsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'endsWith');
    searchString = searchString + '';
    if (opt_position === void 0) {
      opt_position = string.length;
    }
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = searchString.length;
    while (j > 0 && i > 0) {
      if (string[--i] != searchString[--j]) {
        return false;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.fromCodePoint', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError('invalid_code_point ' + code);
      }
      if (code <= 65535) {
        result += String.fromCharCode(code);
      } else {
        code -= 65536;
        result += String.fromCharCode(code >>> 10 & 1023 | 55296);
        result += String.fromCharCode(code & 1023 | 56320);
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'includes');
    return string.indexOf(searchString, opt_position || 0) !== -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.repeat', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, 'repeat');
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError('Invalid count value');
    }
    copies = copies | 0;
    var result = '';
    while (copies) {
      if (copies & 1) {
        result += string;
      }
      if (copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.stringPadding = function(padString, padLength) {
  var padding = padString !== undefined ? String(padString) : ' ';
  if (!(padLength > 0) || !padding) {
    return '';
  }
  var repeats = Math.ceil(padLength / padding.length);
  return padding.repeat(repeats).substring(0, padLength);
};
$jscomp.polyfill('String.prototype.padEnd', function(orig) {
  if (orig) {
    return orig;
  }
  var padEnd = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return string + $jscomp.stringPadding(opt_padString, padLength);
  };
  return padEnd;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.padStart', function(orig) {
  if (orig) {
    return orig;
  }
  var padStart = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return $jscomp.stringPadding(opt_padString, padLength) + string;
  };
  return padStart;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.startsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'startsWith');
    searchString = searchString + '';
    var strLen = string.length;
    var searchLen = searchString.length;
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = 0;
    while (j < searchLen && i < strLen) {
      if (string[i++] != searchString[j++]) {
        return false;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.arrayFromIterator = function(iterator) {
  var i;
  var arr = [];
  while (!(i = iterator.next()).done) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  if (iterable instanceof Array) {
    return iterable;
  } else {
    return $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
  }
};
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p == 'prototype') {
        continue;
      }
      if (Object.defineProperties) {
        var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
        if (descriptor) {
          Object.defineProperty(childCtor, p, descriptor);
        }
      } else {
        childCtor[p] = parentCtor[p];
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.polyfill('WeakSet', function(NativeWeakSet) {
  function isConformant() {
    if (!NativeWeakSet || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var set = new NativeWeakSet([x]);
      if (!set.has(x) || set.has(y)) {
        return false;
      }
      set['delete'](x);
      set.add(y);
      return !set.has(x) && set.has(y);
    } catch (err) {
      return false;
    }
  }
  if (isConformant()) {
    return NativeWeakSet;
  }
  var PolyfillWeakSet = function(opt_iterable) {
    this.map_ = new WeakMap;
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
  };
  PolyfillWeakSet.prototype.add = function(elem) {
    this.map_.set(elem, true);
    return this;
  };
  PolyfillWeakSet.prototype.has = function(elem) {
    return this.map_.has(elem);
  };
  PolyfillWeakSet.prototype['delete'] = function(elem) {
    return this.map_['delete'](elem);
  };
  return PolyfillWeakSet;
}, 'es6', 'es3');
try {
  if (Array.prototype.values.toString().indexOf('[native code]') == -1) {
    delete Array.prototype.values;
  }
} catch (e) {
}
Ext.define('VideoPlayer.singleton.Loader', {singleton:true, alternateClassName:['VideoPlayerResourceLoader', 'vpLoader'], config:{enableMe:false, packageName:'ext-videoplayer', js:['videojs/js/videojs-ie8.min.js', 'videojs/js/video.min.js'], css:['videojs/css/video-js.css']}, constructor:function(config) {
  var me = this;
  me.initConfig(config);
  me.getJs().map(function(el) {
    me.loader(el, 'js');
  });
  me.getCss().map(function(el) {
    me.loader(el, 'css');
  });
  me.callParent();
}, load:function(args) {
  var me = this;
  if (args.hasOwnProperty('js')) {
    args['js'].map(function(el) {
      me.loader(el, 'js');
    });
  }
  if (args.hasOwnProperty('css')) {
    args['css'].map(function(el) {
      me.loader(el, 'css');
    });
  }
}, loader:function(filename, filetype) {
  var packageName = this.getPackageName();
  var packageFile = Ext.getResourcePath(filename, null, packageName);
  var fileref;
  if (filetype === 'js') {
    fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', packageFile);
  } else {
    if (filetype === 'css') {
      fileref = document.createElement('link');
      fileref.setAttribute('rel', 'stylesheet');
      fileref.setAttribute('type', 'text/css');
      fileref.setAttribute('href', packageFile);
    }
  }
  if (typeof fileref !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(fileref);
  }
}});
Ext.define('VideoPlayer.singleton.Util', {singleton:true, alternateClassName:['VideoPlayerUtil', 'vpUtil'], config:{'play':'fa fa-play', 'pause':'fa fa-pause', 'stop':'fa fa-stop', 'fullScreen':'fa fa-expand', 'repeat':'fa fa-refresh', 'volumeOff':'fa fa-volume-off', 'volumeUp':'fa fa-volume-up', 'urlLoad':'fa fa-folder', 'recent':'fa fa-list-alt', 'playlist':'fa fa-music', 'cC':'fa fa-cc', supportedXtensions:['webm', 'mp4', 'ogg', 'wmv']}, constructor:function(config) {
  var me = this;
  me.initConfig(config);
  me.callParent();
}, getVideoType:function(url) {
  if (typeof url === 'undefined') {
    return 'video/mp4';
  }
  if (this.youtubeVideoId(url) !== false) {
    return 'video/youtube';
  } else {
    if (this.vimeoVideoId(url) !== false) {
      return 'video/vimeo';
    } else {
      var extension = url.split('.').pop();
      if (this.getSupportedXtensions().indexOf(extension) === 1) {
        return 'video/' + extension;
      } else {
        return false;
      }
    }
  }
}, vimeoVideoId:function(url) {
  if (typeof url === 'undefined') {
    return false;
  }
  var p = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  return url.match(p) ? RegExp.$1 : false;
}, youtubeVideoId:function(url) {
  if (typeof url === 'undefined') {
    return false;
  }
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? RegExp.$1 : false;
}, formatTime:function(sec) {
  function zeropad(val) {
    val = parseInt(val, 10);
    return val >= 10 ? val : '0' + val;
  }
  sec = sec || 0;
  var h = Math.floor(sec / 3600), min = Math.floor(sec / 60);
  sec = sec - min * 60;
  if (h >= 1) {
    min -= h * 60;
    return h + ':' + zeropad(min) + ':' + zeropad(sec);
  }
  return zeropad(min) + ':' + zeropad(sec);
}});
Ext.define('VideoPlayer.store.Playlist', {extend:'Ext.data.Store', fields:['id', 'src', 'tracks', 'poster'], proxy:{type:'memory', id:'VideoPlayerPlaylist'}});
Ext.define('VideoPlayer.store.Recent', {extend:'Ext.data.Store', requires:['Ext.data.proxy.LocalStorage'], fields:['id', 'video'], proxy:{type:'localstorage', id:'VideoPlayerRecent'}});
Ext.define('VideoPlayer.view.panel.PlayerController', {extend:'Ext.app.ViewController', alias:'controller.VideoPlayerController', requires:['VideoPlayer.singleton.Loader', 'VideoPlayer.singleton.Util', 'VideoPlayer.store.Playlist', 'VideoPlayer.store.Recent'], control:{'#':{afterrender:'onAfterrender', beforedestroy:'onBeforedestroy', resize:'onResize'}, 'VideoPlayerPlayTbar':{btnLoadVideo:'onBtnLoadVideo', captionsOff:'onCaptionsOff'}}, errorFlag:true, videojs:null, videojsReady:false, playlistStore:null, 
recenctStore:null, playTbar:null, progressTbar:null, options:{controls:true, ytcontrols:false, autoplay:false, preload:'auto', poster:'', loop:false, width:'100%', height:'100%', techOrder:['html5']}, init:function(view) {
  var me = this;
  me.playTbar = view.down('VideoPlayerPlayTbar');
  me.progressTbar = view.down('VideoPlayerProgressTbar');
  me.pSlider = me.progressTbar.lookupReference('pSlider');
  me.vSlider = me.progressTbar.lookupReference('vSlider');
  me.tTotal = me.progressTbar.lookupReference('tTotal');
  me.tPlayed = me.progressTbar.lookupReference('tPlayed');
  me.recentPlayed = me.playTbar.lookupReference('RecentPlayed');
  if (view.autoPlayVideo) {
    me.options.autoplay = true;
  }
  me.playlistStore = Ext.create('VideoPlayer.store.Playlist');
  if (Ext.supports.LocalStorage) {
    me.recentStore = Ext.create('VideoPlayer.store.Recent');
    me.recentStore.load({callback:me.loadRecentStore.bind(me)});
  }
}, onAfterrender:function(view) {
  var me = this;
  var techOrder = [];
  if (view.enableYoutube) {
    vpLoader.load({js:['videojs/js/youtube/youtube.min.js']});
    techOrder.push('Youtube');
  }
  if (view.enableVimeo) {
    vpLoader.load({js:['videojs/js/vimeo/videojs-vimeo.js']});
    techOrder.push('Vimeo');
  }
  if (techOrder.length > 0) {
    me.options['techOrder'] = me.options['techOrder'].concat(techOrder);
  }
  me.loadVideoJSApi();
}, onBeforedestroy:function() {
  this.videojs.dispose();
}, onResize:function(view) {
  if (this.videojs !== null) {
    this.videojs.width(view.body.getWidth());
    this.videojs.height(view.body.getHeight() - 1);
  }
}, loadVideoJSApi:function() {
  var me = this, vjs, el, view = this.getView();
  el = view.body.dom.firstChild;
  vjs = videojs(el, me.options);
  vjs.ready(function() {
    me.videojs = this;
    me.progressTbar.getController().videojs = this;
    me.playTbar.getController().videojs = this;
    this.bigPlayButton.hide();
    this.width(view.body.getWidth());
    this.height(view.body.getHeight() - 1);
    this.loadingSpinner.hide();
    this.controls(false);
    this.addClass('vjs-video-wrapper');
    me.videojsReady = true;
    me.bindVideoJSEvents();
    this.volume(view.initVolume);
    if (view.videos || view.video) {
      me.loadVideoStore();
    }
  });
}, bindVideoJSEvents:function() {
  var me = this;
  var vj = me.videojs;
  vj.on('durationchange', me.onDurationChange.bind(me));
  vj.on('ended', me.onEnded.bind(me));
  vj.on('notsupported', me.onNotSupported.bind(me));
  vj.on('error', me.onError.bind(me));
  vj.on('firstplay', Ext.emptyFn);
  vj.on('enterfullscreen', me.onFullScreenChange.bind(me));
  vj.on('fullscreenchange', me.onFullScreenChange.bind(me));
  vj.on('loadedalldata', Ext.emptyFn);
  vj.on('loadeddata', Ext.emptyFn);
  vj.on('loadedmetadata', me.onLoadedMetaData.bind(me));
  vj.on('loadstart', Ext.emptyFn);
  vj.on('pause', me.onPause.bind(me));
  vj.on('play', me.onPlay.bind(me));
  vj.on('progress', Ext.emptyFn);
  vj.on('timeupdate', me.onTimeUpdate.bind(me));
  vj.on('volumechange', Ext.emptyFn);
  vj.on('resize', Ext.emptyFn);
}, loadRecentStore:function(records) {
  var me = this, video, vid;
  if (records.length > 0) {
    Ext.each(records, function(record) {
      video = record.get('video');
      vid = Ext.isString(video) ? Ext.decode(video) : video;
      me.addRecentItem(vid['video'], vid['poster'], vid['tracks']);
    }, me);
    me.playTbar.lookupReference('RecentPlayed').enable();
  }
}, loadVideoStore:function() {
  var me = this, view = me.getView(), record, menu = me.playTbar.lookupReference('Playlist').menu;
  if (Ext.isArray(view.videos)) {
    view.videos.map(function(video) {
      if (video.hasOwnProperty('src')) {
        record = me.playlistStore.add({src:video.src, poster:video.hasOwnProperty('poster') ? video.poster : false, tracks:video.hasOwnProperty('tracks') ? video.tracks : false});
        menu.add({text:video.title, record:record[0], scope:me, handler:function(btn) {
          me.loadPlaylistVideo(btn.record, true);
        }});
      }
    });
    if (view.autoLoadVideo) {
      var first = me.playlistStore.first();
      if (typeof first !== 'undefined') {
        me.loadPlaylistVideo(first, view.autoPlayVideo);
        me.playTbar.lookupReference('Playlist').enable();
      }
    }
  } else {
    if (Ext.isString(view.video)) {
      me.resetPlayer(view['video'], view['poster'], view['track'], false);
    } else {
      return false;
    }
  }
}, onError:function() {
  this.errorFlag = true;
  Ext.MessageBox.show({title:'Playing error', msg:"The video with this URL can't be played, try another one", buttons:Ext.MessageBox.OK, icon:Ext.MessageBox.ERROR});
}, onNotSupported:function(message) {
  var vj = this.videojs.pause();
}, onPause:function() {
}, onPlay:function() {
}, onLoadedMetaData:function() {
  this.errorFlag = false;
  var v = this.currentVideo;
  this.addRecentItem(v.video, v.poster, v.tracks);
}, onDurationChange:function() {
  var me = this;
  var duration = me.videojs.duration();
  me.pSlider.setMaxValue(duration);
  me.tTotal.setValue(vpUtil.formatTime(duration));
}, onTimeUpdate:function() {
  var me = this;
  if (!me.pSlider.dragging) {
    var time = me.videojs.currentTime();
    me.pSlider.setValue(time);
    me.tPlayed.setValue(vpUtil.formatTime(time));
  }
}, onVolumeChange:function() {
  var me = this;
  if (me.vSlider.dragging === false) {
    var volume = me.videojs.muted() ? 0 : me.videojs.volume();
  }
}, onEnded:function() {
  var me = this;
  var vj = me.videojs;
  if (!vj.ended() && !vj.paused()) {
    vj.pause();
  }
  vj.bigPlayButton.hide();
  vj.currentTime(0);
  vj.posterImage.show();
  me.playTbar.setPlayBtn('play');
}, onFullScreenChange:function() {
  var me = this;
  var vj = me.videojs;
  if (vj.isFullscreen()) {
    vj.controls(true);
  } else {
    vj.controls(false);
  }
}, onCaptionsOff:function(tbar) {
  this.loadTrack(-1);
}, loadPlaylistVideo:function(record, autoPlay) {
  var me = this;
  autoPlay = typeof autoPlay === 'undefined' ? true : autoPlay;
  me.resetPlayer(record.get('src'), record.get('poster'), record.get('tracks'), autoPlay);
}, resetPlayer:function(url, poster, tracks, autoPlay) {
  var me = this;
  var view = me.getView();
  var ap = typeof autoPlay === 'undefined' ? view.autoPlayVideo : autoPlay;
  poster = poster || false;
  tracks = tracks || false;
  var state = ap ? 'pause' : 'play';
  me.playTbar.setPlayBtn(state);
  me.switchStopButton(url);
  me.videojs.src(url);
  me.videojs.autoplay(ap);
  if (tracks) {
    me.loadTracks(tracks);
  }
  me.loadTrack(-1);
  if (poster && typeof poster !== 'undefined') {
    me.videojs.poster(poster);
  } else {
    me.videojs.poster('');
  }
  me.currentVideo = {video:url, poster:poster, tracks:tracks};
  me.errorFlag = true;
}, switchStopButton:function(video) {
  var me = this;
  var view = me.getView();
  if (video.type === 'video/vimeo' || view.autoPlay === true) {
    me.playTbar.lookupReference('btnStop').hide();
  } else {
    me.playTbar.lookupReference('btnStop').show();
  }
}, loadTracks:function(tracks) {
  var me = this;
  var vj = me.videojs;
  var menu = me.playTbar.lookupReference('CaptionsMenu');
  var menuItems = menu.query('menuitem');
  Ext.each(menuItems, function(item, idx) {
    if (typeof item.deleteMe === 'undefined' && item.xtype === 'menuitem') {
      item.destroy();
    }
  }, me);
  var idx = 0;
  tracks.map(function(track) {
    vj.addRemoteTextTrack(track, true);
    menu.add({text:track.label, track:idx++, scope:me, handler:function(btn) {
      me.loadTrack(btn.track);
    }});
  });
  me.playTbar.lookupReference('btnSubtitles').show();
}, loadTrack:function(idx) {
  var me = this;
  var tracks = me.videojs.textTracks();
  if (Ext.isObject(me.currentTrack) && me.currentTrack.mode === 'show') {
    me.currentTrack.mode = 'hidden';
  }
  if (idx === -1) {
    return false;
  }
  var track = tracks[idx];
  track.mode = 'showing';
}, addRecentItem:function(video, poster, tracks, loader) {
  var me = this;
  poster = poster || false;
  tracks = tracks || false;
  if (typeof video === 'undefined' || me.errorFlag && typeof loader !== 'undefined') {
    return false;
  }
  if (Ext.isArray(video)) {
    var text = video[0].src;
  } else {
    if (Ext.isString(video)) {
      text = video;
    }
  }
  var vObj = [{src:text, type:vpUtil.getVideoType(text)}];
  var menu = me.recentPlayed.menu;
  me.recentPlayed.enable();
  var menuItems = menu.query('menuitem');
  var inList = false;
  menuItems.map(function(item) {
    if (item.text === text) {
      inList = true;
    }
  });
  if (!inList) {
    menu.add({text:text, scope:me, video:{video:vObj, poster:poster, tracks:tracks}, handler:function(btn) {
      var video = btn.video;
      me.resetPlayer(video.video, video.poster, video.tracks, true);
    }});
    me.recentStore.add({video:Ext.encode({video:vObj, poster:poster, tracks:tracks})});
    me.recentStore.sync();
  }
}, onClearRecent:function(tbar) {
  var me = this;
  me.recentStore.removeAll();
  me.recentStore.sync();
}, onBtnLoadVideo:function(tbar, video) {
  var me = this;
  me.resetPlayer(video, false, false, true);
}});
Ext.define('VideoPlayer.view.toolbar.TbarController', {extend:'Ext.app.ViewController', alias:'controller.VideoPlayerTbarController', requires:['VideoPlayer.singleton.Util'], control:{'#':{afterrender:'onAfterrender'}}, pSlider:null, vSlider:null, tTotal:null, tPlayed:null, recentPlayed:null, curentVideo:null, videojs:null, playTbar:null, progressTbar:null, init:function(view) {
  var me = this;
}, onStopClicked:function(btn) {
  var btnPlay = this.lookupReference('btnPlay');
  btnPlay.setIconCls(btnPlay.iconPlay).setTooltip('Click to Resume');
  this.videojs.trigger('ended');
}, onUrlLoadClicked:function() {
  Ext.MessageBox.prompt('Load video', 'URL:', this.loadVideo, this);
}, onClearRecent:function(btn) {
  var me = this, menu = me.lookupReference('RecentMenu'), menuItems = menu.query('menuitem');
  menuItems.map(function(item) {
    if (typeof item.deleteMe === 'undefined' && item.xtype === 'menuitem') {
      item.destroy();
    }
  });
  me.fireViewEvent('clearrecent', me);
  me.lookupReference('RecentPlayed').disable();
}, onCaptionOffClicked:function(btn) {
  this.fireViewEvent('captionsOff');
}, onFullScreenClicked:function() {
  if (this.videojs.paused()) {
    this.videojs.play();
  }
  this.videojs.addClass('vjs-fullscreen');
  this.videojs.requestFullscreen();
}, onProgressSliderClicked:function(e) {
  var me = this;
  var vj = me.videojs;
  if (!vj.paused()) {
    vj.pause();
  }
  var newValue = me.pSlider.getValue();
  vj.currentTime(newValue);
  me.tPlayed.setValue(vpUtil.formatTime(newValue));
  vj.play();
}, onProgressDrag:function(slider) {
  var me = this;
  var newValue = slider.getValue();
  me.videojs.currentTime(newValue);
  me.tPlayed.setValue(vpUtil.formatTime(newValue));
}, onPlayClicked:function(btn, pressed) {
  var me = this;
  var vj = me.videojs;
  if (vj.paused()) {
    this.videojs.play();
    btn.setIconCls(btn.iconPause).setTooltip('Click to Pause');
  } else {
    this.videojs.pause();
    btn.setIconCls(btn.iconPlay).setTooltip('Click to Resume');
  }
}, onPauseVideo:function(b, e) {
  this.videojs.pause();
}, onVolumeSliderClicked:function(e) {
  var me = this;
  var slider = me.lookupReference('vSlider');
  me.onVolumeChange(slider);
}, onVolumeChange:function(slider) {
  var newValue = slider.getValue();
  this.videojs.muted(false);
  this.videojs.volume(newValue / 10);
}, onVolumeChanged:function(slider) {
  this.videojs.muted(false);
  this.currentVolume = slider.getValue() / 10;
}, onVolumeClicked:function(btn) {
  if (this.videojs.muted()) {
    this.videojs.muted(false);
    btn.setIconCls(btn.iconVolume);
  } else {
    this.videojs.muted(true);
    btn.setIconCls(btn.iconMute);
  }
}, onSubtitlesClicked:function(b, pressed) {
  var me = this;
  var track = me.videojs.textTracks()[0];
  if (pressed) {
    track.show();
  } else {
    track.hide();
  }
}, loadVideo:function(btn, url) {
  var me = this;
  if (btn !== 'ok' && btn !== 'recent') {
    return false;
  }
  if (!vpUtil.getVideoType(url)) {
    me.onVideojsError();
    return false;
  }
  var video = [{src:url, type:vpUtil.getVideoType(url)}];
  me.lookupReference('btnSubtitles').hide();
  me.fireViewEvent('btnLoadVideo', video);
}});
Ext.define('VideoPlayer.view.toolbar.PlayController', {extend:'VideoPlayer.view.toolbar.TbarController', alias:'controller.VideoPlayerPlayController', recentPlayed:0, control:{'#':{onSetPlayBtn:'onSetPlayBtn'}}, init:function(view) {
  var me = this;
  me.callParent(view);
  me.recentPlayed = me.lookupReference('RecentPlayed');
}, onAfterrender:function(view) {
}, onSetPlayBtn:function(state) {
  var playBtn = this.lookupReference('btnPlay');
  var iconCls = state === 'play' ? playBtn.iconPlay : playBtn.iconPause;
  var tooltip = state === 'play' ? 'Click to Play' : 'Click to Pause';
  playBtn.setIconCls(iconCls).setTooltip(tooltip);
}});
Ext.define('VideoPlayer.view.toolbar.Play', {extend:'Ext.toolbar.Toolbar', xtype:'VideoPlayerPlayTbar', controller:'VideoPlayerPlayController', requires:['VideoPlayer.singleton.Util', 'VideoPlayer.view.toolbar.PlayController'], hidePlaylist:true, hideUrl:true, hideRecent:true, videojs:null, defaults:{xtype:'button'}, initComponent:function() {
  Ext.apply(this, {items:[{iconCls:vpUtil.getPlay(), iconPlay:vpUtil.getPlay(), iconPause:vpUtil.getPause(), tooltip:'Click to Play', reference:'btnPlay', listeners:{click:'onPlayClicked'}}, {iconCls:vpUtil.getStop(), reference:'btnStop', listeners:{click:'onStopClicked'}}, {xtype:'splitter', hidden:this.hidePlaylist}, {iconCls:vpUtil.getUrlLoad(), hidden:this.hideUrl, tooltip:'Open URL', listeners:{click:'onUrlLoadClicked'}}, {iconCls:vpUtil.getRecent(), reference:'RecentPlayed', hidden:this.hideRecent, 
  tooltip:'Recently played', menu:Ext.create('Ext.menu.Menu', {reference:'RecentMenu', items:[{text:'Clear list', deleteMe:false, handler:'onClearRecent'}, '-']})}, {iconCls:vpUtil.getPlaylist(), tooltip:'Playlist', reference:'Playlist', hidden:this.hidePlaylist, menu:Ext.create('Ext.menu.Menu', {reference:'PlaylistMenu'})}, '-\x3e', {iconCls:vpUtil.getCC(), tooltip:'CC', reference:'btnSubtitles', hidden:true, menu:Ext.create('Ext.menu.Menu', {reference:'CaptionsMenu', items:[{text:'Off', deleteMe:false, 
  handler:'onCaptionOffClicked'}, '-']})}, {iconCls:vpUtil.getFullScreen(), tooltip:'Fullscreen', listeners:{click:'onFullScreenClicked'}}]});
  this.callParent();
}, setPlayBtn:function(state) {
  this.fireEvent('onSetPlayBtn', state);
}});
Ext.define('VideoPlayer.view.toolbar.ProgressController', {extend:'VideoPlayer.view.toolbar.TbarController', alias:'controller.VideoPlayerProgressController', init:function(view) {
  var me = this;
  me.callParent(view);
  me.pSlider = me.lookupReference('pSlider');
  me.vSlider = me.lookupReference('vSlider');
  me.tTotal = me.lookupReference('tTotal');
  me.tPlayed = me.lookupReference('tPlayed');
}, onAfterrender:function(view) {
  var me = this;
  me.lookupReference('pSlider').el.on('click', me.onProgressSliderClicked, me);
  me.lookupReference('vSlider').el.on('click', me.onVolumeSliderClicked, me);
}});
Ext.define('VideoPlayer.view.toolbar.Progress', {extend:'Ext.toolbar.Toolbar', xtype:'VideoPlayerProgressTbar', controller:'VideoPlayerProgressController', requires:['VideoPlayer.singleton.Util', 'VideoPlayer.view.toolbar.ProgressController'], hidePlaylist:false, hideUrl:false, hideRecent:false, videojs:null, initVolume:0.2, defaults:{xtype:'button'}, initComponent:function() {
  var me = this;
  Ext.apply(me, {items:[{xtype:'displayfield', reference:'tPlayed', width:60, value:vpUtil.formatTime(0)}, {xtype:'slider', reference:'pSlider', flex:1, minValue:0, increment:1, value:0, tipText:function(thumb) {
    return vpUtil.formatTime(thumb.value);
  }, listeners:{dragstart:'onPauseVideo', drag:'onProgressDrag'}}, {xtype:'displayfield', reference:'tTotal', width:60, value:vpUtil.formatTime(0)}, {xtype:'slider', reference:'vSlider', minValue:0, increment:1, maxValue:10, flex:0.3, labelWidth:40, value:me.initVolume * 10, listeners:{drag:'onVolumeChange', dragend:'onVolumeChanged'}}, {iconCls:vpUtil.getVolumeUp(), iconVolume:vpUtil.getVolumeUp(), iconMute:vpUtil.getVolumeOff(), listeners:{click:'onVolumeClicked'}}]});
  me.callParent();
}});
Ext.require(['VideoPlayer.singleton.Loader']);
Ext.define('VideoPlayer.view.panel.Player', {extend:'Ext.panel.Panel', alternateClassName:['VideoPlayerPanel'], xtype:'VideoPlayerPanel', controller:'VideoPlayerController', requires:['VideoPlayer.view.panel.PlayerController', 'VideoPlayer.view.toolbar.Play', 'VideoPlayer.view.toolbar.Progress'], bodyCls:'videojs videojspanel', layout:{type:'fit'}, currentVideo:false, currentTrack:false, bodyBackgroundColor:'#000', initVolume:0.2, autoPlayVideo:true, autoLoadVideo:true, enableYoutube:false, tracks:false, 
video:false, videos:false, showUrlLoad:true, showPlaylist:true, showRecent:true, html:'\x3cvideo controls class\x3d"video-js vjs-default-skin"\x3e\x3c/video\x3e', initComponent:function(config) {
  var me = this;
  me.initConfig(config);
  var hidePlaylist = !me.showPlaylist;
  var hideRecent = !me.showRecent;
  var hideUrl = !me.showUrlLoad;
  Ext.apply(me, {currentVolume:me.initVolume, bodyStyle:{background:me.bodyBackgroundColor}, dockedItems:[{xtype:'VideoPlayerPlayTbar', dock:'bottom', hidePlayList:hidePlaylist, hideRecent:hideRecent, hideUrl:hideUrl, listeners:{clearrecent:'onClearRecent'}}, {xtype:'VideoPlayerProgressTbar', dock:'bottom', hidePlayList:hidePlaylist, hideRecent:hideRecent}]});
  me.callParent(arguments);
}});
Ext.define('VideoPlayer.view.window.PlayerWindow', {extend:'Ext.window.Window', xtype:'VideoPlayerWindow', requires:['VideoPlayer.view.panel.Player'], alternateClassName:['VideoPlayerWindow'], closeable:true, maximizable:true, layout:'fit', title:'Ext JS Videoplayer', modal:true, bodyBackgroundColor:'#000', initVolume:0.2, autoPlayVideo:true, autoLoadVideo:true, enableYoutube:false, enableVimeo:false, tracks:false, video:false, videos:false, showUrlLoad:true, showPlaylist:true, showRecent:true, width:false, 
height:false, initComponent:function() {
  var me = this;
  if (me.width === false) {
    me.setWindowSize(0.8);
  }
  Ext.apply(me, {items:[{xtype:'VideoPlayerPanel', bodyBackgroundColor:me.bodyBackgroundColor, initVolume:me.initVolume, autoPlayVideo:me.autoPlayVideo, autoLoadVideo:me.autoLoadVideo, enableYoutube:me.enableYoutube, enableVimeo:me.enableVimeo, tracks:me.tracks, video:me.video, videos:me.videos, showUrlLoad:me.showUrlLoad, showPlaylist:me.showPlaylist, showRecent:me.showRecent}]});
  me.callParent(arguments);
}, setWindowSize:function(scale) {
  var me = this;
  me.height = Math.round(window.innerHeight * scale);
  me.width = Math.round(me.height / 3 * 4);
  if (me.width >= window.innerWidth) {
    me.setWindowSize(scale - 0.05);
  }
}});
