import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { TransactionService } from './services/transaction.service';

@NgModule({
    declarations: [
        AppComponent,
        FinanceDashboardComponent,
        DataDisplayComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot()
    ],
    providers: [TransactionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
