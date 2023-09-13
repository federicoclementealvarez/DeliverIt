import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverOrderDescriptionComponent } from './deliver-order-description.component';

describe('DeliverOrderDescriptionComponent', () => {
  let component: DeliverOrderDescriptionComponent;
  let fixture: ComponentFixture<DeliverOrderDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverOrderDescriptionComponent]
    });
    fixture = TestBed.createComponent(DeliverOrderDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
