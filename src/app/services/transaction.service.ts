import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class TransactionService {
  urlBase = 'http://41.185.27.50:1985/transaction/assembly';

  constructor(private http: HttpClient) { }


  dataListFromServer: any;
  txnList = [];


  getTransactionListFromServer(fromDate, toDate, id, type): Observable<any> {
    let url = this.urlBase + '/' + id + '/' + fromDate + '/' + toDate;
    if (type !== undefined && type !== '') {
       url = url + '/' + type;
    }
    return this.http.get(url);
  }

}
