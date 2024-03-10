import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
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
    active: false
  };

  search(){
    
  }


  onCancelAddUserPopup() {

    // Add logic for cancel button
  }

  onCreateAddUserPopup() {

    // Add logic for create button
  }

  onCloseAddUserPopup() {

    // Add logic for close button (e.g., close the popup)
  }

}
