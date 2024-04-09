import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  /**
   * Basic token validation.
   * @param token string that is checked if it has a JWT format
   */
  isTokenFormatValid(token: string): boolean {
    return token.split(".").length === 3;
  }
}
