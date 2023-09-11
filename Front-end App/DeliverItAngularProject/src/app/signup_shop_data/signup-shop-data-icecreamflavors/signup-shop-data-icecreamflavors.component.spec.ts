import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupShopDataIcecreamflavorsComponent } from './signup-shop-data-icecreamflavors.component';

describe('SignupShopDataIcecreamflavorsComponent', () => {
  let component: SignupShopDataIcecreamflavorsComponent;
  let fixture: ComponentFixture<SignupShopDataIcecreamflavorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupShopDataIcecreamflavorsComponent]
    });
    fixture = TestBed.createComponent(SignupShopDataIcecreamflavorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
