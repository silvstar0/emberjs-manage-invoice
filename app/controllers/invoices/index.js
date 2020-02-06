import Controller from '@ember/controller';
import QueryParams from 'ember-parachute';
import moment from 'moment';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { task } from "ember-concurrency";
import { inject as service } from '@ember/service';


export const myQueryParams = new QueryParams({
  selected: {
    as: 'date',
    defaultValue: null,
    refresh: true,

    serialize(value) {
      return moment(value).isValid()
        ? moment(value).format('YYYY-MM-DD')
        : value;
    },
    deserialize(value) {
      return moment(value).isValid()
        ? moment(value)
        : null;
    }
  }
});

export default Controller.extend(myQueryParams.Mixin, {
  store: service(),
  invoices: null,
  queryParamsChanged: or('queryParamsState.{date}.changed'),

  totalAmount: computed('invoices.[]', function () {
    return this.get('invoices').reduce((previousValue, item) => {
      return previousValue + +item.get('amount');
    }, 0);
  }),

  setup() {
    this.get('findInvoicesTask').perform();
  },

  queryParamsDidChange({ shouldRefresh }) {
    if (shouldRefresh) {
      this.get('findInvoicesTask').perform();
    }
  },

  findInvoicesTask: task(function* () {
    const selected = this.get('selected');
    const query = {};

    if (selected) {
      query.date = selected.format('YYYY-MM-DD');
    }

    yield this.get('store')
      .query('invoice', query)
      .then(invoices => {
        this.set('invoices', invoices);
      });
  }).drop(),

  actions: {
    destroyInvoice(invoice) {
      invoice.destroyRecord();
    },

    updateDay(_moment) {
      const selected = this.get('selected');

      if (selected) {
        if (selected.format('YYYY-MM-DD') === _moment.format('YYYY-MM-DD')) {
          this.set('selected', null);
          return;
        }
      }

      this.set('selected', moment(_moment.format('YYYY-MM-DD')));
    }
  }
});
