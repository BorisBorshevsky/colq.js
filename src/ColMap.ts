///<reference path="MapHelper.ts"/>

module ColJs {

    interface ColMapBase<E> {
        get(key:string):E
        containsKey(key:string):boolean
        keys():Col<string>
        values():Col<E>
        selectValues<R>(fn:(item:Keyed<E>) => R):ColMap<R>
    }


    export interface Keyed<V> {
        key:string;
        value:V
    }

    export class ColMap<E> extends Col<Keyed<E>> {

        constructor(source:Keyed<E>[]) {
            super(source);
        }


        static ofHash<E>(source:{[index:string]: E}):ColMap<E> {
            return new ColMap<E>(MapHelper.toKeyedArray(source));
        }

        static ofUrlString(source:string):ColMap<string> {
            return MapHelper.ofHashString(source, "&", "=", (raw:string) => decodeURIComponent(raw));
        }

        static emptyColMap<T>():ColMap<T> {
            return ColMap.ofHash<T>({});
        }

        get(key:string):E {
            var kv = this.first((kv:Keyed<E>) => kv.key == key);
            return kv ? kv.value : null;
        }

        containsKey(key:string):boolean {
            var kv = this.first((kv:Keyed<E>) => kv.key == key);
            return !!kv;
        }

        keys():Col<string> {
            return this.select((x:Keyed<E>) => x.key);
        }

        values():Col<E> {
            return this.select((x:Keyed<E>) => x.value);
        }

        selectValues<R>(fn:(item:Keyed<E>) => R):ColMap<R> {
            var raw = this.select((item:Keyed<E>) => {
                return {
                    key: item.key,
                    value: fn(item)
                };
            });
            return new ColMap(raw.toArray());
        }

    }
}