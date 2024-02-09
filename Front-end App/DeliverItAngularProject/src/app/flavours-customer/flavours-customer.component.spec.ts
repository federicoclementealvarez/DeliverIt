import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavoursCustomerComponent } from './flavours-customer.component';

describe('FlavoursCustomerComponent', () => {
  let component: FlavoursCustomerComponent;
  let fixture: ComponentFixture<FlavoursCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlavoursCustomerComponent]
    });
    fixture = TestBed.createComponent(FlavoursCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
