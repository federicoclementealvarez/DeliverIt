import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListProductVariationsComponent } from './shop-list-product-variations.component';

describe('ShopListProductVariationsComponent', () => {
  let component: ShopListProductVariationsComponent;
  let fixture: ComponentFixture<ShopListProductVariationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopListProductVariationsComponent]
    });
    fixture = TestBed.createComponent(ShopListProductVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
