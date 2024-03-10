import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
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
    active: false
  };

  search(){
    
  }


  onCancelUpdateUserPopup() {

    // Add logic for cancel button
  }

  onCreateUpdateUserPopup() {

    // Add logic for create button
  }

  onCloseUpdateUserPopup() {

    // Add logic for close button (e.g., close the popup)
  }
}
