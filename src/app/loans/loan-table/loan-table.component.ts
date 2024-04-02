import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Loan} from "../../model/model"
import {MatDialog} from "@angular/material/dialog";
import {LoanDetailsComponent} from "../loan-details/loan-details.component";

@Component({
  selector: 'app-loan-table',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    RouterLink,
    PercentPipe
  ],
  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.css'
})
export class LoanTableComponent implements OnInit {
  loans: Loan[] = [];
  constructor(protected http: HttpClient, protected matDialog: MatDialog) {
  }
  ngOnInit(): void {
    this.http.get<Loan[]>('assets/loans.json').subscribe(res => {
      this.loans = res.map(loan => {
        loan.maturityDate *= 1000;
        loan.agreementDate *= 1000;
        loan.nextInstallmentDate *= 1000;
        return loan;
      });
    })
  }

  openDialog(element: Loan) {
    this.matDialog.open(LoanDetailsComponent, {
      width: '30%',
      height: '80%',
      panelClass: 'dialog-class',
      data: element,
    });
  }

}
