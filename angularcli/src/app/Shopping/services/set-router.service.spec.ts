import { TestBed, inject } from '@angular/core/testing';

import { SetRouterService } from './set-router.service';

describe('SetRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetRouterService]
    });
  });

  it('should be created', inject([SetRouterService], (service: SetRouterService) => {
    expect(service).toBeTruthy();
  }));
});
