var inputPassword = $('#inputPassword');
var buttonLogin = $('#buttonLogin');

var buttonInitialDisabled = function() {
	buttonLogin.prop('disabled', true);
};

var createButtonPeek = function() {
	if (inputPassword.length > 0) {
		var inputGroup = document.getElementById('inputPassword').parentElement;
		var button = document.createElement('button');
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
};

// Default State
buttonInitialDisabled();
createButtonPeek();

var buttonPeek = $('#buttonPeek');
var iconEyeClose = $('.icon-eye-off');
var iconEyeOpen = $('.icon-eye-on');

var toggleEyeIcon = function() {
	if (inputPassword.val()) {
		buttonPeek.show();
		iconEyeClose.css('opacity', '0.5');
	} else {
		buttonPeek.hide();
		iconEyeClose.css('opacity', '0');
	}
};

var showPassword = function() {
	iconEyeClose.css('opacity', '0');
	iconEyeOpen.css('opacity', '1');
	inputPassword.attr('type', 'text');
};

var hidePassword = function() {
	iconEyeClose.css('opacity', '0.5');
	iconEyeOpen.css('opacity', '0');
	inputPassword.attr('type', 'password');
};

toggleEyeIcon();

// Event handler
// ==================================
// check if input password have filled
inputPassword.on('keyup', toggleEyeIcon);

// peek the password input
buttonPeek
	.on('mousedown touchstart', showPassword)
	.bind('mouseup mouseleave touchend', hidePassword);

// Feather Icons Initiated
// ==================================
feather.replace();
