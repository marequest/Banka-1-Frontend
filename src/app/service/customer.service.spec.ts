import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform initial activation', () => {
    const mockResponse = true;

    service.initialActivation('test@example.com', '123456789012345678', '1234567890').then(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne('/assets/initialActivation.json'); // Adjust URL as needed
    expect(request.request.method).toBe('GET'); // Adjust method as needed
    request.flush(mockResponse);
  });

  it('should handle initial activation error', () => {
    service.initialActivation('test@example.com', '123456789012345678', '1234567890').then(response => {
      expect(response).toBeFalse();
    });

    const request = httpMock.expectOne('/assets/initialActivation.json'); // Adjust URL as needed
    expect(request.request.method).toBe('GET'); // Adjust method as needed
    request.error(new ErrorEvent('Error'));
  });

  it('should perform final activation', () => {
    const mockResponse = true;

    service.finalActivation('token', 'Test1234').then(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne('/assets/finalActivation.json'); // Adjust URL as needed
    expect(request.request.method).toBe('GET'); // Adjust method as needed
    request.flush(mockResponse);
  });

  it('should handle final activation error', () => {
    service.finalActivation('token', 'Test1234').then(response => {
      expect(response).toBeFalse();
    });

    const request = httpMock.expectOne('/assets/finalActivation.json'); // Adjust URL as needed
    expect(request.request.method).toBe('GET'); // Adjust method as needed
    request.error(new ErrorEvent('Error'));
  });
});
