import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeliveredOrdersComponent } from './all-delivered-orders.component';

describe('AllDeliveredOrdersComponent', () => {
  let component: AllDeliveredOrdersComponent;
  let fixture: ComponentFixture<AllDeliveredOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDeliveredOrdersComponent]
    });
    fixture = TestBed.createComponent(AllDeliveredOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
