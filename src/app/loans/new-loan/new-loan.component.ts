import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './new-loan.component.html',
  styleUrl: './new-loan.component.css'
})
export class NewLoanComponent {

}
