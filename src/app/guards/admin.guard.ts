import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {JwtService} from "../jwt.service";

export interface IsAdminApiResponse {
  isAdmin: boolean
}

export const adminGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const jwtService = inject(JwtService);
  const token = localStorage.getItem("jwt");
  if(!token || !jwtService.isTokenFormatValid(token)) return false;

  let resp;
  try {
    resp = (await firstValueFrom(
      http.get<IsAdminApiResponse>("/assets/admin.json", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))) as IsAdminApiResponse;
    return resp.isAdmin;
  } catch (e) {
    return false;
  }
};
