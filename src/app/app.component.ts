
import {Component, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";
import { Account, AccountType } from './model/model';
import { AccountService } from './service/account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'banka-frontend';


  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  userInitials: string = "";
  isAdmin: boolean = false; 
  isCustomer:boolean =false;
  hasRequiredAccounts: boolean = false;

  //Izbrisati kada bek odradi
  accounts: Account[] = [
    { accountNumber: '12345', accountType: AccountType.CURRENT, currencyName: 'EUR', maintenanceCost: 10.0 },
    { accountNumber: '54321', accountType: AccountType.FOREIGN_CURRENCY, currencyName: 'USD', maintenanceCost: 15.0 }
  ];

  //Izbrisati kada bek odradi
  testcheckRequiredAccounts(){
    const currentAccount = this.accounts.find(acc => acc.accountType === AccountType.CURRENT);
    const foreignCurrencyAccounts = this.accounts.filter(acc => acc.accountType === AccountType.FOREIGN_CURRENCY);
    if (currentAccount && foreignCurrencyAccounts.length > 0 || foreignCurrencyAccounts.length>1) {
      this.hasRequiredAccounts = true;
    }
  }


  constructor(private userService : UserService, private router: Router,private accountService:AccountService) {

    this.userInitials = "/"
    const jwt = sessionStorage.getItem("jwt");
     if (jwt !== null && jwt.length > 0) {
    this.userService.getUser(jwt).subscribe(
      response => {
        this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
        this.isCustomer=response.position.toString().toLowerCase()=="customer";
        if (this.isCustomer) {
          this.testcheckRequiredAccounts();
      // Otkomentarisati kada bek odradi (jedno od ova dva u zavisnosti od implementacije beka)
      // this.checkRequiredAccounts(response.customerId);
      // this.checkRequiredAccounts(response.userId);
        }
      }, (e) => {
        this.userInitials = "/"
      }
    );
     }

  }

  toggleSideNav() {
    if (this.sidenav?.opened) {
      this.sidenav.close();
    } else
      this.sidenav?.open();
  }

  logout(){
    // sessionStorage.removeItem("jwt")
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  userIsLoggedIn(){
    return !!sessionStorage.getItem("jwt");
  }

  checkIsAdmin(): boolean {
    const isAdminValue = sessionStorage.getItem('isAdmin');
    if (isAdminValue=="true") {
         return true;
    }
    else{
      return false;
    }
  }

  checkRequiredAccounts(customerId: number) {

    this.accountService.getCustomerAccounts(customerId).subscribe(
      (accounts: Account[]) => {
        const currentAccount = accounts.find(acc => acc.accountType === AccountType.CURRENT);
        const foreignCurrencyAccounts = accounts.filter(acc => acc.accountType === AccountType.FOREIGN_CURRENCY);
        if (currentAccount && foreignCurrencyAccounts.length > 0 || foreignCurrencyAccounts.length>1) {
          this.hasRequiredAccounts = true;
        }
      },
      (error: any) => {
        console.error("Error while fetching accounts: ", error);
      }
    );
  }

  

  checkIsCustomer(): boolean {
    return this.isCustomer;
  }

  checkIsCustomerAndBankAccounts(): boolean {
    return this.isCustomer && this.hasRequiredAccounts;
  }

}


