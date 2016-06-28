define(
[
  'jquery.mousewheel',
  'backbone',
  'underscore',
  'handlebars',
  'modernizr',
  'toucheffects',
  'require.text!tpl/nature.tpl',
],
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, ProductTpl) {
  return Backbone.View.extend({

    el: '#product',
    template: Handlebars.compile(ProductTpl),
    events: {
      'click .load_more': 'load_more_images',
      'click li a':       'zoom_image',
    },

    initialize: function() {
      var self = this;
      this.images_count;
      this.image_index = 1;
      this.images = [];
      this.end_flag = false;
      this.slider_index = 0;
      this.preload_index = 1;
      $.get( "/get_product_images_count", function(data) {
        self.images_count = data.img_count/2;
        self.load_more_images();
        self.$('.image_container').mousewheel(function(e, delta) {
          this.scrollLeft -= (delta * 30);
          e.preventDefault();
        });
      });
    },

    render: function(img, image_index) {
      this.$('.image_container').append(this.template({image_index}));
      this.$(this.$('.image_container figure > div')[image_index - 1])
          .html(img);
    },

    preload_images: function() {
      var self = this;
      if($('body').data('active_view') == 'product' && $('body').data('preload')) {
        if(this.preload_index <= this.images_count/2) {
          require(
          [
            'image!app/img/product/' + self.preload_index + '.jpg'
          ],
          function() {
            self.preload_index++;
            self.preload_images();
          });
        }
      }
    },

    load_more_images: function(e) {
      this.$('.load_more_section').hide();
      this.$('.preloader-anim').css('display', 'inline-block');;
      var self = this;
      var images_count;
      if (this.image_index + 10 <= this.images_count) {
        images_count = 10;
      } else {
        images_count = this.images_count - this.image_index;
      }
      self.images = [];
      for (var i = this.image_index; i < images_count + this.image_index; i++) {
        self.images.push('image!app/img/product/' + i + '.min.jpg');
      }
      if (self.images.length < 10) {
        self.end_flag = true;
      }
      requirejs(
      self.images,
      function(
        img_001, img_002, img_003, img_004, img_005,
        img_006, img_007, img_008, img_009, img_010
      ) {
        self.preload_images();
        var img_arr = arguments;
        for(var i = 0; i < img_arr.length; i++) {
          self.render(img_arr[i], self.image_index);
          self.image_index++;
        }
        Toucheffects();
        this.$('.load_more_section').css('display', 'inline-block');;
        this.$('.preloader-anim').hide();
        if (self.end_flag) {
          this.$('.load_more_section').hide();
        }
        $('#loading').fadeOut(500);
        $('#content').children().hide();
        self.$el.fadeIn(150);
      });
    },

    zoom_image: function(e) {
      var img_src = $($(e.target).parents('figure')
                      .find('img')).attr('src');
      var img_src = img_src.substr(0, img_src.length - 8) + '.jpg';
      $('#gallery').fadeIn(200);
      $('#gallery_img').attr('src', img_src);
      $(document).bind('keydown', _.bind(this.hide_gallery, this));
      $('#close_gallery').bind('click', _.bind(this.hide_gallery, this));
      // gallery events
      $('#gallery #left_img').bind('click', _.bind(this.get_left_slide, this));
      $('#gallery #right_img').bind('click', _.bind(this.get_right_slide, this));
    },

    hide_gallery: function(e) {
      var key_code = e.keyCode || e.which;
      if(key_code == 27 || $(e.target).attr('id') == 'close_gallery') {
        $('#gallery').hide();
        $(document).off('keydown');
        $('#close_gallery').off('click');
        $('#gallery #left_img').off('click');
        $('#gallery #right_img').off('click');
      }
      if(key_code == 37) {
        $('#gallery #left_img').trigger('click');
      }
      if(key_code == 39) {
        $('#gallery #right_img').trigger('click'); 
      }
    },

    get_right_slide: function(e) {
      $('#gallery_preloader').fadeIn(110);
      var img = $(e.target).parent().find('img');
      var self = this;
      img.fadeOut(420, function() {
        if(self.slider_index < (self.images_count - 1)) {
          self.slider_index++;
          var img_url = 'app/img/product/' + self.slider_index + '.jpg';
          requirejs(
          [
            'image!' + img_url,
          ],
          function(test_img) {
            img.attr('src', img_url);
            $('#gallery_preloader').fadeOut(110);
            img.fadeIn(420);
            $('#gallery #left_img').show();
          });
        } else {
          img.attr('src', 'app/img/product/' + (self.images_count - 1) + '.jpg')
            .show();
          $(e.target).hide();
          $('#gallery_preloader').fadeOut(110);
        }
      });
    },

    get_left_slide: function(e) {
      $('#gallery_preloader').fadeIn(110);
      var img = $(e.target).parent().find('img');
      var self = this;
      img.fadeOut(420, function() {
        if(self.slider_index > 1) {
          self.slider_index--;
          var img_url = 'app/img/product/' + self.slider_index + '.jpg';
          requirejs(
          [
            'image!' + img_url,
          ],
          function(test_img) {
            img.attr('src', img_url);
            $('#gallery_preloader').fadeOut(110);
            img.fadeIn(420);
            $('#gallery #left_img').show();
          });
          img.attr('src', 'app/img/product/' + self.slider_index + '.jpg');
          img.fadeIn(420);
          $('#gallery #right_img').show();
        } else {
          img.attr('src', 'app/img/product/' + 1 + '.jpg')
            .show();
          $(e.target).hide();
          $('#gallery_preloader').fadeOut(110);
        }
      });
    }
  })
})