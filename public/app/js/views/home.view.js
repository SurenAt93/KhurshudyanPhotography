define(
[
  'jquery',
  'backbone',
  'underscore',
  'handlebars',
  'require.text!tpl/home.tpl',  
],
function($, Backbone, _, Handlebars, HomeTpl) {

  return Backbone.View.extend({

    el: '#home',
    template: Handlebars.compile(HomeTpl),

    events: {
      'click #play_video': 'play_video',
    },

    initialize: function() {
      this.render();
      var self = this;
      requirejs(
      [
        'image!app/img/portraits/3.jpg',
        'image!app/img/portraits/38.jpg',
        'image!app/img/commercial/7.jpg',
        'image!app/img/nature/main.jpg',
        'image!app/img/wtp/16.jpg',
        'image!app/img/wtp/37.jpg',
      ],
      function(img1, img2, img3, img4, img5, img6) {
        $('head').append('<link rel="stylesheet" type="text/css" href="/app/css/main_slide.css">');
        setTimeout(function() {
          $('#loading').fadeOut(400);
        }, 350);
      });
    },

    render: function() {
      this.$el.html(this.template({}));
    },
  })

})