define(
[
  'jquery.mousewheel',
  'backbone',
  'underscore',
  'handlebars',
  'modernizr',
  'toucheffects',
  'require.text!tpl/portraits/11.tpl',
],
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, MainTpl) {
  return Backbone.View.extend({

    el: '#portraits',
    template: Handlebars.compile(MainTpl),
    events: {
      'click .load_more': 'load_more_images',
      'click li a':       'zoom_image',
    },

    test: function(e) {

      // wheelDelta не дает возможность узнать количество пикселей
      var delta = e.deltaY || e.detail || e.wheelDelta;
      console.log(delta);
      this.$('.image_container').scrollLeft(delta*40);
    },

    initialize: function() {
      var self = this;
      self.images = [];
      for(var i = 1; i < 11; i++) {
        self.images.push('image!app/img/portraits/' + i + '.jpg');
      }
      self.image_index = i;
      this.render();
      requirejs(
      [
        'image!app/img/portraits/main.jpg'
      ],
      function() {
        self.$el.css('background-image',
          'url("app/img/portraits/main.jpg")');
        requirejs(
        self.images,
        function(
          img_001, img_002, img_003, img_004, img_005,
          img_006, img_007, img_008, img_009, img_010
        ) {
          var img_arr = arguments;
          console.log('all images loaded!!!');
          setTimeout(function() {
            for(var i = 0; i < 11; i++) {
              self.$(self.$('.image_container figure > div')[i])
                  .append(img_arr[i]);
            }
            Toucheffects();
            $('#loading').fadeOut(500);
            $('#content').children().hide();
            self.$el.fadeIn(150);
          }, 10);
        });
      });
      this.$('.image_container').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 30);
        e.preventDefault();
      });
    },

    render: function() {
      this.$('.image_container').append(this.template({}));
      // for the render fb objects
      window.fbAsyncInit();
    },

    load_more_images: function(e) {
      this.$('.load_more_section').hide();
      this.$('.preloader-anim').show();
      this.images = [];
      for(var i = this.image_index; i < (this.image_index + 10); i++) {
        this.images.push('image!app/img/portraits/' + i + '.jpg');
      }
      this.image_index = i;
      var self = this;
      requirejs(
      [
        'require.text!tpl/portraits/' + this.image_index + '.tpl'        
      ],
      function(ImagesTpl) {
        self.template = Handlebars.compile(ImagesTpl);
        self.render();
        requirejs(
          self.images,
          function(
            img_001, img_002, img_003, img_004, img_005,
            img_006, img_007, img_008, img_009, img_010
          ) {
            var img_arr = arguments;
            for(var i = 0; i < 10; i++) {
              if (img_arr[i]) {
                self.$(self.$('.image_container figure > div')
                    [self.image_index + i - 11])
                    .append(img_arr[i]);
              } else {
                var null_images_index = self.image_index + i - 11;
                var stack = null_images_index;
                if(!self.isInteger(null_images_index)) {
                  null_images_index /= 10;
                  null_images_index = Math.ceil(null_images_index);
                  null_images_index *= 10;
                } else {
                  null_images_index += 10;
                }
                for(var i = stack; i < null_images_index; i++) {
                  self.$(self.$('.image_container li')[i]).hide();
                }
                self.$('.load_more_section').hide();
                Toucheffects();
                return;
              }
            }
            Toucheffects();
            this.$('.load_more_section').show();
            this.$('.preloader-anim').hide();
          }
        );
      });
    },

    isInteger: function(num) {
      return (num ^ 0) === num;
    },

    zoom_image: function(e) {
      var img_src = $($(e.target).parents('figure')
                      .find('img')).attr('src');
      $('#gallery').fadeIn(200);
      $('#gallery_img').attr('src', img_src);
      $(document).bind('keydown', _.bind(this.hide_gallery, this));
      $('#close_gallery').bind('click', _.bind(this.hide_gallery, this));
    },

    hide_gallery: function(e) {
      var key_code = e.keyCode || e.which;
      if(key_code == 27 || $(e.target).attr('id') == 'close_gallery') {
        $('#gallery').hide();
        $(document).off('keydown');
      }
    },

  })
})