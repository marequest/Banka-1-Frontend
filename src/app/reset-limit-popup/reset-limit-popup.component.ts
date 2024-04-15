import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankAccountService } from '../service/bank-account.service';
import { PopupService } from '../service/popup.service';
import { Limit, NewLimitDto } from '../model/model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-limit-popup',
  standalone: true,
  imports: [],
  templateUrl: './reset-limit-popup.component.html',
  styleUrl: './reset-limit-popup.component.css'
})
export class ResetLimitPopupComponent implements OnInit{
  constructor(
    private dialogRef: MatDialogRef<ResetLimitPopupComponent>,
    private bankAccountService: BankAccountService,
    private  popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public limit: Limit,
  ) { }

  ngOnInit(): void {

  }
  
  amount : number = 0;
  approvalRequired: boolean = false;

  handleChange(event: any) {
    // Update isChecked variable when the checkbox state changes
    this.approvalRequired = event.target.checked;
    console.log(this.approvalRequired);
  }
 

  resetLimit() {

    // let userId: this.data.limit.userId;
    //TODO: when this is finished on backend uncoment
    //can not mock beacuse is POST method
    this.bankAccountService.resetLimit(this.limit.userId).subscribe(
      (bankAccountExchangesFromDB: any) => {
        console.log('New limit added');
        this.popupService.openPopup("Success", "Reset limit has been done successfully");
      },
      (error: HttpErrorResponse) => {
        this.popupService.openPopup("Error","Error reseting limit");
      }
    );
  }

  cancel(){
    
    this.dialogRef.close('Dialog closed by exit');
  }

  submit(){
    console.log(this.limit);
    this.resetLimit();
    this.dialogRef.close();
  }
}
