import 'plugins/gauge/gauge.less';
import 'plugins/gauge/gauge_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import template from 'plugins/gauge/gauge.html';
import params from 'plugins/gauge/gauge_params.html';
require('ui/registry/vis_types').register(gaugeProvider);

function gaugeProvider(Private) {
    const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);

    return new TemplateVisType({
        name: 'gaugeMeter',
        title: 'Gauge Meter',
        icon: 'fa-tachometer',
        description: 'Include a Gauge',
        template: template,
        params: {
            editor: params,
            defaults: {
                width: "200",
                height: "150"
            }
        },
        schemas: new Schemas([{
                group: 'metrics',
                name: 'metric',
                title: 'Metric',
                min: 1,
                max: 1,
                defaults: [{
                    type: 'count',
                    schema: 'metric'
                }]
            }

        ])
    });
}

export default gaugeProvider;