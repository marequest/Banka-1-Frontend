import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupService } from '../service/popup.service';
import { Account, TransactionDetails } from '../model/model';
import { AccountService } from '../service/account.service';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-transactions-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.css'
})
export class TransactionsOverviewComponent implements OnInit{

   realTransactionList: TransactionDetails[] = [];
  
   transactionList: TransactionDetails[] = [
    {
        recipientName: "John Doe",
        amount: 1000,
        referenceNumber: "REF123456789",
        paymentCode: 123,
        purposeOfPayment: "Salary",
        transactionDate: Date.now(),
        senderName: "Jane Smith",
        recipientAccountNumber: "1234567890",
        commission: 5,
        senderAccountNumber: "0987654321",
        channel: "Online Banking",
        status: "done",
        currency:"$"
    },
    {
        recipientName: "Alice Johnson",
        amount: 750,
        referenceNumber: "REF987654321",
        paymentCode: 456,
        purposeOfPayment: "Utilities",
        transactionDate: Date.now() - 86400000,
        senderName: "Bob Brown",
        recipientAccountNumber: "0987654321",
        commission: 3,
        senderAccountNumber: "1234567890",
        channel: "Mobile App",
        status: "denied",
        currency:"$"

    },
    {
        recipientName: "Alice Johnson",
        amount: 750,
        referenceNumber: "REF987654321",
        paymentCode: 456,
        purposeOfPayment: "Utilities",
        transactionDate: Date.now() - 89400000,
        senderName: "Bob Brown",
        recipientAccountNumber: "0987654321",
        commission: 3,
        senderAccountNumber: "1234567890",
        channel: "Mobile App",
        status: "denied",
        currency:"$"

    },

    {
        recipientName: "Alice Johnson",
        amount: 750,
        referenceNumber: "REF987654321",
        paymentCode: 456,
        purposeOfPayment: "Utilities",
        transactionDate: Date.now() - 524002222200,
        senderName: "Bob Brown",
        recipientAccountNumber: "0987654321",
        commission: 3,
        senderAccountNumber: "1234567890",
        channel: "Mobile App",
        status: "done",
        currency:"$"

    }
];

constructor(private popup: PopupService, private dialog: MatDialog, private transactionService: TransactionService,private accountService:AccountService,private userService:UserService){
}
    ngOnInit(): void {
    //Ukloniti kada dodje bek
    this.sortTransactionListSimulation();

    //Otkomentarisati kada dodje bek

    // const jwt = sessionStorage.getItem('jwt');
    // if (jwt) {
    //   this.userService.getUser(jwt).subscribe(
    //     (response) => {
    //       if (response) {
    //         this.accountService.getCustomerAccounts(response.userId).subscribe(
    //           (accounts: Account[]) => {
    //             for (let account of accounts) {
    //               this.transactionService.getAccountTransactions(account.accountNumber).subscribe(
    //                 (transactions: TransactionDetails[]) => {
    //                   this.realTransactionList = [...this.realTransactionList, ...transactions];
    //                   this.sortTransactionList();
    //                 },
    //                 (error) => {
    //                   console.error('Error while fetching transactions for account: ', error);
    //                 }
    //               );
    //             }
    //           },
    //           (error) => {
    //             console.error('Error while fetching accounts: ', error);
    //           }
    //         );
    //       }
    //     },
    //     (error) => {
    //       console.error('Error while fetching user data: ', error);
    //     }
    //   );
    // }
  }

  sortTransactionList(): void {
    this.realTransactionList.sort((a, b) => {
      if (a.senderAccountNumber < b.senderAccountNumber) return -1;
      if (a.senderAccountNumber > b.senderAccountNumber) return 1;
      return b.transactionDate - a.transactionDate;
    });
  }


  //Otkloniti kada dodje bek
  sortTransactionListSimulation(): void {
    this.transactionList.sort((a, b) => {
      if (a.senderAccountNumber < b.senderAccountNumber) return -1;
      if (a.senderAccountNumber > b.senderAccountNumber) return 1;
      return b.transactionDate - a.transactionDate;
    });
  }

getStatusColor(status: String): any {
  switch (status) {
      case 'done':
          return { color: 'green' };
      case 'denied':
          return { color: 'red' };
      default:
          return {};
  }
}



handleRowClick(item: any) {
     this.transactionService.setTransactionDetails(item);
     this.popup.openTransactionDetailsPopup();
    console.log('Kliknuli ste na red:', item);
}
}
