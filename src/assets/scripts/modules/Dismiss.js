class Dismiss {
   constructor(el) {
      this.element = el;
      this.event();
   }

   event(){
      this.dismissHandler();
   }

   dismissHandler() {
      const el = `[data-dismiss~="${this.element}"]`;
      const that = this;
      
      $('body').on('click', el, function(){
         $(this).closest(`.${that.element}`).remove();
      })
   }
}

export default Dismiss;