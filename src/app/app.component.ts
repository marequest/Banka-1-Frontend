
import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banka-frontend';

  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  userInitials: string = "";


  constructor(private userService : UserService, private router: Router) {
    this.userInitials = "/";
    const jwt = localStorage.getItem("jwt");

    // Ne bi trebalo da mora da se proverava korektnost jwt-a jer guard vec to radi
    this.userService.getUser(jwt).subscribe(
      response => {
        console.log(response)
        this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
      }, (e) => {
        this.userInitials = "/";
      }
    );
  }

  toggleSideNav() {
    if (this.sidenav?.opened) {
      this.sidenav.close();
    } else
      this.sidenav?.open();
  }

  logout(){
    localStorage.removeItem("jwt")
    this.router.navigate(['login'])
  }

  userIsLoggedIn(){
    return !!localStorage.getItem("jwt");
  }

}
