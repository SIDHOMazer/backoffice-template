import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeTraitementComponent } from './plan-de-traitement.component';

describe('PlanDeTraitementComponent', () => {
  let component: PlanDeTraitementComponent;
  let fixture: ComponentFixture<PlanDeTraitementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanDeTraitementComponent]
    });
    fixture = TestBed.createComponent(PlanDeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
