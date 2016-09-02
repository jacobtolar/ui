import Ember from 'ember';
import ENV from 'screwdriver-ui/config/environment';

export default Ember.Component.extend({
  classNameBindings: ['isOpen'],
  // flag: if logs are currently being processed
  isLoading: false,
  // flag: if there are logs left to load
  finishedLoading: false,
  // log panel is visible
  isOpen: false,
  // last line processed in log loader
  lastLine: 0,

  // Start loading logs immediately upon inserting the element if the panel is open
  didInsertElement() {
    this._super(...arguments);

    if (this.get('isOpen')) {
      this.logs();
    }
  },

  /**
   * Listener to determine if log loading should begin.
   * Should only kick off log loading if "isOpen" changes to true
   * @method didUpdateAttrs
   */
  didUpdateAttrs(config) {
    this._super(...arguments);
    // Call only if recently opened
    if (config.oldAttrs.isOpen.value !== config.newAttrs.isOpen.value &&
        config.newAttrs.isOpen.value) {
      this.logs();
    }
  },
  /**
   * Determines if log loading should occur
   * - step must have a defined start time (it is, or has executed)
   * - the log panel must be open
   * - the log call must not be in processing already
   * - the step must have logs left to load
   * @property {Boolean} shouldLoad
   */
  shouldLoad: Ember.computed('step.startTime', 'isOpen', 'isLoading', 'finishedLoading', {
    get() {
      return this.get('step.startTime') !== undefined &&
        this.get('isOpen') &&
        !this.get('isLoading') &&
        !this.get('finishedLoading');
    }
  }),
  /**
   * Log loader
   * Populates container's logs with data from request(s)
   * @method logs
   */
  logs() {
    if (this.get('shouldLoad')) {
      const buildId = this.get('buildId');
      const name = this.get('step.name');
      const logContainer = this.$('.logs');
      const logNumber = this.get('lastLine');

      // Flag so we don't fire new requests while waiting for this to return
      this.set('isLoading', true);

      // Fetch logs
      const url = `${ENV.APP.SDAPI_HOSTNAME}/${ENV.APP.SDAPI_NAMESPACE}/builds/` +
        `${buildId}/steps/${name}/logs`;

      Ember.$.ajax({ url, data: { from: logNumber } })
        .done((data, textStatus, jqXHR) => {
          if (Array.isArray(data) && data.length) {
            // Add lines to log container
            data.forEach(line => {
              logContainer.append(`${ansi_up.ansi_to_html(line.m)}\n`);
            });
            // Update the last line we processed for next load
            this.set('lastLine', data[data.length - 1].n + 1);
            // Set flag for done based on headers
            this.set('finishedLoading', jqXHR.getResponseHeader('x-more-data') === 'false');
          }
        })
        .always(() => {
          // Unset loading flag and try again soon.
          this.set('isLoading', false);
          setTimeout(() => { this.logs(); }, 1000);
        });
    }
  }
});