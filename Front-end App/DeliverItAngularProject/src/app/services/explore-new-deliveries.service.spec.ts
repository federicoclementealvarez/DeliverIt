import { TestBed } from '@angular/core/testing';

import { ExploreNewDeliveriesService } from './explore-new-deliveries.service';

describe('ExploreNewDeliveriesService', () => {
  let service: ExploreNewDeliveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreNewDeliveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
