import { moduleForComponent, test } from 'ember-qunit';
import EmberObject from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

const mockCollection = {
  id: 1,
  name: 'Test',
  description: 'Test description',
  get: name => name
};

moduleForComponent('collection-add-button', 'Integration | Component | collection add button', {
  integration: true
});

test('it renders', function (assert) {
  this.set('collections', [EmberObject.create(mockCollection)]);
  this.set('pipeline', { id: 1 });
  this.set('onAddToCollection', true);

  this.render(hbs`{{collection-add-button
    collections=collections
    pipeline=pipeline
    onAddToCollection=onAddToCollection
  }}`);

  // the button should be there
  assert.equal(this.$('.add-to-collection').length, 1);

  // there should be two list items ('Test' and 'CREATE')
  assert.equal(this.$('.add-to-collection + ul > li').length, 2);

  // Validate that list items exist
  assert.equal(this.$('.add-to-collection + ul > li:nth-child(1)').text().trim(), 'Test');
  assert.equal(this.$('.add-to-collection + ul > li:nth-child(2)').text().trim(), 'CREATE');
});
