import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommissionPercentageComponent } from './add-commission-percentage.component';

describe('AddCommissionPercentageComponent', () => {
  let component: AddCommissionPercentageComponent;
  let fixture: ComponentFixture<AddCommissionPercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommissionPercentageComponent]
    });
    fixture = TestBed.createComponent(AddCommissionPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
