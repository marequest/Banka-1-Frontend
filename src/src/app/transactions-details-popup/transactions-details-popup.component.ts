import { Component, OnInit } from '@angular/core';
import { TransactionDetails } from '../model/model';
import { TransactionService } from '../service/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-transactions-details-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-details-popup.component.html',
  styleUrl: './transactions-details-popup.component.css'
})
export class TransactionsDetailsPopupComponent implements OnInit{
  
  

  transactionDetails:TransactionDetails|undefined;


  ngOnInit(): void {
    this.transactionDetails=this.transactionService.getTransactionDetails() as TransactionDetails;
  }

  constructor(private transactionService: TransactionService,
    private dialogRef: MatDialogRef<TransactionsDetailsPopupComponent>
    ) {}

    onPrint(){
      //Otkomentarisati kada dodje bek za printanje mejla
      
      // if(this.transactionDetails)
      // this.transactionService.printTransaction(this.transactionDetails).subscribe(
      //   response => {
      //     alert('Transaction printed successfully: ' + JSON.stringify(response));
      //   },
      //   error => {
      //     alert('Error with print transaction data: ' + JSON.stringify(error));
      //   }
      // );
      this.dialogRef.close();
    }

    onClose(){
      this.dialogRef.close();
    }
}
