import { TestBed } from '@angular/core/testing';

import { DetailsRapportService } from './details-rapport.service';

describe('DetailsRapportService', () => {
  let service: DetailsRapportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsRapportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
