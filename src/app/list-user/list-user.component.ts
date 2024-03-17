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
  public searchEmail:string='';
  selectedTab: string = "permissions";

  constructor(private userService: UserService, private router: Router,private popup:PopupService) { }

  ngOnInit() {
    this.loadUsersFromDataBase();
  }

  loadUsersFromDataBase(){
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
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

  removePermission(user: any, index: number) {
    console.log("Removed perm: ");
    console.log(user.permissions[index]);
    user.permissions.splice(index, 1);

    // TODO update permissions in database
  }

  deleteAllPermissions(user: User){
    user.permissions = [];
    // TODO update permissions in database
  }

  filter(){
    if(this.searchEmail === '' || this.searchEmail === null) this.loadUsersFromDataBase();
    else this.users = this.users.filter(user => user.email === this.searchEmail)
  }

}
