import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, BankAccount } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-account-name-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-account-name-pop-up.component.html',
  styleUrl: './change-account-name-pop-up.component.css'
})
export class ChangeAccountNamePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeAccountNamePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public bankAccount: BankAccount) {}
}
