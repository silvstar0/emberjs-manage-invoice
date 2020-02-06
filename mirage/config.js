import moment from 'moment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `/api`, for example, if your API is namespaced
  this.timing = 800;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */


  this.get('/invoices', function (schema, request) {
    let invoicesByDateAsc;

    if (request.queryParams.date) {
      invoicesByDateAsc = schema.invoices.where({ date: request.queryParams.date });
    } else {
      invoicesByDateAsc = schema.invoices.all();
    }

    return invoicesByDateAsc.sort((a, b) => moment(a.date) - moment(b.date));
  });

  this.post('/invoices');
  this.get('/invoices/:id');
  this.patch('/invoices/:id');
  this.del('/invoices/:id');
}
