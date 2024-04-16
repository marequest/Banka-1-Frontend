import { Component } from '@angular/core';
import { Card, User, BankAccount, Exchange, Payment } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../service/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BankAccountService } from '../service/bank-account.service';
import { AccountDetailsPopUpComponent } from '../account-details-pop-up/account-details-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../service/payment.service';
import { CardDetailsPopupComponent } from '../card-details-popup/card-details-popup.component';
import { ExchangeDetailsPopUpComponent } from '../exchange-details-pop-up/exchange-details-pop-up.component';
import { PaymentDetailsPopUpComponent } from '../payment-details-pop-up/payment-details-pop-up.component';



@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  // Initially set the first tab as active
  activeTab: string = 'paymentsTab';

  //Index of bank account that is displayed in slider
  //If userBankAcc is empty, index will be -1
  displayedCardIdx: number = -1;
  displayedCard: Card = {}
  displayedCardPayments: Payment[] = [];
  displayedCardExchanges:Exchange[] = [];

  public userCards: Card[] = [];
  loggedUserId:number = -1;
  loggedUserPosition:string = '';

  constructor(private bankAccountService: BankAccountService, private cardService: CardService, private router: Router, private dialog: MatDialog) {
    let loggedUserPositionFromStorage = sessionStorage.getItem('userPosition');
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

    if (loggedUserPositionFromStorage !== null) {
      this.loggedUserPosition = loggedUserPositionFromStorage;
    } else {
      //console.log('Error occurred: logged user position is null!');
    }

   }

  // Function to change the active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

   ngOnInit() {
    this.loadUserCards();
    console.log('User position:');
    console.log(sessionStorage.getItem('userPosition'));
    console.log('User id:');
    console.log(sessionStorage.getItem('loggedUserID'));

  }

  // REPLACE MOCKED WITH getUsersCards - see the function it is in same file as getUsersCardsMocked
  loadUserCards() {
    this.cardService.getUsersCards(this.loggedUserId).subscribe(
      (userCardsFromDB: Card[]) => {

        //If user do not have any bank acc set idx to -1 else display 0th bank account
        if(userCardsFromDB.length > 0)
        {
          this.displayedCardIdx = 0;
          this.displayedCard = userCardsFromDB[this.displayedCardIdx];
          this.loadPaymentsForBankAcount(this.displayedCard.accountNumber!);
          this.loadExchangesForBankAcount(this.displayedCard.accountNumber!);
        }

        console.log('User cards from db');
        console.log(this.userCards);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  // TODO: REPLACE MOCKED WITH getPaymentsForAccount - see the function it is in same file as getPaymentsForAccountMocked
  loadPaymentsForBankAcount(accountNumber: string) {
    this.bankAccountService.getPaymentsForAccount(accountNumber).subscribe(
      (cardPaymentsFromDB: Payment[]) => {
        this.displayedCardPayments = cardPaymentsFromDB;

        console.log('Card payments from db');
        console.log(this.displayedCardPayments);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading payments:', error);
      }
    );
  }

  // TODO: REPLACE MOCKED WITH getExchangesForAccount - see the function it is in same file as getExchangesForAccountMocked
  loadExchangesForBankAcount(accountNumber: string) {
    this.bankAccountService.getExchangesForAccount(accountNumber).subscribe(
      (cardExchangesFromDB: Exchange[]) => {
        this.displayedCardExchanges = cardExchangesFromDB;

        console.log('Card exchanges from db');
        console.log(this.displayedCardExchanges);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  incrementDisplayedCardIdx()
  {
    //increment index if currently displayed card isn't the rightmost one
    if(this.displayedCardIdx < this.userCards.length-1)
    {
      this.displayedCardIdx++;
      this.displayedCard = this.userCards[this.displayedCardIdx];
      this.loadPaymentsForBankAcount(this.displayedCard.accountNumber!);
      this.loadExchangesForBankAcount(this.displayedCard.accountNumber!);
    }
  }

  decrementDisplayedCardIdx()
  {
    //increment index if currently displayed card isn't the leftmost one
    if(this.displayedCardIdx > 0)
    {
      this.displayedCardIdx--;
      this.displayedCard = this.userCards[this.displayedCardIdx];
      this.loadPaymentsForBankAcount(this.displayedCard.accountNumber!);
      this.loadExchangesForBankAcount(this.displayedCard.accountNumber!);
    }
  }

  openPopUp(){
    const dialogRef = this.dialog.open(CardDetailsPopupComponent, {
      panelClass: 'rounded-dialog',
      data: { card: this.displayedCard }
    });

  }

  paymentInfoPopUp(idx: number){
    const dialogRef = this.dialog.open(PaymentDetailsPopUpComponent, {
      width: '50vw',
      height: 'auto',
      data: this.displayedCardPayments[idx], // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }

  exchangeInfoPopUp(idx: number){
    const dialogRef = this.dialog.open(ExchangeDetailsPopUpComponent, {
      width: '50vw',
      height: 'auto',
      data: this.displayedCardExchanges[idx], // Passing the displayed bank account
      disableClose: false // Prevents closing the dialog by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }
}
