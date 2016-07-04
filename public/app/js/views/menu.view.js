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
      var view;
      var dom_elem;
      var selected_tab_name = this.$(e.target).attr('value');
      this.$('.mobile-inner-header-icon').trigger('click');
      switch(selected_tab_name) {
        case 'home':
        case 'about':
        case 'contact':
        case 'commercial':
          Dispatcher.trigger('open:' + selected_tab_name);
          break;
        case 'portraits':
        case 'gallery':
        case 'nature':
          view      = selected_tab_name;
          dom_elem  = '#' + selected_tab_name;
          if (selected_tab_name == 'gallery') {
            dom_elem  = '#gallery_o';
          }
          Dispatcher.trigger('open:gallery_view_generator', {
            view: view,
            dom_elem: dom_elem,
          });
          break;
      }
    }

  });
})