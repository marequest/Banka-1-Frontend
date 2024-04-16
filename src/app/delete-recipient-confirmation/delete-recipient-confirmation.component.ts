import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recipient-confirmation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-recipient-confirmation.component.html',
  styleUrl: './delete-recipient-confirmation.component.css'
})
export class DeleteRecipientConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteRecipientConfirmationComponent>
    ){}


  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
