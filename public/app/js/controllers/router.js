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
      ':tab':   'open_tab',
    },

    start: function() {
      console.log('start!!!');
    },

    open_tab: function(tab) {
      console.log('ok');
      $('meta[name=image]').attr('content', 'app/img/main.jpg');
      $('meta[name=img_height]').attr('content', '316');
      $('meta[name=img_width]').attr('content', '477');
      Dispatcher.trigger('open:' + tab);
    }
  });

});
