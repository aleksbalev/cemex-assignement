import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { OrderRowComponent } from '../order-row/order-row.component';
import { Order, OrderKeys } from '../../../shared/interfaces';
import { COLUMN_NAME } from './order-table.const';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrdersApiService } from '../../../shared/data-access/orders.service';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, OrderRowComponent, MatProgressSpinnerModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent {
  protected ordersService = inject(OrdersApiService);
  protected readonly columnName = COLUMN_NAME;

  @Input({ required: true }) orders!: Order[];
  @Input({ required: true }) columns!: OrderKeys;
}
