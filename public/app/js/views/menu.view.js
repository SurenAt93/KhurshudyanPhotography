define(
[
  'jquery',
  'backbone',
  'handlebars',
  'dispatcher',
  'require.text!tpl/menu.tpl',
],
function($, Backbone, Handlebars, Dispatcher, MenuTpl) {
  return Backbone.View.extend({
    
    template: Handlebars.compile(MenuTpl),
    events: {
      'click .mobile-inner-header-icon': 'openMenu',
      'click a.menu_tabs_button':        'openMenuTabs',
    },

    initialize: function() {
      this.render();
      Dispatcher.trigger('open:home');
    },

    render: function() {
      $('body').append(this.template({}))
      this.setElement($('.wrapper'));
      var self = this;
      this.$('.mobile-inner-nav a').each(function(index) {
        self.$(this).css({'animation-delay': (index / 10) + 's'});
      });
    },

    openMenu: function(e) {
      this.$el.toggleClass('remove-margin');
      this.$(e.target).toggleClass('mobile-inner-header-icon-click ' +
                          'mobile-inner-header-icon-out ' + 
                          'mobile-inner-header-icon-clicked');
      this.$('.mobile-inner-nav').slideToggle(250);
    },

    openMenuTabs: function(e) {
      this.$('.mobile-inner-header-icon').trigger('click');
      Dispatcher.trigger('open:' + this.$(e.target).attr('value'));
    }

  });
})