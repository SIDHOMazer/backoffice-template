import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTestDeSanteComponent } from './details-test-de-sante.component';

describe('DetailsTestDeSanteComponent', () => {
  let component: DetailsTestDeSanteComponent;
  let fixture: ComponentFixture<DetailsTestDeSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTestDeSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTestDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
