import { Component } from '@angular/core';
import {ForexTableComponent} from "../forex-table/forex-table.component";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {StockTableComponent} from "../security-list/components/stock-table/stock-table.component";
import {BankAccountService} from "../service/bank-account.service";
import {BankAccount, Card} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CardService} from "../service/card.service";
import {objectUtil} from "zod";
import addQuestionMarks = objectUtil.addQuestionMarks;

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  selectedTab: string = "bank-accounts";
  userId: number = -1;
  userName: string = "";
  bankAccounts: BankAccount[] = [];
  cards: Card[] = [];

  constructor(private bankAccountService: BankAccountService,
              private userService: UserService,
              private route: ActivatedRoute,
              private cardService: CardService) {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.loadName()
    this.loadBankAccountTable()
    this.loadCardsTable();
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }

  loadName(){
    const jwt = sessionStorage.getItem("jwt");
    if (jwt !== null && jwt.length > 0) {
      this.userService.getUser(jwt).subscribe(
        response => {
          console.log(response);
          this.userName = response.firstName + " " + response.lastName;

        }, (e) => {
          this.userName = ""
        }
      );
    }
  }

  loadBankAccountTable() {
    if (this.userId != -1) {
      this.bankAccountService.getUsersBankAccountsMocked(this.userId).subscribe(
        response => {
          this.bankAccounts = response;
        }
      )
    }
  }

  loadCardsTable(){
    if (this.userId != -1) {
      this.cardService.getUsersCardsMocked(this.userId).subscribe(
        response => {
          this.cards = response;
        }
      )
    }
  }

  popupNewAccount(){
    //ToDo: Otvoriti popup za Add New Bank Account
  }


}
