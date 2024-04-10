import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {environment} from "../../../environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExchangeRate} from "../model/model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {ExchangeFilterPipe} from "../model/forex-filter-pipe.pipe";
import { TransparentTextFieldModule } from "../welcome/redesign/TransparentTextField";

@Component({
    selector: 'app-exchange-rate',
    standalone: true,
    templateUrl: './exchange-rate.component.html',
    styleUrl: './exchange-rate.component.css',
    imports: [NgForOf,
        FormsModule, OrangeButtonModule, TableComponentModule, ExchangeFilterPipe, TransparentTextFieldModule]
})
export class ExchangeRateComponent {
  exchange: ExchangeRate[] = [];
  exchangeBackup: ExchangeRate[] = [];
  buyingFilter: string = '';
  sellingFilter: string = '';
  headers = ['Selling symbol', 'Buying symbol', 'Price'];
  _router: Router;
  searchString = ""
this: any;
  constructor(private http: HttpClient, router: Router) {
    this._router = router;
  }

  // searchExchangeRate() {
  //   if(this.searchString.length === 0) this.filteredStocks = this.stocks;
  //   this.filteredStocks = this.filteredStocks.filter((stock) => {
  //     return stock.ticker.toLowerCase().includes(this.searchString.toLowerCase()) || stock.name.toLowerCase().includes(this.searchString.toLowerCase())
  //   })
  // }

  search() {
    this.exchange = this.exchangeBackup.filter(value =>
    {
      debugger;
      return value.baseCurrency.toLowerCase().includes(this.sellingFilter.toLowerCase())
      && value.quoteCurrency.toLowerCase().includes(this.buyingFilter.toLowerCase())
    });
  }

  ngOnInit(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    // this.http.get<Forex[]>('assets/mock-forex.json')
    this.http.get<ExchangeRate[]>(environment.baseUrl + '/transfer/exchangeRates', {headers})
      .subscribe(res => this.exchangeBackup = this.exchange = res );
  }
}
