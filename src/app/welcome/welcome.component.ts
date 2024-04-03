import { Component } from '@angular/core';
import {OrangeButtonModule} from "./redesign/OrangeButton";
import {TransparentTextFieldModule} from "./redesign/TransparentTextField";
import {WhiteTextFieldModule} from "./redesign/WhiteTextField";
import {LineTextFieldModule} from "./redesign/LineTextField";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    OrangeButtonModule,
    WhiteTextFieldModule,
    TransparentTextFieldModule,
    LineTextFieldModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  btnName = "Click me"
  fieldText = "Test"
}
