import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {environmentMarket} from "../../../environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Forex} from "../model/model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {ForexFilterPipe} from "../model/forex-filter-pipe.pipe";

@Component({
  selector: 'app-exchange-rate',
  standalone: true,
  imports: [NgForOf,
    FormsModule, OrangeButtonModule, TableComponentModule, ForexFilterPipe],
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.css'
})
export class ExchangeRateComponent {
  forex: Forex[] = [];
  forexBackup: Forex[] = [];
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
    this.forex = this.forexBackup.filter(value =>
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
    this.http.get<Forex[]>(environmentMarket.baseUrl + '/market/listing/get/forex', {headers})
      .subscribe(res => this.forexBackup = this.forex = res );
  }
}
