import { Component } from '@angular/core';
import {SecurityService} from "../../../service/security.service";
import {StockListing, StockService} from "../../../service/stock.service";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.css'
})
export class StockTableComponent {
  stocks: StockListing[] = [];
  filteredStocks: StockListing[] = [];
  searchString = ""
  constructor(private stockService: StockService) {
  }

  async ngOnInit() {
    await this.loadStocks();
  }

  /**
   * Loads stocks from the backend
   */
  async loadStocks() {
    this.stocks = await this.stockService.getStocks();
    this.filteredStocks = this.stocks;
  }

  /**
   * Performs a search on the fetched stocks. Search is done based on the stocks ticker or name. Ignores case.
   */
  searchStocks() {
    if(this.searchString.length === 0) this.filteredStocks = this.stocks;
    this.filteredStocks = this.filteredStocks.filter((stock) => {
      return stock.ticker.toLowerCase().includes(this.searchString.toLowerCase()) || stock.name.toLowerCase().includes(this.searchString.toLowerCase())
    })
  }
}
