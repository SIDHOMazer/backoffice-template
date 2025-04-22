import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRendezvousComponent } from './details-rendezvous.component';

describe('DetailsRendezvousComponent', () => {
  let component: DetailsRendezvousComponent;
  let fixture: ComponentFixture<DetailsRendezvousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRendezvousComponent]
    });
    fixture = TestBed.createComponent(DetailsRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
