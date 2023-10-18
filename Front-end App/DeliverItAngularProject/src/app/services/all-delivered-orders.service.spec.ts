import { TestBed } from '@angular/core/testing';

import { AllDeliveredOrdersService } from './all-delivered-orders.service';

describe('AllDeliveredOrdersService', () => {
  let service: AllDeliveredOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllDeliveredOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
