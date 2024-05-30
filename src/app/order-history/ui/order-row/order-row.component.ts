import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order, OrderKeys, OrderStatusEnum } from '../../../shared/interfaces';
import { StatusParserPipe } from '../status-parser.pipe';

@Component({
  selector: 'app-order-row',
  standalone: true,
  imports: [CommonModule, StatusParserPipe],
  templateUrl: './order-row.component.html',
  styleUrl: './order-row.component.scss',
})
export class OrderRowComponent {
  statusEnum = OrderStatusEnum;

  @Input({ required: true }) order!: Order;
  @Input({ required: true }) columns!: OrderKeys;
}
