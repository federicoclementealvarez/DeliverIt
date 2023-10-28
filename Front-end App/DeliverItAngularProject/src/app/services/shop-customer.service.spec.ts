import { TestBed } from '@angular/core/testing';

import { ShopCustomerService } from './shop-customer.service';

describe('ShopCustomerService', () => {
  let service: ShopCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
