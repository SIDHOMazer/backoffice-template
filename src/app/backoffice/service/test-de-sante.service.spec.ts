import { TestBed } from '@angular/core/testing';

import { TestDeSanteService } from './test-de-sante.service';

describe('TestDeSanteService', () => {
  let service: TestDeSanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDeSanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
