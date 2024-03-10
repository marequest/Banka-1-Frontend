import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  updateUserData = {
    email: '',
    name: '',
    surname: '',
    jmbg: '',
    phone: '',
    password: '',
    position: 'Manager',
    active: true
  };

  constructor(private router: Router) {}

  onCreateUpdateUserPopup() {

    if (this.validateForm()) {
      console.log('Uspesno updatovan korisnik:', this.updateUserData);
      
      // this.updateUserData(this.updateUserData);
      this.router.navigate(['/user/list']);
    } else {
      console.error('Forma nije validna.');
    }
  }

  onCancelUpdateUserPopup() {
    this.router.navigate(['/user/list']);
  }

  onCloseUpdateUserPopup() {
    this.router.navigate(['/user/list']);
  }

  private validateForm(): boolean {
   

    if (!this.updateUserData.email || !this.isValidEmail(this.updateUserData.email)) {
      console.error('Email nije validan.');
      return false;
    }

    if (!this.updateUserData.name) {
      console.error('Name nije validan.');
      return false;
    }

    if (!this.updateUserData.password) {
      console.error('Password nije validan.');
      return false;
    }

    if (!this.updateUserData.surname) {
      console.error('Surname nije validan.');
      return false;
    }

    if (!this.updateUserData.jmbg || !this.isValidJMBG(this.updateUserData.jmbg)) {
      console.error('JMBG nije validan.');
      return false;
    }

    if (!this.updateUserData.phone || !this.isValidPhoneNumber(this.updateUserData.phone)) {
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
