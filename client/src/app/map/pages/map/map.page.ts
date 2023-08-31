import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IssueService } from 'src/app/shared/services/issue.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  issues: any[] = [];
  map: any;

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.buildMap();
  }

  buildMap(): void {
    const map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 18 });
    this.map = map;
  }

  placeMarkers() {
    this.issueService.fetchIssues().subscribe((issues) => {
      const markers = L.markerClusterGroup({ maxClusterRadius: 200 });
      for (const issue of issues) {
        const marker = this.addIssueMarker(issue);
        markers.addLayer(marker);
      }
      this.map.addLayer(markers);
    });
  }

  addIssueMarker(issue: any) {
    return L.marker([issue.latitude, issue.longitude]);
  }
}
