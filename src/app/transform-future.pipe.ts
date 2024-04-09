import { Pipe, PipeTransform } from '@angular/core';
import { Future } from './model/model';

@Pipe({
  name: 'transformFuture',
  standalone: true
})
export class TransformFuturePipe implements PipeTransform {

  transform(futures: Future[]): any {
    return futures.map((fut:Future) => {

      return {
        contractSize: fut.contractSize,
        contractUnit: fut.contractUnit,
        openInterest: fut.openInterest,
        settlementDate: fut.settlementDate,
        originalFuture: fut
      }
    })
  }

}
