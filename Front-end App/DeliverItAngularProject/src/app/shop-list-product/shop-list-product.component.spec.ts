import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListProductComponent } from './shop-list-product.component';

describe('ShopListProductComponent', () => {
  let component: ShopListProductComponent;
  let fixture: ComponentFixture<ShopListProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopListProductComponent]
    });
    fixture = TestBed.createComponent(ShopListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
