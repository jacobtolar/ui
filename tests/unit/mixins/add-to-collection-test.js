import EmberObject from '@ember/object';
import AddToCollectionMixin from 'screwdriver-ui/mixins/add-to-collection';
import { module, test } from 'qunit';

module('Unit | Mixin | add to collection');

// Replace this with your real tests.
test('it works', function (assert) {
  let AddToCollectionObject = EmberObject.extend(AddToCollectionMixin);
  let subject = AddToCollectionObject.create();

  assert.ok(subject);
});
