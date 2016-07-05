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
      '':                 'start',
      '/':                'start',
      ':tab':             'open_tab',
      ':tab/:open_image': 'open_image',
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
        case 'kids':
        case 'other':
        case 'wedding_day':
        case 'photo_shoot':
        case 'product':
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
      this.tab = tab;
      var self = this;
      $('#loading').fadeIn(500);
      var image_url = 'app/img/' + tab + '/' + open_image + '.jpg';
      this.open_tab(this.tab);
      require(
      [
        'image!' + image_url
      ],
      function() {
        $('#gallery #left_img').hide();
        $('#gallery #right_img').hide();
        $('#gallery').fadeIn(200);
        $('#gallery_img').attr('src', 'app/img/' + tab + '/' + open_image + '.jpg');
        $('#loading').fadeOut(500);
        $('#close_gallery').bind('click', _.bind(self.hide_gallery, self));
      })
    },
    hide_gallery: function() {
      $('#gallery').fadeOut(200);
      // $('#close_gallery').off('click');
      $('#gallery_img').attr('src', '');
    }
  });

});
