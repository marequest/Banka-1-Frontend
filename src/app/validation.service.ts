import { Injectable } from '@angular/core';
import { ZodObject } from 'zod';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Validates the object against the provided schema.
   * Check https://zod.dev/ for more information about schema creation.
   *
   * Support for more comprehensive error handling should be added in the future.
   *
   * @param input user input data
   * @param schema schema of the expected data to be validated
   */
  public validateObject(input: object, schema: ZodObject<any>): boolean {
    try {
      schema.parse(input);
    } catch (e) {
      return false;
    }
    return true;
  }
}
