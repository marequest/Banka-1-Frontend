import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserToEdit } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  private userToEdit: User | undefined;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + userId,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }


  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + userId,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public updateUser(user: UserToEdit): Observable<any> {
    return this.http.post<User>(this.apiUrl + '/updateUser', user,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public setUserToEdit(user: User): void {
    this.userToEdit = user;
    console.log('User to edit: ', this.userToEdit);
  }

  public getUserToEdit(): User | undefined {
    return this.userToEdit;
  }

  private readonly apiUrl1 = 'http://localhost:8080'


  getUser(jwt: string | null): Observable<{name: string, lastName: string}> {
    let url = `${this.apiUrl1}/user/getUser`;

    //ToDo: Da li treba autorizacija
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    // });

    //ToDo: Da li treba metod PUT da bude, posto postoji body
    return this.http.put<{name: string, lastName: string}>(url, jwt, {});
  }
}
