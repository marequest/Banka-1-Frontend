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
    public dialog: MatDialog,
    private validator: ValidationService,
    private popupService: PopupService,
    private router: Router,
  ) {}
  loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  onSubmit() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      (token) => {
        localStorage.setItem('jwt', token);
        this.router.navigate(['/welcome']);
      },
      (error) => {
        this.popupService.openPopup("Error", "Wrong credentials!");
      });
  }
}
