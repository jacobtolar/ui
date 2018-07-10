import Component from '@ember/component';

export default Component.extend({
  classNames: ['add-to-collection-wrapper'],
  actions: {
    openModal() {
      this.set('showModal', true);
    },
    addToCollection(pipelineId, collection) {
      return this.get('onAddToCollection')(+pipelineId, collection.id)
        .then(() => {
          if (this.get('messageHandler')) {
            this.get('messageHandler')(
              `Successfully added Pipeline to ${collection.get('name')}`, null
            );
          }
        })
        .catch(() => {
          if (this.get('messageHandler')) {
            this.get('messageHandler')(null, `Could not add Pipeline to ${collection.get('name')}`);
          }
        });
    }
  }
});
