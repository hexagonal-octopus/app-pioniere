$(function(){
   var element = $('.button');
   var config = {
      cursorcolor: '#b2ff59',
      cursorborder: 0,
      emulatetouch: true,
      preservenativescrolling: false
   };

   var mainMenu = $('.main-menu');
   var mainMenuList = $('.main-menu__list');
   var submenuCollapsed = $('.main-menu__submenu-collapsed');
   var mainMenuContainer = $('.main-menu__container');
   var body = $('body');
   var window = $(window);

   var toggleMenuInMobile = function(ev){
      let $that = ev;
      $that.closest('.wrapper').find('.main-menu').toggleClass('is-reveal');
   }

   var toggleExpandBox = function(ev){
      var el = ev;
      var boxWrapper = el.closest('.box__wrapper');

      boxWrapper.toggleClass('is-expanded');
      if(boxWrapper.hasClass('is-expanded')) {
         el.html('<i data-feather="minimize"></i>');
         feather.replace();
      } else {
         el.html('<i data-feather="maximize"></i>');
         feather.replace();
      }
   }

   var toggleReloadBox = function(ev){
      let el = ev;
      let boxWrapper = el.closest('.box__wrapper');

      boxWrapper.append('<div class="box__reload"><i data-feather="refresh-cw" class="feather-icon-black feather-icon-black--is-spin"></i></div>');
      feather.replace();

      setTimeout(function(){
         boxWrapper.find('.box__reload').remove();
      }, 2000);
   }

   var toggleMinimizeBox = function(ev){
      let el = ev;
      let boxWrapper = el.closest('.box__wrapper');

      boxWrapper.toggleClass('is-minimized');
      if(boxWrapper.hasClass('is-minimized')) {
         el.html('<i data-feather="plus"></i>');
         feather.replace();
      } else {
         el.html('<i data-feather="minus"></i>');
         feather.replace();
      }
   }

   var toggleCollapseMenu = function(ev) {
      let el = ev;
      mainMenuList.removeClass('is-open');
      mainMenu.removeClass('is-active');
      submenuCollapsed.hide();

      if(body.hasClass('menu-collapsed')){
         showMenuExpanded();
         el.find('span').html('Zen Mode');
      }else{
         showMenuCollapsed();
         el.find('span').html('Expand Mode');
      }
   }

   var showMenuCollapsed = function() {
      body.addClass('menu-collapsed').removeClass('menu-expanded');
      mainMenuContainer.getNiceScroll().remove();
      mainMenuList.removeClass('is-show is-open');
   }

   var showMenuExpanded = function() {
      body.removeClass('menu-collapsed').addClass('menu-expanded');
      mainMenuContainer.niceScroll(config);
   }

   element.on('click', function(event) {

      var $this = $(event.currentTarget);
      // console.log($this);

      if($this.hasClass('js-button-expand')){
         toggleExpandBox($this);
      } else if($this.hasClass('js-button-reload')) {
         toggleReloadBox($this);
      } else if($this.hasClass('js-button-minimize')) {
         toggleMinimizeBox($this);
      } else if($this.hasClass('js-button-zenmode')) {
         toggleCollapseMenu($this);
      } else if($this.hasClass('js-button-nav-toggler')) {
         toggleMenuInMobile($this);
      }
   });

   // Dismiss Handler
   var UI = function(){};
   UI.prototype.setDismiss = function(element) {
      body.on('click', '[data-dismiss~='+ element +']', function(e){
         $(this).closest('.' + element).remove();
      });
   }

   var ui = new UI();
   ui.setDismiss('feedback');
   ui.setDismiss('toast');

   
});