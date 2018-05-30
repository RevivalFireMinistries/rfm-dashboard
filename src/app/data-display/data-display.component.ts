import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../services/transaction.service';

declare var $: any;

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  dataSet = [];

  constructor(private txnService: TransactionService) { }

  ngOnInit() {}
}
