import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBarPage } from './tab-bar.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabBarPage,
    children: [
      {
        path: 'map',
        loadChildren: () =>
          import('../tab-map/tab-map.module').then((m) => m.TabMapPageModule),
      },
      {
        path: 'camera',
        loadChildren: () =>
          import('../../../../camera/pages/capture/capture.module').then(
            (m) => m.CapturePageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../tab-profile/tab-profile.module').then(
            (m) => m.TabProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/camera',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/camera',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarPageRoutingModule {}
