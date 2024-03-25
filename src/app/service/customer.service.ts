import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  async initialActivation(email: string, accountNumber: string, phoneNumber: string) {
    const data =  {
      email,
      accountNumber,
      phoneNumber
    }
    let resp;
    try {
      resp = (await firstValueFrom(
        //this.http.post(environment.baseUrl + "/customer/initialActivation", data)
        this.http.get("/assets/initialActivation.json")
      )) as boolean;
    } catch (e) {
      return false;
    }
    return resp;
  }

  async finalActivation(token: string, password: string) {
    const data =  {
      password
    }
    let resp;
    try {
      resp = (await firstValueFrom(
        //this.http.post(environment.baseUrl + `/customer/activate/${token}`, data)
        this.http.get("/assets/finalActivation.json")
      )) as number;
    } catch (e) {
      return false;
    }
    return true;
  }

}
