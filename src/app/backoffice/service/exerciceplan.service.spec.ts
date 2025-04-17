import { TestBed } from '@angular/core/testing';

import { ExerciceplanService } from './exerciceplan.service';

describe('ExerciceplanService', () => {
  let service: ExerciceplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
