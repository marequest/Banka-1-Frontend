import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";



@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banka-frontend';

  showSideNav: boolean;
  userInitials: string = "";


  constructor(private userService : UserService, private router: Router) {
    this.showSideNav = false
    // this.userInitials = "/"
    this.userService.getUser(localStorage.getItem("jwt")).subscribe(
      response => {
        this.userInitials = response.name.charAt(0) + response.lastName.charAt(0);
      }, (e) => {
        this.userInitials = "/"
      }
    )
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  logout(){
    localStorage.removeItem("jwt")
    this.router.navigate(['login'])
  }

  userIsLoggedIn(){
    return !!localStorage.getItem("jwt");
  }


}
