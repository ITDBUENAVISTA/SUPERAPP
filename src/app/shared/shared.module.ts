import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PrimeNgModule } from './prime-ng.module';
import { LempirasCurrencyPipe } from './pipes/lempiras-currency.pipe';
import { FilterTablesDirective } from './directives/filter-tables.directive';
import { NgSelectModule } from '@ng-select/ng-select';

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
    LempirasCurrencyPipe,
    FilterTablesDirective,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    CurrencyMaskModule,
    NgSelectModule
  ],
  exports: [
    PrimeNgModule,
    CurrencyMaskModule,
    LempirasCurrencyPipe,
    FilterTablesDirective,
    NgSelectModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }
  ]
})
export class SharedModule { }
