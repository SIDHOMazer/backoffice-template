import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentplanComponent } from './medicamentplan.component';

describe('MedicamentplanComponent', () => {
  let component: MedicamentplanComponent;
  let fixture: ComponentFixture<MedicamentplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicamentplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicamentplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
