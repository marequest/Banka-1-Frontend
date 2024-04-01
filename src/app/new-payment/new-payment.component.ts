import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionBasics, Account, AccountType, CreatePaymentRequest } from '../model/model';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-new-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{

  payment: CreatePaymentRequest = {
    recipientName: '',
    recipientAccountNumber: '',
    amount: 0,
    referenceNumber: '',
    paymentCode: 0,
    purposeOfPayment: '',
    senderAccountNumber: '',
    activationCode: ''
  };
  

  accounts: Account[] = [
    {
      accountNumber: '123456789',
      accountType: AccountType.CURRENT,
      currencyName: 'RSD',
      maintenanceCost: 10.0,
      balance: 120000.0
    },
    {
      accountNumber: '987654321',
      accountType: AccountType.FOREIGN_CURRENCY,
      currencyName: 'EUR',
      maintenanceCost: 15.0,
      balance: 5000
    },
  ];
  selectedAccount: Account | undefined;

  constructor(
    private accountService: AccountService,
    private popupService: PopupService
  ){}

  ngOnInit(): void {
    // const loggedInUser = sessionStorage.getItem("loggedInUser");
    // if(!loggedInUser){
    //   throw new Error("No user logged in");
    // }
    // this.accountService.getCustomerAccounts(parseInt(loggedInUser)).subscribe({
    //   next: (accounts: Account[]) => {
    //     this.accounts = accounts;
    //   },
    //   error: (error) => {
    //     console.error("Error while fetching accounts: ", error);
    //   }
    // });
  }

  updateAmount(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const accountNumber = selectElement.value;
    this.selectedAccount = this.accounts.find(account => account.accountNumber === accountNumber);
  }
  
  submit(){
    this.popupService.openVerifyPaymentPopup(this.payment);
  }

}
