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

  constructor(private cardService: CardService, private router: Router) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

   }

   ngOnInit() {
    this.loadUserCards();
  }

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
