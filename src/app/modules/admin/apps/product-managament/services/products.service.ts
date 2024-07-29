import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@app/core/models/product';
import { PaginationData } from '@app/core/models/return.pagination';
import { ReturnTypes } from '@app/core/models/return.types';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _product: BehaviorSubject<ReturnTypes<Product> | null> = new BehaviorSubject<ReturnTypes<Product> | null>(null);
  private _products: BehaviorSubject<ReturnTypes<PaginationData<Product>> | null> = new BehaviorSubject<ReturnTypes<PaginationData<Product>> | null>(null);

  private readonly _httpClient = inject(HttpClient)

  get product$(): Observable<ReturnTypes<Product> | null> {
    return this._product.asObservable();
  }

  get products$(): Observable<ReturnTypes<PaginationData<Product>> | null> {
    return this._products.asObservable();
  }

  getProduct(): Observable<ReturnTypes<PaginationData<Product>>> {
    return this._httpClient.get<ReturnTypes<PaginationData<Product>>>(`${environment.api}/produit`, {})
      .pipe(
        tap(products => {
          this._products.next(products)
        })
      )
  }
}
