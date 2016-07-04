define(
[
  'jquery.mousewheel',
  'backbone',
  'underscore',
  'handlebars',
  'modernizr',
  'toucheffects',
  'require.text!tpl/commercial.tpl',
  'dispatcher',
],
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, CommercialTpl, Dispatcher) {
  return Backbone.View.extend({

    el: '#commercial',
    template: Handlebars.compile(CommercialTpl),
    events: {
      'click li a':   'open_commercial_tabs',
    },

    initialize: function() {
      this.render();      
    },

    render: function(img, image_index) {
      var self = this;
      this.$el.append(this.template({}));
      require(
      [
        'image!app/img/commercial/1.jpg',
        'image!app/img/commercial/2.jpg',
        'image!app/img/commercial/3.jpg',
        'image!app/img/commercial/4.jpg',
        'image!app/img/commercial/5.jpg',
      ], function(img1, img2, img3, img4, img5) {
        var arr_img = arguments;
        self.$('.grid li a').each(function(i, li) {
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
          $('#content').children().hide();
          $('#commercial').fadeIn(150);
          $('#loading').fadeOut();
        });
      });
    },

    open_commercial_tabs: function(e) {
      var selected_tab_name = this.$(e.target).parents('a').attr('value');
      var view      = selected_tab_name;
      var dom_elem  = '#' + selected_tab_name;
      Dispatcher.trigger('open:gallery_view_generator', {
        view: view,
        dom_elem: dom_elem,
      });
    }
  });
});