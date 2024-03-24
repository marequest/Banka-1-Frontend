
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";
import {AuthService} from "./service/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'banka-frontend';


  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  userInitials: string = "";
  isAdmin: boolean = false;

  ngOnInit() {
    this.authService.getJwtObservable().subscribe(jwt => {
      if (jwt) {
        this.userService.getUser(jwt).subscribe({
          next: (response) => {
            this.userInitials = `${response.firstName.charAt(0)}${response.lastName.charAt(0)}`;
          },
          error: (e) => {
            this.userInitials = "/";
          }
        });
      }
    });
  }
  constructor(
    private authService : AuthService,
    private userService : UserService,
    private router: Router
  ) {}

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
