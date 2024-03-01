$(function(){
   var triggerThumbnail = $('.js-modal-action');
   
   triggerThumbnail.on('click', function() {
      var pathImage = $(this).find('.thumbnail__image').attr('src');

      $('#exampleModalImage').on('show.bs.modal', function (e) {
         $(this).find('.preview-image__image').attr('src', pathImage);
      });
   });
});