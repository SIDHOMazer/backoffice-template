import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMedicamentComponent } from './details-medicament.component';

describe('DetailsMedicamentComponent', () => {
  let component: DetailsMedicamentComponent;
  let fixture: ComponentFixture<DetailsMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMedicamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
