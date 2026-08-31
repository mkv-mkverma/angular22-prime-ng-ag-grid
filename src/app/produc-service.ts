import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AdvancedFilterModel,
  FilterModel,
  NumberFilterModel,
  TextFilterModel,
} from 'ag-grid-community';
export interface IProducts {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
}

export interface IApiResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}

@Service()
export class ProducService {
  private readonly http = inject(HttpClient);

  getAllProducts(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`https://dummyjson.com/products?limit=0`);
  }
  getAllProductsByPagination(
    limit: number,
    skip: number,
    sortBy?: string,
    order?: string,
    filterModel?: FilterModel | AdvancedFilterModel | null,
  ): Observable<IApiResponse> {
    let url = `https://dummyjson.com/products`;

    const titleFilter: TextFilterModel | undefined =
      filterModel && 'title' in filterModel
        ? (filterModel as FilterModel)['title']
        : undefined;
    const categoryFilter: TextFilterModel | undefined =
      filterModel && 'category' in filterModel
        ? (filterModel as FilterModel)['category']
        : undefined;
    const priceFilter: NumberFilterModel | undefined =
      filterModel && 'price' in filterModel
        ? (filterModel as FilterModel)['price']
        : undefined;

    const titleSearch = titleFilter?.filter;
    const categoryValue = categoryFilter?.filter;

    if (titleSearch) {
      url += `/search?q=${encodeURIComponent(titleSearch)}`;
    } else if (categoryValue) {
      url += `/category/${encodeURIComponent(categoryValue)}`;
    } else {
      url += `?limit=${limit}&skip=${skip}`;
    }
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    return this.http.get<IApiResponse>(url).pipe(
      map((response) => {
        if (!priceFilter) {
          return response;
        }

        const filteredProducts = response.products.filter((product) =>
          this.matchesNumberFilter(product.price, priceFilter),
        );

        return {
          ...response,
          products: filteredProducts,
          total: filteredProducts.length,
        };
      }),
    );
  }

  private matchesNumberFilter(value: number, filter: NumberFilterModel): boolean {
    const filterValue = filter.filter ?? 0;
    switch (filter.type) {
      case 'equals':
        return value === filterValue;
      case 'notEqual':
        return value !== filterValue;
      case 'lessThan':
        return value < filterValue;
      case 'lessThanOrEqual':
        return value <= filterValue;
      case 'greaterThan':
        return value > filterValue;
      case 'greaterThanOrEqual':
        return value >= filterValue;
      case 'inRange':
        return value >= filterValue && value <= (filter.filterTo ?? filterValue);
      default:
        return true;
    }
  }
}
