import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentTypeComponent } from './edit-payment-type.component';

describe('EditPaymentTypeComponent', () => {
  let component: EditPaymentTypeComponent;
  let fixture: ComponentFixture<EditPaymentTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentTypeComponent]
    });
    fixture = TestBed.createComponent(EditPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
