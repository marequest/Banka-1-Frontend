import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent {
  passVisible: boolean = false;
  confirmPassVisible: boolean = false;
}
