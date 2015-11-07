///<reference path="./Components.ts" />

module ColJs {

    interface CollectionBase<E> {
        unique<T>():Col<E>;
        clone<E>():Col<E>;
        length():number;
        getItem(index:number):E;
        each(fn:(item:E, index:number) => void):void;
        select<R>(fn:(item:E, index:number) => R):Col<R>;
        orderBy(fn:(item:E) => number):Col<E>;
        orderByDesc(fn:(item:E) => number):Col<E>;
        where(condition:(item:E) => boolean):Col<E>;
        skip(count:number):Col<E>;
        take(count:number):Col<E>;
        first(condition:(item:E) => boolean, defaultValue:E):E;
        last(condition:(item:E) => boolean, defaultValue:E):E;
        count(condition:(item:E) => boolean):number;
        contains(condition:(item:E) => boolean):boolean;
        unionCol(other:Col<E>):Col<E>;
        union(other:E[]):Col<E>;
        distinct(keySelector:(item:E) => string):Col<E>;
        sum(selector:(item:E) => number):number;
        average(selector:(item:E) => number):number;
        maxBy(selector:(item:E) => number):E;
        minBy(selector:(item:E) => number):E;
        groupBy(keySelector:(item:E) => string):ColMap<E[]>;
        selectMany<R>(selector:(item:E) => R[]):Col<R>;
        selectFirst<R>(selector:(item:E) => R, validCondition:(result:R) => boolean):R;
        toMap<R>(keySelector:(item:E) => string, valueSelector:(item:E) => R):ColMap<R>;
        randomize():Col<E>;
        intersect(second:Col<E>):Col<E>;
        all(condition:(item:E) => boolean):boolean

        //except ---Produces the set difference of two sequences. The set difference is the members of the first sequence that don't appear in the second sequence.
        //groupJoin -- Correlates the elements of two sequences based on key equality, and groups the results.
        //repeat -- Generates a sequence that contains one repeated value.
        //reverse -- Inverts the order of the elements in a sequence.
        //multiOrderBy -- order by multiple comparators
        //selectTopAndCloseEnough -- select the top element and a group of elements that are close to him (some threshold)
        //// normalize(selector:(item:E) => number, setter:(item:E, value:number)=> void, min:number = 0, max:number = 1)
    }


    export class Col<E> implements CollectionBase<E> {

        private source:Array<E> = null;

        all(condition:(element:E)=>boolean):boolean {
            for (var i = 0; i < this.source.length; i++) {
                if (!condition(this.source[i])) return false;
            }
            return true;
        }

        average(selector:(item:E) => number):number {
            return this.sum(selector) / this.source.length;
        }

        intersect(second:Col<E>):Col<E> {
            return Col.of(ColHelper.intersect<E>(this.source, second.toArray()));
        }

        randomize():Col<E> {
            return Col.of(ColHelper.shuffle(this.source));
        }

        last(fn:(p1:E)=>boolean, defaultValue:E):E {
            for (var i = this.source.length - 1; i >= 0; i--) {
                if (fn(this.source[i])) return this.source[i];
            }
            return defaultValue;
        }

        clone():Col<E> {
            return Col.of(this.source.slice(0));
        }

        normalize(selector:(item:E) => number, setter:(item:E, value:number)=> void, min:number = 0, max:number = 1):void {
            if (this.length() == 0) return;

            var minValue = selector(this.minBy(selector));
            var maxValue = selector(this.maxBy(selector));

            this.each(item => {
                var rawValue = selector(item);
                var normValue = maxValue > minValue ? (rawValue - minValue) / (maxValue - minValue) : (max - min / 2);
                setter(item, normValue);
            });
        }

        constructor(source:Array<E>) {
            this.source = source;
        }


        static of<T>(source:T[]):Col<T> {
            return new Col<T>(source);
        }

        static empty<T>() {
            return new Col<T>([]);
        }

        unique<T>():Col<E> {
            var seen = {};
            return new Col<E>(this.source.filter(function (item) {
                var itemKey = "" + item;
                return seen.hasOwnProperty(itemKey) ? false : (seen[itemKey] = true);
            }));
        }

        length():number {
            return this.source.length;
        }

        getItem(index:number):E {
            return this.source[index];
        }

        each(fn:(item:E, index:number) => void):void {
            ColHelper.each(this.source, fn);
        }

        toArray():E[] {
            return this.source;
        }

        count(fn:(item:E) => boolean):number {
            return ColHelper.count(this.source, fn);
        }

        select<R>(fn:(item:E, index:number) => R):Col<R> {
            return Col.of(ColHelper.select(this.source, fn));
        }

        where(fn:(item:E) => boolean):Col<E> {
            return Col.of(ColHelper.where(this.source, fn));
        }


        orderBy(fn:(item:E) => number):Col<E> {
            return Col.of(ColHelper.sort(this.source, (a, b) => fn(a) - fn(b)));
        }

        orderByDesc(fn:(item:E) => number):Col<E> {
            return Col.of(ColHelper.sort(this.source, (a, b) => fn(b) - fn(a)));
        }



        skip(amount:number):Col<E> {
            if (amount >= this.source.length) {
                return Col.empty<E>();
            }
            else {
                var newSource:E[] = this.source.slice(amount);
                return Col.of(newSource);
            }
        }

        take(amount:number):Col<E> {
            var newSource:E[] = amount < 0 ? this.source.slice(amount) : this.source.slice(0, amount);
            return Col.of(newSource);
        }

        first(fn:(item:E) => boolean, defaultValue:E = null):E {
            for (var i = 0; i < this.source.length; i++) {
                if (fn(this.source[i])) return this.source[i];
            }
            return defaultValue;
        }

        contains(fn:(item:E) => boolean):boolean {
            return ColHelper.any(this.source, fn);
        }

        unionCol(other:Col<E>):Col<E> {
            var merged:E[] = this.source.concat(other.source);
            return Col.of(merged);
        }

        union(other:E[]):Col<E> {
            var merged:E[] = this.source.concat(other);
            return Col.of(merged);
        }

        distinct(keySelector:(item:E) => string):Col<E> {
            return Col.of(ColHelper.distinct(this.source, keySelector));
        }

        maxBy(selector:(item:E) => number):E {
            return ColHelper.maxBy(this.source, selector);
        }

        minBy(selector:(item:E) => number):E {
            return this.maxBy(e => -selector(e));
        }

        sum(selector:(item:E) => number):number {
            return ColHelper.aggregate(this.source, 0, (item:E, prevSum:number) => prevSum + selector(item));
        }


        groupBy(keySelector:(item:E)=>string):ColMap<E[]> {
            return MapHelper.orderedGroupByString(this.source, keySelector);
        }

        selectMany<R>(selector:(item:E) => R[]):Col<R> {
            var results:R[] = [];
            this.each(item => results = results.concat(selector(item)));

            return Col.of(results);
        }

        selectFirst<R>(selector:(item:E) => R, validCondition:(p1:R) => boolean):R {
            for (var i = 0; i < this.source.length; i++) {
                var itemResult:R = selector(this.source[i]);
                if (validCondition(itemResult)) return itemResult;
            }

            return null;
        }

        reverse():Col<E>{
            return Col.of(this.source.reverse());
        }


        toMap<R>(keySelector:(item:E)=>string, valueSelector:(p1:E)=>R):ColMap<R> {
            var keyedCol = this.select(x => {
                return {key: keySelector(x), value: valueSelector(x)};
            });

            return new ColMap<R>(keyedCol.toArray());
        }
    }
}