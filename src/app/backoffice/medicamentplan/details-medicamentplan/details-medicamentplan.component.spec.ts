import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMedicamentplanComponent } from './details-medicamentplan.component';

describe('DetailsMedicamentplanComponent', () => {
  let component: DetailsMedicamentplanComponent;
  let fixture: ComponentFixture<DetailsMedicamentplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMedicamentplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMedicamentplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
