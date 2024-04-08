import { Pipe, PipeTransform } from '@angular/core';
import {Forex} from "./model";

@Pipe({
  name: 'forexFilterPipe',
  standalone: true
})
export class ForexFilterPipe implements PipeTransform {
  transform(forexArray: Forex[]): any[] {
    return forexArray.map(forex => ({
      baseCurrency: forex.baseCurrency,
      quoteCurrency: forex.quoteCurrency,
      priceChange: forex.priceChange
    }));
  }
}
