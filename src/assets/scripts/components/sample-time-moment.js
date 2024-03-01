$(function() {
	var dashboardDate, dashboardTime, date;

	// Initiate Time
	var update = function() {
		date = moment(new Date());
		dashboardDate = $('.dashboard-date');
		dashboardTime = $('.dashboard-time');

		dashboardDate.html(date.format('ddd, MMM Do YYYY'));
		dashboardTime.html(
			'<span class="text-hilite">' +
				date.format('h') +
				'<span class="text-hilite time-seconds">:</span>' +
				date.format('mm') +
				'</span>' +
				moment().format('a')
		);
	};

	update();
	setInterval(update, 1000);
});
