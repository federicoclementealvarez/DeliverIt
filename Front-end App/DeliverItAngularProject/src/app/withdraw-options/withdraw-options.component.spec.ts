import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawOptionsComponent } from './withdraw-options.component';

describe('WithdrawOptionsComponent', () => {
  let component: WithdrawOptionsComponent;
  let fixture: ComponentFixture<WithdrawOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawOptionsComponent]
    });
    fixture = TestBed.createComponent(WithdrawOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
