import { TestBed } from '@angular/core/testing';

import { PlanDeTraitementService } from './plan-de-traitement.service';

describe('PlanDeTraitementService', () => {
  let service: PlanDeTraitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDeTraitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
