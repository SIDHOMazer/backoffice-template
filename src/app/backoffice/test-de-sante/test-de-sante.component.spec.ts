import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDeSanteComponent } from './test-de-sante.component';

describe('TestDeSanteComponent', () => {
  let component: TestDeSanteComponent;
  let fixture: ComponentFixture<TestDeSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDeSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
