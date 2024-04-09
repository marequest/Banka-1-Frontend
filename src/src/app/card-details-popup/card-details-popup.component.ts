import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../model/model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card-details-popup',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-details-popup.component.html',
  styleUrl: './card-details-popup.component.css'
})
export class CardDetailsPopupComponent {
  @Input() dialogData: any;
  @Output() closed = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CardDetailsPopupComponent>) { }

  onClose(): void {
    this.dialogRef.close();
    this.closed.emit();
  }
}
