import { Component } from '@angular/core';
import { Security, SecurityService } from '../service/security.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ForexTableComponent } from './components/forex-table/forex-table.component';
import { StockListing, StockService } from '../service/stock.service';
import { FormsModule } from '@angular/forms';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { FutureTableComponent } from './components/future-table/future-table.component';
import { TableComponentModule } from '../welcome/redesign/TableComponent';
import { TransformSecurityPipe } from '../transform-security.pipe';
import { Forex, Future } from '../model/model';
import { Router } from '@angular/router';
import { environmentMarket } from '../../../environment';
import { TransformFuturePipe } from '../transform-future.pipe';
import { TransformForexPipe } from '../transform-forex.pipe';

@Component({
  selector: 'app-security-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StockTableComponent,
    ForexTableComponent,
    FutureTableComponent,
    TableComponentModule,
    TransformSecurityPipe,
    TransformFuturePipe,
    TransformForexPipe,
  ],
  templateUrl: './security-list.component.html',
  styleUrl: './security-list.component.css',
})
export class SecurityListComponent {
  securities: Security[] = [];
  selectedTab: string = 'stocks';
  symbol: string = '';

  futures: Future[] = [];
  futuresBackup: Future[] = [];
  _router: Router;

  forex: Forex[] = [];
  forexBackup: Forex[] = [];
  quoteCurrencyFilter: string = '';
  baseCurrencyFilter: string = '';

  constructor(
    private securityService: SecurityService,
    private stockService: StockService,
    private http: HttpClient,
    router: Router
  ) {
    this._router = router;
  }

  searchFutures() {
    this.futures = this.futuresBackup.filter(
      (val) =>
        val.ticker.toLowerCase().includes(this.symbol.toLowerCase()) ||
        val.name.toLowerCase().includes(this.symbol.toLowerCase())
    );
  }

  searchForex() {
    this.forex = this.forexBackup.filter((value) => {
      return (
        value.baseCurrency.toLowerCase().includes(this.symbol.toLowerCase()) &&
        value.quoteCurrency.toLowerCase().includes(this.symbol.toLowerCase())
      );
    });
  }

  searchStocks() {
    if (this.symbol.length === 0) this.securities = this.securities;
    this.securities = this.securities.filter((stock) => {
      return stock.ticker.toLowerCase().includes(this.symbol.toLowerCase());
    });
  }

  search() {
    switch (this.selectedTab) {
      case 'future':
        this.searchFutures();
        break;
      case 'forex':
        this.searchForex();
        break;
      case 'stocks':
        this.searchStocks();
    }
  }

  async ngOnInit() {
    this.loadSecurities();
    this.loadFutures();
    this.loadForex();
  }

  loadSecurities(): void {
    this.securityService.getSecurities().subscribe(
      (securities: Security[]) => {
        this.securities = securities;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading securities:', error);
      }
    );
  }

  loadForex(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    });
    this.http
      // .get<Forex[]>('assets/mock-forex.json')
      this.http.get<Forex[]>(environmentMarket.baseUrl + '/market/listing/get/forex', {headers})
      .subscribe(
        (res) =>
          (this.forexBackup = this.forex =
            res.map((val) => {
              val.lastRefresh *= 1000;
              return val;
            }))
      );
  }

  loadFutures(): void {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    });
    this.http
      // .get<Future[]>('assets/futures-mock.json')
      this.http.get<Future[]>(environmentMarket.baseUrl + '/market/listing/get/futures',{ headers })
      .subscribe(
        (res) =>
          (this.futuresBackup = this.futures =
            res.map((val) => {
              val.settlementDate *= 1000;
              val.lastRefresh *= 1000;
              return val;
            }))
      );
  }

  setSelectedTab(tab: string) {
    console.log(tab);
    this.selectedTab = tab;
  }

  navigateToFuture(listingId: any) {
    this._router.navigateByUrl(`/future/${listingId}`);
  }

  navigateToForex(forexId: number): void {
    this._router.navigateByUrl(`/forex/${forexId}`);
  }
}
