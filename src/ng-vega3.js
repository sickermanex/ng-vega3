// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    define(['angular', 'vega'], factory);
  }
  else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('angular'), require('vega'));
  }
  else {
    // Just define it in angular and done
    factory(root.angular, root.vega);
  }
}(this, function (angular, vega) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

  function debounce(func, wait) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      // return caller for chaining
      return context;
    };
  }

  return angular.module('ngVega3', [])
    .directive('vega', function() {
      return {
        restrict: 'AE',
        scope: {
          spec: '=',
          data: '=vegaData',
          renderer: '=vegaRenderer'
        },
        link: function(scope, elements, attrs) {
          var element = elements[0];
          var view;
          var processedData/*ChangeSet*/;

          function parse(){
            var runtime = vega.parse(scope.spec);
            view = new vega.View(runtime)
                          .logLevel(vega.Warn)
                          .initialize(element)
                          .renderer(scope.renderer || 'svg')
                          .hover();
            Object.keys(processedData).forEach(function(key){
              view.change(key, processedData[key]);
            });
            view.run();
          }

          var debouncedParse = debounce(parse, 50);

          scope.$watch('spec', debouncedParse, true);

          scope.$watch('data', function(data){
            processedData = {};

            if(angular.isDefined(data)){
              Object.keys(data).forEach(function(key){
                var value = data[key];
                processedData[key] = angular.isFunction(value) 
                                        ? value 
                                        : vega.changeset()
                                                .remove(function(d){return true;})
                                                .insert(value);
                if(view) { view.change(key, processedData[key]); }
              });
            }
            if(view){
              view.run();
            }else{
              debouncedParse();
            }
          }, true);

          scope.$watch('renderer', function(renderer){
            if(view){
              view.renderer(renderer).run();
            }
            else{
              debouncedParse();
            }
          });
        }
      };
    });

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));