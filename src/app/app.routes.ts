import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { NgModule } from "@angular/core";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'user',
    children: [
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
      { path: 'set-password/:id', component: SetPasswordComponent },
    ],
  },
  {
    path: 'security',
    children: [{ path: 'all', component: SecurityListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
