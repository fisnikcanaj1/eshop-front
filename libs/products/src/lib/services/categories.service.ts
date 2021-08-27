import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = environment.apiUrl + "categories/";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url );
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(this.url  + id)
  }

  editCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(this.url + id, category);
  }

  createCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.url, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(this.url + id);
  }
}
