import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  getUsersCardsMocked(userId: number): Observable<Card[]> {
    return this.httpClient.get<Card[]>('/assets/cards-mocked.json');
  }

  getUsersCards(userId: number): Observable<Card[]> {
    return this.httpClient.get<Card[]>('/assets/cards-mocked.json'); //TODO change this with actual api
  }
}
