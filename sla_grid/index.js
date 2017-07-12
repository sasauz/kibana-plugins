'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (kibana) {

  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/sla_grid/sla_grid']
    }
  });
};

module.exports = exports['default'];
