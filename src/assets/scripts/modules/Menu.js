import $ from 'jquery';
import '../../scripts/jquery.nicescroll/jquery.nicescroll';

class Menu {
   constructor() {
      this.document = $(document);
      this.body = $('body');
      this.menu = $('.main-menu');
      this.menuList = $('.main-menu__list');
      this.menuLink = $('.main-menu__list a');
      this.menuContainer = $('.main-menu__container');
      this.submenuCollapsed = $('.main-menu__submenu-collapsed');
      this.submenuCollapsedLink = $('.main-menu__submenu-collapsed a');
      this.titleMenuCollapsed = $('.main-menu__title-collapsed');
      this.titleMenuCollapsedLink = $('.main-menu__title-collapsed');
      this.menuLinkHref = this.menuLink.attr('href');
      this.menuLinkText = this.menuLink.children('span').text();
      
      this.events();
   }

   events() {
      this.menuLink.on('click', (ev) => this.revealChildMenu(ev));
      this.submenuCollapsed.on('click', this.submenuCollapsedLink, (ev) => this.revealChildMenuCollapsed(ev));
      this.titleMenuCollapsedLink.on('click', (ev) => this.cancelTitleMenuCollapsed(ev));
   }

   reinitMenu(e){
      if(!$(e.target).closest('.main-menu').length){
         this.escapesListMenu();
      }

      if (e.keyCode == 27) {
         this.escapesListMenu();
      }
   }

   escapesListMenu() {
      this.menu.removeClass('is-active');
      this.menuList.removeClass('is-show');
      this.submenuCollapsed.hide();
   }

   revealChildMenu(e) {
      this.menu.addClass('is-active');

      this.setTitleMenuCollapsed(e);
      this.checkSubmenu(e);
      this.checkBodyClass(e);
   }

   cancelTitleMenuCollapsed(e){
      if(this.submenuCollapsed.is(':visible')){
         e.preventDefault();
      }
   }

   revealChildMenuCollapsed(e) {
      let el = $(e.target);
   
      if(el.parent().hasClass('has-sub')) {
         el.parent().toggleClass('is-open');

         e.preventDefault();
      }
   }

   setTitleMenuCollapsed(e) {
      let el = $(e.currentTarget);
      this.titleMenuCollapsed.html(`<a href="${el.attr('href')}">${el.children('span').html()}</a>`)
      .css('top', el.position().top + 120);
   }

   checkSubmenu(e) {
      let el = $(e.currentTarget);

      if(el.parent().hasClass('has-sub')){
         let $submenuValue = el.siblings()[0].outerHTML;

         el.parent().toggleClass('is-open');
         this.menuContainer.getNiceScroll().resize();
         this.submenuCollapsed.show().html($submenuValue).css({'top': el.position().top + 170});

         e.preventDefault();
      } else {
         this.submenuCollapsed.hide();
      }
   }

   checkBodyClass(e) {
      let el = $(e.currentTarget);
      if(this.body.hasClass('menu-collapsed')){
         this.menuList.removeClass('is-show is-open');
         el.parent().toggleClass('is-show');

         e.preventDefault();
      }
   }
}

export default Menu;