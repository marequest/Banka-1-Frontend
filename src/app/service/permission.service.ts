import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permissions } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = environment.baseUrl+"/permissions"; // Set your API endpoint here

  constructor(private http: HttpClient) {}

  public getAllPermissions(): Observable<Permissions[]>{
    return this.http.get<Permissions[]>(this.apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

}
