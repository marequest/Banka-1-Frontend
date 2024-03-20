import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable, of } from 'rxjs';
import { User, Permissions } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  /** 
    Api call.

    userId - passed as parameter because it is a part of url.
    permissionsToModify - list of strings that will be added or removed from depending on flag.
    flag - if set to true adds and if set to false removes passed permissionsToModify from user.

    Api returns boolean.
   **/
  modifyUserPermissions(userId: number, permissionsToModify: string[], flag: boolean){
    let url = environment.baseUrl+`/user/permission/${userId}`;

    const jsonData = {
      permissions: permissionsToModify, 
      add: flag 
    };

    console.log("modifyUserPermissions api log:");
    console.log(url);
    console.log(jsonData);

    //return this.http.post<boolean>(url, jsonData, {headers: {'Content-Type': 'application/json'}});
  
    // Simulating API call with setTimeout
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        // Simulating a successful response for demonstration
        observer.next(true);
        observer.complete();
      }, 1000); // Simulating a delay of 1 second
    });

  }

  addUserPermissions(user:User){
    let id =  user.userId;
    let permissionsToModify = user.permissions;
    let url = environment.baseUrl+"/user";

    let userToSend = {
      userId: id,
      permissions: permissionsToModify
    }

    const jsonData = {
      user: userToSend
    };

    console.log("addUserPermissions api log:");
    console.log(url);
    console.log(jsonData);

    //return this.http.put<number>(url, jsonData, {headers: {'Content-Type': 'application/json'}});
  
    // Simulating API call with setTimeout
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        // Simulating a successful response for demonstration
        observer.next(true);
        observer.complete();
      }, 1000); // Simulating a delay of 1 second
    });
  }
}
