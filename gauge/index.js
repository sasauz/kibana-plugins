module.exports = function(kibana) {
	return new kibana.Plugin({
		//Plugin configuration
		uiExports: {
			visTypes: [ 'plugins/gauge-meter/gauge_meter_controller' ]
		}
	});
};