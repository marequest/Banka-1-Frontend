import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'white-text-field',
  template: `
    <div class="text-field-container">
      <label for="name" class="field-label">{{ fieldName }}</label>
      <input type="text" name="name" class="form-control" id="name" [(ngModel)]="text" (ngModelChange)="onTextChange($event)">
    </div>
  `,
  styles: [`
    .text-field-container {
      display: flex;
      flex-direction: column;
    }

    .field-label {
      margin-bottom: 2px; /* Adjust based on your design */
      background: var(--banka-white);
      font-family: 'Jura', sans-serif;
    }

    input[type="text"],
    .form-control {
      font-family: 'Jura', sans-serif;
      background: var(--banka-white);
      border: 2px solid var(--banka-dark-gray); /* White border */
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 5px; /* Rounded corners, adjust as needed */
      color: var(--banka-dark-gray); /* Text color */
      padding: 10px; /* Adjust padding to your preference */
    }

    input[type="text"]:focus,
    .form-control:focus {
      outline: none; /* Removes the default focus outline */
      border-color: #CCCCCC; /* Optional: Changes border color on focus */
    }
  `]
})
export class WhiteTextField {
  @Input() text: String = "";
  @Input() fieldName: String = ""; // This is the input for the field label
  @Output() textChange = new EventEmitter<string>();

  onTextChange(value: string) {
    this.textChange.emit(value);
  }
}

@NgModule({
  declarations: [WhiteTextField],
  imports: [CommonModule, FormsModule],
  exports: [WhiteTextField],
})
export class WhiteTextFieldModule {}
