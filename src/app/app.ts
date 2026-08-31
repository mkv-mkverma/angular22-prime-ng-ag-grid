import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';

//It registers all AG Grid Enterprise (+ Community)
// features globally, once, before any grid renders —
// without it, AG Grid's modular architecture
// means no features work at all.
ModuleRegistry.registerModules([AllEnterpriseModule]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular22-prime-ng-ag-grid');
}
