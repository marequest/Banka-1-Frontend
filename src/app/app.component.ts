import { CommonModule } from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {MatSidenav} from "@angular/material/sidenav";



@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banka-frontend';
  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  // showSideNav: boolean;
  userInitials: string = "";
  //
  //
  constructor(private userService : UserService, private router: Router) {
  //   this.showSideNav = false
    this.userInitials = "/"
    this.userService.getUser(localStorage.getItem("jwt")).subscribe(
      response => {
        this.userInitials = response.name.charAt(0) + response.lastName.charAt(0);
      }, (e) => {
        this.userInitials = "/"
      }
    )
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
