
module ColJs {

    export class MapHelper {

        static toKeyedArray<T>(source:{[index:string]: T}):Keyed<T>[] {
            var pairs:Keyed<T>[] = [];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    pairs.push({key: key, value: source[key]});
                }
            }
            return pairs;
        }

        static ofHashString<T>(source:string, pairSeparator:string, keyValSeparator:string, valueTransform:(value:string) => T):ColMap<T> {

            var pairsStringCol = Col.of(source.split(pairSeparator));
            var hashCol = pairsStringCol.select(pairString => {
                var pair = pairString.split(keyValSeparator);
                var key = pair[0];
                var rawVal = pair[1];
                var val = valueTransform(rawVal);

                return {key: key, value: val};
            }).toArray();

            return new ColMap<T>(hashCol);
        }

        static orderedGroupByString<T>(source:Array<T>, keySelector:(item:T) => string):ColMap<T[]> {
            var group:{[index:string]: number} = {};
            var ordered:Keyed<T[]>[] = [];

            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);

                if (!(key in group)) {
                    ordered.push({key: key, value: []});
                    group[key] = ordered.length - 1;
                }

                var index = group[key];
                ordered[index].value.push(item);
            }

            return new ColMap<T[]>(ordered);
        }
    }

}