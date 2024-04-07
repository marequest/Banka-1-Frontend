import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer, CustomerTable, User } from '../model/model';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup.service';
import { TableComponentModule } from "../welcome/redesign/TableComponent";

@Component({
    selector: 'app-customer',
    standalone: true,
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css',
    imports: [CommonModule, FormsModule, TableComponentModule]
})
export class CustomerComponent implements OnInit{

  customersTable: CustomerTable[] = [
    {
      name: "Doe",
      email: "john.doe@example.com",
      jmbg: "1234567890123",
      phoneNumber: "+1234567890",
      gender: "Male",
      address: "123 Main Street"
    },
    {
      name: "Smith",
      email: "jane.smith@example.com",
      jmbg: "9876543210987",
      phoneNumber: "+1987654321",
      gender: "Female",
      address: "456 Elm Street"
    },
    {
      name: "Johnson",
      email: "alice.johnson@example.com",
      jmbg: "5555555555555",
      phoneNumber: "+1555555555",
      gender: "Female",
      address: "789 Oak Avenue"
    }
  ]

  customers: Customer[] = [
    {
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      jmbg: "1234567890123",
      phoneNumber: "+1234567890",
      gender: "Male",
      address: "123 Main Street"
    },
    {
      userId: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      jmbg: "9876543210987",
      phoneNumber: "+1987654321",
      gender: "Female",
      address: "456 Elm Street"
    },
    {
      userId: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      jmbg: "5555555555555",
      phoneNumber: "+1555555555",
      gender: "Female",
      address: "789 Oak Avenue"
    }
  ];

  constructor(
    private customerService: CustomerService, 
    private router:Router,
    private popup:PopupService
    ) { }


  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
      },
      error: (error: any) => {
        this.popup.openPopup("Error", "Failed to load customers.");
      }
    });
  }
  
  public position:string='';
  public firstName:string='';
  public lastName:string='';
  public email:string='';

  search(){}

  togglePopupAddCustomer(){
    this.popup.openAddCustomerPopup();
  }

  viewCustomer(customer: CustomerTable) {
    const cust = this.customers.find((c1) => c1.email === customer.email);

    if(!cust) return;
    
    this.customerService.setSelectedCustomer(cust);

    this.router.navigate(['/customer/view']);
  }

  editCustomer(customer: Customer) {
    this.customerService.setCustomerForEdit(
      {
        id: customer.userId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        jmbg: customer.jmbg,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        gender: customer.gender,
        password: '',
        active:false,
      }
    );
    this.popup.openUpdateCustomerPopup();
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(
      (response) => {
        if (response) {
          this.popup.openPopup("Success", "Customer successfully deleted.");
          this.customers = this.customers.filter((customer) => customer.userId !== customerId);
        } else {
          this.popup.openPopup("Error", "Failed to delete customer.");
        }
      },
      (error) => {
        console.error('Error while deleting customer: ', error);
        this.popup.openPopup("Error", "Failed to delete customer.");
      }
    );
  }


}
