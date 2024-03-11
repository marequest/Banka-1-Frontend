import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model';

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


  public setUserToEdit(user: User): void {
    this.userToEdit = user;
    console.log('User to edit: ', this.userToEdit);
  }

  public getUserToEdit(): User | undefined {
    return this.userToEdit;
  }
}
