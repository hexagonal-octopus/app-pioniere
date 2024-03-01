import './../../scripts/chart.js/Chart';

class Charts{
   constructor(el) {
      this.chartElement = el;
      this.initChart();
   }

   initChart(){
      let ctx = this.chartElement;
      if( ctx.length > 0) {
         Chart.defaults.global.defaultFontFamily = "'montserrat_regular'";
      new Chart(ctx, {
         type: 'line',
         data: {
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
            datasets: [{
               label: 'Total Visit',
               borderColor: '#1470ad',
               backgroundColor: '#FFFFFF',
               fill: false,
               data: [0, 24, 18, 26, 18, 26, 32]
            },{
               label: 'Unique Visitors',
               borderColor: '#009688',
               backgroundColor: '#FFFFFF',
               fill: false,
               data: [0, 32, 8, 26, 7, 26, 17]
            },{
               label: 'Page Views',
               borderColor: '#ff9800',
               backgroundColor: '#FFFFFF',
               fill: false,
               data: [0, 8, 7, 46, 21, 32, 12]
            }]
         },
         options: {
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
            elements:{
               point: {
                  radius: 6,
                  borderWidth: 3,
                  hoverRadius: 8,
                  hoverBorderWidth: 3,
                  backgroundColor: '#FFFFFF',
                  hoverBackgroundColor: '#FFFFFF',
               }
            }
         }
      });
      }
   }
}

export default Charts;