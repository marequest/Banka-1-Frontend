import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";

export const adminGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const token = localStorage.getItem("jwt");
  if(!token) return false;

  let resp;
  try {
    resp = (await firstValueFrom(
      http.get<boolean>("/assets/admin.json", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })));
    return resp;
  } catch (e) {
    return false;
  }
};
