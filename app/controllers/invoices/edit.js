import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  invoice: alias('model'),
  isUpdated: false,

  updateInvoiceTask: task(function* (invoice) {
    yield invoice.save().then(() => {
      this.set('isUpdated', true);
    });
  }).drop(),

  actions: {
    turnToEditAgain() {
      this.set('isUpdated', false);
    }
  }
});
