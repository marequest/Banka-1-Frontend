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
    this.router.navigate(['/user/add']);
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
    this.router.navigate(['/user/update']);
  }

  deleteUser(user: User): void {
     user.userId=2; 
    // userId sam ovde rucno zadao jer kada se uradi ovaj poziv this.userService.getUsers() u ngOnInit()
    // za usera se ne vraca userId (videti sa backend stranom)
    const confirmResult = confirm('Are you sure you want to delete this user?');
     if (confirmResult) {
      this.userService.deleteUser(user.userId).subscribe({
        next: (response: boolean) => {
          if (response) {
            this.users = this.users.filter(u => u.userId !== user.userId);
          } else {
            console.error('Error deleting user: Response was false');
          }
        },
        error: (error: any) => {
          console.error('Error deleting user: ', error);
        }
      });
     }
    
  }

}
