import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExerciceplanComponent } from './details-exerciceplan.component';

describe('DetailsExerciceplanComponent', () => {
  let component: DetailsExerciceplanComponent;
  let fixture: ComponentFixture<DetailsExerciceplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsExerciceplanComponent]
    });
    fixture = TestBed.createComponent(DetailsExerciceplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
