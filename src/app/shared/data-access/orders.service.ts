import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Subject, catchError, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order, OrderKeys } from '../interfaces';

export interface OrderState {
  orders: Order[];
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
  });

  // selectors
  orders = computed(() => this.state().orders);
  error = computed(() => this.state().error);

  // sources
  ordersLoaded$ = this.getOrdersList();
  private error$ = new Subject<string | null>();

  constructor() {
    // reducers
    this.ordersLoaded$.pipe(takeUntilDestroyed()).subscribe((orders) =>
      this.state.update((state) => ({
        ...state,
        orders: [...state.orders, ...orders],
      })),
    );

    this.error$.pipe(takeUntilDestroyed()).subscribe((error) => {
      debugger;
      this.state.update((state) => ({
        ...state,
        error,
      }));
    });
  }

  private getOrdersList() {
    return of(null).pipe(
      map(() => {
        throw new HttpErrorResponse({
          error: 'Simulated network error',
          status: 500,
          statusText: 'Internal Server Error',
        });
      }),
      catchError((err) => {
        this.handleError(err);

        return EMPTY;
      }),
    );
    return this.http.get<Order[]>('/assets/files/orders-list.json').pipe(
      catchError((err) => {
        this.handleError(err);

        return EMPTY;
      }),
    );
  }

  private handleError(err: HttpErrorResponse) {
    debugger;
    this.error$.next(err.statusText);
  }
}
