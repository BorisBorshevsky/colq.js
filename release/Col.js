var ColJs;
!function (t) {
    var r = function () {
        function t() {
        }

        return t.maxBy = function (t, r) {
            for (var n = null, e = null, o = 0; o < t.length; o++) {
                var u = r(t[o]);
                (null == n || u > n) && (n = u, e = t[o])
            }
            return e
        }, t.each = function (t, r) {
            for (var n = 0; n < t.length; n++)r(t[n], n)
        }, t.count = function (t, r) {
            for (var n = 0, e = 0; e < t.length; e++)r(t[e]) && n++;
            return n
        }, t.select = function (t, r) {
            for (var n = [], e = 0; e < t.length; e++) {
                var o = r(t[e], e);
                n[e] = o
            }
            return n
        }, t.where = function (t, r) {
            for (var n = [], e = 0; e < t.length; e++)r(t[e]) && n.push(t[e]);
            return n
        }, t.any = function (t, r) {
            for (var n = 0; n < t.length; n++)if (r(t[n]))return !0;
            return !1
        }, t.distinct = function (t, r) {
            for (var n = {}, e = [], o = 0; o < t.length; o++) {
                var u = t[o], i = r(u);
                i in n || (n[r(u)] = !0, e.push(u))
            }
            return e
        }, t.aggregate = function (t, r, n) {
            for (var e = r, o = 0; o < t.length; o++)e = n(t[o], e);
            return e
        }, t.sort = function (t, r) {
            var n = t.slice(0);
            return n.sort(r)
        }, t.shuffle = function (t) {
            for (var r, n, e = t.slice(0), o = e.length; o;)n = Math.floor(Math.random() * o--), r = e[o], e[o] = e[n], e[n] = r;
            return e
        }, t
    }();
    t.ColHelper = r
}(ColJs || (ColJs = {}));
var ColJs;
!function (t) {
    var r = function () {
        function r() {
        }

        return r.toKeyedArray = function (t) {
            var r = [];
            for (var n in t)t.hasOwnProperty(n) && r.push({key: n, value: t[n]});
            return r
        }, r.ofHashString = function (r, n, e, o) {
            var u = t.Col.of(r.split(n)), i = u.select(function (t) {
                var r = t.split(e), n = r[0], u = r[1], i = o(u);
                return {key: n, value: i}
            }).toArray();
            return new t.ColMap(i)
        }, r
    }();
    t.MapHelper = r
}(ColJs || (ColJs = {}));
var __extends = this && this.__extends || function (t, r) {
        function n() {
            this.constructor = t
        }

        for (var e in r)r.hasOwnProperty(e) && (t[e] = r[e]);
        t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
    }, ColJs;
!function (t) {
    var r = function (r) {
        function n(t) {
            r.call(this, t)
        }

        return __extends(n, r), n.ofHash = function (r) {
            return new n(t.MapHelper.toKeyedArray(r))
        }, n.ofUrlString = function (r) {
            return t.MapHelper.ofHashString(r, "&", "=", function (t) {
                return decodeURIComponent(t)
            })
        }, n.emptyColMap = function () {
            return n.ofHash({})
        }, n.prototype.get = function (t) {
            var r = this.first(function (r) {
                return r.key == t
            });
            return r ? r.value : null
        }, n.prototype.containsKey = function (t) {
            var r = this.first(function (r) {
                return r.key == t
            });
            return !!r
        }, n.prototype.keys = function () {
            return this.select(function (t) {
                return t.key
            })
        }, n.prototype.values = function () {
            return this.select(function (t) {
                return t.value
            })
        }, n.prototype.selectValues = function (t) {
            var r = this.select(function (r) {
                return {key: r.key, value: t(r)}
            });
            return new n(r.toArray())
        }, n
    }(t.Col);
    t.ColMap = r
}(ColJs || (ColJs = {}));
var ColJs;
!function (t) {
    var r = function () {
        function r(t) {
            this.source = null, this.source = t
        }

        return r.prototype.all = function (t) {
            return null
        }, r.prototype.average = function (t) {
            return null
        }, r.prototype.intersect = function (t) {
            return null
        }, r.prototype.randomize = function () {
            return r.of(t.ColHelper.shuffle(this.source))
        }, r.prototype.last = function (t, r) {
            return null
        }, r.prototype.clone = function () {
            return null
        }, r.prototype.orderByStable = function (t) {
            return null
        }, r.prototype.orderByDescStable = function (t) {
            return null
        }, r.of = function (t) {
            return new r(t)
        }, r.empty = function () {
            return new r([])
        }, r.prototype.unique = function () {
            var t = {};
            return new r(this.source.filter(function (r) {
                var n = "" + r;
                return t.hasOwnProperty(n) ? !1 : t[n] = !0
            }))
        }, r.prototype.length = function () {
            return this.source.length
        }, r.prototype.getItem = function (t) {
            return this.source[t]
        }, r.prototype.each = function (r) {
            t.ColHelper.each(this.source, r)
        }, r.prototype.toArray = function () {
            return this.source
        }, r.prototype.count = function (r) {
            return t.ColHelper.count(this.source, r)
        }, r.prototype.select = function (n) {
            return r.of(t.ColHelper.select(this.source, n))
        }, r.prototype.where = function (n) {
            return r.of(t.ColHelper.where(this.source, n))
        }, r.prototype.orderBy = function (n) {
            return r.of(t.ColHelper.sort(this.source, function (t, r) {
                return n(t) - n(r)
            }))
        }, r.prototype.orderByDesc = function (n) {
            return r.of(t.ColHelper.sort(this.source, function (t, r) {
                return n(r) - n(t)
            }))
        }, r.prototype.skip = function (t) {
            if (t >= this.source.length)return r.empty();
            var n = this.source.slice(t);
            return r.of(n)
        }, r.prototype.take = function (t) {
            var n = this.source.slice(0, t);
            return r.of(n)
        }, r.prototype.first = function (t, r) {
            void 0 === r && (r = null);
            for (var n = 0; n < this.source.length; n++)if (t(this.source[n]))return this.source[n];
            return r
        }, r.prototype.contains = function (r) {
            return t.ColHelper.any(this.source, r)
        }, r.prototype.unionCol = function (t) {
            var n = this.source.concat(t.source);
            return r.of(n)
        }, r.prototype.union = function (t) {
            var n = this.source.concat(t);
            return r.of(n)
        }, r.prototype.distinct = function (n) {
            return r.of(t.ColHelper.distinct(this.source, n))
        }, r.prototype.maxBy = function (r) {
            return t.ColHelper.maxBy(this.source, r)
        }, r.prototype.minBy = function (t) {
            return this.maxBy(function (r) {
                return -t(r)
            })
        }, r.prototype.sum = function (r) {
            return t.ColHelper.aggregate(this.source, 0, function (t, n) {
                return n + r(t)
            })
        }, r.prototype.groupBy = function (t) {
            return null
        }, r.prototype.selectMany = function (t) {
            return null
        }, r.prototype.selectFirst = function (t, r) {
            return null
        }, r.prototype.toMap = function (t, r) {
            return null
        }, r
    }();
    t.Col = r
}(ColJs || (ColJs = {}));