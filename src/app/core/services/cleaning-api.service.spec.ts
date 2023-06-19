import { TestBed } from '@angular/core/testing';

import { CleaningApiService } from './cleaning-api.service';

describe('CleaningApiService', () => {
  let service: CleaningApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleaningApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
