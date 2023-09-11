import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupShopData1Component } from './signup-shop-data1.component';

describe('SignupShopData1Component', () => {
  let component: SignupShopData1Component;
  let fixture: ComponentFixture<SignupShopData1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupShopData1Component]
    });
    fixture = TestBed.createComponent(SignupShopData1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
