import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StockService, StockListing } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService]
    });
    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStocks', () => {
    it('should return an array of StockListing', (done: DoneFn) => {
      const mockStocks: StockListing[] = [
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
      ];

      // Spy on sessionStorage.getItem to return a mock JWT
      spyOn(sessionStorage, 'getItem').and.returnValue('mockJWT');

      service.getStocks().then(stocks => {
        expect(stocks).toEqual(mockStocks); // Assert that returned stocks match mock data
        done(); // Signal that asynchronous operations are complete
      });

      // Expect a GET request to the specified URL
      const request = httpMock.expectOne('/assets/stocks.json');
      expect(request.request.method).toBe('GET');

      // Respond to the request with mock data
      request.flush(mockStocks);
    });


    it('should return an empty array if JWT is missing', (done: DoneFn) => {
      spyOn(sessionStorage, 'getItem').and.returnValue(null);

      service.getStocks().then(stocks => {
        expect(stocks).toEqual([]);
        done();
      });

      httpMock.expectNone('/assets/stocks.json'); // No HTTP request should be made
    });

    it('should return an empty array if HTTP request fails', (done: DoneFn) => {
      spyOn(sessionStorage, 'getItem').and.returnValue('mockJWT');

      service.getStocks().then(stocks => {
        expect(stocks).toEqual([]);
        done();
      });

      const request = httpMock.expectOne('/assets/stocks.json');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('HTTP Error'), { status: 500 });
    });
  });
});
