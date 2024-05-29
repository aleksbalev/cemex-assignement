import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FilterPanleForm } from '../../interfaces/filter-panel';
import { DateRangePickerComponent } from '../../../shared/features/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    DateRangePickerComponent,
    ReactiveFormsModule,
    KeyValuePipe,
  ],
  templateUrl: './filter-panel.component.html',
  styles: ``,
})
export class FilterPanelComponent {
  @Input({ required: true }) formGroup!: FormGroup<FilterPanleForm>;
  @Input() productLineOptions: string[] = [];
}
