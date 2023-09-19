import { TestBed } from '@angular/core/testing';

import { AddProductCustomerService } from './add-product-customer.service';

describe('AddProductCustomerService', () => {
  let service: AddProductCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
