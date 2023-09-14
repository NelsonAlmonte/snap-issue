import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http
      .post(`${environment.apiUrl}auth/login`, user)
      .pipe(tap((user) => console.log(user)));
  }

  signup(user: any) {
    return this.http
      .post(`${environment.apiUrl}auth/signup`, user)
      .pipe(tap((user) => console.log(user)));
  }
}
