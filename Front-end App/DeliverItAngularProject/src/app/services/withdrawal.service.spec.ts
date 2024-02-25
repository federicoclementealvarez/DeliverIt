import { TestBed } from '@angular/core/testing';

import { WithdrawalService } from './withdrawal.service';

describe('WithdrawalService', () => {
  let service: WithdrawalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithdrawalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
