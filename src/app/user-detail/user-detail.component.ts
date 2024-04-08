import {Component, OnInit} from '@angular/core';
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
import {TableComponentModule} from "../welcome/redesign/TableComponent";
import {AuthService} from "../service/auth.service";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponentModule, OrangeButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  customerId: number | undefined = -1;
  userName: string = "";
  bankAccounts: any[] = [];
  cards: any[] = [];
  selectedTab: string = "cards";
  headersCards = ['Crad number', 'Type', 'Name', 'Creation Date',
    'Expiration Date', 'Account number', 'CVV', 'Limit', 'Status'];
  heaersBankAcc =['Number', 'Type', 'Status', 'Currency', 'Balance', 'Availabe balance'];

  constructor(private bankAccountService: BankAccountService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private cardService: CardService,
              private popup: PopupService,
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['customerName'];
      this.customerId = params["customerId"];
    });

    this.loadBankAccountTable()
    this.loadCardsTable();
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }

  loadBankAccountTable() {
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.bankAccountService.getUsersBankAccounts(this.customerId).subscribe(
        response => {
          response.map(bankAcc =>{
            const obj = {
              'Number': bankAcc.accountNumber,
              'Type': bankAcc.accountType,
              'Status': bankAcc.accountStatus,
              'Currency': bankAcc.currency,
              'Balance': bankAcc.balance,
              'Available balance': bankAcc.availableBalance
            }
            this.bankAccounts.push(obj);
          })
          // this.bankAccounts = response;
        }
      )
    }
  }

  loadCardsTable(){
    if (this.customerId !== -1 && this.customerId !== undefined) {
      this.cardService.getUsersCards(this.customerId).subscribe(
        response => {
          response.map(card => {
            let isActive;
            if (card.isActivated)
              isActive = "active"
            else isActive = "inactive"

            const obj = {
              'Card number': card.cardNumber,
              'Type': card.cardType,
              'Name': card.cardName,
              'Creation Date': card.creationDate,
              'Expiration Date': card.expirationDate,
              'Account number': card.accountNumber,
              'CVV': card.cvv,
              'Limit': card.cardLimit,
              'Status': isActive,
            }
            this.cards.push(obj);
          })
          // this.cards = response;
        }
      )
    }
  }

  popupNewAccount(){
    this.popup.openAddBankAccountPopup();
  }

  selectTab(tab: string){
    this.selectedTab = tab;
  }

}
