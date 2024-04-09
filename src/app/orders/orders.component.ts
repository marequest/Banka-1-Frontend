import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

import {Order, OrderDto, SellingRequest, StatusRequest} from "../model/model";

import {BankAccountDto, Order} from "../model/model";

import {OrderService} from "../service/order.service";
import {FormsModule} from "@angular/forms";
import {z} from "zod";
import {HttpClient} from "@angular/common/http";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {WhiteTextFieldModule} from "../welcome/redesign/WhiteTextField";
import {PopupService} from "../service/popup.service";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    OrangeButtonModule,
    WhiteTextFieldModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  selectedTab: "order-history" | "requests" | "securities" = "order-history"
  orderHistory: OrderDto[] = [];
  orderRequests: OrderDto[] = [];
  orderSecurities: OrderDto[] = [];
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  isAgent = sessionStorage.getItem('role') === 'agent';
  isSupervizor = sessionStorage.getItem('role') === 'supervizor';
  popupOpen: boolean = false;
  sellingOrder: OrderDto | null = null;

  sellingReq : SellingRequest= {
    amount: 0,
    limitValue:0,
    stopValue:0,
    allOrNone:false,
    margin:false,
  };

  amount: number = 0;
  limitValue: number = 0;
  stopValue: number = 0;
  allOrNone: boolean = false;
  margin: boolean = false;

  // TODO Pretpostvaljam da je customerId?? jer se on trazi u putanjama za limit i availableBalance
  totalAvailableBalance: number = 0; // Global variable to store the sum
  orderLimitBalance: number = 0;

  sellScheme = z.object({
    amount: z.number().min(0),
    limitValue: z.number().min(0),
    stopValue: z.number().min(0),
    allOrNone: z.boolean(),
    margin: z.boolean()
  })

  constructor(private orderService: OrderService, popupService: PopupService) {
    // TODO Test za popup koji ide na buy dugme, izbrisati
    popupService.openBuyPopup();
  }

  setSelectedTab(tab: "order-history" | "requests" | "securities") {
    this.selectedTab = tab;
  }


  async ngOnInit() {

    if(this.isSupervizor || this.isAdmin){
    this.orderHistory = await this.orderService.getAllOrdersHistory();
    }else{
      this.orderHistory=await this.orderService.getOrdersHistory();
    }

    //Da li zapravo ovde uzimam isti ovaj orderHistory samo filtriram gde je order.status processing
    this.orderRequests = this.orderHistory.filter(order => order.status.toLowerCase() === 'processing');
    //ili poseban poziv
    // this.orderRequests=await this.orderService.getOrderRequests();

    //Da li zapravo ovde uzimam isti ovaj orderHistory samo filtriram gde je order.orderType "SELL"
    this.orderSecurities = this.orderHistory.filter(order => order.orderType === 'SELL');
    //ili poseban poziv
    // this.orderSecurities=await this.orderService.getOrderSecurities();
  }

  async approveOrder(order: OrderDto) {
    try {
      const response = await this.orderService.approveOrder(order.orderId, StatusRequest.APPROVED);
      console.log('Response from approveOrder:', response.success);

       // Brisem ovaj orderr iz niza i tabele (ako treba, a mislim da treba):
    //  const index = this.orderRequests.findIndex(order => order.orderId === orderr.orderId);
    //   if (index !== -1) {
    //     this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
    //   }
    } catch (error) {
      console.error('Error while approving order:', error);
    }

//     this.orderHistory = await this.orderService.getOrderHistory();
//     this.orderRequests = await this.orderService.getOrderRequests();
//     this.orderSecurities = await this.orderService.getOrderSecurities();

//     var customerId = sessionStorage.getItem('loggedUserID');
//     if(customerId) {
//       this.orderService.fetchAccountData(customerId).subscribe(total => {
//         this.totalAvailableBalance = total;
//       });

//       this.orderService.fetchUserForLimit(customerId).subscribe(user => {
//         this.orderLimitBalance = user.orderlimit;
//       }, error => {
//         console.error('Failed to fetch user order limit:', error);
//       });
//     }
//   }


//   async approveOrder(order: Order) {
//     this.orderService.approveOrder();

  }

  async denyOrder(orderr: OrderDto) {
    try{
    const response = await this.orderService.denyOrder(orderr.orderId,StatusRequest.DENIED);
    console.log('Response from denyOrder:', response.success);

    // Brisem ovaj orderr iz niza i tabele (ako treba, a mislim da treba):
    //  const index = this.orderRequests.findIndex(order => order.orderId === orderr.orderId);
    //   if (index !== -1) {
    //     this.orderRequests = this.orderRequests.filter((order, idx) => idx !== index);
    //   }


    }catch (error) {
      console.error('Error while denying order:', error);
    }
  }

  async sellOrder() {
    this.sellingReq.amount=this.amount;
    this.sellingReq.limitValue=this.limitValue;
    this.sellingReq.stopValue=this.stopValue;
    this.sellingReq.allOrNone=this.allOrNone;
    this.sellingReq.margin=this.margin;
    if(this.sellingOrder){
    try{
      console.log(this.sellingReq);
      console.log(this.sellingOrder.orderId);

      // const response = await this.orderService.sellOrder(this.sellingOrder.orderId,this.sellingReq);
      // console.log('Response from selling:', response.success);

      // Brisem ovaj sellingOrder iz niza i tabele:
      // const index = this.orderSecurities.findIndex(order => order.orderId === this.sellingOrder?.orderId);
      // if (index !== -1) {
      //   this.orderSecurities = this.orderSecurities.filter((order, idx) => idx !== index);
      // }

    }catch (error) {
      console.error('Error while selling order:', error);
    }
    }
  }

  openSellMenu(order: OrderDto) {
    this.sellingOrder = order;
    this.popupOpen = true;
  }

  closeSellingMenu() {
    this.sellingOrder = null;
    this.popupOpen = false;
  }
}
