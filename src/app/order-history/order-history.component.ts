import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrdersApiService } from '../shared/data-access/orders.service';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './ui/filter-panel/filter-panel.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FilterPanelFormState,
  FilterPanleForm,
} from './interfaces/filter-panel';
import { DateRangeState, Order, OrderStatusEnum } from '../shared/interfaces';
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
import { Specification } from '../shared/utils/specification/specification';
import {
  DateRangeSpecification,
  ProductLineSpecification,
  SearchSpecification,
  StatusSpecification,
  TrueSpecification,
} from '../shared/utils/specification/concrete-specifications';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterPanelComponent,
    SearchInputComponent,
    OrderTableComponent,
  ],
  templateUrl: './order-history.component.html',
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
        this.applyFilters(search ?? '', filters, this.ordersService.orders()),
      ),
    );
  }

  private applyFilters(
    search: string,
    filters: FilterPanelFormState,
    orders: Order[],
  ): Order[] {
    let specification: Specification<Order> = new TrueSpecification<Order>();

    const { pending, inProgress, completed } = filters.statuses || {};

    if (pending && completed && inProgress) {
      // Show all
      let statusSpecification = new StatusSpecification(OrderStatusEnum.Pending)
        .or(new StatusSpecification(OrderStatusEnum.Completed))
        .or(new StatusSpecification(OrderStatusEnum.InProgress));
      specification = specification.and(statusSpecification);
    } else if (pending && completed) {
      // Show only Pending and Completed, hide InProgress
      let statusSpecification = new StatusSpecification(
        OrderStatusEnum.Pending,
      ).or(new StatusSpecification(OrderStatusEnum.Completed));
      specification = specification.and(statusSpecification);
    } else if (completed && inProgress) {
      // Show only Completed and InProgress, hide Pending
      let statusSpecification = new StatusSpecification(
        OrderStatusEnum.Completed,
      ).or(new StatusSpecification(OrderStatusEnum.InProgress));
      specification = specification.and(statusSpecification);
    } else if (inProgress && pending) {
      // Show only Pending and InProgress, hide Completed
      let statusSpecification = new StatusSpecification(
        OrderStatusEnum.Pending,
      ).or(new StatusSpecification(OrderStatusEnum.InProgress));
      specification = specification.and(statusSpecification);
    } else if (pending) {
      // Show only Pending
      specification = specification.and(
        new StatusSpecification(OrderStatusEnum.Pending),
      );
    } else if (inProgress) {
      // Show only InProgress
      specification = specification.and(
        new StatusSpecification(OrderStatusEnum.InProgress),
      );
    } else if (completed) {
      // Show only Completed
      specification = specification.and(
        new StatusSpecification(OrderStatusEnum.Completed),
      );
    }

    if (filters.productLine) {
      specification = specification.and(
        new ProductLineSpecification(filters.productLine),
      );
    }
    if (filters.dateRange?.from && filters.dateRange.to) {
      specification = specification.and(
        new DateRangeSpecification(
          filters.dateRange.from,
          filters.dateRange.to,
        ),
      );
    }
    if (search) {
      specification = specification.and(new SearchSpecification(search));
    }

    return orders.filter((order) => specification.isSatisfiedBy(order));
  }
}
