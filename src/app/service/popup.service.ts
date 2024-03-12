// popup.service.ts
import { Injectable } from '@angular/core';
import {PopupComponent} from "../popup/popup.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupComponent!: PopupComponent;

  register(popupComponent: PopupComponent) {
    this.popupComponent = popupComponent;
  }

  show(message: string, type: 'warning' | 'error' | 'info') {
    this.popupComponent.message = message;
    this.popupComponent.type = type;
    this.popupComponent.show();
  }
}
