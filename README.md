# colq.js
A Typecript \ Javascript library inspired by linq, for an easy, typed and self explanatory use on Arrays and Maps in typescript and javascript.
the library provides a set of general purpose wrappers for these collections that make any complex collection; queryable, editable and easy to manipulate.
the library is compatible with any JS engine (client and server).

the minimized version is really small for boosting performance. 

## Usage example
```js
var jsonArray = [
    { "user": { "id": 100, "screen_name": "d_yoyo" }, "text": "to objects" },
    { "user": { "id": 155, "screen_name": "c_ps" }, "text": "glueee" },
    { "user": { "id": 130, "screen_name": "b_mskk" }, "text": "halo rami" },
    { "user": { "id": 301, "screen_name": "a_xbox" }, "text": "halo boris" }
];

var result = Col.of(jsonArray)
    .where(e -> e.user.id < 200)
    .orderBy(e -> e.user.id)
    .select(x -> x.user.screen_name + ':' + x.text)
    .toArray();

// output:
// ["d_yoyo:to objects", "b_mskk:halo rami", "c_ps:glueee"]
```


## Word counting example
```js
// get the 5 most frequent words in text and amount of times they occur

var words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique dictum nisl, ut eleifend metus cursus at. Sed dignissim maximus purus, sed hendrerit tellus suscipit sit amet. Cras ac elit quis dolor facilisis porta. Vestibulum sollicitudin dolor lacinia, dictum mi ut, laoreet nunc. Fusce eros urna, accumsan eu nisi in, pulvinar imperdiet lacus. Nullam mattis feugiat risus nec venenatis. Phasellus scelerisque ullamcorper turpis, ut auctor augue auctor id. Nunc id tristique risus. In tristique nisl vel enim blandit condimentum. Aenean id est orci. Sed congue, quam quis interdum lacinia, sem massa semper lectus, non auctor erat metus mollis leo. Nunc ullamcorper nisl vel dictum consequat. Nullam dapibus justo in neque rutrum, vitae elementum magna tempus. Nunc non fermentum dui. Proin volutpat est id est porttitor convallis.Maecenas varius sit amet elit id commodo. Morbi efficitur aliquam finibus. Suspendisse euismod lorem quis rutrum placerat. Mauris dignissim lacus ac odio sollicitudin eleifend. Praesenaugue a libero ultrices luctus et a diam. In rutrum pretium venenatis. Praesent rutrum sed eros nec commodo. Maecenas luctus vel tellus sit amet accumsan. Donec elementum, nibh id vehicula vestibulum, nulla nisl sollicitudin nisl, eget pretium erat massa in metus.Pellentesque in ligula urna. Cras rhoncus, magna nec dignissim molestie, velit purus malesuada libero, quis blandit eros libero ac turpis. Curabitur auctor, eros tincidunt aliquet consequat, urna augue semper ex, ac consequat nunc dui nec justo. Nam libero augue, eleifend aliquet fringilla eu, mattis nec justo. Sed cursus enim in gravida scelerisque. Curabitur nec condimentum dui. Cras eu purus interdum, mattis tellus quis, maximus augue. Nulla facilisi. Donec id felis ac augue sodales lobortis ut et arcu. Nam vehicula purus ut nisl elementum, eget efficitur erat congue. Aliquam placerat vel magna eget tincidunt.Etiam mattis et velit quis tempus. Mauris eget varius nibh, eget sagittis dolor. Duis mattis enim metus, eu tempus erat ultrices ut. Se sl massa, eget tincidunt lacus tempor et. Nullam nec dui viverra, fermentum sapien at, sollicitudin quam. Aenean vitae erat vehicula, euismod sapien ut, varius leo. Suspendisse turpis lacus, sodales et ligula ac, ultricies tristique arcu. Duis vel dapibus tortor. Donec rutrum diam ut nibh pharetra, sed condimentum nisi molestie. Curabitur vel porta ante. Donec mattis vel tortor at bibendum. Nullam eleifend bibendum sem in vestibulum.';

Col.of(words.replace(/[^a-z\sA-Z0-9]/gi,"").split(' ')).groupBy(x -> x).select(x -> {
    return {"word": x.key, "count": x.value.length}
}).orderByDesc(x => x.count).take(5).toArray();

/*
[ { word: 'ut', count: 8 },
  { word: 'id', count: 7 },
  { word: 'vel', count: 7 },
  { word: 'nec', count: 7 },
  { word: 'in', count: 6 } ]
*/

```


# Content 
Col - An array wrapper implementation based on linq interface allowing an collection manipulation with a fluent interface.

ColMap - An extension of Col, allowing a Map based interface, with Col functionality, and a fluent interface.

# API

