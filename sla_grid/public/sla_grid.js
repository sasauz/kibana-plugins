import 'plugins/sla_grid/sla_grid.less';
import 'plugins/sla_grid/sla_grid_controller';
import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import template from 'plugins/sla_grid/sla_grid.html';
import params from 'plugins/sla_grid/sla_grid_params.html';
require('ui/registry/vis_types').register(ServiceLeaderProvider);

function ServiceLeaderProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  return new TemplateVisType({
    name: 'sla_grid',
    title: 'SLA GRID',
    icon: 'fa-table',
    description: 'Cloned for Data Table with few changes',
    template: template,
    params: {
      defaults: {
        perPage: 10,
        expression: '',
        sort: {
          columnIndex: null,
          direction: null
        }
      }
    },
    editor: params,
    implementsRenderComplete: true,
    hierarchicalData: function (vis) {
      return Boolean(vis.params.showPartialRows || vis.params.showMeticsAtAllLevels);
    },
    schemas: new Schemas([{
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 0,
        max: 1,
        defaults: [{
          type: 'count',
          schema: 'metric'
        }]
      },
      {
        group: 'buckets',
        name: 'bucket',
        title: 'Add Column',
        aggFilter: ['terms']
      }
    ])
  });
}

export default ServiceLeaderProvider;