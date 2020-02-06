import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('invoice', params.invoice_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('isUpdated', false);
  },

  actions: {
    willTransition() {
      let controller = this.controller;

      controller.set('isUpdated', false);
      controller.get('model').rollbackAttributes();
    },

    error(error) {
      if (error.errors[0].status === '404') {
        this.replaceWith('invoices');
      } else {
        return true;
      }
    }
  }
});
