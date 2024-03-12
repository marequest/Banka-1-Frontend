import { Component } from '@angular/core';
import { SecurityService, UserSecurity } from '../security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-list.component.html',
  styleUrl: './security-list.component.css'
})
export class SecurityListComponent {
  users: UserSecurity[] = [];

  constructor(private securityService: SecurityService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.securityService.getUsers().subscribe(
      (users: UserSecurity[]) => {
        this.users = users;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }
}
