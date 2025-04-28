import { TestBed } from '@angular/core/testing';

import { MedicamentplanService } from './medicamentplan.service';

describe('MedicamentplanService', () => {
  let service: MedicamentplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
