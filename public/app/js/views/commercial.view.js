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
      var self = this;
      this.images_count;
      this.image_index = 1;
      this.images = [];
      this.end_flag = false;
      requirejs(
      [
        'image!app/img/commercial/main.jpg'
      ],
      function() {
        self.$el.css('background-image',
          'url("app/img/commercial/main.jpg")');
      });
      $.get( "/get_commercial_images_count", function(data) {
        self.images_count = data.img_count;
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

    load_more_images: function(e) {
      this.$('.load_more_section').hide();
      this.$('.preloader-anim').show();
      var self = this;
      var images_count;
      if (this.image_index + 10 <= this.images_count) {
        images_count = 10;
      } else {
        images_count = this.images_count - this.image_index;
      }
      self.images = [];
      for (var i = this.image_index; i < images_count + this.image_index; i++) {
        self.images.push('image!app/img/commercial/' + i + '.jpg');
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
        for(var i = 0; i < img_arr.length; i++) {
          self.render(img_arr[i], self.image_index);
          self.image_index++;
        }
        Toucheffects();
        this.$('.load_more_section').show();
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