import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePaymentRequest } from '../model/model';

@Component({
  selector: 'app-verification-payment-popup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './verification-payment-popup.component.html',
  styleUrl: './verification-payment-popup.component.css'
})
export class VerificationPaymentPopupComponent implements OnInit{

  payment!: CreatePaymentRequest;
  code: number = 0;

  constructor(
    private dialogRef: MatDialogRef<VerificationPaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payment: CreatePaymentRequest}
  ) { }

  ngOnInit(): void {
    this.payment = this.data.payment;
  }

  submit(){

  }

  cancel(){
    this.dialogRef.close();
  }
}

