
import {Component, HostListener, ViewChild} from '@angular/core';
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
  isAdmin: boolean = false; 

  

  constructor(private userService : UserService, private router: Router) {
    this.userInitials = "/"
    this.userService.getUser(sessionStorage.getItem("jwt")).subscribe(
      response => {
        this.userInitials = response.name.charAt(0) + response.lastName.charAt(0);
      }, (e) => {
        this.userInitials = "/"
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

}
