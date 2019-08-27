import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { AppError } from '../components/main/common/app-error';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';
  private products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError),
      map((data: any) => data)
    );
  }

  getProductsPromise(): Promise<Product[]> {
    return this.http
      .get(this.apiUrl)
      .pipe(
        catchError(this.handleError),
        map((data: any) => data)
      )
      .toPromise();
  }

  getProduct(id: number) {
    return this.http
      .get(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map((data: any) => data)
      );
  }

  addProduct(product: Product) {
    return this.http
      .post(this.apiUrl, product)
      .pipe(
        catchError(this.handleError),
        map((data: any) => data)
      );
  }

  updateProduct(id: number, product: Product) {
    return this.http
      .patch(`${this.apiUrl}/${id}`, product)
      .pipe(
        catchError(this.handleError),
        map((data: any) => data)
      );
  }

  deleteProduct(id: number) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map((data: any) => data)
      );
  }

  private handleError(error: Response) {
    return throwError(new AppError(error));
  }
}
