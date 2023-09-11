import { TestBed } from '@angular/core/testing';

import { IcecreamflavorsService } from './icecreamflavors.service';

describe('IcecreamflavorsService', () => {
  let service: IcecreamflavorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcecreamflavorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
