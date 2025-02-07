import { TestBed } from '@angular/core/testing';

import { ShopRegisterServiceService } from './shop-register-service.service';

describe('ShopRegisterServiceService', () => {
  let service: ShopRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
