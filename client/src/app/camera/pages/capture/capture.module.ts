import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturePageRoutingModule } from './capture-routing.module';

import { CapturePage } from './capture.page';
import { CameraModule } from '../../camera.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturePageRoutingModule,
    CameraModule,
  ],
  declarations: [CapturePage],
})
export class CapturePageModule {}
