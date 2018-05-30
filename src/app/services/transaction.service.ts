import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class TransactionService {
  urlBase = 'http://41.185.27.50:1985/transaction/assembly/1/2018-05-24/2018-05-30';

  constructor(private http: HttpClient) { }


  dataListFromServer: any;
  txnList = [];


  getTransactionListFromServer(): Observable<any> {
    return this.http.get(this.urlBase);
  }

}
