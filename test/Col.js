///<reference path="../typings/tsd.d.ts" />
///<reference path="../src/Components"/>
var should = require('should');
describe('Col', function () {
    describe('.of', function () {
        it('should return an instanceof ColJs.Col', function () {
            ColJs.Col.of([1, 2, 3]).should.be.an.instanceOf(ColJs.Col);
        });
    });
    describe('#length', function () {
        it('should return 0 for an empty collection', function () {
            var col = ColJs.Col.of([]);
            col.length().should.be.equal(0);
        });
        it('should return the correct length of a non-empty collection', function () {
            ColJs.Col.of([1, 2, 3]).length().should.be.equal(3);
            ColJs.Col.of(new Array(100)).length().should.be.equal(100);
        });
    });
    describe('#getItem', function () {
        it('should return void when called with negative index', function () {
            should(ColJs.Col.of([1, 2, 3]).getItem(-1)).be.equal(void 0);
            should(ColJs.Col.of(new Array(100)).getItem(-100)).be.equal(void 0);
        });
        it('should return the correct element when called with a valid index', function () {
            ColJs.Col.of([1, 2, 3]).getItem(0).should.be.equal(1);
            ColJs.Col.of(["A", "B", "C"]).getItem(1).should.be.equal("B");
        });
        it('should return void when called with an index greater of collection length', function () {
            should(ColJs.Col.of([1, 2, 3]).getItem(3)).be.equal(void 0);
            should(ColJs.Col.of(new Array(100)).getItem(100)).be.equal(void 0);
        });
    });
    describe('#each', function () {
        it('should call the iterator for each element in the collection', function () {
            var arr = [1, 2, 3], called = 0;
            ColJs.Col.of(arr).each(function (item, index) {
                called++;
            });
            called.should.be.equal(arr.length);
        });
        it('should supply the correct item and its index', function () {
            var arr = [1, 2, 3];
            ColJs.Col.of(arr).each(function (item, index) {
                item.should.be.equal(arr[index]);
            });
        });
    });
    describe('#clone', function () {
        it('should return the exact clone of the collection', function () {
            var col1 = ColJs.Col.of([1, 2, 3]), col2 = col1.clone();
            col2.each(function (item, index) {
                item.should.be.equal(col1.getItem(index));
            });
        });
    });
    describe('#select', function () {
        it('should project each element of the collection into a new form and return a new collection of the new items', function () {
            var col1 = ColJs.Col.of([1, 2, 3]), col2 = col1.select(function (item) {
                return item + 1;
            });
            col2.each(function (item, index) {
                item.should.equal(col1.getItem(index) + 1);
            });
        });
    });
    describe('#orderBy', function () {
        it('should order the items based on the provided score and return a new collection', function () {
            var col = ColJs.Col.of([5, 3, 1, 2, 4]), ordered = [1, 2, 3, 4, 5];
            var orderedCol = col.orderBy(function (item) {
                return item;
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
    });
    describe('#orderByDesc', function () {
        it('should order the items in descending order based on the provided score and return a new collection', function () {
            var col = ColJs.Col.of([5, 3, 1, 2, 4]), ordered = [5, 4, 3, 2, 1];
            var orderedCol = col.orderByDesc(function (item) {
                return item;
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
    });
    describe('#orderByStable', function () {
        it('should order the items in ascending order bases on the provided score', function () {
            var col = ColJs.Col.of([5, 3, 1, 2, 4]), ordered = [1, 2, 3, 4, 5];
            var orderedCol = col.orderByStable(function (item) {
                return item;
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
        it('should preserve the order of items with the same score', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]), ordered = [4, 5, 6, 1, 2, 3, 7, 8, 9];
            var orderedCol = col.orderByStable(function (item) {
                return item > 6 ? 3 : (item > 3 ? 1 : 2);
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
    });
    describe('#orderByDescStable', function () {
        it('should order the items in descending order bases on the provided score', function () {
            var col = ColJs.Col.of([5, 3, 1, 2, 4]), ordered = [5, 4, 3, 2, 1];
            var orderedCol = col.orderByDescStable(function (item) {
                return item;
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
        it('should preserve the order of items with the same score', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]), ordered = [7, 8, 9, 1, 2, 3, 4, 5, 6];
            var orderedCol = col.orderByDescStable(function (item) {
                return item > 6 ? 3 : (item > 3 ? 1 : 2);
            });
            ordered.forEach(function (item, index) {
                orderedCol.getItem(index).should.equal(item);
            });
        });
    });
    describe('#where', function () {
        it('should filter the collection based on the condition and return a new collection with filtered items', function () {
            var col = ColJs.Col.of([1, 3, 2, 7, 10, 0, 12]), filtered = ColJs.Col.of([7, 10, 12]);
            col.where(function (n) { return n > 6; }).each(function (n, i) {
                filtered.getItem(i).should.equal(n);
            });
        });
    });
    describe('#skip', function () {
        it('should bypass a specific number of items in the collection and return a new collection containing the remaining items', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7]), final = ColJs.Col.of([4, 5, 6, 7]);
            col.skip(3).each(function (n, i) {
                final.getItem(i).should.equal(n);
            });
        });
        it('should return an empty collection in case the specified number of items to skip is gte the length of the collection', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6]);
            col.skip(col.length()).length().should.equal(0);
            col.skip(col.length() + 1).length().should.equal(0);
        });
    });
    describe('#take', function () {
        it('should return a new collection with the specified number of contiguous items from the start of the collection', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]), final = ColJs.Col.of([1, 2, 3]);
            col.take(3).each(function (n, i) {
                final.getItem(i).should.equal(n);
            });
        });
        it('should return all existing items in case the specified number of items to take is gte the length of the collection', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            col.take(col.length()).length().should.equal(col.length());
            col.take(col.length() + 1).length().should.equal(col.length());
        });
        it('should return a new collection with the specified number of contiguoug items from the end of the collection', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]), final = [3, 4, 5];
            col.take(-3).each(function (n, i) {
                n.should.equal(final[i]);
            });
            col.take(-col.length() - 1).length().should.equal(col.length());
        });
    });
    describe('#first', function () {
        it('should return the first item in the collection that satisfies the given condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            col.first(function (n) { return n > 4; }, null).should.equal(5);
        });
        it('should return the default value if no element satisfies the condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            should(col.first(function (n) { return n > 5; }, null)).equal(null);
        });
    });
    describe('#last', function () {
        it('should return the last item in the collection that satisfies the given condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]);
            col.last(function (n) { return n > 4; }, null).should.equal(5);
        });
        it('should return the default value if no element satisfies the condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            should(col.first(function (n) { return n > 5; }, null)).equal(null);
        });
    });
    describe('#count', function () {
        it('should return the number of times the given condition is satisfied by the items of the collection', function () {
            var col = ColJs.Col.of([1, 4, 2, 3, 5, 1, 2]);
            col.count(function (n) { return n === 1 || n === 2; }).should.equal(4);
            ColJs.Col.of([]).count(function (n) { return n > 0; }).should.equal(0);
        });
    });
    describe('#contains', function () {
        it('should return a boolean indicating whether the collection contains an element that satisfies the condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            should(col.contains(function (n) { return n > 4; })).equal(true);
            should(col.contains(function (n) { return n > 5; })).equal(false);
        });
    });
    describe('#unionCol', function () {
        it('should combine two collections of the same type into one collection and return the new collection', function () {
            var col1 = ColJs.Col.of([1, 2, 3, 4, 5]), col2 = ColJs.Col.of([5, 6, 7, 8, 9, 10]);
            var final = ColJs.Col.of([1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10]);
            col1.unionCol(col2).each(function (n, i) {
                final.getItem(i).should.equal(n);
            });
        });
    });
    describe('#union', function () {
        it('should combine a collection and an array of the same type into one collection and return the new collection', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]), arr = [6, 7, 8, 9, 10];
            var final = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            col.union(arr).each(function (n, i) { return final.getItem(i).should.equal(n); });
        });
    });
    describe('#distinct', function () {
        it('should return a collection containing the unique elements of the collection identified by the specified key selector', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5, 6, 7]);
            var final = ColJs.Col.of([1, 2]);
            col.distinct(function (n) { return (n % 2) == 0 ? "even" : "odd"; }).each(function (n, i) {
                final.getItem(i).should.equal(n);
            });
        });
    });
    describe('#sum', function () {
        it('should return the sum of specific selector variable from the collection', function () {
            var col = ColJs.Col.of(['A', 'B', 'C']);
            col.sum(function (char) { return char.charCodeAt(0); }).should.equal(198);
        });
    });
    describe('#average', function () {
        it('should return the average of specific selector variable from the collection', function () {
            var col = ColJs.Col.of(['A', 'B', 'C']);
            col.average(function (char) { return char.charCodeAt(0); }).should.equal(66);
        });
    });
    describe('#maxBy', function () {
        it('should return an element for the collection with the maximum return value of the selector', function () {
            var col = ColJs.Col.of(['A', 'B', 'C']);
            col.maxBy(function (char) { return char.charCodeAt(0); }).should.equal('C');
        });
        it('should return null when the collection is empty', function () {
            should(ColJs.Col.of([]).maxBy(function (n) { return n; })).equal(null);
        });
    });
    describe('#minBy', function () {
        it('should return an element for the collection with the minimum return value of the selector', function () {
            var col = ColJs.Col.of(['A', 'B', 'C']);
            col.minBy(function (char) { return char.charCodeAt(0); }).should.equal('A');
        });
        it('should return null when the collection is empty', function () {
            should(ColJs.Col.of([]).minBy(function (n) { return n; })).equal(null);
        });
    });
    describe('#groupBy', function () {
        it('should group the elements of the collection into a ColMap by specific selector, where the selector will be the key, and the values will be an array of the items matched to the specific selector, and return the new ColMap', function () {
            var col = ColJs.Col.of(['Abc', 'Abd', 'Bcd', 'Efg', 'Ekh']);
            var map = col.groupBy(function (str) {
                return str.substr(0, 1);
            });
            map.keys().should.containDeep(['A', 'B', 'E']);
            map.get('A').should.containDeep(['Abc', 'Abd']);
            map.get('B').should.containDeep(['Bcd']);
            map.get('E').should.containDeep(['Egf', 'Ekh']);
        });
    });
    describe('#selectMany', function () {
        it('should project each element of the collection to a new Col and then flatten the resulting collection into one collection and then return the result collection', function () {
            var col = ColJs.Col.of([1, 2, 3]), final = ColJs.Col.of([1, 2, 3, 2, 3, 4, 3, 4, 5]);
            col.selectMany(function (n) { return [n, n + 1, n + 2]; }).each(function (n, i) {
                final.getItem(i).should.equal(n);
            });
        });
    });
    describe('#selectFirst', function () {
        it('should project the first element by a selector that matches the condition and return the projected item', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            col.selectFirst(function (n) {
                return n + 1;
            }, function (n) {
                return n > 4;
            }).should.equal(5);
        });
    });
    describe('#toMap', function () {
        it('should convert the collection to a ColMap by specifying a key and a value for each element', function () {
            var col = ColJs.Col.of([65, 66, 67]);
            var map = col.toMap(function (n) {
                return String.fromCharCode(n);
            }, function (n) {
                return n;
            });
            map.keys().should.containDeep(['A', 'B', 'C']);
            map.values().should.containDeep([65, 66, 67]);
        });
    });
    describe('#randomize', function () {
        it('should return a new collection with a shuffled order of the same items', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            var randomized = col.randomize();
            var indexIsDiff = false;
            for (var i = 0; i < randomized.length(); i++) {
                if (randomized.getItem(i) !== col.getItem(i)) {
                    indexIsDiff = true;
                    break;
                }
            }
            should(indexIsDiff).equal(true);
        });
    });
    describe('#all', function () {
        it('should return whether all elements of a collection satisfy a given condition', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 5]);
            should(col.all(function (n) { return n > 0; })).equal(true);
        });
    });
    describe('#unique', function () {
        it('should return a Collection of the unique elements from the original Collection by reference', function () {
            var col = ColJs.Col.of([1, 2, 3, 4, 4, 5, 6, 6]), final = [1, 2, 3, 4, 5, 6];
            col.unique().each(function (n, i) {
                n.should.equal(final[i]);
            });
        });
    });
});
describe('ColMap', function () {
    describe('.ofHash', function () {
        it('should return an instance of ColJs.ColMap', function () {
            ColJs.ColMap.ofHash({ hello: "testing" }).should.be.instanceOf(ColJs.ColMap);
        });
    });
    describe('#get', function () {
        it('should return the value object for a given key', function () {
            ColJs.ColMap.ofHash({ testing: "value" }).get('testing').should.equal("value");
        });
        it('should return null if the key does not exist', function () {
            should(ColJs.ColMap.ofHash({ testing: "value" }).get('testing2')).equal(null);
        });
    });
    describe('#containsKey', function () {
        it('should return true if the key exists', function () {
            ColJs.ColMap.ofHash({ testing: "value" }).containsKey("testing").should.equal(true);
        });
        it('should return false if the key exists', function () {
            ColJs.ColMap.ofHash({ testing: "value" }).containsKey("testing2").should.equal(false);
        });
    });
    describe('#keys', function () {
        it('should return a collection of keys in the hash', function () {
            var keys = ["a", "b", "c", "d"];
            ColJs.ColMap.ofHash({ a: 1, b: 2, c: 3, d: 4 }).keys().each(function (c, i) {
                c.should.equal(keys[i]);
            });
        });
    });
    describe('#values', function () {
        it('should return a collection of values in the hash', function () {
            var values = [1, 2, 3, 4];
            ColJs.ColMap.ofHash({ a: 1, b: 2, c: 3, d: 4 }).values().each(function (n, i) {
                n.should.equal(values[i]);
            });
        });
    });
    describe('#selectValues', function () {
        it('should project each key-value pair of the collection into a new form and return the new ColMap', function () {
            ColJs.ColMap.ofHash({ a: 1 }).selectValues(function (item) {
                return item.value + 1;
            }).get('a').should.equal(2);
        });
    });
});
