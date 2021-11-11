import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const data: FormData = new FormData();
    data.append('username', username);
    data.append('password', password);
    return this.http.post(AUTH_API +'signin', data);
  }
}
