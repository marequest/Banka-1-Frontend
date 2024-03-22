import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, UserToEdit } from '../model/model';
import { UserService } from '../service/user.service';
import { PopupService } from '../service/popup.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})


export class UpdateUserComponent implements OnInit {

  userToEdit: {
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    jmbg: string;
    active: boolean;
    position: string;
    userId: number;
    email: string
  };
  password: string;

  ngOnInit(): void {
    this.userToEdit = this.userService.getUserToEdit() as User;
  }


  constructor(private userService: UserService,private router: Router,
              private popupService: PopupService,
              private dialogRef: MatDialogRef<UpdateUserComponent>
              ) {
    this.userToEdit = {
      userId: 0,
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      jmbg: '',
      phoneNumber: '',
      password: '',
      active: false,
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
      const updatedUserRequest: {
        userId: number;
        email: string
        password: string;
        firstName: string;
        lastName: string;
        jmbg: string;
        position: string;
        phoneNumber: string;
        isActive: boolean;
      } = {
        userId: this.userToEdit.userId,
        firstName: this.userToEdit.firstName,
        lastName: this.userToEdit.lastName,
        email: this.userToEdit.email,
        password: this.password,
        position: this.userToEdit.position,
        jmbg: this.userToEdit.jmbg,
        phoneNumber: this.userToEdit.phoneNumber,
        isActive: this.userToEdit.active,
      };

      this.userService.updateUser(updatedUserRequest).subscribe({
        next: (user: User) => {
          alert('Successfully modified user!');
          this.dialogRef.close();
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
      this.dialogRef.close();
      // this.router.navigate(['/user/list']);
     }
  }

  onCloseUpdateUserPopup() {
    const confirmResult = confirm('Are you sure you want to cancel adding the user?');
     if (confirmResult) {
      this.dialogRef.close();
      // this.router.navigate(['/user/list']);
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

    if (!this.userToEdit.firstName ) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (this.password && this.password.length < 8) {
      this.popupService.openPopup("Error", "Password nije validan.");
      return false;
    }

    if (!this.userToEdit.lastName) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.userToEdit.jmbg || !this.isValidJMBG(this.userToEdit.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.userToEdit.phoneNumber || !this.isValidPhoneNumber(this.userToEdit.phoneNumber)) {
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
