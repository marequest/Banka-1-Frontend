import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environment";

export interface ListingHistory {
  listingId: number;
  date: number; // Unix timestamp
  price: number;
  high: number;
  low: number;
  change: number;
  volume: number;
}

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

    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
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

  async getStockHistory(listingId: number, from: number | null = null, to: number | null = null) {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let query = "?";

    if(from !== null) {
      query += "timestampFrom=" + from;
    }

    if(to !== null) {
      if(query.length > 1) query += "&"
      query += "timestampTo=" + to;
    }

    let resp;
    try {
      resp = (await firstValueFrom(
        // this.http.get(environment.baseUrl + `/api/market/listing/history/${listingId}` + query, {headers})
        this.http.get("/assets/listing-history.json" + query)
      )) as ListingHistory[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getStockById(listingId: number) {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return null;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        // this.http.get(environment.baseUrl + `/api/market/listing/history/${listingId}`, {headers})
        this.http.get("/assets/stocks.json")
      )) as StockListing[];
    } catch (e) {
      return null;
    }

    for(let stock of resp) {
      if(stock.listingId == listingId) {
        return stock;
      }
    }
    return null;
  }
}
