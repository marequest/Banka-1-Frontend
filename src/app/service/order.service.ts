import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment, environmentMarket} from "../../../environment";
import {StockListing} from "./stock.service";

import {DecideOrderResponse, OrderDto, SellingRequest, StatusRequest} from "../model/model";

import {BankAccountDto, CreateOrderRequest, ListingType, Order, OrderType, User} from "../model/model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


//   async getAllOrdersHistory() {

  // fetchAccountData(id: string): Observable<number> {
  //   const jwt = sessionStorage.getItem("jwt");
  //
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${jwt}`
  //     })
  //   };
  //   return this.http.get<BankAccountDto[]>(environment.baseUrl + '/account/getCustomer/' + id, httpOptions).pipe(
  //     map(accounts => accounts.reduce((sum, account) => sum + account.availableBalance, 0))
  //   );
  // }

  fetchUserForLimit(id: string): Observable<User> {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get<User>(environment.baseUrl + '/employee/' + id, httpOptions);
  }



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
      )) as OrderDto[];
    } catch (e) {
      return [];
    }
    return resp;
  }
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
  async buyOrder(orderType: OrderType, listingId: string, listingType: ListingType, contractSize: number, limitValue: number, stopValue: number, allOrNone: boolean) {
    const jwt = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };

    const orderRequest: CreateOrderRequest = {
      orderType: orderType,
      listingId: listingId,
      listingType: listingType,
      contractSize: contractSize,
      limitValue: limitValue,
      stopValue: stopValue,
      allOrNone: allOrNone
    };
    console.log(orderRequest);

    try {
      const response = await this.http.post<boolean>(
        environment.baseUrl + '/orders', orderRequest, httpOptions).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}
