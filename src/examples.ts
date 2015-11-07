///<reference path="Components.ts"/>

import Col = ColJs.Col;
import Map = ColJs.ColMap;
import ColMap = ColJs.ColMap;

var jsonArray = [
    {"user": {"id": 100, "screen_name": "d_yoyo"}, "text": "to objects"},
    {"user": {"id": 155, "screen_name": "c_ps"}, "text": "glueee"},
    {"user": {"id": 130, "screen_name": "b_mskk"}, "text": "halo rami"},
    {"user": {"id": 301, "screen_name": "a_xbox"}, "text": "halo boris"}
];

var result = Col.of(jsonArray)
    .where(e -> e.user.id < 200)
    .orderBy(e -> e.user.id)
    .select(x -> x.user.screen_name + ':' + x.text)
    .toArray();

// output:
// ["d_yoyo:to objects", "b_mskk:halo rami", "c_ps:glueee"]

var words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique dictum nisl, ut eleifend metus cursus at. Sed dignissim maximus purus, sed hendrerit tellus suscipit sit amet. Cras ac elit quis dolor facilisis porta. Vestibulum sollicitudin dolor lacinia, dictum mi ut, laoreet nunc. Fusce eros urna, accumsan eu nisi in, pulvinar imperdiet lacus. Nullam mattis feugiat risus nec venenatis. Phasellus scelerisque ullamcorper turpis, ut auctor augue auctor id. Nunc id tristique risus. In tristique nisl vel enim blandit condimentum. Aenean id est orci. Sed congue, quam quis interdum lacinia, sem massa semper lectus, non auctor erat metus mollis leo. Nunc ullamcorper nisl vel dictum consequat. Nullam dapibus justo in neque rutrum, vitae elementum magna tempus. Nunc non fermentum dui. Proin volutpat est id est porttitor convallis.Maecenas varius sit amet elit id commodo. Morbi efficitur aliquam finibus. Suspendisse euismod lorem quis rutrum placerat. Mauris dignissim lacus ac odio sollicitudin eleifend. Praesenaugue a libero ultrices luctus et a diam. In rutrum pretium venenatis. Praesent rutrum sed eros nec commodo. Maecenas luctus vel tellus sit amet accumsan. Donec elementum, nibh id vehicula vestibulum, nulla nisl sollicitudin nisl, eget pretium erat massa in metus.Pellentesque in ligula urna. Cras rhoncus, magna nec dignissim molestie, velit purus malesuada libero, quis blandit eros libero ac turpis. Curabitur auctor, eros tincidunt aliquet consequat, urna augue semper ex, ac consequat nunc dui nec justo. Nam libero augue, eleifend aliquet fringilla eu, mattis nec justo. Sed cursus enim in gravida scelerisque. Curabitur nec condimentum dui. Cras eu purus interdum, mattis tellus quis, maximus augue. Nulla facilisi. Donec id felis ac augue sodales lobortis ut et arcu. Nam vehicula purus ut nisl elementum, eget efficitur erat congue. Aliquam placerat vel magna eget tincidunt.Etiam mattis et velit quis tempus. Mauris eget varius nibh, eget sagittis dolor. Duis mattis enim metus, eu tempus erat ultrices ut. Se sl massa, eget tincidunt lacus tempor et. Nullam nec dui viverra, fermentum sapien at, sollicitudin quam. Aenean vitae erat vehicula, euismod sapien ut, varius leo. Suspendisse turpis lacus, sodales et ligula ac, ultricies tristique arcu. Duis vel dapibus tortor. Donec rutrum diam ut nibh pharetra, sed condimentum nisi molestie. Curabitur vel porta ante. Donec mattis vel tortor at bibendum. Nullam eleifend bibendum sem in vestibulum.';
Col.of(words.replace(/[^a-z\sA-Z0-9]/gi, "").split(' ')).groupBy(x -> x).select(x -> {
    return {"word": x.key, "count": x.value.length}
}).orderByDesc(x => x.count).take(5).toArray();

/* output:
 [ { word: 'ut', count: 8 },
 { word: 'id', count: 7 },
 { word: 'vel', count: 7 },
 { word: 'nec', count: 7 },
 { word: 'in', count: 6 } ]
 */


