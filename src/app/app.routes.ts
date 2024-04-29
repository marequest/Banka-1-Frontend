import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { NgModule } from "@angular/core";
import { WelcomeComponent } from './welcome/welcome.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { CardsComponent } from './cards/cards.component';
import {ForexViewComponent} from "./forex-view/forex-view.component";
import {StockViewComponent} from "./stock-view/stock-view.component";
import {loginGuard} from "./guards/login.guard";
import {welcomeGuard} from "./guards/welcome.guard";
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CustomerComponent } from './customer/customer.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UserResetPasswordComponent} from "./user-reset-password/user-reset-password.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {FutureViewComponent} from "./future-view/future-view.component";
import {OrdersComponent} from "./orders/orders.component";
import {CardTransactionsComponent} from "./card-transactions/card-transactions.component";
import {LoanTableComponent} from "./loans/loan-table/loan-table.component";
import {NewLoanComponent} from "./loans/new-loan/new-loan.component";
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { TransactionsOverviewComponent } from './transactions-overview/transactions-overview.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { PositionsGuard } from './guards/positions.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //this will make the first page that is loaded a login page
  { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [welcomeGuard] },
  {
    path: 'user',
    canActivate: [PositionsGuard],
    children: [
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent },
      { path: 'list', component: ListUserComponent },
    ],
    data: { roles: ['agent', 'supervizor', 'admin'] }
  },
  {
    path: 'orders', component: OrdersComponent, canActivate: [PositionsGuard],
    data: { roles: ['agent', 'supervizor', 'admin'] }
  },

  { path: 'activate-account', component: ActivateAccountComponent },
  { path:'customer/set-password/:token', component: SetPasswordComponent},
  { path:'employee/set-password/:token', component: SetPasswordComponent},
  { path:'reset-password/:position', component: ResetPasswordComponent, canActivate: [loginGuard]},
  { path:'customer/reset-password/:token', component: UserResetPasswordComponent, canActivate: [loginGuard]},
  { path:'employee/reset-password/:token', component: UserResetPasswordComponent, canActivate: [loginGuard]},
  {
    path: 'security',
    // canActivate: [AdminAndEmployeeGuard],
    children: [
      { path: 'all', component: SecurityListComponent },
      { path: "stock/:ticker", component: StockViewComponent },
      {path: 'forex/:ticker', component: ForexViewComponent},
      {path: 'future/:ticker', component: FutureViewComponent},],
  },

  { path:'exchange', component: TransactionComponent},
  { path:'payment', component: NewPaymentComponent},

  // {path:'exchange-rate', component: ExchangeRateComponent,canActivate:[ExchangeRateGuard]},

  {
    path: 'customer',
    children: [
      {path: 'all', component: CustomerComponent},
      {path: 'view', component: UserDetailComponent}
    ]
  },
  {
    path: 'payment/overview',component: TransactionsOverviewComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'transaction', component: TransactionComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'exchange-rate', component: ExchangeRateComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'bank-accounts', component: BankAccountsComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'recipients', component: RecipientsComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'cards', component: CardsComponent,canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'loans', component: LoanTableComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'new-loan', component: NewLoanComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'card-transactions', component: CardTransactionsComponent, canActivate: [PositionsGuard],
    data: { roles: ['customer'] }
  },

  // { path: 'customer/:customerId', component: UserDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
