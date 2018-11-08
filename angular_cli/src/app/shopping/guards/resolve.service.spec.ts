import { TestBed, inject } from '@angular/core/testing';

import { ResolveService } from './resolve.service';

describe('ResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveService]
    });
  });

  it('should be created', inject([ResolveService], (service: ResolveService) => {
    expect(service).toBeTruthy();
  }));
});
