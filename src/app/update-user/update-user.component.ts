import { Component, OnInit  } from '@angular/core';
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


export class UpdateUserComponent implements OnInit {

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

  ngOnInit(): void {
    const userIdToUpdate = '123'; 
    this.fetchUserData(userIdToUpdate);
  }
  
  private fetchUserData(userId: string): void {
    // Simulacija dohvatanja podataka od servisa
    // Zamijenite ovaj deo sa stvarnim kodom za dohvat podataka
    const userData = {
      email: 'user@example.com',
      name: 'John',
      surname: 'Doe',
      jmbg: '1234567890123',
      phone: '123456789',
      password: '', 
      position: 'Manager',
      active: true,
    };

    // Postavite vrednosti u updateUserData objektu
    this.updateUserData = { ...this.updateUserData, ...userData };
  }

 

  constructor(private router: Router) {}

  onCreateUpdateUserPopup() {
    if (this.validateForm()) {
      alert('Successfully modified user: ' + JSON.stringify(this.updateUserData));
      this.router.navigate(['/user/list']);
    } else {
      alert('The form is not valid.');
    }
  }

  onCancelUpdateUserPopup() {
    const confirmResult = confirm('Are you sure you want to cancel adding the user?');
     if (confirmResult) {
      this.router.navigate(['/user/list']);
     }
  }

  onCloseUpdateUserPopup() {
    const confirmResult = confirm('Are you sure you want to cancel adding the user?');
     if (confirmResult) {
      this.router.navigate(['/user/list']);
     }
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
