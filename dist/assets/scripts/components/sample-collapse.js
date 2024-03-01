$(function(){
   var buttonCollapse = $('.js-accordion-btn');

   var toggleIconFeather = function() {
      var that = $(this);
      that.find('.icon-feather').attr('data-feather', 'plus');
      feather.replace();

      $('#accordionYear').on('show.bs.collapse', function(){
         $(this).find('.icon-feather').attr('data-feather', 'plus');
         that.find('.icon-feather').attr('data-feather', 'minus');
         feather.replace();
      });
   };

   buttonCollapse.on('click', toggleIconFeather);

});