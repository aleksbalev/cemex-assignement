import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Order, OrderKeys } from '../interfaces';

export interface OrderState {
  orders: Order[];
}

// Here I use state management approach with compination of Signals and observables
// It is similar approach as NgRx has for its state management but without additional complexity of the library
@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private http = inject(HttpClient);

  // state
  private state = signal<OrderState>({
    orders: [],
  });

  // selectors
  orders = computed(() => this.state().orders);
  ordersColumns: OrderKeys = [
    'status',
    'orderNumber',
    'productLine',
    'product',
    'quantity',
    'requestDate',
  ];
  // sources
  ordersLoaded$ = this.getOrdersList();

  constructor() {
    // reducers
    this.ordersLoaded$.pipe(takeUntilDestroyed()).subscribe((orders) =>
      this.state.update((state) => ({
        ...state,
        orders: [...state.orders, ...orders],
      })),
    );
  }

  // TODO: Create meaningfull error handeling
  private getOrdersList() {
    return this.http
      .get<Order[]>('/assets/files/orders-list.json')
      .pipe(catchError((err) => EMPTY));
  }
}
