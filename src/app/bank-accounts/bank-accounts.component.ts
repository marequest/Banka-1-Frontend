import { Component } from '@angular/core';
import { User, BankAccount } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css'
})
export class BankAccountsComponent {

  public userBankAccounts: BankAccount[] = [];
  loggedUserId:number = -1;

  constructor(private bankAccountService: BankAccountService, private router: Router) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

   }

  ngOnInit() {
    this.loadUsersBankAccounts();
  }

  loadUsersBankAccounts() {
    this.bankAccountService.getUsersBankAccountsMocked(this.loggedUserId).subscribe(
      (usersBankAccountsFromDB: BankAccount[]) => {
        this.userBankAccounts = usersBankAccountsFromDB;

        console.log('User bank acc from db mocked');
        console.log(this.userBankAccounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }
}
