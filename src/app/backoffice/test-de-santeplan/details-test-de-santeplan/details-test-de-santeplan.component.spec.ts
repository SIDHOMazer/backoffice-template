import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTestDeSanteplanComponent } from './details-test-de-santeplan.component';

describe('DetailsTestDeSanteplanComponent', () => {
  let component: DetailsTestDeSanteplanComponent;
  let fixture: ComponentFixture<DetailsTestDeSanteplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTestDeSanteplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTestDeSanteplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
