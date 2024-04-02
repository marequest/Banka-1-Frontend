import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'orange-button',
  template: `
    <button type="button" class="btn-custom">{{ buttonName }}</button>
  `,
  styles: [`
    .btn-custom {
      font-family: 'Jura', sans-serif;
      width: 100%;
      background-color: var(--banka-orange); /* Use your specific orange color */
      color: #000; /* Black text color */
      border: 2px solid #000; /* Thin black border */
      padding: 10px 20px; /* Adjust padding to your preference */
      font-size: 16px; /* Adjust font size to your preference */
      border-radius: 5px; /* Rounded corners */
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover effects */
    }

    .btn-custom:hover {
      background-color: var(--banka-dark-orange); /* Slightly darken the button on hover for feedback */
      /*transform: scale(1.05); !* Slightly enlarge the button on hover *!*/
    }
  `]
})
export class OrangeButton {
  @Input()
  get buttonName(): string { return this._name; }
  set buttonName(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';
}

@NgModule({
  declarations: [OrangeButton],
  imports: [CommonModule],
  exports: [OrangeButton],
})
export class OrangeButtonModule {}
