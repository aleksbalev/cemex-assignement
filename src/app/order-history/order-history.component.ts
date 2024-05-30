import { Component, computed, inject } from '@angular/core';
import { OrdersApiService } from '../shared/data-access/orders.service';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './ui/filter-panel/filter-panel.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPanleForm } from './interfaces/filter-panel';
import { DateRangeState } from '../shared/interfaces';
import { SearchInputComponent } from '../shared/ui/search-input/search-input.component';
import { OrderTableComponent } from './ui/order-table/order-table.component';

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
      from: null,
      to: null,
    }),
  });

  protected productLineOptions = ['Ready-Mix', 'Cement', 'Aggregates'];

  constructor() {
    this.formGroup.valueChanges.subscribe((changes) => {
      console.log(changes);
    });
  }
}
