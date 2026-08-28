import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { AgGridAngular } from 'ag-grid-angular';
import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface Car {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, AgGridAngular],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular22-prime-ng-ag-grid');
  rowData: Car[] = [
    { make: 'Toyota', model: 'Corolla', price: 25000 },
    { make: 'Ford', model: 'Focus', price: 22000 },
    { make: 'BMW', model: '3 Series', price: 45000 },
    { make: 'Honda', model: 'Civic', price: 24000 },
    { make: 'Toyota', model: 'Camry', price: 29000 },
    { make: 'Chevrolet', model: 'Malibu', price: 26000 },
    { make: 'Ford', model: 'Mustang', price: 38000 },
    { make: 'BMW', model: 'X5', price: 62000 },
    { make: 'Audi', model: 'A4', price: 41000 },
    { make: 'Mercedes-Benz', model: 'C-Class', price: 44000 },
    { make: 'Honda', model: 'Accord', price: 27000 },
    { make: 'Toyota', model: 'RAV4', price: 31000 },
    { make: 'Nissan', model: 'Altima', price: 25500 },
    { make: 'Hyundai', model: 'Elantra', price: 21000 },
    { make: 'Kia', model: 'Sportage', price: 28000 },
    { make: 'Volkswagen', model: 'Golf', price: 24500 },
    { make: 'Mazda', model: 'CX-5', price: 29500 },
    { make: 'Subaru', model: 'Outback', price: 30500 },
    { make: 'Chevrolet', model: 'Equinox', price: 27500 },
    { make: 'Ford', model: 'Escape', price: 26500 },
    { make: 'BMW', model: '5 Series', price: 58000 },
    { make: 'Audi', model: 'Q5', price: 47000 },
    { make: 'Mercedes-Benz', model: 'GLC', price: 50000 },
    { make: 'Tesla', model: 'Model 3', price: 43000 },
    { make: 'Volvo', model: 'XC60', price: 46000 },
    { make: 'Tata', model: 'Nexon', price: 15000 },
    { make: 'Mahindra', model: 'XUV700', price: 22000 },
    { make: 'MG', model: 'Hector', price: 20000 },
    { make: 'Jaguar', model: 'F-Pace', price: 55000 },
  ];

  columnDefs: ColDef<Car>[] = [
    {
      field: 'make',
      sortable: true,
      filter: true,
    },
    {
      field: 'model',
      sortable: true,
      filter: true,
    },
    {
      field: 'price',
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
  ];
}
