define(
[
  'jquery.mousewheel',
  'backbone',
  'underscore',
  'handlebars',
  'modernizr',
  'toucheffects',
  'require.text!tpl/commercial.tpl',
],
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, CommercialTpl) {
  return Backbone.View.extend({

    el: '#commercial',
    template: Handlebars.compile(CommercialTpl),
    events: {
      'click .load_more': 'load_more_images',
      'click li a':       'zoom_image',
    },

    initialize: function() {
      this.render();      
    },

    render: function(img, image_index) {
      var self = this;
      this.$el.append(this.template({}));
      this.$el.show();
      require(
      [
        'image!app/img/commercial/1.jpg',
        'image!app/img/commercial/2.jpg',
        'image!app/img/commercial/3.jpg',
        'image!app/img/commercial/4.jpg',
        'image!app/img/commercial/5.jpg',
      ], function(img1, img2, img3, img4, img5) {
        var arr_img = arguments;
        this.$('.grid li a').each(function(i, li) {
          self.$(li).append(arr_img[i]);
          self.$(arr_img[i]).addClass('grid__img').addClass('layer');
        });
        require(
        [
          'commercial.dynamics',
          'commercial.main',
        ], function(dynamics, IsoGrid) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          new IsoGrid(document.querySelector('.isolayer--deco1'), {
            transform : 'translateX(33vw) translateY(-340px) rotateX(45deg) rotateZ(45deg)',
            stackItemsAnimation : {
              properties : function(pos) {
                return {
                  translateZ: (pos+1) * 30,
                  rotateZ: getRandomInt(-4, 4)
                };
              },
              options : function(pos, itemstotal) {
                return {
                  type: dynamics.bezier,
                  duration: 500,
                  points: [{"x":0,"y":0,"cp":[{"x":0.2,"y":1}]},{"x":1,"y":1,"cp":[{"x":0.3,"y":1}]}],
                  delay: (itemstotal-pos-1)*40
                };
              }
            }
          });
          $('#loading').fadeOut();
        });
      });
    }
  });
});