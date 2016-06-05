define(
[
  'backbone',
  'underscore'
],
function(Backbone, _) {

  return Backbone.Router.extend({

    routes: {
      '':       'start',
      '/':      'start',
      ':tab':   'router_test'
    },

    start: function() {
      console.log('start!!!');
    },

    // test
    router_test: function(tab) {
      console.log(tab);
    }
  });

});
