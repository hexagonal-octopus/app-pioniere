import '../../scripts/jquery.nicescroll/jquery.nicescroll';

class Scrollbar {
   constructor(el, config){
      this.scrollElement = el;
      this.scrollConfig = config;
      this.initNiceScroll();
   }

   initNiceScroll(){
      if(this.scrollElement.length > 0) {
         this.scrollElement.niceScroll(this.scrollConfig);
      }
   }
}

export default Scrollbar;