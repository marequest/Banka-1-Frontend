import { Component } from '@angular/core';
import { CreateBankAccountRequest } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { PopupService } from '../service/popup.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bank-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-bank-account.component.html',
  styleUrl: './add-bank-account.component.css'
})
export class AddBankAccountComponent {

  // tekuci -> currency: RSD
  // devizni -> currency: WHATEVER except RSD
  // poslovni -> currency: WHATEVER

  isCurrencyReadOnly: boolean = false;
  accountToCreate: CreateBankAccountRequest = {
    status: '',
    currency: '',
    accountType: '',
    maintenanceCost: 0
  };

  constructor(
    private customerService: CustomerService,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<AddBankAccountComponent>,
  ) { }


  submit() {

  }

  cancel(){
    this.dialogRef.close();
  }

  onAccountTypeChange() {
    if (this.accountToCreate.accountType === 'CURRENT') {
      this.accountToCreate.currency = 'RSD';
      this.isCurrencyReadOnly = true;
    } else { //if (this.accountToCreate.accountType === 'FOREIGN_CURRENCY' || this.accountToCreate.accountType === 'BUSINESS') {
      this.accountToCreate.currency = '';
      this.isCurrencyReadOnly = false;
    }
  }

}
