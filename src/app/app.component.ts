import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersApiService } from './shared/data-access/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <header>
        <h1 class="app-root__title">{{ title }}</h1>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    .app-root__title {
      margin-bottom: 20px;
    }
`,
})
export class AppComponent {
  ordersService = inject(OrdersApiService);
  snackBar = inject(MatSnackBar);

  title = 'Order History';

  constructor() {
    effect(() => {
      const error = this.ordersService.error();

      if (error !== null && error !== undefined) {
        this.snackBar.open(error, 'Dismiss', { duration: 2000 });
      }
    });
  }
}
