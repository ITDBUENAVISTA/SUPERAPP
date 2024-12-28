import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lempirasCurrency'
})
export class LempirasCurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value == null || isNaN(value)) {
      return 'L 0.00';
    }

    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
    }).format(value);
  }

}
