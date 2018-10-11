import { TestBed, inject } from '@angular/core/testing';

import { ScrollbarService } from './scrollbar.service';

describe('ScrollbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollbarService]
    });
  });

  it('should be created', inject([ScrollbarService], (service: ScrollbarService) => {
    expect(service).toBeTruthy();
  }));
});
