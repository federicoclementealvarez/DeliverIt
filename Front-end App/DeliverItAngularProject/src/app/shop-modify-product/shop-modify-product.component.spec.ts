import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopModifyProductComponent } from './shop-modify-product.component';

describe('ShopModifyProductComponent', () => {
  let component: ShopModifyProductComponent;
  let fixture: ComponentFixture<ShopModifyProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopModifyProductComponent]
    });
    fixture = TestBed.createComponent(ShopModifyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
