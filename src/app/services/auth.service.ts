import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlAuth = 'http://challenge-react.alkemy.org/';
  authToken!: string;
  constructor(
    private http: HttpClient
  ) { }

  login(authData: AuthData): Observable<any> {
    return this.http.post<any>(this.urlAuth, authData).pipe(map(data => {
      localStorage.setItem('authToken', JSON.stringify(data));
      return data;
    }))
  }

  getToken(): boolean {
    return (localStorage.getItem('authToken') !== null);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}

export interface AuthData {
  email: string;
  password: string;
}
