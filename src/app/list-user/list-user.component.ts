import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  public users: User[] = [];
  public position:string='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe({
    //   next: (users: User[]) => {
    //     this.users = users;
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //   }
    // });

  }

  togglePopupAddUser() {
    this.router.navigate(['/user/add']);
  }

  search(){
    this.userService.searchUser(this.position,this.email,this.firstName,this.lastName).subscribe(
      
      );
  }

  editUser(user: User){
    this.userService.setUserToEdit(user);
    this.router.navigate(['/welcome']);
  }

  deleteUser(user: User){
    console.log(user);

    // this.userService.deleteUser(user.id).subscribe({
    //   next: (response: any) => {
    //     this.users = this.users.filter(u => u.id !== user.id);
    //   },
    //   error: (error: any) => {
    //     console.error('Error deleting user: ', error);
    //   }
    // });

  }

}
