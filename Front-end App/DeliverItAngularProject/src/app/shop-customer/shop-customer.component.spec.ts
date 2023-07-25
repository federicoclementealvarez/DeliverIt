import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCustomerComponent } from './shop-customer.component';

describe('ShopCustomerComponent', () => {
  let component: ShopCustomerComponent;
  let fixture: ComponentFixture<ShopCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCustomerComponent]
    });
    fixture = TestBed.createComponent(ShopCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
