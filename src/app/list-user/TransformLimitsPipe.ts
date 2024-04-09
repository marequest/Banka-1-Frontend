import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { Limit } from '../model/model';
import {TransformUsersPipe} from "./TransformUsersPipe"; // Adjust the import path to your Limit interface location

@Pipe({
  name: 'transformLimits'
})
export class TransformLimitsPipe implements PipeTransform {
  transform(limits: Limit[]): any[] {
    return limits.map(limit => ({
      ...limit, // Keep original properties for display
      originalLimit: limit, // Preserve the entire original limit object for reference
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformLimitsPipe
  ],
  exports: [
    TransformLimitsPipe
  ],
  // other module properties
})
export class TransformLimitsPipeModule { }
