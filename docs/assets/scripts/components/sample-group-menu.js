$(function() {
	// VARIABLES
	// ================================
	var listGroupItem = [];
	var panel = $('.panel');

	// [ARRAY] Array Group Name
	// IMPORTANT!!!
	// ================================
	var listGroupItem = $('.lists__group-item')
		.map(function() {
			return $(this).attr('id');
		})
		.get();

	// FUNCTION Sanitize Form Input
	// ================================
	var sanitize = function(input) {
		var output = input
			.replace(/<script[^>]*?>.*?<\/sript>/gi, '')
			.replace(/<[\/\!]*?[^<>]*?>/gi, '')
			.replace(/<style[^>]*?>.*?<\/style>/gi, '')
			.replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');

		return output;
	};

	// FUNCTION Capitalize the first letter of string
	// ================================
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	// FUNCTION showing feedback messages
	// ================================
	var feedbackMessage = function(className, message) {
		if ($('.feedback--alt').length > 0) {
			$('.feedback--alt')
				.addClass(className)
				.html('')
				.html(message);
		} else {
			$(
				'<div class="feedback--alt ' + className + '">' + message + '</div>'
			).insertAfter('.form-control');
		}
	};

	// FUNCTION Create panel link in availabel menu items
	// ================================
	var panelLinkContent = function(arr) {
		var linkGroupParent = '';
		for (var i = 0; i < arr.length; i++) {
			linkGroupParent +=
				'<a href="#' +
				arr[i] +
				'" class="button button--alt button--small button--secondary button--hollow mb-2 mx-1 js-add-to-group-button"><i class="icon-feather mr-1" data-feather="plus-circle"></i>Add to ' +
				arr[i].slice(6).capitalize() +
				'</a>';
		}

		var panelLink = $('.lists__container').find('.panel__links');
		panelLink.html('').append(linkGroupParent);

		// If Group Name becoming NULL, reset Panel Menu Items
		if (panelLink.children().length == 0) {
			panelLink
				.parent()
				.removeClass('panel__body--visible panel__body--shown');
			panelLink
				.closest('.panel')
				.find('.icon-feather')
				.attr('data-feather', 'lock');
		} else {
			panelLink
				.closest('.panel')
				.find('.icon-feather')
				.attr('data-feather', 'plus');
		}

		feather.replace();
	};

	// INIT NICESCROLL on Lists--scroll
	// ================================
	if ($('.lists--scroll').length > 0) {
		$('.lists--scroll').niceScroll({
			cursorcolor: '#009688',
			cursorborder: 0,
			emulatetouch: true,
			preservenativescrolling: false
		});
	}

	// INIT Nested-Sortable
	// =====================================
	if ($('.sortable').length > 0) {
		$('.sortable').nestedSortable({
			forcePlaceholderSize: true,
			items: 'li',
			handle: 'a',
			placeholder: 'menu-highlight',
			listType: 'ul',
			maxLevels: 5,
			opacity: 0.6,
			protectRoot: true,
			update: function(ev, ui) {
				new_location = $(this)
					.find('li')
					.map(function() {
						return $(this).attr('id');
					})
					.get();

				// Update Array ListGroupItem after update nestedSortable
				listGroupItem = new_location;

				// Set Panel link according to new Array
				panelLinkContent(listGroupItem);
			}
		});
	}

	// INIT First Time Running
	// ================================
	panelLinkContent(listGroupItem);

	// ACTION toggle Panel Link
	// ================================
	panel.on('click', '.panel__link', function(e) {
		e.preventDefault();

		var thisPanelBody = $(this)
			.closest('.panel')
			.find('.panel__body');
		var thisPanelIcon = $(this).find('.icon-feather');
		var thisPanelLinks = $(this)
			.closest('.panel')
			.find('.panel__links');

		if (thisPanelLinks.children().length == 0) {
			thisPanelBody.removeClass('panel__body--visible panel__body--shown');
			thisPanelIcon.attr('data-feather', 'lock');
		} else {
			if (!thisPanelBody.hasClass('panel__body--visible')) {
				thisPanelBody.addClass('panel__body--visible');
				thisPanelIcon.attr('data-feather', 'minus');

				setTimeout(function() {
					thisPanelBody.addClass('panel__body--shown');
					$('.lists--scroll')
						.getNiceScroll()
						.resize();
				}, 20);
			} else {
				thisPanelBody
					.removeClass('panel__body--shown')
					.one('webkitTransitionEnd transitionend', function() {
						$(this).removeClass('panel__body--visible');
						$('.lists--scroll')
							.getNiceScroll()
							.resize();
					});

				thisPanelIcon.attr('data-feather', 'plus');
			}
		}

		feather.replace();
	});

	// ACTION after Form Submit
	// ================================
	$('#formAddNewGroup').on('submit', function(e) {
		e.preventDefault();
		var inputNewGroup = $('#inputNewGroup');
		var newGroupValue = inputNewGroup.val().toLowerCase();
		var safeGroupValue = sanitize(newGroupValue);

		// TODO-01: Check if User leave blank input
		// TODO-02: Check if Group Name was not existed in existing Array
		// TODO-03: Check if Group Name was exists on existing Array
		if (safeGroupValue.length < 1) {
			// showing invalid-feedback
			$(this).addClass('was-validated');
			feedbackMessage('invalid-feedback', 'Please fill-in input above.');
		} else if (listGroupItem.indexOf('group-' + safeGroupValue) < 0) {
			// Create Template li.lists__group-item with class + id
			var tmpNewGroup = $('<li></li>');
			tmpNewGroup.addClass('lists__group-item');
			tmpNewGroup.attr('id', 'group-' + safeGroupValue);

			var newGroupChild = $(
				'<a href="#" class="d-flex align-items-center">' +
					safeGroupValue.capitalize() +
					'<i class="icon-feather icon-feather--dark ml-auto lists__icon-toggle" data-feather="chevron-up"></a>'
			);

			var buttonRemove = $(
				'<button type="button" class="button button--link button--alt lists__btn-remove js-remove-list-button"></button>'
			);
			var buttonIcon = $(
				'<i class="icon-feather icon-feather--dark" data-feather="x"></i>'
			);

			buttonRemove.append(buttonIcon);
			var subLists = $('<ul class="sublists"></ul>');

			tmpNewGroup.append(newGroupChild, buttonRemove, subLists);

			// Append ul.lists__group with new template
			var GroupLists = $('.lists__group');
			GroupLists.append(tmpNewGroup);

			// convert tag i into svg
			feather.replace();

			// Add new item into Array listGroupItem
			listGroupItem.push('group-' + safeGroupValue);

			// Make button action on each panel links on available menu items
			panelLinkContent(listGroupItem);

			alert('Element has been created!!');

			// remove validation
			$(this).removeClass('was-validated');
		} else {
			// alert('Element is already exists!! No Further Execution');
			$(this).addClass('was-validated');
			feedbackMessage(
				'invalid-feedback',
				'Name is already exists. Please fill the new Group-name.'
			);
		}

		// empty value input
		$('#inputNewGroup').val('');
	});

	// ACTION: Toggle View Menu Items on each Group Name
	// ================================
	$('.lists__group').on('click', 'a', function(e) {
		$(this)
			.parent()
			.toggleClass('sublists--hidden');
		return false;
	});

	// ACTION: Delete Menu or Group on Group Lists
	// ================================
	$('.lists__group').on('click', '.js-remove-list-button', function(e) {
		if (
			$(e.currentTarget)
				.parent()
				.attr('class') == 'lists__group-item'
		) {
			var updatelistArray = [];
			var targetArray = $(this)
				.parent()
				.attr('id');
			var index = listGroupItem.indexOf(targetArray);

			if (index > -1) {
				listGroupItem.splice(index, 1);

				updatelistArray = listGroupItem;
				panelLinkContent(updatelistArray);
			}

			// console.log(updatelistArray);
		}

		$(this)
			.parent()
			.remove();
	});

	// ACTION: Moving Menu Items into desired Group Name
	// ================================
	var panelLinks = $('.panel__body');

	panelLinks.on('click', '.js-add-to-group-button', function(e) {
		e.preventDefault();

		var menuTitle = $(this)
			.closest('.panel')
			.find('.panel__header span')
			.text();
		var groupTarget = $(this).attr('href');
		var subLists = $(groupTarget).find('.sublists');
		var newList = $('<li></li>').html('<a>' + menuTitle + '</a>');

		var buttonRemove = $(
			'<button type="button" class="button button--link button--alt lists__btn-remove js-remove-list-button"></button>'
		);
		var buttonIcon = $(
			'<i class="icon-feather icon-feather--dark" data-feather="x"></i>'
		);

		buttonRemove.append(buttonIcon);

		newList.append(buttonRemove);

		// Check if .sublists is available
		// NOTE: Nested Sortable make ul.sublists stripped-out if make sortable without child elements inside
		if (subLists.length > 0) {
			newList.appendTo(subLists);
		} else {
			$(groupTarget).append('<ul class="sublists"></ul>');
			newList.appendTo($(groupTarget + ' ul'));
		}

		feather.replace();
	});
});
