import { TestBed } from '@angular/core/testing';

import { ErrorPanelService } from './error-panel.service';

describe('ErrorPanelService', () => {
  let service: ErrorPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
