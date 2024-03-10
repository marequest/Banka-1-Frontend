import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserData = {
    email: '',
    name: '',
    surname: '',
    jmbg: '',
    phone: '',
    position: 'Manager',
    active: true
  };

  constructor(private router: Router) {}

  onCreateAddUserPopup() {

    if (this.validateForm()) {
      console.log('Uspesno kreiran korisnik:', this.addUserData);

      // this.createUserData(this.addUserData);
      this.router.navigate(['/user/list']);
    } else {
      console.error('Forma nije validna.');
    }
  }

  onCancelAddUserPopup() {
    this.router.navigate(['/user/list']);
  }

  onCloseAddUserPopup() {
    this.router.navigate(['/user/list']);
  }

  private validateForm(): boolean {
   

    if (!this.addUserData.email || !this.isValidEmail(this.addUserData.email)) {
      console.error('Email nije validan.');
      return false;
    }

    if (!this.addUserData.name) {
      console.error('Name nije validan.');
      return false;
    }

    if (!this.addUserData.surname) {
      console.error('Surname nije validan.');
      return false;
    }

    if (!this.addUserData.jmbg || !this.isValidJMBG(this.addUserData.jmbg)) {
      console.error('JMBG nije validan.');
      return false;
    }

    if (!this.addUserData.phone || !this.isValidPhoneNumber(this.addUserData.phone)) {
      console.error('Broj telefona nije validan.');
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private isValidJMBG(jmbg: string): boolean {
    return jmbg.length === 13;
  }

  private isValidPhoneNumber(phone: string): boolean {
    return /^\d+$/.test(phone);
  }

}
