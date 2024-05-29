import { FormControl, FormGroup } from '@angular/forms';
import { DateRangeState } from '../../shared/features/date-range-picker/interfaces/date-range-picker';

export interface FilterPanleForm {
  statuses: FormGroup<{
    pending: FormControl<boolean | null>;
    inProgress: FormControl<boolean | null>;
    completed: FormControl<boolean | null>;
  }>;
  productLine: FormControl<string | null>;
  dateRange: FormControl<DateRangeState | null>;
}
