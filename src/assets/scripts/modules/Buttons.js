import $ from 'jquery';
import feather from '../../scripts/feather-icons/feather';

class Buttons {
   constructor(el, config) {
      this.element = el;
      this.mainMenu = $('.main-menu');
      this.mainMenuList = $('.main-menu__list');
      this.submenuCollapsed = $('.main-menu__submenu-collapsed');
      this.mainMenuContainer = $('.main-menu__container');
      this.body = $('body');
      this.window = $(window);
      this.config = config;

      this.event();
   }

   event() {
      this.element.on('click', (ev) => this.buttonActions(ev));
   }

   buttonActions(e) {
      const $this = $(e.currentTarget);
      // e.preventDefault();

      if($this.hasClass('js-button-expand')){
         this.toggleExpandBox($this);
      } else if($this.hasClass('js-button-reload')) {
         this.toggleReloadBox($this);
      } else if($this.hasClass('js-button-minimize')) {
         this.toggleMinimizeBox($this);
      } else if($this.hasClass('js-button-zenmode')) {
         this.toggleCollapseMenu($this);
      } else if($this.hasClass('js-button-nav-toggler')) {
         this.toggleMenuInMobile($this);
      }
   }

   toggleMenuInMobile(e){
      let $that = e;
      $that.closest('.wrapper').find('.main-menu').toggleClass('is-reveal');
   }

   toggleExpandBox(e){
      let $that = e;
      let $boxWrapper = $that.closest('.box__wrapper');

      $boxWrapper.toggleClass('is-expanded');
      if($boxWrapper.hasClass('is-expanded')) {
         $that.html('<i data-feather="minimize"></i>');
         feather.replace();
      } else {
         $that.html('<i data-feather="maximize"></i>');
         feather.replace();
      }
   }

   toggleReloadBox(e){
      let $that = e;
      let $boxWrapper = $that.closest('.box__wrapper');

      $boxWrapper.append('<div class="box__reload"><i data-feather="refresh-cw" class="feather-icon-black feather-icon-black--is-spin"></i></div>');
      feather.replace();

      setTimeout(function(){
         $boxWrapper.find('.box__reload').remove();
      }, 2000);
   }

   toggleMinimizeBox(e){
      let $that = e;
      let $boxWrapper = $that.closest('.box__wrapper');

      $boxWrapper.toggleClass('is-minimized');
      if($boxWrapper.hasClass('is-minimized')) {
         $that.html('<i data-feather="plus"></i>');
         feather.replace();
      } else {
         $that.html('<i data-feather="minus"></i>');
         feather.replace();
      }
   }

   toggleCollapseMenu(e) {
      let $that = e;
      this.mainMenuList.removeClass('is-open');
      this.mainMenu.removeClass('is-active');
      this.submenuCollapsed.hide();

      if(this.body.hasClass('menu-collapsed')){
         this.showMenuExpanded();
         $that.find('span').html('Zen Mode');
      }else{
         this.showMenuCollapsed();
         $that.find('span').html('Expand Mode');
      }
   }

   showMenuCollapsed() {
      this.body.addClass('menu-collapsed').removeClass('menu-expanded');
      this.mainMenuContainer.getNiceScroll().remove();
      this.mainMenuList.removeClass('is-show is-open');
   }

   showMenuExpanded() {
      this.body.removeClass('menu-collapsed').addClass('menu-expanded');
      this.mainMenuContainer.niceScroll(this.config);
   }
}

export default Buttons;