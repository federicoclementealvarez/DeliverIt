import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionPercentageListComponent } from './commission-percentage-list.component';

describe('CommissionPercentageListComponent', () => {
  let component: CommissionPercentageListComponent;
  let fixture: ComponentFixture<CommissionPercentageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionPercentageListComponent]
    });
    fixture = TestBed.createComponent(CommissionPercentageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
