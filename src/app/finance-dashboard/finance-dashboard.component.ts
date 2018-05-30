import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../services/transaction.service';
import {Assembly} from '../domain/assembly';
import {AssemblyService} from '../services/assembly.service';
declare var moment: any;
declare var $: any;
declare var fromDate: string;
declare var toDate: string;



@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {

  private dataSet = [];
  private dataTable = undefined;
  private selectedAssembly: Assembly;
  private selectedAssemblyId: number;
  private assemblyList: any;

  constructor(private txnService: TransactionService, private assemblyService:  AssemblyService) {
  }

  ngOnInit() {
      const start = moment().subtract(29, 'days');
      const end = moment();

      function cb(startDate, endDate) {
          $('#reportrange span').html(startDate.format('MMMM D, YYYY') + ' - ' + endDate.format('MMMM D, YYYY'));
        fromDate = start.format('YYYY-MM-DD');
        toDate = end.format('YYYY-MM-DD');
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

    this.assemblyList =  this.assemblyService.getAssemblyList();

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

  onChangeAssembly(assemblyId): void {
    this.selectedAssemblyId = assemblyId;
    this.searchApi();
  }

  searchApi(): void {
    this.txnService.getTransactionListFromServer(fromDate, toDate, this.selectedAssemblyId)
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
