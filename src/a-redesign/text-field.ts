import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'text-field',
  template: `
    <input type="text" name="name" class="form-control" id="name" [(ngModel)]="text" (ngModelChange)="onTextChange($event)">
  `,
  styles: `
    input[type="text"],
    .form-control {
          font-family: 'Jura', jura;

      background: transparent;
      border: none;
      border-bottom: 1px solid #000000;
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 0;
    }

    input[type="text"]:focus,
    .form-control:focus {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  `
})
export class TextField {
  @Input() text: String = ""
  @Output() textChange = new EventEmitter<string>();

  onTextChange(value: string) {
    this.textChange.emit(value);
  }
}

@NgModule({
  declarations: [TextField],
  imports: [CommonModule, FormsModule],
  exports: [TextField],
})
export class TextFieldModule {}
