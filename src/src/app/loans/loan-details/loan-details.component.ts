import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Loan} from "../../model/model";
import {DatePipe, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-loan-details',
  standalone: true,
  imports: [
    PercentPipe,
    DatePipe
  ],
  templateUrl: './loan-details.component.html',
  styleUrl: './loan-details.component.css',
})
export class LoanDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Loan) {
  }
}
