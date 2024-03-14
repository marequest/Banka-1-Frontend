// popup.service.ts
import { Injectable } from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  openPopup(message: string, text: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message, text }
    });
  }
}
