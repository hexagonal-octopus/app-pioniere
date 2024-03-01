$(function(){
   var UI = function(){};
   UI.prototype.initDataTable = function(element) {
      if(element.length > 0) {
         element.DataTable({
            "ordering" : false,
            "info": false,
            "scrollX": true
         });
      }
   }

   var ui = new UI();
   ui.initDataTable($('#tableNewsLists'));
   ui.initDataTable($('#tableUserLists'));
   ui.initDataTable($('#tablePageLists'));
});
