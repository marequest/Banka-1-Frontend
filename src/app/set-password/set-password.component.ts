import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

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
  confirmPassword() {
    if(this.password !== this.confirmedPassword) {
      alert('Incorrect input. Entered passwords must match');
    } else {
      fetch('api/password', {
        method: 'POST',
        body: JSON.stringify({id: this.activatedRoute.snapshot.params['id'], password: this.password})
      }).then(r => r.ok? alert('Successfully created password') : r.text().then(txt => alert(txt)));
    }
  }
}
