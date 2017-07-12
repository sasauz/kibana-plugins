import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';
import {
  assign
} from 'lodash';

const module = uiModules.get('kibana/sla_grid', ['kibana']);

module.controller('sla_grid_controller', function ($scope, $element, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);

  $scope.rec = {};

  $scope.processTableGroups = function (tableGroups) {
    var resp = [];
    tableGroups.tables.forEach(function (table) {
      table.rows.forEach(function (row, i) {
        var respRow = {}
        row.forEach(function (field, i1) {
          if (field.type === "bucket") {
            respRow[field.aggConfig.params.customLabel] = field.value;
          }
        });
        resp.push(respRow);
      });
    });
    return resp;
  };

  $scope.cellMerging = function (obj) {
    var chklist = [];
    var resp = [];
    obj.forEach(function (rec) {
      var props = {};
      var res = [];
      for (var prop in rec) {
        props[prop] = rec[prop];
        var founfFlag = false;
        for (var index = 0; index < chklist.length; index++) {
          var element = chklist[index];
          if (_.isEqual(_.clone(props), element)) {
            founfFlag = true;
            break;
          }
        }
        if (!founfFlag) {
          chklist.push(_.clone(props));
          res.push({
            val: rec[prop],
            prop: prop,
            rowspan: _.filter(obj, _.clone(props)).length
          });
        }
      }
      resp.push(res);
    });
    return resp;
  };

  $scope.color = function (key) {
    if (key === 'G') {
      return "#43B049";
    } else if (key === 'R') {
      return "#E05526";
    } else {
      return "#F4BD0C";
    }
  };

  // $scope.sortFunction = function(key){

  // }

  $scope.$watch('esResponse', function (newval, oldval) {

    if (newval) {

      var tableGroups = tabifyAggResponse($scope.vis, newval, {
        asAggConfigResults: true
      });
      var process_tableGroups = $scope.processTableGroups(tableGroups);

      $scope.tableHeader = Object.keys(process_tableGroups[0]);

      $scope.tableGroups = $scope.cellMerging(process_tableGroups);

      $scope.hasSomeRows = tableGroups.tables.some(function haveRows(table) {
        if (table.tables) return table.tables.some(haveRows);
        return table.rows.length > 0;
      });

      console.log($scope.tableGroups);
    }
  });
});