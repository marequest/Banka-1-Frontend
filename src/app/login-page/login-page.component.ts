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
import { StorageService } from '../service/storage.service';
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    TransparentTextFieldModule,
    OrangeButtonModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  isEmployee: boolean = false; // Initially set to 'true' to show "Employee"

  toggleRole() {
    this.isEmployee = !this.isEmployee; // Toggle between true and false
    console.log(this.isEmployee ? "employee page" :"customer page")
  }

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
    private userService: UserService,
    private storageService: StorageService
  ) {
  }
  loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })



  onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    if (!this.model.email || !this.model.password) {
      this.popupService.openPopup("Error", "Fields can't be empty")
      return;
    }
    // if (!emailRegex.test(email)) {
    //   this.popupService.openPopup("Error", "Invalid email format")
    //   return;
    // }

    if(this.isEmployee) {
      // Ruta auth/login/emplyee POST
      // kada se uloguje zaposleni u session storage se stavlja pod 'role' pozicija koja je dobijena u objektu
    } else {
      // Ruta auth/login/customer POST
      // kada se uloguje costumer u session storage se stavlja pod 'role' customer
    }

    this.authService.login(this.model.email, this.model.password).subscribe(
      (token) => {

        // Koristimo ovaj pristup da bi mogao da saceka jwt od beka pa da apdejtuje inicijale
        this.authService.setJwt(token.jwt)


        sessionStorage.setItem('jwt', token.jwt);

        sessionStorage.setItem('permissions', token.permissions);
        this.setUserPropertiesInSessionStorage(token.jwt);

        if (token.jwt !== null && token.jwt.length > 0) {
          this.userService.getUser(token.jwt).subscribe(
           response => {
              //this.userInitials = response.firstName.charAt(0) + response.lastName.charAt(0);
             this.storageService.setRole(response.position.toString().toLowerCase());
              console.log(response.position);
           }
         );
        }

        this.adminGuard.userIsAdmin().subscribe(
          (isAdmin) => {
            this.adminSatusService.setIsAdmin(isAdmin);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error("Error occurred while checking admin status:", error);

            this.adminSatusService.setIsAdmin(false);
          });
      },
      error => {
        this.popupService.openPopup("Error", "Wrong email or password")
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
