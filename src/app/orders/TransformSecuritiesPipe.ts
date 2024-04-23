import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {CapitalProfitDto, User} from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformSecurities'
})
export class TransformSecuritiesPipe implements PipeTransform {
  transform(securities: CapitalProfitDto[]): any[] {
    return securities.map(security => ({
      // ACCOUNT_NUMBER: security.bankAccountNumber,
      // CURRENCY: security.currencyName,
      SECURITY: security.listingType,
      SYMBOL: security.ticker,
      TOTAL_PRICE: security.totalPrice,
      ACCOUNT_NUMBER: security.bankAccountNumber,
      CURRENCY: security.currencyName,
      LISTING_TYPE: security.listingType,
      TICKER: security.ticker,
      TOTAL: security.total,
      // RESERVED: security.reserved,
      // LAST_MODIFIED: security.lasModified,
      original: security // Include the entire original user object for internal use
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformSecuritiesPipe
  ],
  exports: [
    TransformSecuritiesPipe
  ],
  // other module properties
})
export class TransformSecuritiesPipeModule { }
