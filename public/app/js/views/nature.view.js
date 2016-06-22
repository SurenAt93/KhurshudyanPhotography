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
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, NatureTpl) {
  return Backbone.View.extend({

    el: '#nature',
    template: Handlebars.compile(NatureTpl),
    events: {
      'click .load_more':   'load_more_images',
      'click li a':         'zoom_image',
      'click .active_item': 'zoom_image',
      'click img':           'pre_zoom_image',
    },

    pre_zoom_image: function(e) {
      var scroll_path;
      console.log(this.$(this.$(e.target)).attr('name'), this.$('img.active_item').attr('name'));
      if (this.$('.image_container').scrollLeft() != 0) {
        if (this.$(this.$(e.target)).attr('name') > this.$('img.active_item').attr('name')) {
          scroll_path = this.$(this.$(e.target)).width() +
                        this.$('.image_container').scrollLeft();
        } else {
          scroll_path = this.$('.image_container').scrollLeft() -
                          this.$(this.$(e.target)).width();
        }
        this.$('.image_container').animate({
          scrollLeft: scroll_path 
        }, 550, 'easeOutSine');
      } else {
        this.$('.image_container').scrollLeft(1);
      }
      this.$('.active_item').removeClass('active_item');
      this.$(e.target).addClass('active_item').parent().addClass('active_item');
    },

    initialize: function() {
      var self = this;
      this.images_count;
      this.image_index = 1;
      this.images = [];
      this.end_flag = false;
      this.slider_index = 0;
      requirejs(
      [
        'image!app/img/nature/main.jpg'
      ],
      function() {
        self.$el.css('background-image',
          'url("app/img/nature/main.jpg")');
      });
      $.get( "/get_nature_images_count", function(data) {
        self.images_count = data.img_count;
        self.load_more_images();
        self.$('.image_container').mousewheel(function(e, delta) {
          this.scrollLeft -= (delta * 80);
          // self.$('.active_item').removeClass('active_item')
          //     .parents('li').next().find('img').addClass('active_item')
          //     .parent().addClass('active_item');
          e.preventDefault();
        });
      });
    },

    render: function(img, image_index) {
      img.setAttribute('name', image_index);
      this.$('.image_container').append(this.template({image_index}));
      this.$(this.$('.image_container figure > div')[image_index - 1])
          .html(img);
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
        self.images.push('image!app/img/nature/' + i + '.min.jpg');
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
        var img_arr = arguments;
        for (var i = 0; i < img_arr.length; i++) {
          self.render(img_arr[i], self.image_index);
          self.image_index++;
        }
        self.$(self.$('img')[2]).addClass('active_item').parent().addClass('active_item');
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
      var self = this;
      var img_src = $($(e.target).parents('figure')
                      .find('img')).attr('src');
      var img_src = img_src.substr(0, img_src.length - 8) + '.jpg';
      $('#gallery_img').attr('src', '');
      $('#gallery').fadeIn(200);
      $('#gallery_preloader').fadeIn(110);
      require(
      [
        'image!' + img_src,
      ], function() {
        $('#gallery_img').attr('src', img_src);
        $('#gallery_preloader').fadeOut(110);
        $(document).bind('keydown', _.bind(self.hide_gallery, self));
        $('#close_gallery').bind('click', _.bind(self.hide_gallery, self));
        // gallery events
        $('#gallery #left_img').bind('click', _.bind(self.get_left_slide, self));
        $('#gallery #right_img').bind('click', _.bind(self.get_right_slide, self));
      });
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
          var img_url = 'app/img/nature/' + self.slider_index + '.jpg';
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
          img.attr('src', 'app/img/nature/' + (self.images_count - 1) + '.jpg')
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
          var img_url = 'app/img/nature/' + self.slider_index + '.jpg';
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
          img.attr('src', 'app/img/nature/' + self.slider_index + '.jpg');
          img.fadeIn(420);
          $('#gallery #right_img').show();
        } else {
          img.attr('src', 'app/img/nature/' + 1 + '.jpg')
            .show();
          $(e.target).hide();
          $('#gallery_preloader').fadeOut(110);
        }
      });
    }
  })
})