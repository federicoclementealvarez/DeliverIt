import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupShopDataBasicComponent } from './signup-shop-data-basic.component';

describe('SignupShopDataBasicComponent', () => {
  let component: SignupShopDataBasicComponent;
  let fixture: ComponentFixture<SignupShopDataBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupShopDataBasicComponent]
    });
    fixture = TestBed.createComponent(SignupShopDataBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
