import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReviewsComponent } from './shop-reviews.component';

describe('ShopReviewsComponent', () => {
  let component: ShopReviewsComponent;
  let fixture: ComponentFixture<ShopReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopReviewsComponent]
    });
    fixture = TestBed.createComponent(ShopReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
