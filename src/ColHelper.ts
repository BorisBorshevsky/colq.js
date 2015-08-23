module ColJs {

    export class ColHelper {

        static maxBy<T>(source:T[], selector:(item:T) => number):T {

            var bestResult:number = null;
            var bestItem:T = null;

            for (var i = 0; i < source.length; i++) {
                var result = selector(source[i]);

                if (bestResult == null || result > bestResult) {
                    bestResult = result;
                    bestItem = source[i];
                }
            }

            return bestItem
        }

        static each<T>(source:T[], fn:(item:T, index:number) => void):void {
            for (var i = 0; i < source.length; i++) {
                fn(source[i], i);
            }
        }

        static count<T>(source:T[], fn:(item:T) => boolean):number {
            var count = 0;
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i])) count++;
            }
            return count;
        }

        static select<T,R>(source:T[], fn:(item:T, index:number) => R):R[] {
            var results:R[] = [];
            for (var i = 0; i < source.length; i++) {
                var res = fn(source[i], i);
                results[i] = res;
            }
            return results;
        }

        static where<T>(source:T[], fn:(item:T) => boolean):T[] {
            var results:T[] = [];
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i])) {
                    results.push(source[i]);
                }
            }
            return results;
        }


        static any<T>(source:T[], fn:(item:T) => boolean):boolean {
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i])) return true;
            }
            return false;
        }

        static distinct<T>(source:T[], keySelector:(item:T) => string):T[] {

            var map:{[index:string]: boolean} = {};
            var results:T[] = [];

            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);

                if (!(key in map)) {
                    map[keySelector(item)] = true;
                    results.push(item);
                }
            }

            return results;
        }

        static aggregate<T, R>(source:T[], initialValue:R, fn:(item:T, prevResult:R) => R):R {
            var agg:R = initialValue;
            for (var i = 0; i < source.length; i++) {
                agg = fn(source[i], agg);
            }
            return agg;
        }


        static sort<E>(source:E[], fn:(a:E, b:E) => number):E[] {
            var newSource:E[] = source.slice(0);
            return newSource.sort(fn);
        }


        static shuffle<E>(source:E[]):E[] {
            var array = source.slice(0);

            var amount = array.length;
            var LastCellTemporary;
            var pickedElement;
            // While there remain elements to shuffle…
            while (amount) {
                // Pick a remaining element…
                pickedElement = Math.floor(Math.random() * amount--);
                // And swap it with the current element.
                LastCellTemporary = array[amount];
                array[amount] = array[pickedElement];
                array[pickedElement] = LastCellTemporary;
            }

            return array;
        }
    }


}