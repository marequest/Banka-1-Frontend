import {Component, Input, forwardRef, NgModule} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TableComponent} from "./TableComponent";

@Component({
  selector: 'custom-field',
  template: `
    <div class="form-group">
      <label class="fieldInput" for="fieldInput">{{ labelText }}</label>
      <input class="form-control" type="text" id="fieldInput" [(ngModel)]="value" name="fieldInput"
        [pattern]="pattern" required #fieldModel="ngModel"
        [ngClass]="{ 'invalid-input': fieldModel.invalid && (fieldModel.dirty || fieldModel.touched) }">
      <ng-container *ngIf="fieldModel.invalid && (fieldModel.dirty || fieldModel.touched)">
        <div *ngIf="fieldModel.hasError('required')" style="color: red;">{{ requiredErrorText }}</div>
        <div *ngIf="fieldModel.hasError('pattern')" style="color: red;">{{ patternErrorText }}</div>
      </ng-container>
    </div>
  `,
  styles: [`
    .fieldInput {
      margin-bottom: 2px; /* Adjust based on your design */
      color: #FFFFFF; /* Label color */
      font-family: 'Jura', sans-serif;
    }
    .form-group { margin-bottom: 15px; }
    .invalid-input { border-color: red; }
    .error-message { color: red; margin-top: 5px; }
    .form-control {
      font-family: 'Jura', sans-serif;
      background: transparent;
      border: 2px solid #FFFFFF; /* White border */
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 5px; /* Rounded corners, adjust as needed */
      color: #FFFFFF; /* Text color */
      padding: 10px; /* Adjust padding to your preference */
    }

    input[type="text"]:focus,
    .form-control:focus {
      outline: none; /* Removes the default focus outline */
      border-color: #CCCCCC; /* Optional: Changes border color on focus */
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldComponent),
      multi: true
    }
  ]
})
export class FieldComponent implements ControlValueAccessor {
  @Input() labelText: string = "";
  @Input() pattern: string = "";
  @Input() requiredErrorText: string = 'This field is required.';
  @Input() patternErrorText: string = 'Invalid format.';

  value: string = "";
  onChange: (value: any) => void = () => {};
  onTouch: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
@NgModule({
  declarations: [FieldComponent],
  imports: [CommonModule, FormsModule],
  exports: [FieldComponent],
})
export class FieldComponentModule {}
