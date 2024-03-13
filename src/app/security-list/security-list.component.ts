import { Component } from '@angular/core';
import { Security, SecurityService } from '../service/security.service';
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
  users: Security[] = [];
  selectedTab: string = "actions";

  constructor(private securityService: SecurityService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.securityService.getUsers().subscribe(
      (users: Security[]) => {
        this.users = users;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }
}
