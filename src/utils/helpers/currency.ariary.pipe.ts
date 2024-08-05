import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyAriary',
  standalone: true
})
export class CurrencyAriaryPipe implements PipeTransform {

  transform(value: number | string, ...args: any[]): string {
    if (value == null) {
      return '';
    }

    // Convert the value to a number if it's a string
    let numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Format the number with commas as thousand separators
    let formattedValue = numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    // Append "Ar" for Ariary currency
    return `${formattedValue}`;
  }
}
