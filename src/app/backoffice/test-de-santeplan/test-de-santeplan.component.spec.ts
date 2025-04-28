import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDeSanteplanComponent } from './test-de-santeplan.component';

describe('TestDeSanteplanComponent', () => {
  let component: TestDeSanteplanComponent;
  let fixture: ComponentFixture<TestDeSanteplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDeSanteplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDeSanteplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
