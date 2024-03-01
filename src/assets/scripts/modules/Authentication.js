import $ from 'jquery';
import feather from '../../scripts/feather-icons/feather';

class Authentication {
   constructor(){
      this.inputPassword = $('#inputPassword');
      this.inputName = $('#inputUsername');
      this.inputEmail = $('#inputEmail');
      this.formAuth = $('.form-auth');
      this.formReactivation = $('.form-reactivation');
      this.buttonLogin = $('#buttonLogin');
      this.formInput = $('.form-login__input');
      this.formInputGroup = $('.form-login__input-group');
      this.formCheckbox = $('.form-login__input-checkbox');
      this.formMessage = $('.feedback');

      // state
      this.buttonInitialDisabled();
      this.createButtonPeek();
      
      //property after createButtonPeek
      this.buttonPeek = $('#buttonPeek');
      this.iconEyeClose = $('.icon-eye-off');
      this.iconEyeOpen = $('.icon-eye-on');

      this.toggleEyeIcon();

      
      // init events
      this.events();
   }

   events(){
      // check if input password have filled
      this.inputPassword.on('keyup',this.toggleEyeIcon.bind(this));

      // peek the password input
      this.buttonPeek.on('mousedown touchstart', this.showPassword.bind(this))
      .bind('mouseup mouseleave touchend', this.hidePassword.bind(this));
   }

   buttonInitialDisabled(){
      this.buttonLogin.prop('disabled', true);
   }

   createButtonPeek(){
      if (this.inputPassword.length > 0) {
         const inputGroup = document.getElementById('inputPassword').parentElement;
         const button = document.createElement('button');
         button.className = 'form-login__button-peek';
         button.id = 'buttonPeek';
         button.setAttribute('type', 'button');
         button.style.display = 'none';
         button.innerHTML = `
            <i class="form-login__icon-eye icon-feather icon-eye-on" data-feather="eye"></i>
            <i class="form-login__icon-eye icon-feather icon-eye-off" data-feather="eye-off"></i>
         `;

         inputGroup.appendChild(button);
         feather.replace();
      }
   }


   toggleEyeIcon(){
      if(this.inputPassword.val()) {
         this.buttonPeek.show();
         this.iconEyeClose.css('opacity', '0.5');
      } else {
         this.buttonPeek.hide();
         this.iconEyeClose.css('opacity', '0');
      }
   }

   showPassword(){
      this.iconEyeClose.css('opacity', '0');
      this.iconEyeOpen.css('opacity', '1');
      this.inputPassword.attr('type', 'text');
   }

   hidePassword(){
      this.iconEyeClose.css('opacity', '0.5');
      this.iconEyeOpen.css('opacity', '0');
      this.inputPassword.attr('type', 'password');
   }

}

export default Authentication;