import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {environment} from "../../../environment";
import {HttpClient} from "@angular/common/http";
import {Forex} from "../model/model";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

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
    this.http.get<Forex[]>('assets/mock-forex.json')
    // this.http.get<Forex[]>(environment.baseUrl + '/market/listing/forex')
      .subscribe(res => this.forexBackup = this.forex = res );
  }

}
