import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from "./popup/popup.component";
import { PermissionPopUpComponent } from "./permissions-popup/permission-pop-up/permission-pop-up.component";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    RouterOutlet,
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule

  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
