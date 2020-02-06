import Component from '@ember/component';
import { and } from '@ember/object/computed';

export default Component.extend({
  classNames: ['invoice-list-row', 'df-jcsb-aic'],
  classNameBindings: ['isDeleteInFlight:loading-spinner'],

  isDeleteInFlight: and('invoice.isDeleted', 'invoice.isSaving')
});
