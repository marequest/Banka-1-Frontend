import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "../../../environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent {
  private activatedRoute = inject(ActivatedRoute);
  passVisible: boolean = false;
  confirmPassVisible: boolean = false;
  password: string = '';
  confirmedPassword: string = '';

  constructor(private http: HttpClient) {


  }

  // @ts-ignore
  confirmPassword() {
    if (this.password !== this.confirmedPassword) {
      alert('Incorrect input. Entered passwords must match');
    } else {
      // Assuming environment.baseUrl is correctly defined

      const requestBody = {
        password: this.password
      };

      // Set HTTP headers, including Content-Type for JSON
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // Execute the POST request
      // Make sure to replace '/user/activate' with '/user/activate/{token}' if your API requires the token in the URL
      return this.http.post(environment.baseUrl + '/user/activate/' + this.activatedRoute.snapshot.params['token'], requestBody, { headers });

    }
  }

}
