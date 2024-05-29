import { Component, inject } from '@angular/core';
import { OrdersApiService } from '../shared/data-access/orders.service';
import { CommonModule } from '@angular/common';
import { FilterPanelComponent } from './ui/filter-panel/filter-panel.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPanleForm } from './interfaces/filter-panel';
import { DateRangeState } from '../shared/features/date-range-picker/interfaces/date-range-picker';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterPanelComponent],
  templateUrl: './order-history.component.html',
})
export default class OrderHistoryComponent {
  protected ordersService = inject(OrdersApiService);

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
