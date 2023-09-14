import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string = '';
  last: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signup() {
    this.authService
      .signup({
        name: this.name,
        last: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
      })
      .subscribe((foo) => console.log(foo));
  }
}
