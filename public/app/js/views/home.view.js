define(
[
  'jquery',
  'backbone',
  'underscore',
  'handlebars',
  'require.text!tpl/home.tpl', 
  'view_generator', 
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
        'image!app/img/main_slide/1.jpg',
        'image!app/img/main_slide/2.jpg',
        'image!app/img/main_slide/3.jpg',
        'image!app/img/main_slide/4.jpg',
        'image!app/img/main_slide/5.jpg',
        'image!app/img/main_slide/6.jpg',
      ],
      function(img1, img2, img3, img4, img5, img6) {
        $('head').append('<link rel="stylesheet" type="text/css" href="/app/css/main_slide.css">');
        $('#loading').fadeOut(400);
      });
    },

    render: function() {
      this.$el.html(this.template({}));
    },
  })

})