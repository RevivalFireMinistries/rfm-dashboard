import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../services/transaction.service";
declare var moment: any;
declare var $: any;



@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {

  private dataSet = [];
  private dataTable = undefined;

  constructor(private txnService: TransactionService) {
  }

  ngOnInit() {
      const start = moment().subtract(29, 'days');
      const end = moment();

      function cb(start, end) {
          $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      }

      $('#reportrange').daterangepicker({
          startDate: start,
          endDate: end,
          ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Last 7 Days': [moment().subtract(6, 'days'), moment()],
              'Last 30 Days': [moment().subtract(29, 'days'), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
      }, cb);

      cb(start, end);

    this.dataTable = $('#txnDataTable').DataTable( {
      data: this.dataSet,
      columns: [
        { title: 'Date' },
        { title: 'Type' },
        { title: 'Amount' },
        { title: 'Description.' },
        { title: 'Type' },
        { title: 'Beneficiary' }
      ]
    } );

  }
  onChange(): void {
    this.txnService.getTransactionListFromServer()
      .subscribe((function(data) {
        const respArray = data.transactionList;

        for (let i = 0; i < respArray.length;  i++) {
          const txnObj = [
            respArray[i].created, respArray[i].type, respArray[i].amount, respArray[i].description, respArray[i].type, respArray[i].beneficiary
          ];
          this.dataSet.push(txnObj);
          this.dataTable.clear().rows.add(this.dataSet).draw();
        }
      }).bind(this));
  }

}
