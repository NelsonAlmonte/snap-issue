import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Issue } from 'src/app/shared/interfaces/issue.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issue-info-modal',
  templateUrl: './issue-info-modal.component.html',
  styleUrls: ['./issue-info-modal.component.scss'],
})
export class IssueInfoModalComponent implements OnInit {
  @Input() issue!: Issue;
  issuesImagePath: string = environment.issuesImagesPath;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
