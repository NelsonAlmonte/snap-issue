import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptureModalComponent } from './components/capture-modal/capture-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CaptureModalComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [CaptureModalComponent],
})
export class CameraModule {}
