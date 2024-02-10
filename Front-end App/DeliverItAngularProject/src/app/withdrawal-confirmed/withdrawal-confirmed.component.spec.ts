import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalConfirmedComponent } from './withdrawal-confirmed.component';

describe('WithdrawalConfirmedComponent', () => {
  let component: WithdrawalConfirmedComponent;
  let fixture: ComponentFixture<WithdrawalConfirmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalConfirmedComponent]
    });
    fixture = TestBed.createComponent(WithdrawalConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
