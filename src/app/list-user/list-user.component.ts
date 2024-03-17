import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {PopupService} from "../service/popup.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  public users: User[] = [];
  public position:string='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';

  constructor(private userService: UserService, private router: Router,private popup:PopupService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  togglePopupAddUser() {
    this.popup.openAddUserPopup();
  }

  search(){
    this.userService.searchUser(this.position,this.email,this.firstName,this.lastName).subscribe({
      next: (users: User[]) => {
        this.users = users;

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  editUser(user: User){
    this.userService.setUserToEdit(user);
    this.popup.openUpdateUserPopup();
    // this.router.navigate(['/user/update']);
  }

  deleteUser(user: User){

     // this.userService.deleteUser(user.email).subscribe({
     //   next: (response: any) => {
     //     this.users = this.users.filter(u => u.email !== user.email);
     //   },
     //   error: (error: any) => {
     //     console.error('Error deleting user: ', error);
     //   }
     // });

  }

}
