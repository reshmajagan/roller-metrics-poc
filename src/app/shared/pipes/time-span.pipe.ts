import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})

export class TimeSpanPipe implements PipeTransform {
  transform(value: number): string {
    if (value != null && !isNaN(value)) {
        let duration = Math.floor(value);
        let seconds: any = duration % 60;
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
        let minutes = Math.floor(duration / 60);
        return `${minutes}:${seconds}`;
    }
    return null;
  }
}
