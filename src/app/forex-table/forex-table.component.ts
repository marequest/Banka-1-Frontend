import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {environmentMarket} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Forex} from "../model/model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-forex-table',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './forex-table.component.html',
  styleUrl: '../security-list/security-list.component.css'
})
export class ForexTableComponent implements OnInit {
  forex: Forex[] = [];
  forexBackup: Forex[] = [];
  buyingFilter: string = '';
  sellingFilter: string = '';
  _router: Router;
this: any;
  constructor(private http: HttpClient, router: Router) {
    this._router = router;
  }

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

  navigateToForex(forexId: number): void {
   
    this._router.navigateByUrl(`/forex/${forexId}`);
  }

}
