import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddProductComponent } from './ShopAddProductComponent';

describe('ShopAddProductComponent', () => {
  let component: ShopAddProductComponent;
  let fixture: ComponentFixture<ShopAddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopAddProductComponent]
    });
    fixture = TestBed.createComponent(ShopAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
