import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Order } from '../models/order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class OrdersService {
    private url = environment.apiUrl + "orders"

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.url);
    }

    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(this.url + "/" + id);
    }

    updateOrder(id: string, status: Object): Observable<Order> {
        return this.http.put<Order>(this.url + "/" + id, status);
    }

    deleteOrder(id: string): Observable<any> {
        return this.http.delete<any>(this.url + "/" + id);
    }
    
}