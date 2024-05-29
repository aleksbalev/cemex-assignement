import { Component, inject } from '@angular/core';
import { OrdersApiService } from '../shared/data-access/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  template: `{{ ordersService.orders() | json }}`,
})
export default class OrderHistoryComponent {
  protected ordersService = inject(OrdersApiService);
}
