import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('@auth/pages/login/login.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('@auth/pages/signup/signup.module').then(
            (m) => m.SignupPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
