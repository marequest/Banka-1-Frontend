import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Order} from "../model/model";
import {OrderService} from "../service/order.service";
import {FormsModule} from "@angular/forms";
import {z} from "zod";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  selectedTab: "order-history" | "requests" | "securities" = "order-history"
  orderHistory: Order[] = [];
  orderRequests: Order[] = [];
  orderSecurities: Order[] = [];
  isAdmin: boolean = sessionStorage.getItem('role') === "admin";
  isEmployee: boolean = sessionStorage.getItem('role') === "employee";
  popupOpen: boolean = false;
  sellingOrder: Order | null = null;

  amount: string = "";
  limitValue: string = "";
  stopValue: string = "";
  allOrNone: boolean = false;
  margin: boolean = false;

  sellScheme = z.object({
    amount: z.number().min(0),
    limitValue: z.number().min(0),
    stopValue: z.number().min(0),
    allOrNone: z.boolean(),
    margin: z.boolean()
  })

  constructor(private orderService: OrderService) {
  }

  setSelectedTab(tab: "order-history" | "requests" | "securities") {
    this.selectedTab = tab;
  }

  async ngOnInit() {
    this.orderHistory = await this.orderService.getOrderHistory();
    this.orderRequests = await this.orderService.getOrderRequests();
    this.orderSecurities = await this.orderService.getOrderSecurities();
  }

  async approveOrder(order: Order) {
    this.orderService.approveOrder();
  }

  async denyOrder(order: Order) {
    this.orderService.denyOrder();
  }

  async sellOrder() {
    this.orderService.sellOder();
    console.log(this.amount, this.limitValue, this.stopValue, this.margin, this.allOrNone)
  }

  openSellMenu(order: Order) {
    this.sellingOrder = order;
    this.popupOpen = true;
  }

  closeSellingMenu() {
    this.sellingOrder = null;
    this.popupOpen = false;
  }
}
