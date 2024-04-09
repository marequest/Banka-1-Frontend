import { Component } from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {Account, Card, TransactionDto} from "../model/model";
import {TransactionService} from "../service/transaction.service";
import {CardService} from "../service/card.service";
import {MatDialog} from "@angular/material/dialog";
import {CardDetailsPopupComponent} from "../card-details-popup/card-details-popup.component";
import {AccountService} from "../service/account.service";

@Component({
  selector: 'app-card-transactions',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './card-transactions.component.html',
  styleUrl: './card-transactions.component.css'
})
export class CardTransactionsComponent {

  transactions: TransactionDto[] = [];
  cards: Card[] = [];
  currCard: Card | null = null;
  currCardIndex: number = -1;
  loggedUserId:number = -1;
  selectedTab: string = "transactions";
  balance: string = "12.000,00";

  constructor(private cardService: CardService,
              private transactionService: TransactionService,
              private accountService: AccountService,
              public dialog: MatDialog) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');

    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

    if (this.loggedUserId != -1) {
      this.cardService.getUsersCards(this.loggedUserId).subscribe(
        response => {
          this.cards = response;
          if(this.cards != null && this.cards.length > 0){
            this.currCardIndex = 0;
            this.currCard = this.cards[this.currCardIndex];
            this.loadTransactions(this.currCard);
            this.getAccount(this.currCard.accountNumber);
          }
        }
      )
    }
  }

  previousCard(){
    if(this.currCardIndex > 0){
      this.currCardIndex = this.currCardIndex-1;
      this.currCard = this.cards[this.currCardIndex];
      this.loadTransactions(this.currCard);
    }
  }

  nextCard(){
    if(this.currCardIndex < this.cards.length-1){
      this.currCardIndex = this.currCardIndex+1;
      this.currCard = this.cards[this.currCardIndex];
      this.loadTransactions(this.currCard);
    }
  }

  openPopUp(){
    const dialogRef = this.dialog.open(CardDetailsPopupComponent, {
      panelClass: 'rounded-dialog',
      data: { card: this.currCard }
    });

  }

  getTextColor(value: string): string {
    if (value === "done") {
      return "green";
    } else if (value === "denied") {
      return "red";
    } else {
      return "white";
    }
  }

  loadTransactions(card: Card){
    let currCardNumber = card.cardNumber;
    if(currCardNumber != undefined) {
      this.transactionService.getCardTransactions(card.cardNumber).subscribe(
        response => {
          this.transactions = response;
        }
      )
    }
  }

  getAccount(accountNum: string | undefined) {
    if (accountNum != undefined) {
      this.accountService.getAccount(accountNum).subscribe(
        response =>
          this.balance = response.balance.toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
      )
    }
  }

  selectTab(tab: string){
    this.selectedTab = tab;
  }

}
