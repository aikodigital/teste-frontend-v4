import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
  standalone: true,
})
export class DateTime implements PipeTransform {
  transform(
    value: string,
    format: string = 'dd/MM/yyyy HH:mm:ss'
  ): string | null {
    if (!value) return null;

    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('dd')) options.day = '2-digit';
    if (format.includes('MM')) options.month = '2-digit';
    if (format.includes('yyyy')) options.year = 'numeric';
    if (format.includes('HH')) options.hour = '2-digit';
    if (format.includes('mm')) options.minute = '2-digit';
    if (format.includes('ss')) options.second = '2-digit';

    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }
}
