import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavoursCustomerItemComponent } from './flavours-customer-item.component';

describe('FlavoursCustomerItemComponent', () => {
  let component: FlavoursCustomerItemComponent;
  let fixture: ComponentFixture<FlavoursCustomerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlavoursCustomerItemComponent]
    });
    fixture = TestBed.createComponent(FlavoursCustomerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
