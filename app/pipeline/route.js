import RSVP from 'rsvp';
import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  routeAfterAuthentication: 'pipeline',
  model(params) {
    set(this, 'pipelineId', params.pipeline_id);

    return RSVP.hash({
      pipeline: get(this, 'store').findRecord('pipeline', params.pipeline_id),
      collections: this.store.findAll('collection')
    });
  },

  actions: {
    error(reason) {
      this.transitionTo('page-not-found', { path: `pipelines/${get(this, 'pipelineId')}`, reason });
    }
  },

  titleToken(model) {
    return get(model, 'appId');
  }
});
