var body = document.getElementsByTagName('body')[0];
function UI() {}

UI.prototype.setCustomToast = function(type, view, title, msg) {
	var toastContainer = document.createElement('div');
	toastContainer.className = 'toast-container toast-container--' + view;
	body.appendChild(toastContainer);

	var toast = document.createElement('div');
	toast.className = 'toast toast--' + type;

	var toastContent = document.createElement('div');
	toastContent.className = 'toast__content';
	toastContent.innerHTML =
		"<button type='button' class='toast__close' data-dismiss='toast'><i data-feather='x' class='icon-feather icon-feather--dark'></i></button>";
	toastContent.innerHTML +=
		"<div class='toast__title'><strong>" + title + '</strong></div>';
	toastContent.innerHTML += "<div class='toast__body'>" + msg + '</div>';

	toast.appendChild(toastContent);
	toastContainer.appendChild(toast);
	feather.replace();

	var delayIn = 300;
	var delayOut = 2000;
	var toastTarget = $(toast);

	setTimeout(function() {
		toastTarget.addClass('toast--visible toast--offset-left');
		setTimeout(function() {
			toastTarget.addClass('toast--shown');
		}, 20);
	}, delayIn);

	setTimeout(function() {
		toastTarget
			.removeClass('toast--shown')
			.one('webkitTransitionEnd transitionend', function() {
				toastTarget.removeClass('toast--visible');
			});
	}, delayOut + delayIn);
};

UI.prototype.setToast = function(view) {
	var toastContainer = document.createElement('div');
	toastContainer.className = 'toast-container toast-container--' + view;
	body.appendChild(toastContainer);

	$('.toast')
		.clone()
		.appendTo('.toast-container')
		.removeClass('toast--visible toast--shown')
		.each(function(i) {
			var delayIn = 300;
			var delayOut = 2000;
			var toast = $(this);

			setTimeout(function() {
				toast.addClass('toast--visible toast--offset-left');
				setTimeout(function() {
					toast.addClass('toast--shown');
				}, 20);
			}, i * delayIn);

			setTimeout(function() {
				toast
					.removeClass('toast--shown')
					.one('webkitTransitionEnd transitionend', function() {
						toast.removeClass('toast--visible');
					});
			}, delayOut + delayIn * i);
		});
};

UI.prototype.setAlert = function(view, target, icon, msg) {
	var alertContainer = document.createElement('div');
	alertContainer.className = 'alert-container';
	body.appendChild(alertContainer);

	var feedback = document.createElement('div');
	feedback.className = 'feedback ' + view + ' ' + target;
	feedback.innerHTML =
		"<button class='feedback__button feedback__button--close' data-dismiss='feedback'><i data-feather='x' class='icon-feather'></i></button>";
	feedback.innerHTML +=
		"<div class='feedback__icon'><i data-feather='" +
		icon +
		"' class='icon-feather'></i></div>";
	feedback.innerHTML += "<div class='feedback__text'>" + msg + '</div>';

	alertContainer.appendChild(feedback);
	feather.replace();

	var delayIn = 300;
	var delayOut = 2000;
	var thisFeedback = $(feedback);

	setTimeout(function() {
		thisFeedback.addClass('feedback--visible');
		setTimeout(function() {
			thisFeedback.addClass('feedback--shown');
		}, 20);
	}, delayIn);

	setTimeout(function() {
		thisFeedback
			.removeClass('feedback--shown')
			.one('webkitTransitionEnd transitionend', function() {
				thisFeedback.removeClass('feedback--visible');
			});
	}, delayOut + delayIn);
};

$('.js-button-toast').on('click', function() {
	var ui = new UI();
	var dataView = $(this).attr('data-view');
	var toastContainer = $('.toast-container');

	if (toastContainer.length > 0) {
		toastContainer.remove();
	}

	ui.setToast(dataView);
});

$('.js-button-custom-toast').on('click', function(e) {
	e.preventDefault();

	var ui = new UI();
	var dataView = $(this).attr('data-view');
	var dataType = $(this).attr('data-type');
	var dataTitle = $(this).attr('data-title');
	var dataMessage = $(this).attr('data-message');
	var toastContainer = $('.toast-container');

	if (toastContainer.length > 0) {
		toastContainer.remove();
	}

	ui.setCustomToast(dataType, dataView, dataTitle, dataMessage);
});

$('.js-button-alert').on('click', function(e) {
	e.preventDefault();

	var ui = new UI();
	var dataView = $(this).attr('data-view');
	var dataTarget = $(this).attr('data-target');
	var dataMessage = $(this).attr('data-message');
	var dataIcon = $(this).attr('data-icon');
	var alertContainer = $('.alert-container');

	if (alertContainer.length > 0) {
		alertContainer.remove();
	}

	ui.setAlert(dataView, dataTarget, dataIcon, dataMessage);
});
