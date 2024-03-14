import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { User, UserToEdit } from '../model';
import { UserService } from '../services/user.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})


export class UpdateUserComponent implements OnInit {

  userToEdit: User;
  password: string;

  ngOnInit(): void {
    this.userToEdit = this.userService.getUserToEdit() as User;
  }
  

  constructor(private userService: UserService,private router: Router,
              private popupService: PopupService) {
    this.userToEdit = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      status: '',
      jmbg: '',
      brlk: '',
      phone: '',
      active: false,
      birth_date: ''
    };
    this.password = '';
  }

  onCreateUpdateUserPopup() {
    if (this.validateForm()) {
      // alert('Successfully modified user: ' + JSON.stringify(this.userToEdit));
      if (!this.userToEdit) {
        console.error('User to edit is not defined.');
        return;
      }
      const updatedUserRequest: UserToEdit = {
        id: this.userToEdit.id,
        first_name: this.userToEdit.first_name,
        last_name: this.userToEdit.last_name,
        email: this.userToEdit.email,
        password: this.password,
        position: this.userToEdit.position,
        status: this.userToEdit.status,
        jmbg: this.userToEdit.jmbg,
        brlk: this.userToEdit.brlk,
        phone: this.userToEdit.phone,
        active: this.userToEdit.active,
        birth_date: this.userToEdit.birth_date
      };

      this.userService.updateUser(updatedUserRequest).subscribe({
        next: (user: User) => {
          alert('Successfully modified user!');
        },
        error: (error: any) => {
          console.error(error);
        }
      });

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
    if (!this.userToEdit) {
      this.popupService.openPopup("Error", "User to edit is not defined.");
      return false;
    }
  

    if (!this.userToEdit.email || !this.isValidEmail(this.userToEdit.email)) {
      this.popupService.openPopup("Error", "Email nije validan.");
      return false;
    }

    if (!this.userToEdit.first_name ) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (this.password && this.password.length < 8) {
      this.popupService.openPopup("Error", "Password nije validan.");
      return false;
    }

    if (!this.userToEdit.last_name) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.userToEdit.jmbg || !this.isValidJMBG(this.userToEdit.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.userToEdit.phone || !this.isValidPhoneNumber(this.userToEdit.phone)) {
      this.popupService.openPopup("Error", "Broj telefona nije validan.");
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
