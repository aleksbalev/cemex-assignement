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

export type FilterPanelFormState = Partial<{
  statuses: Partial<{
    pending: boolean | null;
    inProgress: boolean | null;
    completed: boolean | null;
  }>;
  productLine: string | null;
  dateRange: DateRangeState | null;
}>;
