var d3 = require('d3');

var module = require('ui/modules').get('kibana/gauge_meter', ['kibana']);

module.controller('gaugeMeterController', function ($scope, $element, $rootScope) {

	$scope.$watch('esResponse', function (resp) {
		if (resp.aggregations != null) {
			powerGauge.update((resp.aggregations[1].value / per) * 100);
			$scope.res = ((resp.aggregations[1].value / per) * 100);
		} else {
			powerGauge.update((resp.hits.total / per) * 100);
			$scope.res = ((resp.hits.total / per) * 100);
		}
	});
});