import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanDeTraitementComponent } from './details-plan-de-traitement.component';

describe('DetailsPlanDeTraitementComponent', () => {
  let component: DetailsPlanDeTraitementComponent;
  let fixture: ComponentFixture<DetailsPlanDeTraitementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPlanDeTraitementComponent]
    });
    fixture = TestBed.createComponent(DetailsPlanDeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
