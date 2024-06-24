import { Component } from '@angular/core';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { FilterByStatusPipeModule } from '../orders/FilterByStatusPipe';
import { OrangeButtonModule } from '../welcome/redesign/OrangeButton';
import { TableComponentModule } from '../welcome/redesign/TableComponent';
import { TransformSecuritiesPipeModule } from '../orders/TransformSecuritiesPipe';
import {
  Contract,
  OTC,
  OTCTab,
  PublicOffer,
  StockListing,
} from '../model/model';
import { OtcService } from '../service/otc.service';
import { StockService } from '../service/stock.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TableComponentStatusModule } from '../welcome/redesign/TableComponentStatus';
import { PopupService } from '../service/popup.service';
import {TransformStatusPipeModule} from "../otc-customer/TransformStatusPipe";
import {TransformContractsPipeModule} from "../otc-customer/TransformContractsPipe";

@Component({
  selector: 'app-otc',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    FilterByStatusPipeModule,
    NgForOf,
    NgIf,
    OrangeButtonModule,
    TableComponentModule,
    TransformSecuritiesPipeModule,
    TableComponentStatusModule,
    TransformStatusPipeModule,
    TransformContractsPipeModule,
  ],
  templateUrl: './otc.component.html',
  styleUrl: './otc.component.css',
})
export class OtcComponent {
  headersOTCs = [
    'Buyer',
    'Seller',
    'Comment',
    'Created',
    'Realized',
    'Ticker',
    'Amount',
    'Price',
  ];

  selectedTab: string = 'overview';
  contracts: Contract[] = [];
  stocks: StockListing[] = [];

  constructor(
    private otcService: OtcService,
    private stockService: StockService,
    private http: HttpClient,
    private popup: PopupService
  ) {}

  async ngOnInit() {
    await this.loadOTCs();
    // this.loadPublicOffers();
    // this.loadActiveBuy();
    // this.loadActiveSell();
  }

  async loadOTCs() {
    this.otcService.getAllSupervisorContracts().subscribe((contracts) => {
      this.contracts = contracts;
      console.log("BBSD");
      console.log(this.contracts);
    });
  }


  setTab(tabName: string) {
    this.selectedTab = tabName;
  }

  updateOTCStatus(contract: any, newStatus: 'Approved' | 'Denied') {
    var contractId = contract.contractId;

    if (contractId) {
      if (newStatus === 'Approved')
        this.otcService.acceptOTC(contractId).subscribe(
          (response) => {
            console.log('Response to successfully changing status to approved with acceptOTC():' + response);
            location.reload();
          },
          (error) => {
            console.error('Error updating status to approved, this is response: ' + error);
          }
        );
      else
        this.otcService.denyOTC(contractId).subscribe(
          (response) => {
            console.log('Response to successfully changing status to denied is with denyOTC():' + response);
            location.reload();
          },
          (error) => {
            console.error('Error updating status to denied, this is response: ' + error);
          }
        );
    } else {
      console.error('Contract ID not found for OTC', contract);
    }
  }
}
