import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environmentMarket} from "../../../environment";
import {StockListing} from "./stock.service";
import {DecideOrderResponse, Order, OrderDto, SellingRequest, StatusRequest} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  async getAllOrdersHistory() {
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
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getOrdersHistory() {
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
      )) as OrderDto[];
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
      )) as OrderDto[];
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
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async sellOrder(orderId:number,sellingReq:SellingRequest): Promise<DecideOrderResponse> {
    const jwt = sessionStorage.getItem("jwt");
  
      if (!jwt) return { success: false, message: 'JWT token not found' };
  
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
      });
    
      try {
        return await firstValueFrom(
          this.http.put<DecideOrderResponse>(`${environmentMarket.baseUrl}/orders/sellOrder/${orderId}`, sellingReq, { headers })
        );
      } catch (error) {
        console.error('Error while selling order:', error);
        throw error; 
      }

  }

 

  async approveOrder(orderId: number, request: StatusRequest): Promise<DecideOrderResponse> {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) return { success: false, message: 'JWT token not found' };
  
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
    });
  
    try {
      return await firstValueFrom(
        this.http.put<DecideOrderResponse>(`${environmentMarket.baseUrl}/orders/decideOrder/${orderId}`, request, { headers })
      );
    } catch (error) {
      console.error('Error while approving order:', error);
      throw error; 
    }
  }
  

  

   async denyOrder(orderId: number, request: StatusRequest): Promise<DecideOrderResponse>{
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) return { success: false, message: 'JWT token not found' };
  
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
    });
  
    try {
      return await firstValueFrom(
        this.http.put<DecideOrderResponse>(`${environmentMarket.baseUrl}/orders/decideOrder/${orderId}`, request, { headers })
      );
    } catch (error) {
      console.error('Error while denying order:', error);
      throw error; 
    }

  }

}
