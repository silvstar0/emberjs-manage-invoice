import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  model() {
    return this.store.createRecord('invoice', { date: moment() });
  },

  actions: {
    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});
