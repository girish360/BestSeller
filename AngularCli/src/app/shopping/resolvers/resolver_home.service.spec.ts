import { TestBed, inject } from '@angular/core/testing';

import { ResolverHomeService } from './resolver_home.service';

describe('ResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolverHomeService]
    });
  });

  it('should be created', inject([ResolverHomeService], (service: ResolverHomeService) => {
    expect(service).toBeTruthy();
  }));
});
