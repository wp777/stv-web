import { TestBed } from '@angular/core/testing';

import { StvGraphService } from './stv-graph.service';

describe('StvGraphService', () => {
  let service: StvGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StvGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
