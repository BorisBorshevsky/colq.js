# ColJs
A library inspired by linq, for an easy, typed and self explanatory use on Collections in typescript and javascript.
the library provides a small set of general purpose collections with implementations.
It should be compatible with any JS engine.
ColJs minimized version is really small for boosting performance. 

# Content 
Col - A collection implementation based on linq interface 
ColMap - A collection implementation based on Map interface - has all the functionality of Col

# API

* [Col JS](#col-api)
* [ColMap JS](#colmap-api)

## Code Examples 
To be added.

<a name="col-api"></a>
## Col JS
A collection based on linq interface 

### Col.of - Col.of(E[]):Col<E>
transform an array into a collection.
returns a collection.

### Clone - clone<E>():Col<E>
Returns new cloned collection.

### Length - length():number
Returns the amount of elements in the collection.

### GetItem - getItem(index:number):E
Returns an item from collection by index.

### Each - each(fn:(item:E, index:number) => void):void
Iterate each value and invoke fn:(item:E, index:number)

### Select - select<R>(fn:(item:E, index:number) => R):Col<R>
Projects each element of the collection into a new form
returns a new collection of the new items. 

### OrderBy - orderBy(fn:(item:E) => number):Col<E>
Sorts the elements of the collection in ascending order by specific function selector.
Return a sorted Collection.

### OrderByDesc - orderByDesc(fn:(item:E) => number):Col<E>
Sorts the elements of a the collection descending order by specific field.
Return a sorted Collection.

### OrderByStable - orderByStable(fn:(item:E) => number):Col<E>
Sorts the elements of a sequence in ascending order by specific field, 
If the keys of two elements are equal, the order of the elements is preserved.
Return a sorted Collection.
        
### orderByDescStable - orderByDescStable(fn:(item:E) => number):Col<E>
Sorts the elements of a sequence in descending order by specific field, 
If the keys of two elements are equal, the order of the elements is preserved.
Return a sorted Collection.

### Where - where(condition:(item:E) => boolean):Col<E>
Filters a sequence of values based on condition:(item:E).
Return a Collection with filtered items. 

### Skip - skip(count:number):Col<E>
Bypasses a specified number of elements in a sequence and then returns the remaining elements.
Return a Collection with the remaining items.

### Take - take(count:number):Col<E>
Returns a new Collection with the specified number of contiguous elements from the start of a collection.

### First - first(condition:(item:E) => boolean, defaultValue:E):E
Returns the first element in the collection that satisfies a specified condition.
if none exists, returns the defaultValue:E.

### Last - last(condition:(item:E) => boolean, defaultValue:E):E
Returns the last element in the collection that satisfies a specified condition
if none exists, returns the defaultValue:E.

### Count - count(condition:(item:E) => boolean):number
returns the number of times condition:(item:E) is satisfied.

### Contains - contains(condition:(item:E) => boolean):boolean
returns whether the collection contains an element that satisfies the condition function - condition:(item:E)

### UnionCol - unionCol(other:Col<E>):Col<E>
Combine two collections of the same type into one collection.
return the combined collection.

### Union - union(other:E[]):Col<E>
Combine collection and an array form the same type into one collection.
return the combined collection.

### Distinct - distinct(keySelector:(item:E) => string):Col<E>
Returns a collection containing the unique elements from the collection by keySelector:(item:E)

### Sum - sum(selector:(item:E) => number):number
returns the sum of specific selector variable from the collection.
        
### Average - average(selector:(item:E) => number):number
returns the average of specific selector variable from the collection.

### MaxBy - maxBy(selector:(item:E) => number):E
returns an element for the collection with the maximum return value of the selector.

### MinBy - minBy(selector:(item:E) => number):E
returns an element for the collection with the minimum return value of the selector.

### GroupBy - groupBy(keySelector:(item:E) => string):ColMap<E[]>
Groups the elements of the collection into a ColMap by specific selector, where the selector will be the key, and the values will be an array of the items matched to the specific selector
returns the new ColMap.

### SelectMany - selectMany<R>(selector:(item:E) => R[]):Col<R>
Projects each element of the collection to a new Col<R> and then flattens the resulting collection into one collection.
returns the result collection.


### SelectFirst - selectFirst<R>(selector:(item:E) => R, validCondition:(result:R) => boolean):R
projects the first element by a selector that matches the condition.
returns the projected item.

### ToMap - toMap<R>(keySelector:(item:E) => string, valueSelector:(item:E) => R):ColMap<R>
Converts the collection to a ColMap by specifying a key and a value for each element.

### Randomize - randomize():Col<E>
Returns a new collection with a shuffled order of the same items.

### All - all(condition:(item:E) => boolean):boolean
returns whether all elements of a collection satisfy a given condition.

### Unique - unique<T>():Col<E>
Returns a Collection of the unique elements from the original Collection by reference.



<a name="colmap-api"></a>
## ColMap JS
A collection based on linq interface and map interface
This is not a real map (not o(1) access), therefor it has all the Col functionality.

### ColMap.ofHash - ofHash<E>(source:{[index:string]: E}):ColMap<E>
returns a new ColMap for a key - value object.

### get(key:string):E
returns the value object for a given key.

### containsKey(key:string):boolean
returns whether the ColMap contains a given key.

### keys():Col<string>
returns a collection of all the keys.

### values():Col<E>
returns a collection of all the values.

### selectValues<R>(fn:(item:Keyed<E>) => R):ColMap<R>
Projects each value element of the collection into a new form.
returns a new ColMap with the Projected items as values. 



## In the next version:
1. except ---Produces the set difference of two sequences. The set difference is the members of the first sequence that don't appear in the second sequence.
2. GroupJoin -- Correlates the elements of two sequences based on key equality, and groups the results.
3. Repeat -- Generates a sequence that contains one repeated value.
4. Reverse -- Inverts the order of the elements in a sequence.
        
### Version
0.0.1

### Know Issues

unimplemented functions
