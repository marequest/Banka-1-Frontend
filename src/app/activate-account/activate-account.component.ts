import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
  stage: 1 | 2 | 3;

  constructor() {
    this.stage = 1;
  }

  public nextStage() {
    this.stage++;

    if(this.stage > 3) {
      this.stage = 3;
    }
  }
  public previousStage() {
    this.stage--;
    if(this.stage < 1) {
      this.stage = 1;
    }
  }

}
