import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { ModalController } from '@ionic/angular';
import { CaptureModalComponent } from '../../components/capture-modal/capture-modal.component';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
})
export class CapturePage implements OnInit {
  image: string = '';
  isCameraOn: boolean = false;
  isCreated: boolean = false;
  flashMode: string = 'off';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initCamera();
  }

  ionViewDidLeave() {
    CameraPreview.stop();
  }

  async initCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'camera-preview',
      className: 'camera-preview',
    };

    CameraPreview.start(cameraPreviewOptions);
    this.isCameraOn = true;
  }

  async capture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 90,
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.openModal();
  }

  async stopCamera() {
    await CameraPreview.stop();
    this.isCameraOn = false;
  }

  async toggleFlash() {
    this.flashMode = this.flashMode === 'off' ? 'on' : 'off';
    CameraPreview.setFlashMode({ flashMode: this.flashMode });
  }

  flipCamera() {
    CameraPreview.flip();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CaptureModalComponent,
      componentProps: {
        image: this.image,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data, role);

    if (role === 'confirm') {
      this.stopCamera();
      this.isCreated = true;
    }
  }
}
