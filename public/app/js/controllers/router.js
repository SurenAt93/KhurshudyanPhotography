define(
[
  'jquery',
  'backbone',
  'underscore',
  'dispatcher',
],
function($, Backbone, _, Dispatcher) {

  return Backbone.Router.extend({

    initialize: function() {
      console.log('router runing');
    },

    routes: {
      '':       'start',
      '/':      'start',
      '*tab':   'open_tab',
    },

    start: function() {
      console.log('start!!!');
    },

    open_tab: function(tab) {
      $('meta[name=image]').attr('content', 'app/img/main.jpg');
      Dispatcher.trigger('open:' + tab);
    }
  });

});
