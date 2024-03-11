import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  public users: User[] = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      position: 'Manager',
      status: 'Active',
      jmbg: '1234567890123',
      brlk: '12345678',
      phone: '1234567890',
      active: true,
      birth_date: '1990-01-01'
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      position: 'Director',
      status: 'Inactive',
      jmbg: '9876543210987',
      brlk: '87654321',
      phone: '0987654321',
      active: false,
      birth_date: '1995-05-05'
    }
  ];

  constructor(private userService: UserService) { }

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
    
  }

  search(){
    
  }

}
