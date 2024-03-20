import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Forex, ListingHistory} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(private http: HttpClient) { }

  async getForexHistory(listingId: number, from: number | null = null, to: number | null = null) {
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

  async getForexById(listingId: number) {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return null;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        // this.http.get(environment.baseUrl + `/api/market/listing/forex/${listingId}`, {headers})
        this.http.get("/assets/mock-forex.json")
      )) as Forex[];
    } catch (e) {
      return null;
    }

    for(let forex of resp) {
      if(forex.listingId == listingId) {
        return forex;
      }
    }
    return null;
  }
}
