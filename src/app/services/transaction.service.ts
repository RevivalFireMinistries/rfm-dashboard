import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class TransactionService {
  urlBase = 'http://41.185.27.50:1985/transaction/assembly';

  constructor(private http: HttpClient) { }


  dataListFromServer: any;
  txnList = [];


  getTransactionListFromServer(fromDate, toDate, id): Observable<any> {
    const url = this.urlBase + '/' + id + '/' + fromDate + '/' + toDate;
    return this.http.get(url);
  }

}
