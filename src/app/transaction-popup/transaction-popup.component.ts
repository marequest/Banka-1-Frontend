import { TransactionBasics, User } from '../model/model';
import { Component, OnInit  } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../service/transaction.service';


@Component({
  selector: 'app-transaction-popup',
  standalone: true,
  imports: [],
  templateUrl: './transaction-popup.component.html',
  styleUrl: './transaction-popup.component.css'
})
export class TransactionPopupComponent implements OnInit{
   user:User|undefined;
   transactionBasics:TransactionBasics|undefined;

  ngOnInit(): void {
    this.user = this.transactionService.getTransactionUser() as User;
    this.transactionBasics=this.transactionService.getTransactionBasics() as TransactionBasics;
  }



  constructor(private transactionService: TransactionService,private router: Router,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<TransactionPopupComponent>
    ) {}

    onFinish(){
      if (this.transactionBasics) {
        this.transactionService.createTransaction(this.transactionBasics).subscribe(
          response => {
            alert('Transaction created successfully: ' + JSON.stringify(response));
            this.dialogRef.close();
          },
          error => {
            alert('Dont have enough money on this bank account: ' + JSON.stringify(error));
          }
        );
      } else {
        alert('Transaction basics are not defined.');
      }

    }

    onCancel(){
      this.dialogRef.close();
    }



}
