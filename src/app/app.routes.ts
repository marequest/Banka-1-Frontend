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


export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'user',
    canActivate: [AdminGuard],
    children: [
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
    ]
  },
  {path:'user/set-password/:token', component: SetPasswordComponent},
  {
    path: 'security',
    children: [{ path: 'all', component: SecurityListComponent },],
     canActivateChild: [employeeGuard],
     canActivate: [employeeGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
