import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePaymentRequest } from '../model/model';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-verification-payment-popup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './verification-payment-popup.component.html',
  styleUrl: './verification-payment-popup.component.css'
})
export class VerificationPaymentPopupComponent implements OnInit{

  payment!: CreatePaymentRequest;
  code: string = '';

  constructor(
    private dialogRef: MatDialogRef<VerificationPaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payment: CreatePaymentRequest},
    private PaymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.payment = this.data.payment;
  }

  submit(){
    this.payment.singleUseCode = this.code;

    this.PaymentService.createPayment(this.payment).subscribe({
      next: (response) => {
        console.log("Payment created successfully");
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error creating payment: ", error);
      }
    });
  }

  cancel(){
    this.dialogRef.close();
  }
}

