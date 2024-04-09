import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environmentMarket} from "../../../environment";
import {Order} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  async getOrderHistory() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
        this.http.get("/assets/orderHistory.json")
      )) as Order[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrderRequests() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
        this.http.get("/assets/orderRequests.json")
      )) as Order[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrderSecurities() {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let resp;
    try {
      resp = (await firstValueFrom(
        //this.http.get(environmentMarket.baseUrl + "api", {headers})
        this.http.get("/assets/orderSecurities.json")
      )) as Order[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  sellOder() {

  }

  approveOrder() {

  }

  denyOrder() {

  }

}
