import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import {
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  SelectionChangedEvent,
  SideBarDef,
} from 'ag-grid-community';

import { IProducts, ProducService } from '../produc-service';

@Component({
  selector: 'app-ssrm',
  imports: [AgGridAngular],
  templateUrl: './ssrm.html',
  styleUrl: './ssrm.scss',
})
export class Ssrm {
  private readonly productService = inject(ProducService);

  // =====================================================
  // COLUMNS
  // =====================================================

  colDef: ColDef<IProducts>[] = [
    {
      field: 'title',
      sortable: true,
      filter: 'agTextColumnFilter',
    },

    {
      field: 'category',
      sortable: true,
      filter: 'agTextColumnFilter',
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

    {
      field: 'brand',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
  ];

  // =====================================================
  // FILTER SIDEBAR
  // =====================================================

  sideBar: SideBarDef = {
    position: 'left',

    toolPanels: ['columns', 'filters'],
  };

  // =====================================================
  // SSRM DATASOURCE
  // =====================================================

  serverSideDatasource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      console.log('AG Grid Request:', params.request);

      // =================================================
      // 1. PAGINATION
      // =================================================

      const startRow = params.request.startRow ?? 0;

      const endRow = params.request.endRow ?? 0;

      const limit = endRow - startRow;

      const skip = startRow;

      // =================================================
      // 2. SORTING
      // =================================================

      const sortModel = params.request.sortModel;

      const sortBy = sortModel[0]?.colId;

      const order = sortModel[0]?.sort;

      // =================================================
      // 3. FILTERING
      // =================================================

      // AG Grid creates this automatically
      // based on the user's filter selection.

      const filterModel = params.request.filterModel;

      console.log('Pagination:', {
        startRow,
        endRow,
        limit,
        skip,
      });

      console.log('Sorting:', sortModel);

      console.log('Filtering:', filterModel);

      // =================================================
      // 4. CALL SERVICE
      // =================================================

      this.productService
        .getAllProductsByPagination(limit, skip, sortBy, order, filterModel)
        .subscribe({
          next: (response) => {
            console.log('API Response:', response);

            // ===========================================
            // Give data back to AG Grid
            // ===========================================

            params.success({
              rowData: response.products,

              rowCount: response.total,
            });
          },

          error: (error) => {
            console.error('API Error:', error);

            params.fail();
          },
        });
    },
  };

  // =====================================================
  // ROW SELECTION
  // =====================================================

  onRowSelection(event: SelectionChangedEvent<IProducts>) {
    const selectedRows = event.api.getSelectedRows();

    console.log('Selected Rows:', selectedRows);
  }
}
