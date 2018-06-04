import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../services/transaction.service';
import {Assembly} from '../domain/assembly';
import {AssemblyService} from '../services/assembly.service';
declare var moment: any;
declare var $: any;



@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {

  public dataSet = [];
  public dataTable = undefined;
  public selectedAssembly: Assembly;
  public selectedAssemblyId: number;
  public assemblyList: Assembly[];
  public fromDate: string;
  public toDate: string;
  public error: boolean;
  public success: boolean;
  public numResults: number;
  public txnType: string;

  constructor(private txnService: TransactionService, private assemblyService:  AssemblyService) {
  }

  ngOnInit() {

      this.error = false;
      this.success = false;
      const start = moment().subtract(29, 'days');
      const end = moment();

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
          },
        autoApply: false,
      }, this.onDateChange.bind(this));

    this.onDateChange(start, end);

    this.assemblyList =  this.assemblyService.getAssemblyList();

    this.selectedAssembly = this.assemblyList[0];

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

  onDateChange(startDate, endDate): void {
    $('#reportrange span').html(startDate.format('MMMM D, YYYY') + ' - ' + endDate.format('MMMM D, YYYY'));
    this.fromDate = startDate.format('YYYY-MM-DD');
    this.toDate = endDate.format('YYYY-MM-DD');
    this.searchApi();
  }

  onChangeAssembly(): void {
    this.searchApi();
  }

  onChangeTxnType(txnType): void {
    this.txnType = txnType;
    this.searchApi();
  }

  searchApi(): void {
    this.dataSet.length = 0;
    if ( typeof this.selectedAssembly !== 'undefined' ) {
      this.txnService.getTransactionListFromServer(this.fromDate, this.toDate, this.selectedAssembly.id, this.txnType)
        .subscribe((function(data) {
          const respArray = data.transactionList;

          for (let i = 0; i < respArray.length;  i++) {
            const txnObj = [
              respArray[i].created, respArray[i].type, respArray[i].amount, respArray[i].description, respArray[i].type, respArray[i].beneficiary
            ];
            this.dataSet.push(txnObj);

          }
          this.dataTable.clear().rows.add(this.dataSet).draw();
          this.numResults = this.dataSet.length;
          this.success = true;
        }).bind(this));
    }

  }

  downloadCSV(): void {
    if ( this.dataSet.length < 1) {
      return;
    }
    const rows = this.dataSet;
    let csvContent = 'data:text/csv;charset=utf-8,';
    rows.forEach(function (rowArray) {
      const row = rowArray.join(',');
      csvContent += row + '\r\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('type', 'hidden');
    link.setAttribute('download', 'finance_report-' + this.selectedAssembly.name + '-' + this.fromDate + '-' + this.toDate );
    link.innerHTML = '';
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  getAssemblyList(): {}[]{ return this.assemblyList; }

}
