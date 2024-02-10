import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommissionPercentageComponent } from './edit-commission-percentage.component';

describe('EditCommissionPercentageComponent', () => {
  let component: EditCommissionPercentageComponent;
  let fixture: ComponentFixture<EditCommissionPercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommissionPercentageComponent]
    });
    fixture = TestBed.createComponent(EditCommissionPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
