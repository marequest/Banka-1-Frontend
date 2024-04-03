import { Component } from '@angular/core';
import {OrangeButtonModule} from "./redesign/OrangeButton";
import {TransparentTextFieldModule} from "./redesign/TransparentTextField";
import {WhiteTextFieldModule} from "./redesign/WhiteTextField";
import {LineTextFieldModule} from "./redesign/LineTextField";
import {TableComponentModule} from "./redesign/TableComponent";

@Component({
  selector: 'app-welcome',
  standalone: true,
    imports: [
        OrangeButtonModule,
        WhiteTextFieldModule,
        TransparentTextFieldModule,
        LineTextFieldModule,
        TableComponentModule
    ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  btnName = "Click me"
  fieldText = "Test"

  headers = ['Header 1', 'Header 2', 'Header 3'];
  rows = [
    { 'Header 1': 'Row 1', 'Header 2': 'Row 1', 'Header 3': 'Row 1' },
    { 'Header 1': 'Row 2', 'Header 2': 'Row 2', 'Header 3': 'Row 2' },
    { 'Header 1': 'Row 2', 'Header 2': 'Row 2', 'Header 3': 'Row 2' },
    { 'Header 1': 'Row 2', 'Header 2': 'Row 2', 'Header 3': 'Row 2' },
    { 'Header 1': 'Row 2', 'Header 2': 'Row 2', 'Header 3': 'Row 2' },
  ];

  handleCustomButtonClick(event: { row: any, index: number }) {
    console.log('Button clicked in row:', event.index, 'Row data:', event.row);
    // Add your custom logic here
  }
}
