import $ from 'jquery';
import '../../scripts/air-datepicker/js/datepicker';
import '../../scripts/air-datepicker/js/i18n/datepicker.en';

class Forms {
   constructor() {
      this.datepick = $('.form--datepicker');

      this.initDatePicker();
   }

   initDatePicker(){
      if(this.datepick.length > 0) {
         this.datepick.datepicker();
      }
   }
}

export default Forms;