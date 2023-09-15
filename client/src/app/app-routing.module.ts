import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanAccessGuard } from '@auth/guards/can-access.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tabs',
    canActivate: [CanAccessGuard],
    loadChildren: () =>
      import('@template/components/tabs/tab-bar/tab-bar.module').then(
        (m) => m.TabBarPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
