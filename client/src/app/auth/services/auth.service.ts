import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userId: string = '';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _loggedUserId = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  get loggedUserId() {
    return this._loggedUserId.asObservable();
  }

  login(user: any) {
    this.http
      .post(`${environment.apiUrl}auth/login`, user)
      .subscribe((response: any) => {
        const { access_token, ...rest } = response;
        const { id, username } = rest.user;
        this.saveUserData(id.toString(), access_token, username);
        this.router.navigate(['/tabs/camera']);
      });
  }

  signup(user: any) {
    return this.http
      .post(`${environment.apiUrl}auth/signup`, user)
      .pipe(tap((user) => console.log(user)));
  }

  saveUserData(id: string, token: string, username: string) {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.setUserData(id);
  }

  setUserData(id: string) {
    this._userId = id;
    this._isLoggedIn.next(true);
    this._loggedUserId.next(id);
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isProfileSetup');
    this._userId = '';
    this._isLoggedIn.next(false);
    this._loggedUserId.next('');
    this.router.navigate(['']);
  }

  verifyLogin() {
    const id = localStorage.getItem('id');

    if (id) this.setUserData(id);
  }
}
