import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReportComponent } from './details-report.component';

describe('DetailsReportComponent', () => {
  let component: DetailsReportComponent;
  let fixture: ComponentFixture<DetailsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsReportComponent]
    });
    fixture = TestBed.createComponent(DetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
