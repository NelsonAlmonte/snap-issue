import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabMapPage } from './tab-map.page';

describe('TabMapPage', () => {
  let component: TabMapPage;
  let fixture: ComponentFixture<TabMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
