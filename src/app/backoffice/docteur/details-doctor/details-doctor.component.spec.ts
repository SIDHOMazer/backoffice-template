import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoctorComponent } from './details-doctor.component';

describe('DetailsDoctorComponent', () => {
  let component: DetailsDoctorComponent;
  let fixture: ComponentFixture<DetailsDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDoctorComponent]
    });
    fixture = TestBed.createComponent(DetailsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
