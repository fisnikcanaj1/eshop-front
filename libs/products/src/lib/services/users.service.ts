import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UsersService {
    url = environment.apiUrl + "users"
    constructor(private http: HttpClient) { }
    
    getUsers() {
        return this.http.get<User[]>(this.url);
    }

    getUser(id: string) {
        return this.http.get<User>(this.url + "/" + id);
    }

    createUser(user: User) {
        return this.http.post<User>(this.url, user);
    }

    editUser(id: string, newUser: User) {
        return this.http.put<any>(this.url + "/" + id, newUser);
    }

    deleteUser(id: string) {
        return this.http.delete<any>(this.url + "/" + id);
    }
}