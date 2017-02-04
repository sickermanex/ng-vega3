var example = angular.module('exampleApp', ['ngVega3']);

example.controller('BarChartController', function($scope) {
  $scope.renderer = 'canvas';
  $scope.spec = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 300,
    "height": 200,
    "padding": 5,

    "data": [
      {
        "name": "table"
      }
    ],

    "scales": [
      {
        "name": "xscale",
        "type": "band",
        "range": "width",
        "domain": {"data": "table", "field": "x"}
      },
      {
        "name": "yscale",
        "type": "linear",
        "range": "height",
        "domain": {"data": "table", "field": "y"},
        "zero": true,
        "nice": true
      }
    ],

    "axes": [
      {"orient": "bottom", "scale": "xscale"},
      {"orient": "left", "scale": "yscale"}
    ],

    "marks": [
      {
        "type": "rect",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "x": {"scale": "xscale", "field": "x", "offset": 1},
            "width": {"scale": "xscale", "band": 1, "offset": -1},
            "y": {"scale": "yscale", "field": "y"},
            "y2": {"scale": "yscale", "value": 0}
          },
          "update": {
            "fill": {"value": "steelblue"}
          },
          "hover": {
            "fill": {"value": "red"}
          }
        }
      }
    ]
  };

  var data1 = {
    table: [
      {"x": 1,  "y": 280}, {"x": 2,  "y": 55},
      {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
      {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
      {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
      {"x": 9,  "y": 52}, {"x": 10, "y": 48},
      {"x": 11, "y": 24}, {"x": 12, "y": 49},
      {"x": 13, "y": 87}, {"x": 14, "y": 66},
      {"x": 15, "y": 17}, {"x": 16, "y": 27},
      {"x": 17, "y": 68}, {"x": 18, "y": 16},
      {"x": 19, "y": 49}, {"x": 20, "y": 15}
    ]
  };
  var data2 = {
    table: [
      {"x": 1,  "y": 2}, {"x": 2,  "y": 55},
      {"x": 3,  "y": 1}, {"x": 4,  "y": 91},
      {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
      {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
      {"x": 9,  "y": 52}, {"x": 10, "y": 48},
      {"x": 11, "y": 24}, {"x": 12, "y": 49},
      {"x": 13, "y": 87}, {"x": 14, "y": 66},
      {"x": 15, "y": 17}, {"x": 16, "y": 27}
    ]
  };

  $scope.testData = data1;
  $scope.data1 = data1;
  $scope.data2 = data2;
});
