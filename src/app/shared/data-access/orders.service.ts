import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../interfaces';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// Here I use state management approach with compination of Signals and observables
// It is similar approach as NgRx has for its state management but without additional complexity of the library
@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private http = inject(HttpClient);

  // state
  private state = signal<OrderState>({
    orders: [],
    error: null,
    loading: true,
  });

  // selectors
  orders = computed(() => this.state().orders);
  error = computed(() => this.state().error);
  loading = computed(() => this.state().loading);

  // sources
  ordersLoaded$ = this.getOrdersList();
  private error$ = new Subject<string | null>();

  constructor() {
    // reducers
    this.ordersLoaded$.pipe(takeUntilDestroyed()).subscribe((orders) =>
      this.state.update((state) => ({
        ...state,
        loading: false,
        orders: [...state.orders, ...orders],
      })),
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) => {
      this.state.update((state) => ({
        ...state,
        error,
      }));
    });
  }

  private getOrdersList() {
    return this.http.get<Order[]>('/assets/files/orders-list.json').pipe(
      catchError((err) => {
        this.handleError(err);

        return EMPTY;
      }),
    );
  }

  private handleError(err: HttpErrorResponse) {
    this.error$.next(err.statusText);
  }
}
