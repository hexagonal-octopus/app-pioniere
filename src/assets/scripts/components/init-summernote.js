$('.summernote').summernote({
    height: 300
});

// summernote.keyup
$('.summernote').on('summernote.keyup', function(we, e){
    //console.log(we)
    countFieldSummernote(we, e);
});

var countFieldSummernote = function(we, e) {
    console.log(we);
    // TODO 01: Stores character length and max-length
    var characters = we.currentTarget.value.length;
    var maxLength = parseInt(we.currentTarget.dataset.length);

    // TODO 02: Update counts based on updated character
    var current = maxLength - characters;
    $(we.currentTarget).closest('.form-group').find('.form__field-count span').text(current);

    // TODO 03: Check if characters length over than maxLength
    if(characters > maxLength) {
       var limitChars = $(we.currentTarget).val().substr(0, maxLength);
        
       // Set .note-editable to show limitChars
       // !important - not the .summernote
       $(e.currentTarget).html(limitChars);
       
       // For the backend purposed
       $(we.currentTarget).val(limitChars);

       // Set Counts to be zero
       $(we.currentTarget).closest('.form-group').find('.form__field-count span').text(0);
    }
 };