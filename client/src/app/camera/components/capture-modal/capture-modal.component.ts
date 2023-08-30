import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { CreateIssueDto } from 'src/app/shared/dto/create-issue.dto';
import { IssueService } from 'src/app/shared/services/issue.service';

@Component({
  selector: 'app-capture-modal',
  templateUrl: './capture-modal.component.html',
  styleUrls: ['./capture-modal.component.scss'],
})
export class CaptureModalComponent implements OnInit {
  @Input() image: string = '';
  category: number = 0;

  constructor(
    private modalController: ModalController,
    private issueService: IssueService
  ) {}

  ngOnInit() {}

  cancel(): Promise<boolean> {
    return this.modalController.dismiss(null, 'cancel');
  }

  async confirm() {
    // TODO: Loading in button
    const coordinates = await this.getCurrentLocation();
    const issue: CreateIssueDto = {
      categoryId: this.category,
      image:
        'https://c4.wallpaperflare.com/wallpaper/285/172/9/sunset-8k-forest-4k-wallpaper-preview.jpg',
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      reporterId: 1,
    };

    this.issueService
      .createIssue(issue)
      .subscribe(() => this.modalController.dismiss(issue, 'confirm'));
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    const coordinates = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = coordinates.coords;
    return { latitude: latitude, longitude: longitude };
  }
}
