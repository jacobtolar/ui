import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import AddToCollectionMixin from 'screwdriver-ui/mixins/add-to-collection';

export default Controller.extend(AddToCollectionMixin, {
  session: service('session'),
  pipeline: alias('model')
});
