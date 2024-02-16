import { TestBed } from '@angular/core/testing';

import { ProductVariationsService } from './product-variations.service';

describe('ProductVariationsService', () => {
  let service: ProductVariationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVariationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
