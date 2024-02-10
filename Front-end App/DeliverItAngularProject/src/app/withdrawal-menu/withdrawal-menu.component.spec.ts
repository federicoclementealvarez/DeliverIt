import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalMenuComponent } from './withdrawal-menu.component';

describe('WithdrawalMenuComponent', () => {
  let component: WithdrawalMenuComponent;
  let fixture: ComponentFixture<WithdrawalMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalMenuComponent]
    });
    fixture = TestBed.createComponent(WithdrawalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
