//Variables
var buttonLogin = $('#buttonLogin');
var formCheckbox = $('.form-login__input-checkbox');
var formAuth = $('.form-auth');
var formReactivation = $('.form-reactivation');
var formLoginInput = $('.form-login__input');
var inputName = $('#inputUsername');
var inputPassword = $('#inputPassword');
var inputEmail = $('#inputForgotAccount');
var iconEyeOff = $('.icon-eye-off');
var buttonPeek = $('#buttonPeek');
var formMessage = $('.feedback');

//UI Constructor
function UI() {}

UI.prototype.showAlert = function(msg, className) {
   formMessage.addClass('feedback--visible ' + className).html(msg);

   // Animate showing alert
   setTimeout(function() {
      formMessage.addClass('feedback--shown');
   }, 20);

   // Make Button to change to Submit
   buttonLogin.html('Submit').prop('disabled', false);

   // var removingAlert = function() {
   //    formMessage.removeClass('feedback--shown is-invalid is-valid').text('');

   //    setTimeout(function() {
   //       formMessage.removeClass('feedback--visible');
   //    }, 20);
   // };

   // Remove after 3 seconds
   // setTimeout(removingAlert, 3000);
};

// Event Handler
var showingButton = function() {
   if (formLoginInput.length > 0) {
      buttonLogin.prop('disabled', true);

      if (
         inputName.length > 0 &&
         inputName.val().length > 3 &&
         inputPassword.val().length > 3
      ) {
         buttonLogin.prop('disabled', false);
      }

      if (inputEmail.length > 0 && inputEmail.val().length > 3) {
         buttonLogin.prop('disabled', false);
      }
   }
};

showingButton();
formLoginInput.on('keyup', showingButton);

var onSubmitAuthHandler = function(e) {
   e.preventDefault();
   var ui = new UI();

   formMessage.removeClass('feedback--shown is-invalid is-valid').text('');
   buttonLogin
      .prop('disabled', true)
      .html('<span class="spinner-circle"></span>');
   /**
    * START
    * Remove this on production change it to $formAuth.submit();
    */
   if (inputName.val() == 'brian' && inputPassword.val() == 'basreng') {
      var timeleft = 3;
      var countdownTime = setInterval(function() {
         ui.showAlert(
            'Login Success. Will redirect in ' + timeleft + ' seconds.',
            'is-valid'
         );
         timeleft -= 1;
         if (timeleft < 0) {
            clearInterval(countdownTime);
            window.location = './dashboard.html';
         }
      }, 1000);
   } else {
      setTimeout(function() {
         ui.showAlert(
            'Oops! that email/password combination is not valid.',
            'is-invalid'
         );
      }, 1000);
   }
   /**
    * END
    */
};
formAuth.on('submit', onSubmitAuthHandler);

var onReactivationEmailHandler = function(e) {
   var ui = new UI();
   buttonLogin
      .prop('disabled', true)
      .html('<span class="spinner-circle"></span>');
   /**
    * START
    * Adjust this on production mode
    */
   if (inputEmail.val() == 'brian.basreng@wakanda.croc') {
      setTimeout(function() {
         ui.showAlert(
            'Your Password Reactivation is on the way. Please Check your Inbox Email.',
            'is-valid'
         );
      }, 1000);
   } else {
      setTimeout(function() {
         ui.showAlert(
            'Your Email is not found in our Databse. Please Check your Email again.',
            'is-invalid'
         );
      }, 1000);
   }
   /**
    * END
    */

   e.preventDefault();
};
formReactivation.on('submit', onReactivationEmailHandler);
