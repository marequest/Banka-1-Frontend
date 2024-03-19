import { Component, Input, OnInit , Inject} from '@angular/core';
import {PopupService} from "../service/popup.service";
import {CommonModule} from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message!: string;
  text!: string;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, text: string }
  ) { }

  ngOnInit(): void {
    this.message = this.data.message;
    this.text = this.data.text;
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
