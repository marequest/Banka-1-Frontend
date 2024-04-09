import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TransactionBasics, Account, AccountType, CreatePaymentRequest, BankAccount } from '../model/model';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { PopupService } from '../service/popup.service';
import { PaymentService } from '../service/payment.service';
import { BankAccountService } from '../service/bank-account.service';

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
    paymentCode: '',
    paymentPurpose: '',
    senderAccountNumber: '',
    singleUseCode: '',
    model: ''
  };

  accounts: BankAccount[] = [
    {
      accountNumber: '123456789',
      accountType: AccountType.CURRENT,
      currency: 'RSD',
      balance: 120000.0
    },
    {
      accountNumber: '987654321',
      accountType: AccountType.FOREIGN_CURRENCY,
      currency: 'EUR',
      balance: 5000
    },
  ];
  selectedAccount: BankAccount | undefined;

  constructor(
    private bankAccountService: BankAccountService,
    private popupService: PopupService,
    private paymentService: PaymentService,
  ){
    
  }

  ngOnInit(): void {
    // const loggedInUser = sessionStorage.getItem("loggedInUser");
    // if(!loggedInUser){
    //   throw new Error("No user logged in");
    // }
    // this.bankAccountService.getUsersBankAccounts(parseInt(loggedInUser)).subscribe({
    //   next: (accounts: BankAccount[]) => {
    //     this.accounts = accounts;
    //   },
    //   error: (error) => {
    //     console.error("Error while fetching accounts: ", error);
    //   }
    // });
    if(this.paymentService.getSelectedBankAccount() !== undefined){
      this.selectedAccount = this.paymentService.getSelectedBankAccount();
      this.paymentService.setSelectedBankAccount(undefined);
      console.log("Selected account: ", this.selectedAccount);
    }
  }

  updateAmount(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const accountNumber = selectElement.value;
    this.selectedAccount = this.accounts.find(account => account.accountNumber === accountNumber);
  }


  private validateForm(): boolean {

    if (!this.payment.recipientName) {
      return false;
    }

    if (!this.payment.recipientAccountNumber) {
      
      return false;
    }

    if (!this.payment.amount || this.payment.amount==0) {
      return false;
    }

    if (!this.payment.paymentCode || this.payment.paymentCode==0) {
      return false;
    }

    if (!this.payment.referenceNumber) {
      return false;
    }

    if (!this.payment.purposeOfPayment) {
      return false;
    }
    return true;
  }
  
  submit(){
    if (this.validateForm()) {
    this.paymentService.initializePayment().subscribe({
      next: (paymentCode: number) => {
        
      },
      error: (error) => {
        console.error("Error while initializing payment: ", error);
      }
    });
    this.popupService.openVerifyPaymentPopup(this.payment);
  }
  else{
    this.popupService.openPopup("Error", "Forma nije validna");
    console.log('Forma nije validna.');
  }
}

}
