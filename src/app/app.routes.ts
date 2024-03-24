import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { NgModule } from "@angular/core";
import {employeeGuard} from "./guards/employee.guard";
import { WelcomeComponent } from './welcome/welcome.component';

import { AdminGuard } from './guards/admin.guard';
import {ForexViewComponent} from "./forex-view/forex-view.component";
import {StockViewComponent} from "./stock-view/stock-view.component";
import {loginGuard} from "./guards/login.guard";
import {welcomeGuard} from "./guards/welcome.guard";
import { CustomerComponent } from './customer/customer.component';



export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [welcomeGuard] },
  {
    path: 'user',
    // canActivate: [AdminGuard],
    children: [
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
    ]
  },
  {path:'user/set-password/:token', component: SetPasswordComponent},
  {
    path: 'security',
    children: [
      { path: 'all', component: SecurityListComponent },
      { path: "stock/:ticker", component: StockViewComponent }],
     canActivateChild: [employeeGuard],
     canActivate: [employeeGuard]
  },
  {path: 'forex/:ticker', component: ForexViewComponent},
  {
    path: 'customer',
    children: [
      {path: 'all', component: CustomerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
