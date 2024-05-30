import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SEARCH_ICON = `
<svg width="10" height="10" viewBox="0 0 16 16" fill="#90cdf9" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.4176 13.7393L12.3054 10.6236C11.985 10.3028 11.5731 10.2112 11.2069 10.3028L10.3374 9.43228C11.1154 8.47008 11.5731 7.23297 11.5731 5.90421C11.5731 2.78852 9.01008 0.222656 5.89787 0.222656C2.78565 0.222656 0.222656 2.78852 0.222656 5.90421C0.222656 9.01991 2.78565 11.5858 5.89787 11.5858C7.22513 11.5858 8.46087 11.1276 9.422 10.3487L10.2916 11.2192C10.2 11.5858 10.3373 11.9981 10.612 12.3189L13.7242 15.4346C14.1818 15.8928 14.9599 15.8928 15.4176 15.4346C15.8753 14.9764 15.921 14.1975 15.4176 13.7393ZM5.89787 10.257C3.51794 10.257 1.54992 8.2868 1.54992 5.90421C1.54992 3.52163 3.51794 1.55141 5.89787 1.55141C8.27779 1.55141 10.2458 3.52163 10.2458 5.90421C10.2458 8.2868 8.27779 10.257 5.89787 10.257Z" fill="#90cdf9"/>
</svg>
`;

// Search input is in shared features because it could be in many places around application
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Input({ required: true }) searchControl!: FormControl;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(SEARCH_ICON),
    );
  }
}
