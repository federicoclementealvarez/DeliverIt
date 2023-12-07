import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCurrentOrdersComponent } from './customer-current-orders.component';

describe('CustomerCurrentOrdersComponent', () => {
  let component: CustomerCurrentOrdersComponent;
  let fixture: ComponentFixture<CustomerCurrentOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCurrentOrdersComponent]
    });
    fixture = TestBed.createComponent(CustomerCurrentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
