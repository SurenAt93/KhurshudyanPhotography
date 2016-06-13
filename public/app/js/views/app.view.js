define(
[
  'jquery',
  'backbone',
  'handlebars',
  'dispatcher',
  // 'require.text!templates/app.tpl',
],
function($, Backbone, Handlebars, Dispatcher) {
  return Backbone.View.extend({

    el: '#content',
    
    initialize: function() {
      this.updateCSS();
      $(window).bind('resize', _.bind(this.updateCSS, this));
    },

    updateCSS: function() {
      this.$el.height($(window).height());
    },

  });
})