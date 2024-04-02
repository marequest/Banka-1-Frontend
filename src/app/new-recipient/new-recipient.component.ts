import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankAccountService } from '../service/bank-account.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-recipient',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './new-recipient.component.html',
  styleUrl: './new-recipient.component.css'
})
export class NewRecipientComponent {
  name: string = '';
  bankAccountNumber: string = '';

  constructor(
    private bankAccountService: BankAccountService,
    public dialogRef: MatDialogRef<NewRecipientComponent>
    ){}

  submit(){
    console.log('Submitting new recipient');
    console.log('Name: ' + this.name);
    console.log('Bank account number: ' + this.bankAccountNumber);

    if(!this.validateRecipient()){
      alert('Invalid recipient data!');
      return;
    }
    let nameParts = this.name.split(' ');
    this.bankAccountService.addRecipient(nameParts[0], nameParts[1], this.bankAccountNumber).subscribe(
      (response: any) => {
        console.log('Recipient added successfully');
        console.log(response);
      },
      (error: any) => {
        console.error('Error adding recipient:', error);
      }
    );
  }

  cancel(){
    this.dialogRef.close();
  }

  validateRecipient(){
    // name has to be first name and last name separated by space
    let nameParts = this.name.split(' ');
    if(nameParts.length !== 2){
      return false;
    }
    if(this.name === '' || this.bankAccountNumber === ''){
      return false;
    }
    return true;
  }
}
