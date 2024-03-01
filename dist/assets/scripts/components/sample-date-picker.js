$(function() {
	// var UI = function(){};
	// UI.prototype.initDatePicker = function(element) {
	//    if(element.length > 0) {
	//       element.datepicker();
	//    }
	// };

	// var ui = new UI();
	// ui.initDatePicker($('.form--datepicker'));
	$('.form--datepicker').flatpickr({
		enableTime: true,
		dateFormat: 'Y-m-d H:i'
	});
});
