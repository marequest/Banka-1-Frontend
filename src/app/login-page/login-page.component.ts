import { Component } from '@angular/core';
import {z} from "zod";
import {ValidationService} from "../validation.service";
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private validator: ValidationService) {}
  loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
  })
}
