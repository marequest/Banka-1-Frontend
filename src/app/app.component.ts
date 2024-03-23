
import {Component, HostListener, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";

import { OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private routerSubscription!: Subscription;
  title = 'banka-frontend';


  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  userInitials: string = "";
  isAdmin: boolean = false;
  loggedUserPosition:string = ''; 

  constructor(private userService : UserService, private router: Router) {
    this.triggerEventForAlreadyLoadedPage();
    
    this.userInitials = "/"
    const jwt = sessionStorage.getItem("jwt");
     if (jwt !== null && jwt.length > 0) {
    this.userService.getUser(jwt).subscribe(
      response => {
        console.log(response);
        this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);

      }, (e) => {
        this.userInitials = "/"
      }
    );
     }

  }

  ngOnInit(){
    this.readUserPositionFromStorage();

    console.log('In app comp:')
    console.log(this.loggedUserPosition);
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

  readUserPositionFromStorage(){
    let loggedUserPositionFromStorage = sessionStorage.getItem('userPosition');
    console.log('Logged user poss')
    console.log(loggedUserPositionFromStorage);

    if (loggedUserPositionFromStorage !== null) {
      this.loggedUserPosition = loggedUserPositionFromStorage;
    } else {
      console.log('Error occurred: logged user position is null!');
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
