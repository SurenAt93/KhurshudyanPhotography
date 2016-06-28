define(
[
  'backbone'
],
function(Backbone) {

  var dispatcher = _.extend({}, Backbone.Events);

  var api = {
    open_menu_tabs: {

      open_home: function() {
        if($('#home').html()) {
          $('#content').children().hide();
          $('#home').fadeIn(150);
        } else {
          requirejs(
          [
            'image!app/img/main_slide/1.jpg',
            'image!app/img/main_slide/2.jpg',
            'image!app/img/main_slide/3.jpg',
            'image!app/img/main_slide/4.jpg',
            'image!app/img/main_slide/5.jpg',
            'image!app/img/main_slide/6.jpg',
          ],
          function() {
          });
          $('#loading').fadeIn(400);
          require(
          [
            'create.home.view',
          ], function(HomeView) {
            HomeView
              .then(
                function(homeView) {
                  $('#content').children().hide();
                  $('#home').fadeIn(150);
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=home]').addClass('selected');
        Backbone.history.navigate('home');
      },

      open_portraits: function() {
        $('body').data('active_view', 'portraits');
        $('body').data('preload', true);
        if($('#portraits .image_container').html()) {
          $('#content').children().hide();
          $('#portraits').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.portraits.view',
          ], function(PortraitsView) {
            PortraitsView
              .then(
                function(portraitsView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=portraits]').addClass('selected');
        Backbone.history.navigate('portraits');
      },

      open_nature: function() {
        $('body').data('active_view', 'nature');
        $('body').data('preload', true);
        if($('#nature .image_container').html()) {
          $('#content').children().hide();
          $('#nature').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.nature.view',
          ], function(NatureView) {
            NatureView
              .then(
                function(natureView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=nature]').addClass('selected');
        Backbone.history.navigate('nature');        
      },

      open_gallery: function() {
        $('body').data('active_view', 'gallery');
        $('body').data('preload', true);
        if($('#gallery_o .image_container').html()) {
          $('#content').children().hide();
          $('#gallery_o').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.gallery.view',
          ], function(WtpView) {
            WtpView
              .then(
                function(wtpView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=gallery]')
                              .addClass('selected');
        Backbone.history.navigate('gallery');
      },

      open_commercial: function() {
        if($('#commercial').html()) {
          $('#content').children().hide();
          $('#commercial').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.commercial.view',
          ], function(CommercialView) {
            CommercialView
              .then(
                function(commercialView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('commercial');        
      },

      open_contact: function() {
        if($('#contact').html()) {
          $('#content').children().hide();
          $('#contact').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'image!app/img/contacts/main_contacts.jpg'
          ], function(ContactImg) {
            $('#content').children().hide();
            $('#contact')
              .css('background-image',
              'url("app/img/contacts/main_contacts.jpg")')
              .fadeIn(150);
            $('#loading').fadeOut(500);
          });
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=contact]').addClass('selected');
        Backbone.history.navigate('contact');        
      },

      open_kids: function() {
        $('body').data('active_view', 'kids');
        $('body').data('preload', true);
        if($('#kids .image_container').html()) {
          $('#content').children().hide();
          $('#kids').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.kids.view',
          ], function(KidsView) {
            KidsView
              .then(
                function(kidsView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('kids');
      },

      open_product: function() {
        $('body').data('active_view', 'product');
        $('body').data('preload', true);
        if($('#product .image_container').html()) {
          $('#content').children().hide();
          $('#product').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.product.view',
          ], function(ProductView) {
            ProductView
              .then(
                function(productView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('product');
      },

      open_other: function() {
        $('body').data('active_view', 'other');
        $('body').data('preload', true);
        if($('#other .image_container').html()) {
          $('#content').children().hide();
          $('#other').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.other.view',
          ], function(OtherView) {
            OtherView
              .then(
                function(otherView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('other');
      },

      open_wedding_day: function() {
        $('body').data('active_view', 'wedding_day');
        $('body').data('preload', true);
        if($('#wedding_day .image_container').html()) {
          $('#content').children().hide();
          $('#wedding_day').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.wedding_day.view',
          ], function(Wedding_dayView) {
            Wedding_dayView
              .then(
                function(wedding_dayView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('wedding_day');
      },

      open_photo_shoot: function() {
        $('body').data('active_view', 'photo_shoot');
        $('body').data('preload', true);
        if($('#photo_shoot .image_container').html()) {
          $('#content').children().hide();
          $('#photo_shoot').fadeIn(150);
        } else {
          $('#loading').fadeIn(500);
          require(
          [
            'create.photo_shoot.view',
          ], function(photo_shootView) {
            photo_shootView
              .then(
                function(photo_shootView) {
                  
                },
                function(err) {
                  console.log(err);
                }
              );
          })
        }
        $('.mobile-inner-nav').find('a').removeClass('selected');
        $('.mobile-inner-nav').find('a[value=commercial]').addClass('selected');
        Backbone.history.navigate('photo_shoot');
      },
    }
  }

  dispatcher.on({
    'open:home':                  api.open_menu_tabs.open_home,
    'open:portraits':             api.open_menu_tabs.open_portraits,
    'open:nature':                api.open_menu_tabs.open_nature,
    'open:gallery':               api.open_menu_tabs.open_gallery,
    'open:commercial':            api.open_menu_tabs.open_commercial,
    'open:about':                 api.open_menu_tabs.open_about,
    'open:contact':               api.open_menu_tabs.open_contact,
    'open:kids':                  api.open_menu_tabs.open_kids,
    'open:product':               api.open_menu_tabs.open_product,
    'open:wedding_day':           api.open_menu_tabs.open_wedding_day,
    'open:other':                 api.open_menu_tabs.open_other,
    'open:photo_shoot':           api.open_menu_tabs.open_photo_shoot,
  })

  return dispatcher;

});
