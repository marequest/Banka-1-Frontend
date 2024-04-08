import { Component } from '@angular/core';
import { User, BankAccount, Transaction, Exchange } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountDetailsPopUpComponent } from '../account-details-pop-up/account-details-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css'
})
export class BankAccountsComponent {
  
  // Initially set the first tab as active
  activeTab: string = 'transactionsTab';

  //Index of bank account that is displayed in slider
  //If userBankAcc is empty, index will be -1
  displayedBankAccIdx: number = -1;
  displayedBankAcc: BankAccount = {}
  displayedBankAccTransactions: Transaction[] = [];
  displayedBankAccExchanges:Exchange[] = [];

  public userBankAccounts: BankAccount[] = [];
  loggedUserId:number = -1;

  constructor(private bankAccountService: BankAccountService, private router: Router, private dialog: MatDialog, private paymentService: PaymentService) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

   }

  // Function to change the active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  ngOnInit() {
    this.loadUsersBankAccounts();
  }

  // REPLACE MOCKED WITH getUsersBankAccounts - see the function it is in same file as getUsersBankAccountsMocked
  loadUsersBankAccounts() {
    this.bankAccountService.getUsersBankAccounts(this.loggedUserId).subscribe(
      (usersBankAccountsFromDB: BankAccount[]) => {
        this.userBankAccounts = usersBankAccountsFromDB;

        //If user do not have any bank acc set idx to -1 else display 0th bank account
        if(usersBankAccountsFromDB.length > 0)
        {
          this.displayedBankAccIdx = 0;
          this.displayedBankAcc = usersBankAccountsFromDB[this.displayedBankAccIdx];
          this.loadTransactionsForBankAcount(this.displayedBankAcc.accountNumber!);
          this.loadExchangesForBankAcount(this.displayedBankAcc.accountNumber!);
        }

        console.log('User bank acc from db mocked');
        console.log(this.userBankAccounts);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadTransactionsForBankAcount(accountNumber: string) {
    this.bankAccountService.getTransactionsForAccount(accountNumber).subscribe(
      (bankAccountTransactionsFromDB: Transaction[]) => {
        this.displayedBankAccTransactions = bankAccountTransactionsFromDB;

        console.log('Bank acc transactions from db mocked');
        console.log(this.displayedBankAccTransactions);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadExchangesForBankAcount(accountNumber: string) {
    this.bankAccountService.getExchangesForAccount(accountNumber).subscribe(
      (bankAccountExchangesFromDB: Exchange[]) => {
        this.displayedBankAccExchanges = bankAccountExchangesFromDB;

        console.log('Bank acc exchanges from db mocked');
        console.log(this.displayedBankAccExchanges);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  incrementDisplayedBankAccIdx()
  {
    //increment index if currently displayed account isn't the rightmost one
    if(this.displayedBankAccIdx < this.userBankAccounts.length-1)
    {
      this.displayedBankAccIdx++;
      this.displayedBankAcc = this.userBankAccounts[this.displayedBankAccIdx];
      this.loadTransactionsForBankAcount(this.displayedBankAcc.accountNumber!);
      this.loadExchangesForBankAcount(this.displayedBankAcc.accountNumber!);
    }
  }

  decrementDisplayedBankAccIdx()
  {
    //increment index if currently displayed account isn't the leftmost one
    if(this.displayedBankAccIdx > 0)
    {
      this.displayedBankAccIdx--;
      this.displayedBankAcc = this.userBankAccounts[this.displayedBankAccIdx];
      this.loadTransactionsForBankAcount(this.displayedBankAcc.accountNumber!);
      this.loadExchangesForBankAcount(this.displayedBankAcc.accountNumber!);
    }
  }

  newPaymentOnClick(){
    //TODO: go to new payment page
    console.log("New payment button clicked for account " + this.displayedBankAcc);
    this.paymentService.setSelectedBankAccount(this.displayedBankAcc);
    this.router.navigate(['/payment']);
  }

  moreInfoOnClick(){
    console.log("More info clicked for account " + this.displayedBankAcc.accountNumber);

    const dialogRef = this.dialog.open(AccountDetailsPopUpComponent, {
      width: '40vw',
      height: 'auto',
      data: this.displayedBankAcc, // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }
}
