ng-vega3
------------

Angular directive for rendering [Vega3](http://vega.github.io/) specs.
This project was forked and modified from [ng-vega](https://github.com/kristw/ng-vega) which was written for Vega 2.
The current version of ng-vega supports Vega 3.

### Demo

- [Simple demo](http://kristw.github.io/ng-vega) -- Select dataset/renderer to see the chart changes and see the [code](https://github.com/kristw/ng-vega/blob/master/examples/index.html) to see how it was implemented.
- [Vega editor demo](http://kristw.github.io/ng-vega/editor.html) -- Implement Vega editor using ng-vega.

For more information about Vega, please refer to [official documentation](http://vega.github.io/).

### Usage

```javascript
angular.module('exampleApp', ['ngVega3'])
```

```html
<div vega spec="spec" vega-data="testData" vega-renderer="'svg'"></div>
```

- `spec` is `$scope.spec` in your controller.

- `vega-data` (optional) can be used to pass dynamic data. In the example above, it is bound to `$scope.testData`. Data can be function to modify the values (Vega 3 syntax) or raw values (and ng-vega3 will convert it to function to make it work for you).

```javascript
$scope.testData = {
  // function to modify dataset name "table"
  table: function(data){
    data.remove(function(d){return true;})
      insert([{a: 3}, {a: 4}])
  }
}

$scope.testData = {
  // raw values for dataset name "table"
  table: [{a: 1},{a: 2}] 
}
```

- `vega-renderer` (optional) can be used to set renderer (`'canvas'` or `'svg'`). Don't forget the quote.

### Installation

```
bower install ng-vega3 --save
```

or

```
npm install ng-vega3 --save
```

### Import into your project

Angular module `ngVega3` will be available once you do one of the following:

##### Choice 1. Global

Adding this library via ```<script>``` tag is the simplest way. 

```html
<script src="path/to/angular.js"></script>
<script src="path/to/vega.js"></script>
<script src="path/to/ng-vega3.min.js"></script>
```

##### Choice 2: AMD

If you use requirejs, this library support AMD out of the box.

```javascript
require.config({
  paths: {
    angular:    'path/to/angular',
    vega:       'path/to/vega',
    'ng-vega3': 'path/to/ng-vega3'
  }
});
require(['ng-vega3'], function() {
  // do something
});
```

##### Choice 3: node.js / browserify

```javascript
require('ng-vega3');
```

### Author

Original work Copyright (c) 2016 Krist Wongsuphasawat
Modified work Copyright (c) 2017 Lima Lima Charlie, LLC.
