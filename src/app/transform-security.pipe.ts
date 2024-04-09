import { Pipe, PipeTransform } from '@angular/core';
import { Security } from './service/security.service';

@Pipe({
  name: 'transformSecurity',
  standalone: true
})
export class TransformSecurityPipe implements PipeTransform {

  transform(securities: Security[]): any[] {
    return securities.map((sec: Security) => {
      const newSec = {
        ticker: sec.ticker,
        price: sec.price,
        change: sec.change,
        volume: sec.volume,
        initial_margin_cost: sec.initial_margin_cost
      }

      return newSec;
    })
  }

}
