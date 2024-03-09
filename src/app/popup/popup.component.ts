import { Component, Input } from '@angular/core';
import {PopupService} from "../popup.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() message!: string;
  @Input() type!: 'warning' | 'error' | 'info';

  isVisible = false;

  show() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }
}
