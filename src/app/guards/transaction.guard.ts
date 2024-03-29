import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service'; // Uvezite servis za rad sa korisnicima
import { AccountService } from '../service/account.service'; // Uvezite servis za rad sa nalozima
import { Account,AccountType } from '../model/model';// Uvezite modele naloga
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TransactionGuard implements CanActivate {

  private isCustomer: boolean = false;
  private hasRequiredAccounts: boolean = false;

  constructor(private router: Router, private userService: UserService, private accountService: AccountService) {}

  canActivate(): Observable<boolean> {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt !== null && jwt.length > 0) {
      return this.userService.getUser(jwt).pipe(
        switchMap(user => {
          this.isCustomer = user.position.toString().toLowerCase() === "customer";
          if (this.isCustomer) {
            return this.checkRequiredAccounts(user.userId); // Proveri potrebne naloge za korisnika ako je "customer"
          } else {
            return [true]; // Ako korisnik nije "customer", dozvoli pristup bez dodatne provere
          }
        })
      );
    } else {
      this.router.navigate(['/login']); // Ako korisnik nije prijavljen, preusmeri ga na stranicu za prijavu
      return new Observable<boolean>(observer => {
        observer.next(false); // Ne dozvoli pristup
        observer.complete();
      });
    }
  }

  private checkRequiredAccounts(customerId: number): Observable<boolean> {
    return this.accountService.getCustomerAccounts(customerId).pipe(
      map((accounts: Account[]) => {
        const currentAccount = accounts.find(acc => acc.accountType === AccountType.CURRENT);
        const foreignCurrencyAccounts = accounts.filter(acc => acc.accountType === AccountType.FOREIGN_CURRENCY);
        this.hasRequiredAccounts = currentAccount && foreignCurrencyAccounts.length > 0 || foreignCurrencyAccounts.length > 1;
        return this.isCustomer && this.hasRequiredAccounts; // Vrati rezultat kombinovane provere
      }),
      switchMap(result => {
        if (!result) {
          this.router.navigate(['/welcome']); // Ako korisnik nema potrebne naloge, preusmeri ga na stranicu za neovlašćeni pristup
          return new Observable<boolean>(observer => {
            observer.next(false); // Ne dozvoli pristup
            observer.complete();
          });
        } else {
          return [true]; // Ako korisnik ima potrebne naloge, dozvoli pristup
        }
      })
    );
  }
}
