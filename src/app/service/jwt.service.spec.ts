import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isTokenFormatValid', () => {
    it('should return true for valid JWT format', () => {
      const validToken = 'valid.token.format';
      expect(service.isTokenFormatValid(validToken)).toBeTrue();
    });

    it('should return false for invalid JWT format', () => {
      const invalidToken = 'invalid';
      expect(service.isTokenFormatValid(invalidToken)).toBeFalse();
    });
  });
});
