import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, BankAccount } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-account-name-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-account-name-pop-up.component.html',
  styleUrl: './change-account-name-pop-up.component.css'
})
export class ChangeAccountNamePopUpComponent {

  inputValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChangeAccountNamePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public bankAccount: BankAccount, public bankAccountService: BankAccountService) {}


    submitValue(value: string) {
      console.log('Submitted value:', value);
      console.log(this.bankAccount);

      this.changeAccName();
      this.dialogRef.close(this.inputValue);
    }
  
    exit(){
      this.dialogRef.close('Dialog closed by exit');
    }


  changeAccName() {
    this.bankAccountService.changeBankeAccountName(this.inputValue, this.bankAccount.accountNumber!).subscribe(
      () => {
        console.log("name changed");
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading payments:', error);
      }
    );
  }

}
