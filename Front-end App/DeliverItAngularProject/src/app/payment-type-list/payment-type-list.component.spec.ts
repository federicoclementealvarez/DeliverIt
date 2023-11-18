import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeListComponent } from './payment-type-list.component';

describe('PaymentTypeListComponent', () => {
  let component: PaymentTypeListComponent;
  let fixture: ComponentFixture<PaymentTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentTypeListComponent]
    });
    fixture = TestBed.createComponent(PaymentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
