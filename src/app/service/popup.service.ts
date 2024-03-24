// popup.service.ts
import { Injectable } from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { AddBankAccountComponent } from '../add-bank-account/add-bank-account.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  openPopup(message: string, text: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message, text }
    });
  }

  openAddUserPopup(): void {
    this.dialog.open(AddUserComponent, {
    });
  }

  openUpdateUserPopup(): void {
    this.dialog.open(UpdateUserComponent, {
    });
  }

  openAddCustomerPopup(): void {
    this.dialog.open(AddCustomerComponent, {
    });
  }

  openAddBankAccountPopup(): void {
    this.dialog.open(AddBankAccountComponent, {
    });
  }
}
