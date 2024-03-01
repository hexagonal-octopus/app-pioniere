import $ from 'jquery';
// import Scrollbar from './modules/Scrollbar';
// import Charts from './modules/Charts';
import IconFeather from './modules/IconFeather';
import Menu from './modules/Menu';
// import Buttons from './modules/Buttons';
// import Resizes from './modules/Resizes';
// import Editor from './modules/Editor';
// import Tables from './modules/Tables';
import Forms from './modules/Forms';
import Dismiss from './modules/Dismiss';
// import Weather from './modules/Weather';

// new Charts($('#chartMonthly'));
// new IconFeather();
// new Editor($('.summernote'));
// new Forms();

// Global Variables
const scrollConfig = {
   cursorcolor: '#b2ff59',
   cursorborder: 0,
   emulatetouch: true,
   preservenativescrolling: false
};

const scrollConfig2 = {
   cursorcolor: '#009688',
   cursorborder: 0,
   emulatetouch: true,
   preservenativescrolling: false
};

const menu = new Menu();

// new Buttons($('.button'), scrollConfig);
// new Scrollbar($('.main-menu__container'), scrollConfig);

// DataTables
// new Tables($('#tableNewsLists'));
// new Tables($('#tableUserLists'));
// new Tables($('#tablePageLists'));


// Events Listener
// $(window).on('resize', function(){
//    new Resizes();
// });

$(document).on('click keyup', function(event){
   menu.reinitMenu(event);
});

// Calling Dismiss
// new Dismiss('feedback');
// new Dismiss('toast');

//Calling Weather
// new Weather($('.js-weather'), 'Jakarta', 'c');