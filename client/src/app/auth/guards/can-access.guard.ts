import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanAccessGuard {
  constructor(private authService: AuthService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        console.log(isLoggedIn);
        return isLoggedIn;
      })
    );
  }
}
