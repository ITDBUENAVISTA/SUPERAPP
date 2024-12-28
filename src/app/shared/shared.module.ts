import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PrimeNgModule } from './prime-ng.module';
import { LempirasCurrencyPipe } from './pipes/lempiras-currency.pipe';

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: '.',
  precision: 0,
  prefix: '$ ',
  suffix: '',
  thousands: ','
};

@NgModule({
  declarations: [
    LempirasCurrencyPipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    CurrencyMaskModule
  ],
  exports: [
    PrimeNgModule,
    CurrencyMaskModule,
    LempirasCurrencyPipe
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }
  ]
})
export class SharedModule { }
