import '../../scripts/datatables.net/js/jquery.dataTables';

class Tables {
   constructor(el) {
      this.tableElement = el;

      this.initDataTable();
   }

   initDataTable() {
      if(this.tableElement.length > 0) {
         this.tableElement.DataTable({
            "ordering" : false,
            "info": false,
            "scrollX": true
         });
      }
   }
}

export default Tables;