* [Col JS](#col-api)
* [ColMap JS](#colmap-api)


<a name="col-api"></a>
## Col JS
An array wrapper implementation based on linq interface allowing an collection manipulation with a fluent interface.

##### Col.of(E[]):Col\<E>
transform an array into a collection.
returns a collection.

##### clone<E>():Col\<E>
Returns new cloned collection.

##### length():number
Returns the amount of elements in the collection.
``
Col.of<number>([1, 2, 3]).length(); // 3 
``

##### getItem(index:number):E
Returns an item from collection by index.
``
    Col.of<string>(["a", "b", "c"]).getItem(2); // "c" 
``

##### each(fn:(item:E, index:number) => void):void
Iterate each value and invoke fn:(item:E, index:number)
``
    Col.of(Handlers).each((handler:Handlers.IHandler) => handler.handle(element));
``

##### select<R>(fn:(item:E, index:number) => R):Col\<R>
Projects each element of the collection into a new form
returns a new collection of the new items. 

##### orderBy(fn:(item:E) => number):Col\<E>
Sorts the elements of the collection in ascending order by specific function selector.
Return a sorted Collection.

##### orderByDesc(fn:(item:E) => number):Col\<E>
Sorts the elements of a the collection descending order by specific field.
Return a sorted Collection.

##### orderByStable(fn:(item:E) => number):Col\<E>
Sorts the elements of a sequence in ascending order by specific field, 
If the keys of two elements are equal, the order of the elements is preserved.
Return a sorted Collection.
        
##### where(condition:(item:E) => boolean):Col\<E>
Filters a sequence of values based on condition:(item:E).
Return a Collection with filtered items. 

##### skip(count:number):Col\<E>
Bypasses a specified number of elements in a sequence and then returns the remaining elements.
Return a Collection with the remaining items.

##### take(count:number):Col\<E>
Returns a new Collection with the specified number of contiguous elements from the start of a collection.

##### first(condition:(item:E) => boolean, defaultValue:E):E
Returns the first element in the collection that satisfies a specified condition.
if none exists, returns the defaultValue:E.

##### last(condition:(item:E) => boolean, defaultValue:E):E
Returns the last element in the collection that satisfies a specified condition
if none exists, returns the defaultValue:E.

##### count(condition:(item:E) => boolean):number
returns the number of times condition:(item:E) is satisfied.
```js
    var amount = Col.of([1, 4, 2, 3, 5, 1, 2]).col.count(n ->  n === 1 || n === 2).;
    // amount == 4
```

##### contains(condition:(item:E) => boolean):boolean
returns whether the collection contains an element that satisfies the condition function - condition:(item:E)

##### unionCol(other:Col\<E>):Col\<E>
Combine two collections of the same type into one collection.
return the combined collection.

##### union(other:E[]):Col\<E>
Combine collection and an array form the same type into one collection.
return the combined collection.

##### distinct(keySelector:(item:E) => string):Col\<E>
Returns a collection containing the unique elements from the collection by keySelector:(item:E)

##### sum(selector:(item:E) => number):number
returns the sum of specific selector variable from the collection.
        
##### average(selector:(item:E) => number):number
returns the average of specific selector variable from the collection.

##### maxBy(selector:(item:E) => number):E
returns an element for the collection with the maximum return value of the selector.

##### minBy(selector:(item:E) => number):E
returns an element for the collection with the minimum return value of the selector.

##### groupBy(keySelector:(item:E) => string):ColMap<E[]>
Groups the elements of the collection into a ColMap by specific selector, where the selector will be the key, and the values will be an array of the items matched to the specific selector
returns the new ColMap.

##### selectMany\<R>(selector:(item:E) => R[]):Col\<R>
Projects each element of the collection to a new Col\<R> and then flattens the resulting collection into one collection.
returns the result collection.


##### selectFirst\<R>(selector:(item:E) => R, validCondition:(result:R) => boolean):R
projects the first element by a selector that matches the condition.
returns the projected item.

##### toMap\<R>(keySelector:(item:E) => string, valueSelector:(item:E) => R):ColMap\<R>
Converts the collection to a ColMap by specifying a key and a value for each element.

##### randomize():Col\<E>
Returns a new collection with a shuffled order of the same items.

### all(condition:(item:E) => boolean):boolean
returns whether all elements of a collection satisfy a given condition.

### unique<T>():Col\<E>
Returns a Collection of the unique elements from the original Collection by reference.


<a name="colmap-api"></a>
## ColMap JS
A collection based on linq interface and map interface
This is not a real map (not o(1) access), therefor it has all the Col functionality.

### ColMap.ofHash - ofHash\<E>(source:{[index:string]: E}):ColMap\<E>
returns a new ColMap for a key - value object.

### get(key:string):E
returns the value object for a given key.

### containsKey(key:string):boolean
returns whether the ColMap contains a given key.

### keys():Col\<string>
returns a collection of all the keys.

### values():Col\<E>
returns a collection of all the values.

### selectValues\<R>(fn:(item:Keyed\<E>) => R):ColMap<R>
Projects each value element of the collection into a new form.
returns a new ColMap with the Projected items as values. 

## Building
Col.js uses Grunt for compiling TypeScript

	npm install
	grunt build //Builds debug
	grunt release //Builds release version
	
## Running tests

	npm install
	grunt build
	npm test

## In the next version:
1. except ---Produces the set difference of two sequences. The set difference is the members of the first sequence that don't appear in the second sequence.
2. GroupJoin -- Correlates the elements of two sequences based on key equality, and groups the results.
3. Repeat -- Generates a sequence that contains one repeated value.
4. Reverse -- Inverts the order of the elements in a sequence.
        
### Version
0.0.1

### Know Issues

unimplemented functions
