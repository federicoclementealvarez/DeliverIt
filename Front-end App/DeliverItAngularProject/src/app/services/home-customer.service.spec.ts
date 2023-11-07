import { TestBed } from '@angular/core/testing';

import { HomeCustomerService } from './home-customer.service';

describe('HomeCustomerService', () => {
  let service: HomeCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
