import {Component, HostListener, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
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
        this.userInitials = response.ime.charAt(0) + response.prezime.charAt(0);
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



}
