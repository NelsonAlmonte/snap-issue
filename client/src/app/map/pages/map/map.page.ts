import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/shared/services/issue.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Issue } from 'src/app/shared/interfaces/issue.interface';
import { ModalController } from '@ionic/angular';
import { IssueInfoModalComponent } from '../../components/issue-info-modal/issue-info-modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map!: L.Map;

  constructor(
    private issueService: IssueService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.issueService.fetchIssues().subscribe();
    this.buildMap();
    this.placeMarkers();
  }

  buildMap(): void {
    const map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 18 });
    L.Icon.Default.imagePath = 'assets/img/leaflet/';
    this.map = map;
  }

  placeMarkers(): void {
    this.issueService.issues$.asObservable().subscribe((issues) => {
      const markers = L.markerClusterGroup();
      for (const issue of issues) {
        const marker = this.addIssueMarker(issue);
        markers.addLayer(marker);
      }
      this.map.addLayer(markers);
    });
  }

  addIssueMarker(issue: Issue): L.Marker<any> {
    const marker = L.marker([Number(issue.latitude), Number(issue.longitude)]);
    marker.on('click', async (e) => {
      const modal = await this.modalController.create({
        component: IssueInfoModalComponent,
        componentProps: { issue: issue },
      });
      modal.present();
    });
    return marker;
  }
}
