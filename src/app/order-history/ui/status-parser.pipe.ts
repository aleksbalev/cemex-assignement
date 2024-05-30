import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatusEnum } from '../../shared/interfaces';

@Pipe({
  name: 'statusParser',
  standalone: true,
})
export class StatusParserPipe implements PipeTransform {
  private statusMapper: {
    [key: number]: string;
  } = {
    [OrderStatusEnum.Pending]: 'Pending',
    [OrderStatusEnum.InProgress]: 'In Progress',
    [OrderStatusEnum.Completed]: 'Completed',
  };

  transform(value: any): string {
    if (Object.values(OrderStatusEnum).includes(value)) {
      return this.statusMapper[value];
    }

    return value;
  }
}
