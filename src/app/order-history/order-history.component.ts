import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrdersApiService } from '../shared/data-access/orders.service';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './ui/filter-panel/filter-panel.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPanleForm } from './interfaces/filter-panel';
import { DateRangeState, Order, OrderKeys } from '../shared/interfaces';
import { SearchInputComponent } from '../shared/ui/search-input/search-input.component';
import { OrderTableComponent } from './ui/order-table/order-table.component';
import {
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs';
import { applyOrdersFilters } from './utils/filter-utils';
import { NoResultComponent } from './ui/no-result/no-result.component';

// Smart Order History component manages bunch of dumb components
// Focuses on filtrations and orders presentation
@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterPanelComponent,
    SearchInputComponent,
    OrderTableComponent,
    NoResultComponent,
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderHistoryComponent {
  protected ordersService = inject(OrdersApiService);

  protected searchControl = new FormControl<string>('');

  protected formGroup = new FormGroup<FilterPanleForm>({
    statuses: new FormGroup({
      pending: new FormControl(false),
      inProgress: new FormControl(false),
      completed: new FormControl(false),
    }),
    productLine: new FormControl<string>(''),
    dateRange: new FormControl<DateRangeState>({
      from: new Date('2022-01-01'),
      to: new Date('2022-12-31'),
    }),
  });

  protected productLineOptions = ['Ready-Mix', 'Cement', 'Aggregates'];
  protected ordersColumns: OrderKeys = [
    'status',
    'orderNumber',
    'productLine',
    'product',
    'quantity',
    'requestDate',
  ];

  protected filteredOrders$: Observable<Order[]>;

  constructor() {
    this.filteredOrders$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.formGroup.valueChanges.pipe(startWith(this.formGroup.value)),
    ]).pipe(
      map(([search, filters]) =>
        applyOrdersFilters(search ?? '', filters, this.ordersService.orders()),
      ),
    );
  }
}
