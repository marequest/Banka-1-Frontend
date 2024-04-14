import { Pipe, PipeTransform } from '@angular/core';
import {ExchangeRate} from "./model";

@Pipe({
  name: 'exchangeFilterPipe',
  standalone: true
})
export class ExchangeFilterPipe implements PipeTransform {
  transform(exchangeArray: ExchangeRate[]): any[] {
    const uniquePairs = new Map();

    exchangeArray.forEach(rate => {
      const symbols = [rate.baseCurrency, rate.quoteCurrency].sort();
      const pairKey = symbols.join('/');

      if (!uniquePairs.has(pairKey)) {
        uniquePairs.set(pairKey, {
          baseCurrency: symbols[0],
          quoteCurrency: symbols[1],
          buyingPrice: null,
          sellingPrice: null,
        });
      }
    });

    exchangeArray.forEach(rate => {
      const symbols = [rate.baseCurrency, rate.quoteCurrency].sort();
      const pairKey = symbols.join('/');
      const pair = uniquePairs.get(pairKey);

      if (rate.baseCurrency === symbols[0] && rate.quoteCurrency === symbols[1]) {
        pair.sellingPrice = rate.rate;
      } else {
        pair.buyingPrice = rate.rate;
      }
    });

    return Array.from(uniquePairs.values()).sort((a, b) => {
      return a.baseCurrency.localeCompare(b.baseCurrency) || a.quoteCurrency.localeCompare(b.quoteCurrency);
    });
  }
}
