import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe((foo) => console.log(foo));
  }
}
