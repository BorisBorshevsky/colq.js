(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ColJs = factory();
    }
}(this, function () {
var ColJs;
(function (ColJs) {
    var ColHelper = (function () {
        function ColHelper() {
        }
        ColHelper.maxBy = function (source, selector) {
            var bestResult = null;
            var bestItem = null;
            for (var i = 0; i < source.length; i++) {
                var result = selector(source[i]);
                if (bestResult == null || result > bestResult) {
                    bestResult = result;
                    bestItem = source[i];
                }
            }
            return bestItem;
        };
        ColHelper.each = function (source, fn) {
            for (var i = 0; i < source.length; i++) {
                fn(source[i], i);
            }
        };
        ColHelper.count = function (source, fn) {
            var count = 0;
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i]))
                    count++;
            }
            return count;
        };
        ColHelper.select = function (source, fn) {
            var results = [];
            for (var i = 0; i < source.length; i++) {
                var res = fn(source[i], i);
                results[i] = res;
            }
            return results;
        };
        ColHelper.where = function (source, fn) {
            var results = [];
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i])) {
                    results.push(source[i]);
                }
            }
            return results;
        };
        ColHelper.any = function (source, fn) {
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i]))
                    return true;
            }
            return false;
        };
        ColHelper.distinct = function (source, keySelector) {
            var map = {};
            var results = [];
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);
                if (!(key in map)) {
                    map[keySelector(item)] = true;
                    results.push(item);
                }
            }
            return results;
        };
        ColHelper.aggregate = function (source, initialValue, fn) {
            var agg = initialValue;
            for (var i = 0; i < source.length; i++) {
                agg = fn(source[i], agg);
            }
            return agg;
        };
        ColHelper.sort = function (source, fn) {
            var newSource = source.slice(0);
            return newSource.sort(fn);
        };
        ColHelper.shuffle = function (source) {
            var array = source.slice(0);
            var amount = array.length;
            var LastCellTemporary;
            var pickedElement;
            while (amount) {
                pickedElement = Math.floor(Math.random() * amount--);
                LastCellTemporary = array[amount];
                array[amount] = array[pickedElement];
                array[pickedElement] = LastCellTemporary;
            }
            return array;
        };
        return ColHelper;
    })();
    ColJs.ColHelper = ColHelper;
})(ColJs || (ColJs = {}));
///<reference path="./ColHelper.ts" />
var ColJs;
(function (ColJs) {
    var Col = (function () {
        function Col(source) {
            this.source = null;
            this.source = source;
        }
        Col.prototype.all = function (condition) {
            return null;
        };
        Col.prototype.average = function (selector) {
            return null;
        };
        Col.prototype.intersect = function (second) {
            return null;
        };
        Col.prototype.randomize = function () {
            return Col.of(ColJs.ColHelper.shuffle(this.source));
        };
        Col.prototype.last = function (fn, defaultValue) {
            return null;
        };
        Col.prototype.clone = function () {
            return null;
        };
        Col.prototype.orderByStable = function (fn) {
            return null;
        };
        Col.prototype.orderByDescStable = function (fn) {
            return null;
        };
        Col.of = function (source) {
            return new Col(source);
        };
        Col.empty = function () {
            return new Col([]);
        };
        Col.prototype.unique = function () {
            var seen = {};
            return new Col(this.source.filter(function (item) {
                var itemKey = "" + item;
                return seen.hasOwnProperty(itemKey) ? false : (seen[itemKey] = true);
            }));
        };
        Col.prototype.length = function () {
            return this.source.length;
        };
        Col.prototype.getItem = function (index) {
            return this.source[index];
        };
        Col.prototype.each = function (fn) {
            ColJs.ColHelper.each(this.source, fn);
        };
        Col.prototype.toArray = function () {
            return this.source;
        };
        Col.prototype.count = function (fn) {
            return ColJs.ColHelper.count(this.source, fn);
        };
        Col.prototype.select = function (fn) {
            return Col.of(ColJs.ColHelper.select(this.source, fn));
        };
        Col.prototype.where = function (fn) {
            return Col.of(ColJs.ColHelper.where(this.source, fn));
        };
        Col.prototype.orderBy = function (fn) {
            return Col.of(ColJs.ColHelper.sort(this.source, function (a, b) { return fn(a) - fn(b); }));
        };
        Col.prototype.orderByDesc = function (fn) {
            return Col.of(ColJs.ColHelper.sort(this.source, function (a, b) { return fn(b) - fn(a); }));
        };
        Col.prototype.skip = function (amount) {
            if (amount >= this.source.length) {
                return Col.empty();
            }
            else {
                var newSource = this.source.slice(amount);
                return Col.of(newSource);
            }
        };
        Col.prototype.take = function (amount) {
            var newSource = this.source.slice(0, amount);
            return Col.of(newSource);
        };
        Col.prototype.first = function (fn, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            for (var i = 0; i < this.source.length; i++) {
                if (fn(this.source[i]))
                    return this.source[i];
            }
            return defaultValue;
        };
        Col.prototype.contains = function (fn) {
            return ColJs.ColHelper.any(this.source, fn);
        };
        Col.prototype.unionCol = function (other) {
            var merged = this.source.concat(other.source);
            return Col.of(merged);
        };
        Col.prototype.union = function (other) {
            var merged = this.source.concat(other);
            return Col.of(merged);
        };
        Col.prototype.distinct = function (keySelector) {
            return Col.of(ColJs.ColHelper.distinct(this.source, keySelector));
        };
        Col.prototype.maxBy = function (selector) {
            return ColJs.ColHelper.maxBy(this.source, selector);
        };
        Col.prototype.minBy = function (selector) {
            return this.maxBy(function (e) { return -selector(e); });
        };
        Col.prototype.sum = function (selector) {
            return ColJs.ColHelper.aggregate(this.source, 0, function (item, prevSum) { return prevSum + selector(item); });
        };
        Col.prototype.groupBy = function (keySelector) {
            return null;
        };
        Col.prototype.selectMany = function (selector) {
            return null;
        };
        Col.prototype.selectFirst = function (selector, validCondition) {
            return null;
        };
        Col.prototype.toMap = function (keySelector, valueSelector) {
            return null;
        };
        return Col;
    })();
    ColJs.Col = Col;
})(ColJs || (ColJs = {}));
var ColJs;
(function (ColJs) {
    var MapHelper = (function () {
        function MapHelper() {
        }
        MapHelper.toKeyedArray = function (source) {
            var pairs = [];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    pairs.push({ key: key, value: source[key] });
                }
            }
            return pairs;
        };
        MapHelper.ofHashString = function (source, pairSeperator, keyValSeperator, valueTransform) {
            var pairsStringCol = ColJs.Col.of(source.split(pairSeperator));
            var hashCol = pairsStringCol.select(function (pairString) {
                var pair = pairString.split(keyValSeperator);
                var key = pair[0];
                var rawVal = pair[1];
                var val = valueTransform(rawVal);
                return { key: key, value: val };
            }).toArray();
            return new ColJs.ColMap(hashCol);
        };
        return MapHelper;
    })();
    ColJs.MapHelper = MapHelper;
})(ColJs || (ColJs = {}));
///<reference path="./MapHelper.ts" />
///<reference path="./Col.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColJs;
(function (ColJs) {
    var ColMap = (function (_super) {
        __extends(ColMap, _super);
        function ColMap(source) {
            _super.call(this, source);
        }
        ColMap.ofHash = function (source) {
            return new ColMap(ColJs.MapHelper.toKeyedArray(source));
        };
        ColMap.ofUrlString = function (source) {
            return ColJs.MapHelper.ofHashString(source, "&", "=", function (raw) { return decodeURIComponent(raw); });
        };
        ColMap.emptyColMap = function () {
            return ColMap.ofHash({});
        };
        ColMap.prototype.get = function (key) {
            var kv = this.first(function (kv) { return kv.key == key; });
            return kv ? kv.value : null;
        };
        ColMap.prototype.containsKey = function (key) {
            var kv = this.first(function (kv) { return kv.key == key; });
            return !!kv;
        };
        ColMap.prototype.keys = function () {
            return this.select(function (x) { return x.key; });
        };
        ColMap.prototype.values = function () {
            return this.select(function (x) { return x.value; });
        };
        ColMap.prototype.selectValues = function (fn) {
            var raw = this.select(function (item) {
                return {
                    key: item.key,
                    value: fn(item)
                };
            });
            return new ColMap(raw.toArray());
        };
        return ColMap;
    })(ColJs.Col);
    ColJs.ColMap = ColMap;
})(ColJs || (ColJs = {}));
///<reference path="./src/Col.ts" />
///<reference path="./src/ColMap.ts" />
var ColJs = {
    Col: Col,
    ColMap: ColMap
};

	return ColJs
}));