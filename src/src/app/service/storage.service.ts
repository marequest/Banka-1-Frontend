import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private roleSubject = new BehaviorSubject<string | null>(this.getRole());

  constructor() { }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  setRole(role: string): void {
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  removeRole(): void {
    sessionStorage.removeItem('role');
    this.roleSubject.next(null);
  }

  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }
}
