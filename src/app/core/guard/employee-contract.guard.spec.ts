import { TestBed } from '@angular/core/testing';

import { EmployeeContractGuard } from './employee-contract.guard';

describe('EmployeeContractGuard', () => {
  let guard: EmployeeContractGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeContractGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
