
import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./service/popup.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banka-frontend';

  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(private popupService: PopupService) {}

  ngAfterViewInit() {
    this.popupService.register(this.popupComponent);
  }
}
