import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDetailsRapprotComponent } from './details-details-rapprot.component';

describe('DetailsDetailsRapprotComponent', () => {
  let component: DetailsDetailsRapprotComponent;
  let fixture: ComponentFixture<DetailsDetailsRapprotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDetailsRapprotComponent]
    });
    fixture = TestBed.createComponent(DetailsDetailsRapprotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
