define(
[
  'jquery',
  'backbone',
  'underscore',
  'handlebars',
  'modernizr',
  'toucheffects',
  'require.text!tpl/commercial/11.tpl',
],
function($, Backbone, _, Handlebars, Modernizr, Toucheffects, MainTpl) {
  return Backbone.View.extend({

    el: '#commercial',
    template: Handlebars.compile(MainTpl),
    events: {
      'click .load_more': 'load_more_images'
    },

    initialize: function() {
      var self = this;
      self.images = [];
      for(var i = 1; i < 11; i++) {
        self.images.push('image!app/img/commercial/' + i + '.jpg');
      }
      self.image_index = i;
      this.render();
      requirejs(
      [
        'image!app/img/commercial/main.jpg'
      ],
      function() {
        self.$el.css('background-image',
          'url("app/img/commercial/main.jpg")');
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
    },

    render: function() {
      this.$('.image_container').append(this.template({}));
    },

    load_more_images: function(e) {
      this.$('.load_more_section').hide();
      this.$('.preloader-anim').show();
      this.images = [];
      for(var i = this.image_index; i < (this.image_index + 10); i++) {
        this.images.push('image!app/img/commercial/' + i + '.jpg');
      }
      this.image_index = i;
      var self = this;
      requirejs(
      [
        'require.text!tpl/commercial/' + this.image_index + '.tpl'        
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
    
  })
})