import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCustomerRequest, EditCustomerRequest } from '../model/model';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit{

  editCustomerData: EditCustomerRequest = {
    email: '',
    firstName: '',
    lastName: '',
    jmbg: '',
    phoneNumber: '',
    address: '',
    gender: '',
    password: '',
  };

  constructor(
    private customerService: CustomerService,
  ){}

  ngOnInit(): void {
    console.log('Edit customer component initialized', this.customerService.getCustomerForEdit());
    const userToEdit = this.customerService.getCustomerForEdit();
    this.editCustomerData = {
      email: userToEdit?.email || '',
      firstName: userToEdit?.firstName || '',
      lastName: userToEdit?.lastName || '',
      jmbg: userToEdit?.jmbg || '',
      phoneNumber: userToEdit?.phoneNumber || '',
      address: userToEdit?.address || '',
      gender: userToEdit?.gender as string ,
      password: '',
    }
  }

  submit(){

  }


  cancel(){

  }
}
