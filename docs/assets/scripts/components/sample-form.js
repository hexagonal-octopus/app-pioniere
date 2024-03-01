$(document).ready(function () {
	// CHANGE PROFILE IMAGE HANDLER
	// ================================

	var imageProfile = $('.image-wrapper').find('img');
	var selectInput = $('.js-select');

	var readURL = function (input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onloadend = function (e) {
				imageProfile.attr('src', e.target.result);
				//console.log(e.target);
			};

			reader.readAsDataURL(input.files[0]);
		}
	};

	$('.file-upload').on('change', function () {
		readURL(this);
	});

	$('.js-upload-button').on('click', function () {
		$('.file-upload').trigger('click');
	});

	$('.js-remove-button').on('click', function () {
		imageProfile.attr(
			'src',
			'./assets/images/default/img-profile-big-default.jpg'
		);
	});

	// UPLOAD IMAGE HANDLER
	var insertImage = function (input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onprogress = function () {
				$('.spinner').addClass('is-active');
			};

			reader.onloadend = function (e) {
				setTimeout(function () {
					var imagePreviewWrapper = $(input)
						.closest('.form-group')
						.find('.image-preview-wrapper');
					var uploadButton = $(input)
						.closest('.form-group')
						.find('.js-button-upload');
					var removeUploadButton = $(input)
						.closest('.form-group')
						.find('.js-button-remove');

					// Set orientation class image if dimension horizontal after onload
					// ====================================================
					var i = new Image();
					i.onload = function () {
						var orientationClass =
							i.width > i.height ? 'horizontal' : 'vertical';

						var imageData = $(
							'<img src="' +
							e.target.result +
							'" class="' +
							orientationClass +
							'"/>'
						);
						$('.spinner').removeClass('is-active');
						imagePreviewWrapper.html('').append(imageData);
						imagePreviewWrapper.css('background-image', 'none');
					};
					i.src = e.target.result;

					// ====================================================

					if (!removeUploadButton.length) {
						uploadButton.text('Update ' + uploadButton.data('label'));
						$(
							'<button class="button button--alt button--small button--danger mb-2 mx-1 js-button-remove">Remove ' +
							uploadButton.data('label') +
							'</button>'
						).insertBefore(uploadButton);
					}
				}, 1000);
			};

			reader.readAsDataURL(input.files[0]);
		}
	};

	$('.form-group input[type=file]').on('change', function () {
		insertImage(this);
	});

	$('.form-group').on('click', '.js-button-upload', function () {
		$(this)
			.parent()
			.find('input[type=file]')
			.trigger('click');
	});

	$('.form-group').on('click', '.js-button-remove', function (e) {
		e.preventDefault();
		var uploadButton = $(this)
			.closest('.form-group')
			.find('.upload-button');
		var imagePreviewWrapper = $(this)
			.closest('.form-group')
			.find('.image-preview-wrapper');

		imagePreviewWrapper.html('');
		imagePreviewWrapper.css('background-image', '');
		uploadButton.text('Set ' + uploadButton.data('label'));
		$(this)
			.parents('.form-group')
			.find('input[type=file]')
			.val('');
		$(this).remove();
	});

	// UPLOAD COVER IMAGE HANDLER
	// ================================
	// var imageCover = $('.image-wide');
	// var uploadCoverBtn = $('#uploadCoverButton');
	// var uploadCoverInput = $('#uploadCoverInput');

	// var checkCoverImage = function() {
	// 	if (imageCover.has('img').length) {
	// 		uploadCoverBtn.text('Update Cover Image');
	// 		if (!$('#removeCoverBtn').length) {
	// 			$(
	// 				'<button id="removeCoverBtn" class="button button--alt button--small button--danger mb-2 mr-2">Remove Image</button>'
	// 			).insertBefore(uploadCoverBtn);
	// 		}
	// 	} else {
	// 		uploadCoverBtn.text('Set Cover Image');
	// 	}
	// };

	// var insertCoverImage = function(input) {
	// 	if (input.files && input.files[0]) {
	// 		var reader = new FileReader();

	// 		reader.onprogress = function() {
	// 			$('.spinner').addClass('is-active');
	// 		};

	// 		reader.onloadend = function(e) {
	// 			setTimeout(function() {
	// 				$('.spinner').removeClass('is-active');
	// 				var imageData = $('<img src="' + e.target.result + '" />');
	// 				imageCover.html('').append(imageData);
	// 				checkCoverImage();
	// 			}, 1000);
	// 		};

	// 		reader.readAsDataURL(input.files[0]);
	// 	}
	// };

	// checkCoverImage();

	// $(uploadCoverInput).on('change', function() {
	// 	insertCoverImage(this);
	// });

	// $(uploadCoverBtn).on('click', function() {
	// 	$(uploadCoverInput).trigger('click');
	// });

	// $('.form-group').on('click', '#removeCoverBtn', function(e) {
	// 	e.preventDefault();
	// 	imageCover.html('');
	// 	$(this).remove();
	// 	uploadCoverBtn.text('Set Cover Image');
	// 	uploadCoverInput.val('');
	// });

	// // UPLOAD BRAND IMAGE HANDLER
	// // ================================
	// var imageBrand = $('.image-rect');
	// var uploadBrandBtn = $('#uploadBrandButton');
	// var uploadBrandInput = $('#uploadBrandInput');

	// var checkBrandImage = function() {
	// 	if (imageBrand.has('img').length) {
	// 		uploadBrandBtn.text('Update Brand Image');
	// 		imageBrand.css('background-image', 'none');
	// 		if (!$('#removeBrandBtn').length) {
	// 			$(
	// 				'<button id="removeBrandBtn" class="button button--alt button--small button--danger mb-2 mr-2">Remove Image</button>'
	// 			).insertBefore(uploadBrandBtn);
	// 		}
	// 	} else {
	// 		uploadBrandBtn.text('Set Brand Image');
	// 		imageBrand.attr('style', '');
	// 	}
	// };

	// var insertBrandImage = function(input) {
	// 	if (input.files && input.files[0]) {
	// 		var reader = new FileReader();

	// 		reader.onprogress = function() {
	// 			$('.spinner').addClass('is-active');
	// 		};

	// 		reader.onloadend = function(e) {
	// 			setTimeout(function() {
	// 				$('.spinner').removeClass('is-active');
	// 				var imageData = $('<img src="' + e.target.result + '" />');
	// 				imageBrand.html('').append(imageData);
	// 				checkBrandImage();
	// 			}, 1000);
	// 		};

	// 		reader.readAsDataURL(input.files[0]);
	// 	}
	// };

	// checkBrandImage();

	// $(uploadBrandInput).on('change', function() {
	// 	insertBrandImage(this);
	// });

	// $(uploadBrandBtn).on('click', function() {
	// 	$(uploadBrandInput).trigger('click');
	// });

	// $('.form-group').on('click', '#removeBrandBtn', function(e) {
	// 	e.preventDefault();
	// 	imageBrand.html('').attr('style', '');
	// 	$(this).remove();
	// 	uploadBrandBtn.text('Set Brand Image');
	// 	uploadBrandInput.val('');
	// });

	// VALIDATION HANDLER
	// ================================

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.getElementsByClassName('form');

	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function (form) {
		form.addEventListener(
			'submit',
			function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			},
			false
		);
	});

	// Bulk Action for Select All-Options
	selectInput.on('change', function () {
		var selectValue = $(this).val();
		var radioChild = $(this)
			.closest('.form__column')
			.find('input:radio');

		radioChild.each(function () {
			if ($(this).val() === selectValue) {
				$(this).prop('checked', true);
			} else {
				$(this).prop('checked', false);
			}
		});
	});

	// Handler for character-counts
	// =============================
	// =============================
	var toggleCount = $('[data-toggle="count"]');

	// TODO 01: Check if [data-toggle="count"] is exists
	if (toggleCount) {
		toggleCount.each(function () {
			// TODO 02: Create Div Count and insert before toggleCount
			var divCount =
				'<div class="form__field-count"><span></span> chars left</div>';
			$(divCount).insertBefore($(this));

			// TODO 03: Variables store value
			var fieldValue = $(this).val();
			var maxLength = $(this).attr('data-length');

			// TODO 04: Set initial value counts
			if (fieldValue) {
				$(this)
					.closest('.form-group')
					.find('.form__field-count span')
					.text(maxLength - fieldValue.length);
			} else {
				$(this)
					.closest('.form-group')
					.find('.form__field-count span')
					.text(maxLength);
			}

			var countField = function () {
				var characters = $(this)
					.val()
					.split('');
				var maxLength = $(this).attr('data-length');

				var current = maxLength - characters.length;
				$(this)
					.closest('.form-group')
					.find('.form__field-count span')
					.text(current);

				// Check if characters length over than maxLength
				if (characters.length > maxLength) {
					var limitChars = $(this)
						.val()
						.substr(0, maxLength);

					// Set value-max
					$(this).val(limitChars);

					// Set Counts to be zero
					$(this)
						.closest('.form-group')
						.find('.form__field-count span')
						.text(0);
				}
			};

			// TODO 05: Change Counts value based on Keyup events
			$(this).on('keyup', countField);
		});
	}

	// Format Number Phone
	// =============================
	$('.phone').on('change', function () {
		var number = $(this).val();
		if (number.length == 11) {
			number = number.replace(/^0+/, '+62');
			number = number.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2-$3');
			$(this).val(number);
		}
	});

	if ($('.select2').length > 0) {
		$('.select2--default').select2({
			width: '100%'
		});

		$('.select2--minimal').select2({
			minimumResultsForSearch: Infinity,
			width: '100%'
		});

		$('b[role="presentation"]').hide();
		$('.select2-selection__arrow').append(
			'<i class="icon" data-feather="chevron-down"></i>'
		);

		var answerOptions = $('#answerOptions');

		$('#answer_type').on('select2:select', function (event) {
			console.log($(event.currentTarget).find(':selected').val());

			var selectedValue = $(event.currentTarget).find(':selected').val();
			var content = '';

			switch (selectedValue) {
				case "Short Answer":
				case "Long Answer":
					answerOptions.removeClass('active');
					answerOptions.html('');
					break;
				case "Dropdown":
					content += '<h3>Dropdown Options</h3>';
					content += '<div class="options">';
					content += '<div class="options__list">';
					content += '<input type="text" name="option_value[]" placeholder="Code" class="form-control"/>';
					content += '<input type="text" name="option_label[]"  placeholder="Subject" class="form-control"/>';
					content += '</div>';
					content += '</div>';
					content += '<div class="checkbox checkbox--green mb-3">';
					content += '<label><input type="checkbox" name-="option_other[]"><span class="checkbox__span"><i data-feather="check" class="icon-feather icon-feather--black"></i></span><span class="checkbox__text">Add Other Field</span></label>';
					content += '</div>';
					content += '<button class="button button--alt button--secondary js-add-option" type="button">Add Option</button>';
					answerOptions.addClass('active');
					answerOptions.html('').append(content);
					break;
				case "Multiple Choice":
					content += '<h3>Multiple Choice Options</h3>';
					content += '<div class="options">';
					content += '<div class="options__list">';
					content += '<input type="text" name="option_value[]" placeholder="Code" class="form-control"/>';
					content += '<input type="text" name="option_label[]"  placeholder="Subject" class="form-control"/>';
					content += '<button type="button" class="button button--alt button--danger button--icon-only js-remove-option"><span data-feather="x" class="icon-feather"></span></button>';
					content += '</div>';
					content += '</div>';
					content += '<div class="checkbox checkbox--green mb-3">';
					content += '<label><input type="checkbox" name-="option_other[]"><span class="checkbox__span"><i data-feather="check" class="icon-feather icon-feather--black"></i></span><span class="checkbox__text">Add Other Field</span></label>';
					content += '</div>';
					content += '<button class="button button--alt button--secondary js-add-option" type="button">Add Option</button>'
					answerOptions.html('').append(content);
					break;
				case "Checkbox":
					content += '<h3>Checkbox Options</h3>';
					content += '<div class="options">';
					content += '<div class="options__list">';
					content += '<input type="text" name="option_value[]" placeholder="Code" class="form-control"/>';
					content += '<input type="text" name="option_label[]"  placeholder="Subject" class="form-control"/>';
					content += '<button type="button" class="button button--alt button--danger button--icon-only js-remove-option"><span data-feather="x" class="icon-feather"></span></button>';
					content += '</div>';
					content += '</div>';
					content += '<div class="checkbox checkbox--green mb-3">';
					content += '<label><input type="checkbox" name-="option_other[]"><span class="checkbox__span"><i data-feather="check" class="icon-feather icon-feather--black"></i></span><span class="checkbox__text">Add Other Field</span></label>';
					content += '</div>';
					content += '<button class="button button--alt button--secondary js-add-option" type="button">Add Option</button>'
					answerOptions.html('').append(content);
					break;
				default:
					break;
			}

			feather.replace();
		});

		$('.form-group').on('click', '.js-add-option', function () {
			var html = '';
			html += '<div class="options__list is-invalid">';
			html += '<input type="text" name="option_value[]" placeholder="Code" class="form-control"/>';
			html += '<input type="text" name="option_label[]"  placeholder="Subject" class="form-control"/>';
			html += '<button type="button" class="button button--alt button--danger button--icon-only js-remove-option"><span data-feather="x" class="icon-feather"></span></button>';
			html += '<div class="invalid-feedback">Some error on this fields. Please check again</div>'
			html += '</div>';

			$('.options').append(html);
			feather.replace();
		});

		$('.form-group').on('click', '.js-remove-option', function () {
			$(this).closest('.options__list').remove();
		});

		feather.replace();
	}

	// Handler for Box-Expand
	// =============================
	var toggleExpandBox = $('[data-toggle="expand-box"]');

	if (toggleExpandBox.length > 0) {
		$('.main-content').on('click', '[data-toggle="expand-box"]', function (e) {
			e.preventDefault();

			// Reset Default State
			$('.box')
				.removeClass('is-active')
				.find('.box__expand-wrapper')
				.attr('style', '');

			// Activate Spinner
			$('.spinner').addClass('is-active');

			// Store value height of box-expand
			var scrollHeight = $(this)
				.closest('.box')
				.find('.box__expand')[0].scrollHeight;
			var boxParent = $(this).closest('.box');
			var targetID = $(this).attr('data-target');

			setTimeout(function () {
				// Deactivate Spinner
				$('.spinner').removeClass('is-active');

				boxParent
					.addClass('is-active')
					.find('.box__expand-wrapper')
					.css('height', scrollHeight)
					.one('transitionend', function () {
						$('html,body').animate(
							{ scrollTop: $(targetID).offset().top - 90 },
							500
						);
					});
			}, 1500);
		});
	}

	// Handler for Checkbox Select All
	// ===============================
	$('#checkedAll').on('change', function () {
		if (this.checked) {
			$('.box.w1of4')
				.find('[type="checkbox"]')
				.prop('checked', true);
		} else {
			$('.box.w1of4')
				.find('[type="checkbox"]')
				.prop('checked', false);
		}
	});
});
