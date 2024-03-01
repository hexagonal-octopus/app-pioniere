import $ from 'jquery';
import '../../scripts/jquery.nicescroll/jquery.nicescroll';

class Resizs {
   constructor() {
      this.window = $(window);
      this.body = $('body');
      this.btnNavToggler = $('.js-button-nav-toggler');
      this.menuContainer = $('.main-menu__container');

      this.initExpandMenu();
   }

   initExpandMenu(){
      if(this.body.hasClass('menu-collapsed')){
         this.body.removeClass('menu-collapsed');
         this.btnNavToggler.find('span').html('Zen Mode');
         this.menuContainer.niceScroll({
            cursorcolor: '#b2ff59',
            cursorborder: 0,
            emulatetouch: true,
            preservenativescrolling: false
         });
      }
   }
}

export default Resizs;