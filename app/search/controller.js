import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import Controller from '@ember/controller';
import AddToCollectionMixin from 'screwdriver-ui/mixins/add-to-collection';

export default Controller.extend(AddToCollectionMixin, {
  session: service(),
  pipelines: reads('model.pipelines'),
  collections: reads('model.collections'),
  query: reads('model.query')
});
