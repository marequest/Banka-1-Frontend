import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'orange-button',
  template: `
    <button type="button" class="btn btn-warning">{{ buttonName }}</button>
  `,
  styles: `
    .btn {
      font-family: 'Jura', jura;
      width: 100%;
    }
  `
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
