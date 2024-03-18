import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../enviroment";

export interface StockListing {
  listingId: number;
  listingType: 'stock';
  ticker: string;
  name: string;
  exchange: string;
  lastRefresh: number; // UNIX timestamp
  price: number;
  high: number;
  low: number;
  priceChange: number;
  volume: number;
  outstandingShares: number;
  dividendYield: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  async getStocks(): Promise<StockListing[]>  {

    const jwt = localStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        // this.http.get(environment.baseUrl + "/api/market/listing/stock", {headers})
        this.http.get("/assets/stocks.json")
      )) as StockListing[];
    } catch (e) {
      return [];
    }
    return resp;
  }

}
