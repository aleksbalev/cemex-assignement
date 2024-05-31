import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const INFO_ICON = `
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#B0B0B0"/>
    <rect x="43" y="22" width="14" height="14" fill="#FFFFFF"/>
    <rect x="43" y="43" width="14" height="33" fill="#FFFFFF"/>
  </svg>
`;

@Component({
  selector: 'app-no-result',
  standalone: true,
  imports: [MatIcon],
  template: `
    <mat-icon class="no-result__icon" svgIcon="info" />
    <h2>Nothing to display</h2>
    <p>Please, adjust filters to see more results</p>
  `,
  styles: `
    :host {
      display: block;
      text-align: center;
    }

    .no-result__icon {
      transform: scale(2);
    }

    h2 {
      color: var(--color-primary-dark);
      font-size: 40px;
      font-weight: 600;
    }
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'info',
      sanitizer.bypassSecurityTrustHtml(INFO_ICON),
    );
  }
}
