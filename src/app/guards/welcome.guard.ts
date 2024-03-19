import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {JwtService} from "../service/jwt.service";

export const welcomeGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const token = localStorage.getItem("jwt");

  if(!token) return false;
  return jwtService.isTokenFormatValid(token);
};
