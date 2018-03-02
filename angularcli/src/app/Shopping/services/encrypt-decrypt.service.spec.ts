import { TestBed, inject } from '@angular/core/testing';

import { EncryptDecryptService } from './encrypt-decrypt.service';

describe('EncryptDecryptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptDecryptService]
    });
  });

  it('should be created', inject([EncryptDecryptService], (service: EncryptDecryptService) => {
    expect(service).toBeTruthy();
  }));
});
