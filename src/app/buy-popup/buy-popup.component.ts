import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../service/order.service";
import {ListingType, OrderType} from "../model/model";

@Component({
  selector: 'app-buy-popup',
  standalone: true,
  imports: [
    FormsModule,
    WhiteTextFieldModule,
    OrangeButtonModule
  ],
  templateUrl: './buy-popup.component.html',
  styleUrl: './buy-popup.component.css'
})
export class BuyPopupComponent {
  listingId: string = "";
  amount: string = "";
  limitValue: string = "";
  stopValue: string = "";
  allOrNone: boolean = false;
  // margin: boolean = false;

  constructor(public dialogRef: MatDialogRef<BuyPopupComponent>, private orderService: OrderService) {
    //TODO Treba mi listingId
  }

  closeSellingMenu() {
    this.dialogRef.close();
  }

  async sellOrder() {
    this.orderService.buyOrder(OrderType.BUY, this.listingId, ListingType.STOCK, this.amount, this.limitValue, this.stopValue, this.allOrNone);
  }
}
