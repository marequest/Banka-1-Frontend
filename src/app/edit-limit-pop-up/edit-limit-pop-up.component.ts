import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Limit, Recipient, NewLimitDto } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-limit-pop-up',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-limit-pop-up.component.html',
  styleUrl: './edit-limit-pop-up.component.css'
})
export class EditLimitPopUpComponent {

  constructor(
    private dialogRef: MatDialogRef<EditLimitPopUpComponent>,
    private bankAccountService: BankAccountService,
    @Inject(MAT_DIALOG_DATA) public data: { limit: Limit},
  ) { }

  amount : number = 0;
  approvalRequired: boolean = false;

  handleChange(event: any) {
    // Update isChecked variable when the checkbox state changes
    this.approvalRequired = event.target.checked;
    console.log(this.approvalRequired);
  }

  addNewLimit() {

    let newLimitDto:NewLimitDto = {
      userId: this.data.limit.userId,
      approvalReqired: this.approvalRequired,
      limit: this.amount
    }

    //TODO: when this is finished on backend uncoment
    //can not mock beacuse is POST method
    // this.bankAccountService.addNewLimit(newLimitDto).subscribe(
    //   (bankAccountExchangesFromDB: any) => {
    //     console.log('New limit added');
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error('Error adding new limit:', error);
    //   }
    // );
  }

  cancel(){
    this.dialogRef.close('Dialog closed by exit');
  }

  submit(){
    console.log("add new limit clicked");
    this.addNewLimit();
  }


}
