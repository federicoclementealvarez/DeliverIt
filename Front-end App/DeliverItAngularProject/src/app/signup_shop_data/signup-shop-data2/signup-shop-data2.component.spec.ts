import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupShopData2Component } from './signup-shop-data2.component';

describe('SignupShopData2Component', () => {
  let component: SignupShopData2Component;
  let fixture: ComponentFixture<SignupShopData2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupShopData2Component]
    });
    fixture = TestBed.createComponent(SignupShopData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
