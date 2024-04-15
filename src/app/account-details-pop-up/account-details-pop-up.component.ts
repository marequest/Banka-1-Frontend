import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, BankAccount } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAccountNamePopUpComponent } from '../change-account-name-pop-up/change-account-name-pop-up.component';
import { Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';


@Component({
  selector: 'app-account-details-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-details-pop-up.component.html',
  styleUrl: './account-details-pop-up.component.css'
})
export class AccountDetailsPopUpComponent {

  /*Modify the permission-dialog.component.ts file to 
  accept data (the user object) passed into the dialog. Import MAT_DIALOG_DATA and MatDialogRef to facilitate this.*/
  constructor(
    public dialogRef: MatDialogRef<AccountDetailsPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public bankAccount: BankAccount, private dialog: MatDialog,
    private router: Router,
    private paymentService: PaymentService) {}

    exit(){
      this.dialogRef.close('Dialog closed by exit');
    }

    changeAccName(){
      console.log("change acc name");

      const dialogRef = this.dialog.open(ChangeAccountNamePopUpComponent, {
        width: '20vw',
        height: 'auto',
        data: this.bankAccount, // Passing the displayed bank account
        disableClose: true // Prevents closing the dialog by clicking outside or pressing ESC
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');

        if(result != 'dialog_closed_without_changes'){
          this.bankAccount.accountName = result;
        }
        
      });
    }

    newPayment(){
      console.log("New payment" + this.bankAccount);
      this.paymentService.setSelectedBankAccount(this.bankAccount);
      this.router.navigate(['/payment']);
      this.dialogRef.close();
    }
}
