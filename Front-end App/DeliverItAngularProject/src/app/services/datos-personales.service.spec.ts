import { TestBed } from '@angular/core/testing';

import { DatosPersonalesService } from './datos-personales.service';

describe('DatosPersonalesService', () => {
  let service: DatosPersonalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPersonalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
