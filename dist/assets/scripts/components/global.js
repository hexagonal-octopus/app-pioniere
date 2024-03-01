$(function() {
	// ! FEATHER ICONS HANDLER
	// =======================
	// =======================
	feather.replace();

	// ! MENU SIDEBAR HANDLER
	// =======================
	// =======================
	var body = $('body');
	var menu = $('.main-menu');
	var menuList = $('.main-menu__list');
	var menuLink = $('.main-menu__list a');
	var menuContainer = $('.main-menu__container');
	var submenuCollapsed = $('.main-menu__submenu-collapsed');
	var submenuCollapsedLink = $('.main-menu__submenu-collapsed a');
	var titleMenuCollapsed = $('.main-menu__title-collapsed');
	var titleMenuCollapsedLink = $('.main-menu__title-collapsed');
	var menuLinkHref = menuLink.attr('href');
	var menuLinkText = menuLink.children('span').text();

	var checkSubmenu = function(e) {
		var el = $(e.currentTarget);

		if (el.parent().hasClass('has-sub')) {
			var submenuValue = el.siblings()[0].outerHTML;

			el.parent().toggleClass('is-open');
			menuContainer.getNiceScroll().resize();
			submenuCollapsed
				.show()
				.html(submenuValue)
				.css({top: el.position().top + 170});

			e.preventDefault();
		} else {
			submenuCollapsed.hide();
		}
	};

	var setTitleMenuCollapsed = function(e) {
		var el = $(e.currentTarget);
		titleMenuCollapsed
			.html(
				'<a href="' +
					el.attr('href') +
					'">' +
					el.children('span').html() +
					'</a>'
			)
			.css('top', el.position().top + 120);
	};

	var checkBodyClass = function(e) {
		var el = $(e.currentTarget);
		if (body.hasClass('menu-collapsed')) {
			menuList.removeClass('is-show is-open');
			el.parent().toggleClass('is-show');

			e.preventDefault();
		}
	};

	var revealChildMenu = function(e) {
		menu.addClass('is-active');

		setTitleMenuCollapsed(e);
		checkSubmenu(e);
		checkBodyClass(e);
	};

	var revealChildMenuCollapsed = function(e) {
		var el = $(e.target);

		if (el.parent().hasClass('has-sub')) {
			el.parent().toggleClass('is-open');

			e.preventDefault();
		}
	};

	var cancelTitleMenuCollapsed = function(e) {
		if (submenuCollapsed.is(':visible')) {
			e.preventDefault();
		}
	};

	var escapesListMenu = function() {
		menu.removeClass('is-active');
		menuList.removeClass('is-show');
		submenuCollapsed.hide();
	};

	var reinitMenu = function(e) {
		if (!$(e.target).closest('.main-menu').length) {
			escapesListMenu();
		}

		if (e.keyCode == 27) {
			escapesListMenu();
		}
	};

	// Event Handler
	menuLink.on('click', revealChildMenu);
	submenuCollapsed.on('click', revealChildMenuCollapsed);
	titleMenuCollapsedLink.on('click', cancelTitleMenuCollapsed);

	// Toggle Box-Fixed-Right
	// ===============================
	var toggleBoxRight = $('[data-toggle="box-fixed-right"]');
	var btnDismissBoxRight = $('[data-dismiss="box-fixed-right"]');

	toggleBoxRight.on('click', function() {
		var _this = $(this);
		var target = _this.attr('data-target');

		$(target).css('display', 'block');

		setTimeout(function() {
			$(target).addClass('is-shown');
		}, 20);
	});

	btnDismissBoxRight.on('click', function() {
		$(this)
			.closest('.box--fixed-right')
			.removeClass('is-shown')
			.one('transitionend', function() {
				$(this).attr('style', '');
			});
	});

	// Cancel Menu
	$(document).on('click keyup', function(event) {
		reinitMenu(event);
	});

	// ! NICESCROLL HANDLER ON SIDEMENU
	// ================================
	// ================================

	var scrollConfig = {
		cursorcolor: '#b2ff59',
		cursorborder: 0,
		emulatetouch: true,
		preservenativescrolling: false
	};

	var menuContainer = $('.main-menu__container');
	var body = $('body');
	var btnNavToggler = $('.js-button-zenmode');

	if (menuContainer.length > 0) {
		menuContainer.niceScroll(scrollConfig);
	}

	// Nicescroll on Box--fixed-right
	var target = $('[data-nicescroll]');
	if (target.length > 0) {
		target.niceScroll({
			cursorcolor: '#006064',
			cursorborder: 0,
			emulatetouch: true,
			preservenativescrolling: false
		});
	}

	// ON RESIZE WINDOWS
	var initExpandMenu = function() {
		if (body.hasClass('menu-collapsed')) {
			body.removeClass('menu-collapsed');
			btnNavToggler.find('span').html('Zen Mode');
			menuContainer.niceScroll(scrollConfig);
		}
	};

	$(window).on('resize', function() {
		initExpandMenu();
	});
});
