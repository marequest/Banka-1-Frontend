import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, PercentPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Loan} from "../../model/model"

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
  constructor(protected http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<Loan[]>('assets/loans.json').subscribe(res => {
      this.loans = res;
    })
  }

}
