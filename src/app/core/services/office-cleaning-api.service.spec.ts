import { TestBed } from '@angular/core/testing';

import { OfficeCleaningApiService } from './office-cleaning-api.service';

describe('OfficeCleaningApiService', () => {
  let service: OfficeCleaningApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeCleaningApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
