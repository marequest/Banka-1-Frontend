import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {JwtService} from "../jwt.service";

export const employeeGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const token = sessionStorage.getItem("jwt");

  if(!token) return false;
  return jwtService.isTokenFormatValid(token);
};
