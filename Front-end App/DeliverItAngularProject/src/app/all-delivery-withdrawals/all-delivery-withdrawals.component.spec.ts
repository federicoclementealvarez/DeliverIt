import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeliveryWithdrawalsComponent } from './all-delivery-withdrawals.component';

describe('AllDeliveryWithdrawalsComponent', () => {
  let component: AllDeliveryWithdrawalsComponent;
  let fixture: ComponentFixture<AllDeliveryWithdrawalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDeliveryWithdrawalsComponent]
    });
    fixture = TestBed.createComponent(AllDeliveryWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
