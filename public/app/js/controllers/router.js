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
      ':tab':         'open_tab',
      ':tab/img_num': 'open_image',
    },

    start: function() {
      console.log('start!!!');
      Dispatcher.trigger('open:home');
    },

    open_tab: function(tab) {
      var view;
      var dom_elem;
      switch(tab) {
        case 'home':
        case 'about':
        case 'contact':
        case 'commercial':
          Dispatcher.trigger('open:' + tab);
          break;
        case 'portraits':
        case 'gallery':
        case 'nature':
          view      = tab;
          dom_elem  = '#' + tab;
          if (tab == 'gallery') {
            dom_elem  = '#gallery_o';
          }
          Dispatcher.trigger('open:gallery_view_generator', {
            view: view,
            dom_elem: dom_elem,
          });
          break;
      }
    },

    open_image: function(tab, open_image) {
      Dispatcher.trigger('open:' + tab);
    }
  });

});
