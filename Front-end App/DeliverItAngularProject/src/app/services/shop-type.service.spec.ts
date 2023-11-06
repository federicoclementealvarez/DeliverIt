import { TestBed } from '@angular/core/testing';

import { ShopTypeService } from './shop-type.service';

describe('ShopTypeService', () => {
  let service: ShopTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
