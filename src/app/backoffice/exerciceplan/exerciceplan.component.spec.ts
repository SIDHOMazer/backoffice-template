import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciceplanComponent } from './exerciceplan.component';

describe('ExerciceplanComponent', () => {
  let component: ExerciceplanComponent;
  let fixture: ComponentFixture<ExerciceplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciceplanComponent]
    });
    fixture = TestBed.createComponent(ExerciceplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
