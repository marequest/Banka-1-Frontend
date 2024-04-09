import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BankAccountService} from "../service/bank-account.service";
import {BankAccount, Card, Customer} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../service/employee.service";
import {CardService} from "../service/card.service";
import {objectUtil} from "zod";
import addQuestionMarks = objectUtil.addQuestionMarks;
import { CustomerService } from '../service/customer.service';
import { PopupService } from '../service/popup.service';

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
  customer: Customer | undefined;

  constructor(private bankAccountService: BankAccountService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private cardService: CardService,
              private popup: PopupService) {
    this.route.params.subscribe(params => {
      this.customerId = this.customerService.getSelectedCustomer()?.userId;
      this.customer = this.customerService.getSelectedCustomer();
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
      this.customerService.getCustomer(jwt).subscribe(
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
    this.popup.openAddBankAccountPopup();
  }
}
