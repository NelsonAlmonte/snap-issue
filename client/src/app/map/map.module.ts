import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueInfoModalComponent } from './components/issue-info-modal/issue-info-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IssueInfoModalComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [IssueInfoModalComponent],
})
export class MapModule {}
