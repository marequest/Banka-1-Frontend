import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BankAccountService} from "../service/bank-account.service";
import {BankAccount, Card} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CardService} from "../service/card.service";
import {objectUtil} from "zod";
import addQuestionMarks = objectUtil.addQuestionMarks;
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  selectedTab: string = "bank-accounts";
  customerId: number | undefined = -1;
  userName: string = "";
  bankAccounts: BankAccount[] = [];
  cards: Card[] = [];

  constructor(private bankAccountService: BankAccountService,
              private userService: UserService,
              private route: ActivatedRoute,
              private cardService: CardService,
              private customerService: CustomerService) {
    this.route.params.subscribe(params => {
      this.customerId = this.customerService.getSelectedCustomer()?.userId
    });
    console.log("ID"+this.customerId);
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
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.bankAccountService.getUsersBankAccounts(this.customerId).subscribe(
        response => {
          this.bankAccounts = response;
        }
      )
    }
  }

  loadCardsTable(){
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.cardService.getUsersCards(this.customerId).subscribe(
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
