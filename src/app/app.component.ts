
import {Component, HostListener, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";
import { Account, AccountType } from './model/model';
import { AccountService } from './service/account.service';

import { OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from './service/storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private routerSubscription!: Subscription;
  title = 'banka-frontend';


  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  userInitials: string = "";
  isAdmin: boolean = false; 
  isEmployee: boolean = false;
  isCustomer:boolean = false;
  hasRequiredAccounts: boolean = false;
  loggedUserPosition: string = "";


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


  constructor(private userService : UserService, private router: Router,private accountService:AccountService,private cdr: ChangeDetectorRef,private storageService:StorageService) {
    this.triggerEventForAlreadyLoadedPage();

    this.userInitials = "/"
    
    // const jwt = sessionStorage.getItem("jwt");
    //  if (jwt !== null && jwt.length > 0) {
    // this.userService.getUser(jwt).subscribe(
    //   response => {
    //     console.log(response);
         

    //     this.isCustomer=response.position.toString().toLowerCase()=="customer";
    //     if (this.isCustomer) {
    //       //his.testcheckRequiredAccounts();
    //       // Otkomentarisati kada bek odradi (jedno od ova dva u zavisnosti od implementacije beka)
    //       //this.checkRequiredAccounts(response.customerId);
         
    //     }

    //   }, (e) => {
    //     this.userInitials = "/"
    //   }
    // );}
  }

  ngOnInit(){
   this.checkIsAdminOrEmployeeOrCustomer();
   this.storageService.role$.subscribe(role => {
    this.isAdmin = role === "admin";
    this.isEmployee = role === "employee";
    this.isCustomer = role === "customer";
  });
  }



  checkIsAdminOrEmployeeOrCustomer(){
    this.isAdmin=sessionStorage.getItem('role')==="admin";
    this.isEmployee=sessionStorage.getItem('role')==="employee";
    this.isCustomer=sessionStorage.getItem('role')==="customer";
    const jwt = sessionStorage.getItem("jwt");
    if (jwt !== null && jwt.length > 0) {
    this.userService.getUser(jwt).subscribe(
     response => {
        //this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
        this.checkRequiredAccounts(response.userId);
     }, (e) => {
       this.userInitials = "/"
     }
   );
  
  }
   
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSideNav() {
    if (this.sidenav?.opened) {
      this.sidenav.close();
    } else
      this.sidenav?.open();
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  userIsLoggedIn(){
    return !!sessionStorage.getItem("jwt");
  }

  checkIsAdmin(): boolean {
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isAdmin;
  }

  checkIsEmployee(): boolean{
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isEmployee;
  }

  checkIsCustomer(): boolean{
    this.checkIsAdminOrEmployeeOrCustomer();
    return this.isCustomer;
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


  checkIsCustomerAndBankAccounts(): boolean {
    return this.isCustomer && this.hasRequiredAccounts;
  }


  readUserPositionFromStorage(){
    let loggedUserPositionFromStorage = sessionStorage.getItem('userPosition');
    console.log('Logged user poss')
    console.log(loggedUserPositionFromStorage);

    if (loggedUserPositionFromStorage !== null) {
      this.loggedUserPosition = loggedUserPositionFromStorage;
    } else {
      //console.log('Error occurred: logged user position is null!');
    }
  }

  /*
    When user is logged out, the app-component-html isn't distroyed and is being reused by Angular.
    Because of that neither the constructor or ngOnInit are called.
    So if you want to trigger something after logging in again call this method.
  */
  triggerEventForAlreadyLoadedPage(){
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.readUserPositionFromStorage();
    });
  }

}


