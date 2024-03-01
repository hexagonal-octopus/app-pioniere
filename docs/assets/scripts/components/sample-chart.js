// Global Variables
// ================
Chart.defaults.global.defaultFontFamily = "'montserrat_regular'";

var lineChartOptions = {
   responsive: true,
   maintainAspectRatio: false,
   stacked: false,
   hoverMode: 'index',
   legend: {
      display: false
   },
   tooltips: {
      titleFontFamily: "'montserrat_bold'",
      backgroundColor: '#FFFFFF',
      titleFontColor: '#000',
      bodyFontColor: '#000',
      titleMarginBottom: 12,
      xPadding: 15,
      yPadding: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      displayColors: false
   },
   elements: {
      point: {
         radius: 6,
         borderWidth: 3,
         hoverRadius: 8,
         hoverBorderWidth: 3,
         backgroundColor: '#FFFFFF',
         hoverBackgroundColor: '#FFFFFF'
      }
   }
};

// Helper Function
// ================
function debounce(func, wait, immediate) {
   var timeout;
   return function() {
      var context = this,
         args = arguments;
      var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
   };
}

// jQuery Inisialization
// =====================
$(function() {
   // Create UI Constructor
   var UI = function() {};
   UI.prototype.initChart = function(element) {
      let ctx = element;
      if (ctx.length > 0) {
         Chart.defaults.global.defaultFontFamily = "'montserrat_regular'";
         new Chart(ctx, {
            type: 'line',
            data: {
               labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
               datasets: [
                  {
                     label: 'Total Visit',
                     borderColor: '#1470ad',
                     backgroundColor: '#FFFFFF',
                     fill: false,
                     data: [0, 24, 18, 26, 18, 26, 32]
                  },
                  {
                     label: 'Unique Visitors',
                     borderColor: '#009688',
                     backgroundColor: '#FFFFFF',
                     fill: false,
                     data: [0, 32, 8, 26, 7, 26, 17]
                  },
                  {
                     label: 'Page Views',
                     borderColor: '#ff9800',
                     backgroundColor: '#FFFFFF',
                     fill: false,
                     data: [0, 8, 7, 46, 21, 32, 12]
                  }
               ]
            },
            options: lineChartOptions
         });
      }
   };

   var ui = new UI();
   ui.initChart($('#chartMonthly'));

   // Set Conversion Doughnut Chart on Sample Recruitment Dashboard
   // =============================================================
   var ctx = $('#conversionDoughnut');
   var data1 = parseInt(ctx.data('applicants'));
   var data2 = parseInt(ctx.data('talents'));

   var dataPercentage = $('.chart__percentage');
   dataPercentage.html(parseInt((data1 / data2) * 100));

   var dataConversion = {
      labels: ['Applicants', 'Talents'],
      datasets: [
         {
            data: [data1, data2 - data1],
            backgroundColor: ['#ed4a5f', '#b0bec5']
         }
      ]
   };

   var optionConversion = {
      legend: {
         display: true,
         position: 'right',
         labels: {
            boxWidth: 18,
            fontSize: 12,
            lineHeight: 18,
            fontFamily: "'montserrat_regular'"
         }
      },
      cutoutPercentage: 80,
      responsiveAnimationDuration: 500
   };

   if (ctx.length > 0) {
      new Chart(ctx, {
         type: 'doughnut',
         data: dataConversion,
         options: optionConversion
      });
   }

   // End Script
   // =============================================================

   // Set Gender Doughnut Chart on Sample Recruitment Dashboard
   // =============================================================
   var genderCtx = $('#genderDoughnut');
   var dataMan = parseInt(genderCtx.data('man'));
   var dataWoman = parseInt(genderCtx.data('woman'));

   if (genderCtx.length > 0) {
      new Chart(genderCtx, {
         type: 'doughnut',
         data: {
            labels: ['Woman', 'Man'],
            datasets: [
               {
                  data: [dataWoman, dataMan],
                  backgroundColor: ['#c2185b', '#1976d2']
               }
            ]
         },
         options: {
            legend: {
               display: false
            },
            cutoutPercentage: 80,
            responsiveAnimationDuration: 500,
            aspectRatio: 1
         }
      });
   }

   // Set Education Grade Doughnut Chart on Sample Recruitment Dashboard
   // ===================================================================
   var eduCtx = $('#educationDoughnut');
   var dataHighSchool = parseInt(eduCtx.data('hschool'));
   var dataAssociate = parseInt(eduCtx.data('associate'));
   var dataBachelor = parseInt(eduCtx.data('bachelor'));
   var dataMaster = parseInt(eduCtx.data('master'));
   var dataDoctorate = parseInt(eduCtx.data('doctorate'));

   if (eduCtx.length > 0) {
      new Chart(eduCtx, {
         type: 'doughnut',
         data: {
            labels: [
               'High School',
               'Associate Degree',
               'Bachelor Degree',
               'Master Degree',
               'Doctorate Degree'
            ],
            datasets: [
               {
                  data: [
                     dataHighSchool,
                     dataAssociate,
                     dataBachelor,
                     dataMaster,
                     dataDoctorate
                  ],
                  backgroundColor: [
                     '#8bc34a',
                     '#c2185b',
                     '#8e24aa',
                     '#1976d2',
                     '#00838f'
                  ]
               }
            ]
         },
         options: {
            legend: {
               display: false
            },
            cutoutPercentage: 80,
            responsiveAnimationDuration: 500,
            aspectRatio: 1
         }
      });
   }
});

// Bar Chart on Sample Recruitment Dashboard
// =========================================
var barItems = document.querySelectorAll('.bar__item');

if (barItems.length > 0) {
   barItems.forEach(function(item, i) {
      var spanNumber = document.createElement('span');
      spanNumber.classList.add('numeric');
      spanNumber.textContent = item.dataset.percent + '%';
      item.querySelector('.bar__text').appendChild(spanNumber);

      var barWidth = item.offsetWidth;

      var barStick = document.createElement('div');
      barStick.classList.add('bar__stick');
      setTimeout(() => {
         barStick.style.width = (item.dataset.percent / 100) * barWidth + 'px';
      }, i * 100);

      item.appendChild(barStick);
   });

   window.onresize = debounce(function(e) {
      barItems.forEach(function(item, i) {
         var barWidth = item.offsetWidth;
         var barStick = item.querySelector('.bar__stick');
         barStick.style.width = (item.dataset.percent / 100) * barWidth + 'px';
      });
   }, 350);
}

// Line Chart on Sample Recruitment Dashboard
// =========================================
var legendItems = document.querySelectorAll('.legend__item');
var chartTarget = document.querySelector('#recruitmentChart');
var dataChartType = chartTarget.dataset.type;
var dataChartLabels = chartTarget.dataset.labels.toUpperCase().split(',');

var datasets = [];

legendItems.forEach(function(legitem, i) {
   var lineColor = legitem.dataset.color;
   var dataPoint = legitem.dataset.point;
   var dataLabel = legitem.textContent;
   var pointArray = dataPoint.split(',').map(function(item) {
      return parseInt(item, 10);
   });
   legitem.querySelector('.legend__box').style.borderColor = lineColor;

   var dataset = {
      label: dataLabel,
      borderColor: lineColor,
      backgroundColor: '#FFFFFF',
      fill: false,
      data: pointArray
   };
   datasets.push(dataset);
});

new Chart(chartTarget, {
   type: 'line',
   data: {
      labels: dataChartLabels,
      datasets: datasets
   },
   options: lineChartOptions
});
