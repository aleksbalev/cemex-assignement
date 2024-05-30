import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { OrderRowComponent } from '../order-row/order-row.component';
import { Order, OrderKeys } from '../../../shared/interfaces';
import { COLUMN_NAME } from './order-table.const';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, OrderRowComponent],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent {
  protected readonly columnName = COLUMN_NAME;

  @Input({ required: true }) orders!: Signal<Order[]>;
  @Input({ required: true }) columns!: OrderKeys;
}
