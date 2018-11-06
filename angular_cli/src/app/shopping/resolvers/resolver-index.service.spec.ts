import { TestBed } from '@angular/core/testing';

import { ResolverIndexService } from './resolver-index.service';

describe('ResolverIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolverIndexService = TestBed.get(ResolverIndexService);
    expect(service).toBeTruthy();
  });
});
