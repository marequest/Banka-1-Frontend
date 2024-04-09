import { Pipe, PipeTransform } from '@angular/core';
import {ExchangeRate} from "./model";

@Pipe({
  name: 'exchangeFilterPipe',
  standalone: true
})
export class ExchangeFilterPipe implements PipeTransform {
  transform(exchangeArray: ExchangeRate[]): any[] {
    return exchangeArray.map(exchangeRate => ({
      baseCurrency: exchangeRate.baseCurrency,
      quoteCurrency: exchangeRate.quoteCurrency,
      rate: exchangeRate.rate
    }));
  }
}
