import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../service/order.service";
import {ListingType, OrderType} from "../model/model";
import {PopupService} from "../service/popup.service";

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
  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  // margin: boolean = false;
  isFuture: boolean = false;

  constructor(public dialogRef: MatDialogRef<BuyPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,  // Inject the dialog data
              private orderService: OrderService,
              private popupService: PopupService
  ) {
    if (this.data.future && this.data.future.listingId) {
      this.listingId = this.data.future.listingId;
      this.isFuture = true;
    }
    if (this.data.forex && this.data.forex.listingId) {
      this.listingId = this.data.forex.listingId;
      this.isFuture = false;
    }
  }

  closeSellingMenu() {
    this.dialogRef.close();
  }

  async buyOrder() {
    var response = await this.orderService.buyOrder(OrderType.BUY, this.listingId, this.isFuture ? ListingType.FUTURE : ListingType.FOREX, this.amount, this.limitValue, this.stopValue, this.allOrNone);
    if (response) {
      this.popupService.openPopup("Success", "Order has been placed successfully");
      this.dialogRef.close();
    } else {
      this.popupService.openPopup("Error", "Error placing order, try again later");
      this.dialogRef.close();
    }
  }
}
