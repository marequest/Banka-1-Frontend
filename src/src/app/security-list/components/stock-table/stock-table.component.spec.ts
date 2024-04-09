import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockTableComponent } from './stock-table.component';
import {StockListing, StockService} from '../../../service/stock.service';

describe('StockTableComponent', () => {
  let component: StockTableComponent;
  let fixture: ComponentFixture<StockTableComponent>;
  let stockServiceSpy: jasmine.SpyObj<StockService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StockService', ['getStocks']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CommonModule],
      providers: [{ provide: StockService, useValue: spy }],
    }).compileComponents();
    stockServiceSpy = TestBed.inject(StockService) as jasmine.SpyObj<StockService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stocks on init', async () => {
    const stocks: StockListing[] = [{
      listingId: 1,
      listingType: "stock",
      ticker: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ",
      lastRefresh: 1647590400,
      price: 175.32,
      high: 180.25,
      low: 172.45,
      priceChange: -1.67,
      volume: 2304567,
      outstandingShares: 123456789,
      dividendYield: 1.25
    }];
    stockServiceSpy.getStocks.and.returnValue(Promise.resolve(stocks));
    await component.ngOnInit();
    expect(component.stocks).toEqual(stocks);
    expect(component.filteredStocks).toEqual(stocks);
  });

  it('should filter stocks based on search string', () => {
    component.stocks = [
      {
        listingId: 1,
        listingType: 'stock',
        ticker: 'AAPL',
        name: 'Apple Inc.',
        exchange: 'NASDAQ',
        lastRefresh: 1623643200,
        price: 135.39,
        high: 136.59,
        low: 134.8,
        priceChange: 1.21,
        volume: 122387342,
        outstandingShares: 16789000000,
        dividendYield: 0.64
      },
      {
        "listingId": 2,
        "listingType": "stock",
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "exchange": "NASDAQ",
        "lastRefresh": 1647590400,
        "price": 250.10,
        "high": 255.20,
        "low": 247.90,
        "priceChange": 2.55,
        "volume": 1854321,
        "outstandingShares": 987654321,
        "dividendYield": 1.5
      },
    ];
    component.filteredStocks = component.stocks;
    component.searchString = 'AAPL';
    component.searchStocks();
    expect(component.filteredStocks.length).toEqual(1);
    expect(component.filteredStocks[0].ticker).toEqual('AAPL');
  });
});
