import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPendShopReviewsComponent } from './customer-pend-shop-reviews.component';

describe('CustomerPendShopReviewsComponent', () => {
  let component: CustomerPendShopReviewsComponent;
  let fixture: ComponentFixture<CustomerPendShopReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPendShopReviewsComponent]
    });
    fixture = TestBed.createComponent(CustomerPendShopReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
