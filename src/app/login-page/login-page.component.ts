import {Component, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { HttpClientModule } from '@angular/common/http';
import {PopupService} from "../service/popup.service";
import {PopupComponent} from "../popup/popup.component";
import {z} from "zod";
import {ValidationService} from "../service/validation.service";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminStatusService } from '../service/admin-status.service';
import { AdminGuard } from '../guards/admin.guard';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  model: any = {};
  showErrorModal: boolean = false;

  constructor(
    private authService: AuthService,
    private adminGuard:AdminGuard,
    private adminSatusService:AdminStatusService,
    public dialog: MatDialog,
    private validator: ValidationService,
    private popupService: PopupService,
    private router: Router,
    private userService: UserService
  ) {
    // const jwt = sessionStorage.getItem("jwt");
    //
    // if (jwt !== null && jwt.length > 0) {
    //   this.router.navigate(['/welcome']);
    // }
  }
  loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  onSubmit() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      (token) => {

        sessionStorage.setItem('jwt', token.jwt);
        sessionStorage.setItem('permissions', token.permissions);
        this.setUserPropertiesInSessionStorage(token.jwt);

        this.adminGuard.userIsAdmin().subscribe(
          (isAdmin) => {
            this.adminSatusService.setIsAdmin(isAdmin);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error("Error occurred while checking admin status:", error);
            // TODO POPUP
            this.adminSatusService.setIsAdmin(false);
          });
      });
  }

  setUserPropertiesInSessionStorage(jwt:string){
    this.userService.getUser(jwt).subscribe(
      response => {

        console.log("User in login:");
        console.log(response);
        
        sessionStorage.setItem('userPosition', response.position);
        sessionStorage.setItem('loggedUserID', response.userId.toString());

      }, (e) => {
        console.log('Error happend while getting user');
      }
    );
  }
}
