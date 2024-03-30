import { Component } from '@angular/core';
import {OrangeButtonModule} from "../../a-redesign/orange-button";
import {TextFieldModule} from "../../a-redesign/text-field";

@Component({
  selector: 'app-test-components',
  standalone: true,
  imports: [
    OrangeButtonModule,
    TextFieldModule,
  ],
  templateUrl: './test-components.component.html',
  styleUrl: './test-components.component.css'
})
export class TestComponentsComponent {
  btnName = ""
  fieldText = ""
  jobDone = false

  handleClick() {
    this.jobDone = true
    this.fieldText = "Clicked"
  }

}
