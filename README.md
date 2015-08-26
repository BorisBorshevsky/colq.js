# ColJs

## API
### Unique - unique<T>():Col<E>
> Returns unique elements from a sequence by reference

### Clone - clone<E>():Col<E>
> Returns new cloned collection

### Length - length():number
> Returns the amount of elements in the collection

### GetItem - getItem(index:number):E
> Returns item from collection by index

### Each - each(fn:(item:E, index:number) => void):void
> Iterate each value and invoke fn:(item:E, index:number)

### Select - select<R>(fn:(item:E, index:number) => R):Col<R>
> Projects each element of a sequence into a new form

### OrderBy - orderBy(fn:(item:E) => number):Col<E>
> Sorts the elements of a sequence in ascending order by specific field

### OrderByDesc - orderByDesc(fn:(item:E) => number):Col<E>
> Sorts the elements of a sequence in descending order by specific field

### OrderByStable - orderByStable(fn:(item:E) => number):Col<E>
> Sorts the elements of a sequence in ascending order by specific field, 
> If the keys of two elements are equal, the order of the elements is preserved
        
### orderByDescStable - orderByDescStable(fn:(item:E) => number):Col<E>
> Sorts the elements of a sequence in descending order by specific field, 
> If the keys of two elements are equal, the order of the elements is preserved

### Where - where(condition:(item:E) => boolean):Col<E>
> Filters a sequence of values based on condition:(item:E)

### Skip - skip(count:number):Col<E>
> Bypasses a specified number of elements in a sequence and then returns the remaining elements

### Take - take(count:number):Col<E>
> Returns a specified number of contiguous elements from the start of a sequence

### First - first(condition:(item:E) => boolean, defaultValue:E):E
> Returns the first element in a sequence that satisfies a specified condition

### Last - last(condition:(item:E) => boolean, defaultValue:E):E
> Returns the last element in a sequence that satisfies a specified condition

### Count - count(condition:(item:E) => boolean):number
> Count the number of times condition:(item:E) returns true

### Contains - contains(condition:(item:E) => boolean):boolean
> Determines whether a sequence contains a specified element by using condition:(item:E)

### UnionCol - unionCol(other:Col<E>):Col<E>
> Combine two collection into one collection

### Union - union(other:E[]):Col<E>
> Combine collection and array into one collection

### Distinct - distinct(keySelector:(item:E) => string):Col<E>
> Returns unique elements from a sequence by keySelector:(item:E)

### Sum - sum(selector:(item:E) => number):number
> Computes the sum of specific variable in the sequence 
        
### Average - average(selector:(item:E) => number):number
> Computes the average of specific variable in the sequence

### MaxBy - maxBy(selector:(item:E) => number):E
> Returns max element by specific selector

### MinBy - minBy(selector:(item:E) => number):E
> Returns min element by specific selector

### MinBy - groupBy(keySelector:(item:E) => string):ColMap<E[]>
> Groups the elements of a sequence into hashTable by specific selector

### SelectMany - selectMany<R>(selector:(item:E) => R[]):Col<R>
> Projects each element of a sequence to an Col<R> and flattens the resulting sequences into one sequence

### SelectFirst - selectFirst<R>(selector:(item:E) => R, validCondition:(result:R) => boolean):R
> Projects first element of a sequence by selector

### ToMap - toMap<R>(keySelector:(item:E) => string, valueSelector:(item:E) => R):ColMap<R>
> Convert collection to map by specific key and value

### Randomize - randomize():Col<E>
> 

### Intersect - intersect(second:Col<E>):Col<E>
> Produces the set intersection of two sequences by using the default comparer objects to compare values.

### All - all(condition:(item:E) => boolean):boolean
> Determines whether all elements of a sequence satisfy a condition

### In the next version:
1. except ---Produces the set difference of two sequences. The set difference is the members of the first sequence that don't appear in the second sequence.
2. GroupJoin -- Correlates the elements of two sequences based on key equality, and groups the results.
3. Repeat -- Generates a sequence that contains one repeated value.
4. Reverse -- Inverts the order of the elements in a sequence.
        
### Version
0.0.1

### Know Issues

