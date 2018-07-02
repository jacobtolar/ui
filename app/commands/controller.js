import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  command: service(),
  routeParams: computed('model', {
    get() {
      let route = this.get('model');
      let params = Object.assign({},
        route.paramsFor('commands.namespace'),
        route.paramsFor('commands.detail'),
      );

      return params;
    }
  }),
  crumbs: computed('routeParams', {
    get() {
      let breadcrumbs = [];
      let params = this.get('routeParams');

      if (params.namespace || params.detail) {
        breadcrumbs.push({
          name: 'Commands',
          params: ['commands']
        });
      }

      if (params.namespace) {
        breadcrumbs.push({
          name: params.namespace,
          params: ['commands.namespace', params.namespace]
        });
      }

      if (params.name) {
        breadcrumbs.push({
          name: params.name,
          params: ['commands.detail', params.namespace, params.name]
        });
      }

      return breadcrumbs;
    }
  })
});
