import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipient } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';

@Component({
  selector: 'app-edit-recipient',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-recipient.component.html',
  styleUrl: './edit-recipient.component.css'
})
export class EditRecipientComponent implements OnInit{

  recipient!: Recipient;
  fullName: string = '';

  constructor(
    private dialogRef: MatDialogRef<EditRecipientComponent>,
    private bankAccountService: BankAccountService,
    @Inject(MAT_DIALOG_DATA) public data: { recipient: Recipient},
  ) { }

  ngOnInit(): void {
    this.recipient = this.data.recipient;
    this.fullName = this.recipient.firstName + ' ' + this.recipient.lastName;
    console.log(this.recipient);
  }

  submit(): void {
    if(!this.validateRecipient()){
      alert('Invalid recipient data!');
      return;
    }
    let nameParts = this.fullName.split(' ');
    let recipientUpdated: Recipient = {};
    recipientUpdated.accountNumber = this.recipient.accountNumber;
    recipientUpdated.firstName = nameParts[0];
    recipientUpdated.lastName = nameParts[1];

    this.bankAccountService.editRecipient(recipientUpdated).subscribe(
      (response: any) => {
        console.log('Recipient added successfully');
        console.log(response);
      },
      (error: any) => {
        console.error('Error adding recipient:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validateRecipient(){
    // name has to be first name and last name separated by space
    let nameParts = this.fullName.split(' ');
    if(nameParts.length !== 2){
      return false;
    }
    if(this.fullName === '' || this.recipient.accountNumber === ''){
      return false;
    }
    return true;
  }
}
