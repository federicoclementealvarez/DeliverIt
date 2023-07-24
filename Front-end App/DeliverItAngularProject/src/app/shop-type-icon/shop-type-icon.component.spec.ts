import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypeIconComponent } from './shop-type-icon.component';

describe('ShopTypeIconComponent', () => {
  let component: ShopTypeIconComponent;
  let fixture: ComponentFixture<ShopTypeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopTypeIconComponent]
    });
    fixture = TestBed.createComponent(ShopTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
