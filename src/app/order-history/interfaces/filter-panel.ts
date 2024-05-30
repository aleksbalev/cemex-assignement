import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeState } from '../../shared/interfaces';

export interface FilterPanleForm {
  statuses: FormGroup<{
    pending: FormControl<boolean | null>;
    inProgress: FormControl<boolean | null>;
    completed: FormControl<boolean | null>;
  }>;
  productLine: FormControl<string | null>;
  dateRange: FormControl<DateRangeState | null>;
}
