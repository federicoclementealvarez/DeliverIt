import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopModifyProductVariationsComponent } from './shop-modify-product-variations.component';

describe('ShopModifyProductVariationsComponent', () => {
  let component: ShopModifyProductVariationsComponent;
  let fixture: ComponentFixture<ShopModifyProductVariationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopModifyProductVariationsComponent]
    });
    fixture = TestBed.createComponent(ShopModifyProductVariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
