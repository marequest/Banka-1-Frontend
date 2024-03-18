import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {environment} from "../../../environment";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import {PopupService} from "../service/popup.service";


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
  private route = inject(ActivatedRoute);
  passVisible: boolean = false;
  // confirmPassVisible: boolean = false;
  password: string = '';
  confirmedPassword: string = '';
  token: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private popupService: PopupService
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  // @ts-ignore
  // confirmPassword() {
  //   if (this.password !== this.confirmedPassword) {
  //     alert('Incorrect input. Entered passwords must match');
  //   } else {
  //     // Assuming environment.baseUrl is correctly defined
  //
  //     const requestBody = {
  //       password: this.password
  //     };
  //
  //     // Set HTTP headers, including Content-Type for JSON
  //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //
  //     // Execute the POST request
  //     // Make sure to replace '/user/activate' with '/user/activate/{token}' if your API requires the token in the URL
  //     return this.http.post(environment.baseUrl + '/user/activate/' + this.activatedRoute.snapshot.params['token'], requestBody, { headers });
  //
  //   }
  // }
  confirmPassword() {
    if(this.password.length < 3 || this.confirmedPassword.length < 3) {
      this.popupService.openPopup("Error", "Password has to be longer than 3 characters!");
    } else {
      if (this.password === this.confirmedPassword) {
        const url = `${environment.baseUrl}/user/activate/${this.token}`;

        // Assuming the body of the request just needs the password
        const body = { password: this.password };

        this.http.post<{ userId: number }>(url, body).subscribe({
          next: (response) => {
            console.log('User activated with ID:', response.userId); // TODO Zakomentarisi
            // Redirect to /login on success
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Activation failed:', error); // TODO Zakomentarisi
            this.popupService.openPopup("Error", "Activation failed!");
          }
        });
      } else {
        this.popupService.openPopup("Error", "Passwords do not match!");
      }
    }
  }
}
