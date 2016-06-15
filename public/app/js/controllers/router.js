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
      '':             'start',
      '/':            'start',
      '*tab':         'open_tab',
      '*tab/img_num': 'open_image',
    },

    start: function() {
      console.log('start!!!');
    },

    open_tab: function(tab) {
      Dispatcher.trigger('open:' + tab);
    },

    open_image: function(tab, open_image) {
      Dispatcher.trigger('open:' + tab);
    }
  });

});
