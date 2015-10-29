var Coljs = require('./debug/Col');

var array = [1,2,3,4,5];
var result = Coljs.Col.of(array).contains(function(element){return element == 5});

console.log(result);



