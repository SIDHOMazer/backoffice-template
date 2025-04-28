import { TestBed } from '@angular/core/testing';

import { TestDeSanteplanService } from './test-de-santeplan.service';

describe('TestDeSanteplanService', () => {
  let service: TestDeSanteplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDeSanteplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
