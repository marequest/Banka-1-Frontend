import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoanType} from "../../model/model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './new-loan.component.html',
  styleUrl: './new-loan.component.css'
})
export class NewLoanComponent {

  readonly loanTypes = Object.values(LoanType);
}
