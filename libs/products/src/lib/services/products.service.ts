import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = environment.apiUrl + "products";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + "/" + id)
  }

  editProduct(id: string, Product: Product): Observable<Product> {
    return this.http.put<Product>(this.url + "/" + id, Product);
  }

  createProduct(Product: Product | FormData): Observable<Product> {
    return this.http.post<Product>(this.url, Product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(this.url + "/" + id);
  }
}
