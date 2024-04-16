import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, Exchange } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAccountNamePopUpComponent } from '../change-account-name-pop-up/change-account-name-pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-details-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exchange-details-pop-up.component.html',
  styleUrl: './exchange-details-pop-up.component.css'
})
export class ExchangeDetailsPopUpComponent {

  /*Modify the permission-dialog.component.ts file to 
  accept data (the user object) passed into the dialog. Import MAT_DIALOG_DATA and MatDialogRef to facilitate this.*/
  constructor(
    public dialogRef: MatDialogRef<ExchangeDetailsPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public exchange: Exchange, private dialog: MatDialog,
    private router: Router) {}

    exit(){
      this.dialogRef.close('Dialog closed by exit');
    }
}
