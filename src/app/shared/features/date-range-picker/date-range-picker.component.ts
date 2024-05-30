import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DateRangeState } from '../../interfaces';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatLabel, MatFormField],
  templateUrl: './date-range-picker.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true,
    },
  ],
})
export class DateRangePickerComponent implements ControlValueAccessor {
  from: Date | null = null;
  to: Date | null = null;

  private onChange: (value: DateRangeState) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: DateRangeState): void {
    if (value) {
      this.from = value.from;
      this.to = value.to;
    } else {
      this.from = null;
      this.to = null;
    }
  }

  registerOnChange(fn: (value: DateRangeState) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  onFromDateChange(date: Date | null): void {
    this.from = date;
    this.onChange({ from: this.from, to: this.to });
  }

  onToDateChange(date: Date | null): void {
    this.to = date;
    this.onChange({ from: this.from, to: this.to });
  }
}
