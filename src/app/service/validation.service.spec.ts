import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import {z} from "zod";

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass validation', () => {
    const schema = z.object( {
      email: z.string().email(),
      password: z.string()
    })
    const obj = {
      email: "testuser@test.com",
      password: "test123"
    }
    expect(service.validateObject(obj, schema)).toBeTrue();
  })
  it('should fail validation', () => {
    const schema = z.object( {
      email: z.string().email(),
      password: z.string()
    })
    const obj = {
      email: "testuser@test.com",
      password: ""
    }
    expect(service.validateObject(obj, schema)).toBeTrue();
  })
});
