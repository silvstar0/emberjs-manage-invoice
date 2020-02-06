import Controller from '@ember/controller';
import moment from 'moment';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  store: service(),

  saveInvoiceTask: task(function* (model) {
    yield model.save();
  }).drop(),

  actions: {
    turnToCreateNewInvoice() {
      this.set('model', this.get('store').createRecord('invoice', { date: moment() }));
    }
  }
});
