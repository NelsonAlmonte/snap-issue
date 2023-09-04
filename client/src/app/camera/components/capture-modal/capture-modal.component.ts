import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CreateIssueDto } from 'src/app/shared/dto/create-issue.dto';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { IssueService } from 'src/app/shared/services/issue.service';

@Component({
  selector: 'app-capture-modal',
  templateUrl: './capture-modal.component.html',
  styleUrls: ['./capture-modal.component.scss'],
})
export class CaptureModalComponent implements OnInit {
  @Input() image: string = '';
  selectedCategory: number = 0;
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(
    private modalController: ModalController,
    private issueService: IssueService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe();
    this.categories$ = this.categoryService.categories$;
  }

  cancel(): Promise<boolean> {
    return this.modalController.dismiss(null, 'cancel');
  }

  async confirm() {
    // TODO: Loading in button
    const coordinates = await this.getCurrentLocation();
    const issue: CreateIssueDto = {
      categoryId: this.selectedCategory,
      image: this.image,
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
