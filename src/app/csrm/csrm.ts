import { Component, inject } from '@angular/core';
import { ColDef, SideBarDef, SelectionChangedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { IProducts, ProducService } from '../produc-service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AgGridAngular, AsyncPipe],
  selector: 'app-csrm',
  styleUrl: './csrm.scss',
  templateUrl: './csrm.html',
})
export class Csrm {
  private readonly productService = inject(ProducService);

  rowData$ = this.productService.getAllProducts().pipe(map((p) => p.products));

  columnDefs: ColDef<IProducts>[] = [
    {
      field: 'title',
      sortable: true,
      filter: true,
    },
    {
      field: 'category',
      sortable: true,
      filter: true,
    },
    {
      field: 'brand',
      sortable: true,
      filter: true,
    },
    {
      field: 'price',
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'stock',
      sortable: true,
      filter: 'agNumberColumnFilter',
    },
  ];

  onSelectionChanged($event: SelectionChangedEvent<IProducts>) {
    const selectedRow = $event.api.getSelectedRows();

    console.log(selectedRow);
  }

  // Optional Config

  sideBar: SideBarDef = {
    position: 'left',
    toolPanels: ['columns', 'filters'],
  };

  statusBar = {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };
}
