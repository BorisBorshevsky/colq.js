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

        static ofHashString<T>(source:string, pairSeperator:string, keyValSeperator:string, valueTransform:(value:string) => T):ColMap<T> {

            var pairsStringCol = Col.of(source.split(pairSeperator));
            var hashCol = pairsStringCol.select(pairString => {
                var pair = pairString.split(keyValSeperator);
                var key = pair[0];
                var rawVal = pair[1];
                var val = valueTransform(rawVal);

                return {key: key, value: val};
            }).toArray();

            return new ColMap<T>(hashCol);
        }


    }
}