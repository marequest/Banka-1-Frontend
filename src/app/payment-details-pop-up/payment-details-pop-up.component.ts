import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, Payment } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAccountNamePopUpComponent } from '../change-account-name-pop-up/change-account-name-pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-details-pop-up.component.html',
  styleUrl: './payment-details-pop-up.component.css'
})
export class PaymentDetailsPopUpComponent {

  /*Modify the permission-dialog.component.ts file to 
  accept data (the user object) passed into the dialog. Import MAT_DIALOG_DATA and MatDialogRef to facilitate this.*/
  constructor(
    public dialogRef: MatDialogRef<PaymentDetailsPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public payment: Payment, private dialog: MatDialog,
    private router: Router) {}


    exit(){
      this.dialogRef.close('Dialog closed by exit');
    }
}
