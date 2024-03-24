import { Component } from '@angular/core';
import { Card, User } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../service/card.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  public userCards: Card[] = [];
  loggedUserId:number = -1;
  loggedUserPosition:string = '';

  constructor(private cardService: CardService, private router: Router) {
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

   ngOnInit() {
    this.loadUserCards();
    console.log('User position:');
    console.log(sessionStorage.getItem('userPosition'));
    console.log('User id:');
    console.log(sessionStorage.getItem('loggedUserID'));

  }

  // REPLACE MOCKED WITH getUsersCards - see the function it is in same file as getUsersCardsMocked
  loadUserCards() {
    this.cardService.getUsersCardsMocked(this.loggedUserId).subscribe(
      (userCardsFromDB: Card[]) => {
        this.userCards = userCardsFromDB;

        console.log('User cards from db mocked');
        console.log(this.userCards);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }
}
