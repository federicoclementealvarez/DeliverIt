import { TestBed } from '@angular/core/testing';

import { HomeDeliveryBoyService } from './home-delivery-boy.service';

describe('HomeDeliveryBoyService', () => {
  let service: HomeDeliveryBoyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDeliveryBoyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
